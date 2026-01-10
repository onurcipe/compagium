type FactoryArgs<TDeps, TOptions> =
    TOptions extends void
    ? {deps: TDeps}
    : {deps: TDeps; options: TOptions};

type Factory<TProduct, TDeps, TOptions = void> =
    (args: FactoryArgs<TDeps, TOptions>) => TProduct;

export type {
    Factory,
    FactoryArgs,
};
