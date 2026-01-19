interface DbRepository<
    TRecord extends Record<string, unknown> = Record<string, unknown>,
    TPredicate = unknown,
    TMutation = Partial<TRecord>,
    TContext = undefined
>
{
    read (predicate: TPredicate, context?: TContext): Promise<TRecord[]>;

    readOne (predicate: TPredicate, context?: TContext): Promise<TRecord | null>;

    count (predicate: TPredicate, context?: TContext): Promise<number>;

    create (record: TRecord, context?: TContext): Promise<TRecord>;

    createMany (records: TRecord[], context?: TContext): Promise<TRecord[]>;

    update (predicate: TPredicate, mutation: TMutation, context?: TContext): Promise<TRecord | null>;

    updateMany (predicate: TPredicate, mutation: TMutation, context?: TContext): Promise<TRecord[]>;

    delete (predicate: TPredicate, context?: TContext): Promise<TRecord | null>;

    deleteMany (predicate: TPredicate, context?: TContext): Promise<TRecord[]>;
}

export type {
    DbRepository,
};
