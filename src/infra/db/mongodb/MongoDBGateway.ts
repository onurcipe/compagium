import type {Db, Collection} from "mongodb";

import {isPresent} from "../../../util/core/value.js";
import {isObject} from "../../../util/data-type/object.js";
import DeveloperError from "../../../error/core/DeveloperError.js";
import type MongoDBModel from "./MongoDBModel.js";

type MongoDBGatewayArgs<TMongoDBModel extends MongoDBModel> =
    {
        deps: MongoDBGatewayDeps<TMongoDBModel>;
        options: MongoDBGatewayOptions;
    };

type MongoDBGatewayDeps<TMongoDBModel extends MongoDBModel> =
    {
        db: Db;
        model: TMongoDBModel;
    };

type MongoDBGatewayOptions =
    {
        collectionName: string;
        validationLevel?: "off" | "moderate" | "strict";
        validationAction?: "warn" | "error" | "errorAndLog";
    };

type MongoDBGatewayConfig =
    {
        collectionName: string;
        validationLevel: "off" | "moderate" | "strict";
        validationAction: "warn" | "error" | "errorAndLog";
    };

class MongoDBGateway<TMongoDBModel extends MongoDBModel = MongoDBModel>
{
    private readonly db: Db;
    private readonly model: TMongoDBModel;
    private readonly config: MongoDBGatewayConfig;

    private readonly collection: Collection;

    public constructor (args: MongoDBGatewayArgs<TMongoDBModel>)
    {
        this.db = args.deps.db;
        this.model = args.deps.model;
        this.config = {
            collectionName: args.options.collectionName,
            validationLevel: args.options.validationLevel ?? "strict",
            validationAction: args.options.validationAction ?? "error",
        };

        this.collection = this.db.collection(this.config.collectionName);
    }

    public getCollection (): Collection
    {
        return this.collection;
    }

    public async sync (): Promise<void>
    {
        const isCollectionExist: boolean = (await this.db.listCollections({name: this.config.collectionName}, {nameOnly: true}).toArray()).length > 0;

        const options: {[key: string]: unknown} = {
            validator: {$jsonSchema: this.model.getJsonSchema()},
            validationLevel: this.config.validationLevel,
            validationAction: this.config.validationAction,
        };

        try
        {
            if (isCollectionExist)
            {
                await this.db.command({collMod: this.config.collectionName, ...options});
            }
            else
            {
                await this.db.createCollection(this.config.collectionName, options);
            }
        }
        catch (error: unknown)
        {
            const isFailedToParse: boolean = isObject(error) && isPresent(error.code) && error.code === 9;

            if (isFailedToParse)
            {
                throw new DeveloperError("MONGODB_GATEWAY-JSON_SCHEMA-INVALID", `The MongoDB gateway has failed to validate the MongoDB JSON schema for ${this.db.databaseName}.${this.config.collectionName}.`);
            }

            throw error;
        }
    }
}

export default MongoDBGateway;

export type {
    MongoDBGatewayArgs,
    MongoDBGatewayDeps,
    MongoDBGatewayOptions,
    MongoDBGatewayConfig,
};
