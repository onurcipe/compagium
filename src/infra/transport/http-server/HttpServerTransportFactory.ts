import type {Factory, FactoryArgs} from "../../../core/Factory.js";
import HttpServerTransport from "./HttpServerTransport.js";
import type {HttpServerTransportDeps, HttpServerTransportOptions} from "./HttpServerTransport.js";

type HttpServerTransportFactoryArgs =
    FactoryArgs<HttpServerTransportDeps, HttpServerTransportOptions>;

type HttpServerTransportFactory =
    Factory<HttpServerTransport, HttpServerTransportDeps, HttpServerTransportOptions>;

const createHttpServerTransport: HttpServerTransportFactory =
    (args: HttpServerTransportFactoryArgs): HttpServerTransport =>
    {
        return new HttpServerTransport(args);
    };

export default createHttpServerTransport;

export type {
    HttpServerTransportFactory,
    HttpServerTransportFactoryArgs,
};
