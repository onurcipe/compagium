import type {Factory, FactoryArgs} from "../../../core/Factory.js";
import MongoDBConnector from "./MongoDBConnector.js";
import type {MongoDBConnectorDeps, MongoDBConnectorOptions} from "./MongoDBConnector.js";

type MongoDBConnectorFactoryArgs =
    FactoryArgs<MongoDBConnectorDeps, MongoDBConnectorOptions>;

type MongoDBConnectorFactory =
    Factory<MongoDBConnector, MongoDBConnectorDeps, MongoDBConnectorOptions>;

const createMongoDBConnector: MongoDBConnectorFactory =
    (args: MongoDBConnectorFactoryArgs): MongoDBConnector =>
    {
        return new MongoDBConnector(args);
    };

export default createMongoDBConnector;

export type {
    MongoDBConnectorFactory,
    MongoDBConnectorFactoryArgs,
};
