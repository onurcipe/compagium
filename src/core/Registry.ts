type RegistryToken<TValue = unknown> =
    {
        readonly key: symbol;
    };

class Registry
{
    private readonly items: Map<symbol, unknown> = new Map();

    public static createToken<TValue = unknown> (description: string): RegistryToken<TValue>
    {
        return {
            key: Symbol(description),
        };
    }

    public has<TValue> (token: RegistryToken<TValue>): boolean
    {
        return this.items.has(token.key);
    }

    public get<TValue> (token: RegistryToken<TValue>): TValue | undefined
    {
        return this.items.get(token.key) as TValue | undefined;
    }

    public getOrThrow<TValue> (token: RegistryToken<TValue>, createError: () => Error): TValue
    {
        if (!this.items.has(token.key))
        {
            throw createError();
        }

        return this.items.get(token.key) as TValue;
    }

    public set<TValue> (token: RegistryToken<TValue>, value: TValue): void
    {
        this.items.set(token.key, value);
    }

    public setOnce<TValue> (token: RegistryToken<TValue>, value: TValue, createError: () => Error): void
    {
        if (this.items.has(token.key))
        {
            throw createError();
        }

        this.items.set(token.key, value);
    }

    public getOrSet<TValue> (token: RegistryToken<TValue>, createValue: () => TValue): TValue
    {
        if (this.items.has(token.key))
        {
            return this.items.get(token.key) as TValue;
        }

        const value: TValue = createValue();
        this.items.set(token.key, value);

        return value;
    }

    public delete<TValue> (token: RegistryToken<TValue>): boolean
    {
        return this.items.delete(token.key);
    }

    public clear (): void
    {
        this.items.clear();
    }
}

export default Registry;

export type {
    RegistryToken,
};
