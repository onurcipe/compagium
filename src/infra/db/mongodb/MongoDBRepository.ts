import type {
    ClientSession,
    Collection,
    Document,
    Filter, UpdateFilter,
    InsertOneResult, InsertManyResult,
    OptionalUnlessRequiredId,
} from "mongodb";

import {isPresent, isPopulated} from "../../../util/core/value.js";
import {isObject} from "../../../util/data-type/object.js";
import {isArray} from "../../../util/data-type/array.js";
import type {DbRepository} from "../../../core/db/DbRepository.js";
import MongoDBGateway from "./MongoDBGateway.js";

type MongoDBRepositoryArgs<TMongoDBGateway> =
    {
        deps: MongoDBRepositoryDeps<TMongoDBGateway>;
    };

type MongoDBRepositoryDeps<TMongoDBGateway> =
    {
        gateway: TMongoDBGateway;
    };

type MongoDBContext =
    {
        session?: ClientSession;
    };

type MongoDBDottedObject = {[key: string]: unknown};

class MongoDBRepository<
    TRecord extends Document = Document,
    TPredicate = Filter<TRecord>,
    TMutation = Partial<TRecord>,
    TContext extends MongoDBContext = MongoDBContext,
    TMongoDBGateway extends MongoDBGateway = MongoDBGateway,
> implements DbRepository<TRecord, TPredicate, TMutation, TContext>
{
    private readonly gateway: TMongoDBGateway;

    public constructor (args: MongoDBRepositoryArgs<TMongoDBGateway>)
    {
        this.gateway = args.deps.gateway;
    }

    public get native (): Collection<TRecord>
    {
        return this.gateway.getCollection() as unknown as Collection<TRecord>;
    }

    public async read (predicate: TPredicate, context?: TContext): Promise<TRecord[]>
    {
        const filter: Filter<TRecord> = this.toReadFilter(predicate);
        const documents: TRecord[] = await this.native.find(filter, context).toArray() as TRecord[];

        return documents;
    }

    public async readOne (predicate: TPredicate, options?: TContext): Promise<TRecord | null>
    {
        const filter: Filter<TRecord> = this.toReadFilter(predicate);
        const document: TRecord | null = await this.native.findOne(filter, options);

        return document;
    }

    public async count (predicate: TPredicate, context?: TContext): Promise<number>
    {
        const filter: Filter<TRecord> = this.toReadFilter(predicate);
        const documentCount: number = await this.native.countDocuments(filter, context);

        return documentCount;
    }

    public async create (record: TRecord, context?: TContext): Promise<TRecord>
    {
        const result: InsertOneResult<TRecord> = await this.native.insertOne(record as OptionalUnlessRequiredId<TRecord>, context);
        const _id: unknown = result.insertedId;

        const document: TRecord | null = await this.readOne({_id} as TPredicate, context);

        return document!;
    }

    public async createMany (records: TRecord[], context?: TContext): Promise<TRecord[]>
    {
        const result: InsertManyResult<TRecord> = await this.native.insertMany(records as OptionalUnlessRequiredId<TRecord>[], context);
        const _ids: unknown[] = Object.values(result.insertedIds);

        const documents: TRecord[] = await this.read({_id: {$in: _ids}} as TPredicate, context);

        return documents;
    }

    public async update (predicate: TPredicate, mutation: TMutation, context?: TContext): Promise<TRecord | null>
    {
        const filter: Filter<TRecord> = this.toReadFilter(predicate);
        const updateFilter: UpdateFilter<TRecord> = this.toUpdateFilter(mutation);
        const document: TRecord | null = await this.native.findOneAndUpdate(filter, updateFilter, {...context, returnDocument: "after"}) as TRecord | null;

        return document;
    }

    public async updateMany (predicate: TPredicate, mutation: TMutation, context?: TContext): Promise<TRecord[]>
    {
        const filter: Filter<TRecord> = this.toReadFilter(predicate);
        const updateFilter: UpdateFilter<TRecord> = this.toUpdateFilter(mutation);
        await this.native.updateMany(filter, updateFilter, context);

        const documents: TRecord[] = await this.read(predicate, context);

        return documents;
    }

    public async delete (predicate: TPredicate, context?: TContext): Promise<TRecord | null>
    {
        const filter: Filter<TRecord> = this.toReadFilter(predicate);
        const document: TRecord | null = await this.native.findOneAndDelete(filter, context ?? {}) as TRecord | null;

        return document;
    }

    public async deleteMany (predicate: TPredicate, context?: TContext): Promise<TRecord[]>
    {
        const documents: TRecord[] = await this.read(predicate, context);

        const filter: Filter<TRecord> = this.toReadFilter(predicate);
        await this.native.deleteMany(filter, context);

        return documents;
    }

    public toReadFilter (predicate: TPredicate): Filter<TRecord>
    {
        return this.toDotNotation("read", predicate) as unknown as Filter<TRecord>;
    }

    public toUpdateFilter (mutation: TMutation): UpdateFilter<TRecord>
    {
        const updateFilter: UpdateFilter<TRecord> = {};

        const $set: Record<string, unknown> = {};
        const $unset: Record<string, unknown> = {};

        const dottedMutation: MongoDBDottedObject = this.toDotNotation("update", mutation);

        for (const key in dottedMutation)
        {
            const value: unknown = dottedMutation[key];

            if (!isPresent(value)) // To be deleted.
            {
                $unset[key] = "";
            }
            else // To be updated.
            {
                $set[key] = value;
            }
        }

        if (isPopulated($set))
        {
            updateFilter.$set = $set as unknown as NonNullable<UpdateFilter<TRecord>["$set"]>;
        }

        if (isPopulated($unset))
        {
            updateFilter.$unset = $unset as unknown as NonNullable<UpdateFilter<TRecord>["$unset"]>;
        }

        return updateFilter;
    }

    private toDotNotation (mode: "read" | "update", value: unknown, result: MongoDBDottedObject = {}, parentPath?: string): MongoDBDottedObject
    {
        if (isObject(value))
        {
            return this.toDotNotationForObject(mode, value as MongoDBDottedObject, result, parentPath);
        }
        else if (isArray(value))
        {
            if (mode === "read")
            {
                return this.toDotNotationForArray(mode, value as unknown[], result, parentPath);
            }

            if (isPresent(parentPath))
            {
                result[parentPath] = value as unknown[];
            }

            return result;
        }
        else
        {
            if (isPresent(parentPath))
            {
                result[parentPath] = value as unknown;
            }

            return result;
        }
    }

    private toDotNotationForObject (mode: "read" | "update", object: {[key: string]: unknown;}, result: MongoDBDottedObject = {}, parentPath?: string): MongoDBDottedObject
    {
        for (const key in object)
        {
            if (key.startsWith("$") && isPresent(parentPath))
            {
                const existing: unknown = result[parentPath];

                if (isObject(existing))
                {
                    existing[key] = object[key];
                }
                else
                {
                    result[parentPath] = {[key]: object[key]};
                }

                continue;
            }

            const currentPath: string = isPresent(parentPath) ? `${parentPath}.${key}` : key;
            const nestedResult: {[key: string]: unknown;} | unknown = this.toDotNotation(mode, object[key], {}, currentPath);

            if (isObject(nestedResult))
            {
                for (const nestedResultKey in nestedResult as {[key: string]: unknown;})
                {
                    result[nestedResultKey] = (nestedResult as {[key: string]: unknown;})[nestedResultKey];
                }
            }
        }

        return result;
    }

    private toDotNotationForArray (mode: "read" | "update", array: unknown[], result: MongoDBDottedObject = {}, parentPath?: string): MongoDBDottedObject
    {
        for (let i: number = 0; i < array.length; i++)
        {
            const currentPath: string = isPresent(parentPath) ? `${parentPath}.${i}` : `${i}`;
            const nestedResult: {[key: string]: unknown;} | unknown = this.toDotNotation(mode, array[i], {}, currentPath);

            if (isObject(nestedResult))
            {
                for (const nestedResultKey in nestedResult as {[key: string]: unknown;})
                {
                    result[nestedResultKey] = (nestedResult as {[key: string]: unknown;})[nestedResultKey];
                }
            }
        }

        return result;
    }
}

export default MongoDBRepository;

export type {
    MongoDBRepositoryArgs,
    MongoDBRepositoryDeps,
    MongoDBContext,

    MongoDBDottedObject,
};
