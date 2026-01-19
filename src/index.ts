/* util */

/* -- core */
import {
    isDefined,
    isPresent,
    isPopulated,

    clone,
} from "./util/core/value.js";

/* -- data-type */
import {
    isBoolean,
    toBoolean,
} from "./util/data-type/boolean.js";

import {
    isNumber,
    toNumber,
} from "./util/data-type/number.js";

import {
    isString,
    toString,
} from "./util/data-type/string.js";

import {
    isDate,
    toDate,

    formatUtcDate,
    formatUtcTime,
} from "./util/data-type/date.js";

import {
    isObject,
} from "./util/data-type/object.js";

import {
    isArray,
} from "./util/data-type/array.js";

/* error */

/* -- core */
import BaseError from "./error/core/BaseError.js";

import FrameworkError from "./error/core/FrameworkError.js";

import DeveloperError from "./error/core/DeveloperError.js";

import AbortError from "./error/core/AbortError.js";

/* core */
import type {
    Factory,
    FactoryArgs,
} from "./core/Factory.js";

import Registry from "./core/Registry.js";
import type {RegistryToken} from "./core/Registry.js";

import Logger from "./core/Logger.js";
import type {
    LoggerOptions,
    LogTarget,

    LogLevel,
} from "./core/Logger.js";

import Aborter from "./core/Aborter.js";

import type {
    Connector,
} from "./core/Connector.js";

import type {
    Transport,
} from "./core/Transport.js";

import Runtime from "./core/Runtime.js";
import type {
    RuntimeConfig,
    RuntimeInitHook,
    RuntimeConnectorCreator,
    RuntimeTransportCreator,

    RuntimeState,
} from "./core/Runtime.js";

/* -- db */
import type {
    DbRepository,
} from "./core/db/DbRepository.js";

/* infra */

/* -- connector */

/* ---- mongodb */
import MongoDBConnector from "./infra/connector/mongodb/MongoDBConnector.js";
import type {
    MongoDBConnectorArgs,
    MongoDBConnectorDeps,
    MongoDBConnectorOptions,
    MongoDBConnectorConfig,
    MongoDBClientOptions,

    MongoDBConnectorState,
} from "./infra/connector/mongodb/MongoDBConnector.js";

import createMongoDBConnector from "./infra/connector/mongodb/MongoDBConnectorFactory.js";
import type {
    MongoDBConnectorFactory,
    MongoDBConnectorFactoryArgs,
} from "./infra/connector/mongodb/MongoDBConnectorFactory.js";

/* -- transport */

/* ---- http server */
import HttpServerTransport from "./infra/transport/http-server/HttpServerTransport.js";
import type {
    HttpServerTransportArgs,
    HttpServerTransportDeps,
    HttpServerTransportOptions,
    HttpServerTransportConfig,
    HttpServerOptions,
    HttpsServerOptions,

    HttpServerTransportState,
} from "./infra/transport/http-server/HttpServerTransport.js";

import createHttpServerTransport from "./infra/transport/http-server/HttpServerTransportFactory.js";
import type {
    HttpServerTransportFactory,
    HttpServerTransportFactoryArgs,
} from "./infra/transport/http-server/HttpServerTransportFactory.js";

/* -- db */

/* ---- mongodb */
import MongoDBDataType from "./infra/db/mongodb/MongoDBDataType.js";
import type {
    MongoDBBsonTypeName,
} from "./infra/db/mongodb/MongoDBDataType.js";

import MongoDBModel from "./infra/db/mongodb/MongoDBModel.js";
import type {
    MongoDBModelArgs,
    MongoDBModelDefinition,
    MongoDBModelOptions,
    MongoDBModelConfig,

    MongoDBJsonSchema,
} from "./infra/db/mongodb/MongoDBModel.js";

import MongoDBGateway from "./infra/db/mongodb/MongoDBGateway.js";
import type {
    MongoDBGatewayArgs,
    MongoDBGatewayDeps,
    MongoDBGatewayOptions,
    MongoDBGatewayConfig,
} from "./infra/db/mongodb/MongoDBGateway.js";

import MongoDBRepository from "./infra/db/mongodb/MongoDBRepository.js";
import type {
    MongoDBRepositoryArgs,
    MongoDBRepositoryDeps,
    MongoDBContext,

    MongoDBDottedObject,
} from "./infra/db/mongodb/MongoDBRepository.js";

export {
    /* util */

    /* -- core */

    /* ---- value */
    isDefined,
    isPresent,
    isPopulated,

    clone,

    /* -- data-type */

    /* ---- boolean */
    isBoolean,
    toBoolean,

    /* ---- number */
    isNumber,
    toNumber,

    /* ---- string */
    isString,
    toString,

    /* ---- date */
    isDate,
    toDate,

    formatUtcDate,
    formatUtcTime,

    /* ---- object */
    isObject,

    /* ---- array */
    isArray,

    /* error */

    /* -- core */

    /* ---- base */
    BaseError,

    /* ---- framework */
    FrameworkError,

    /* ---- developer */
    DeveloperError,

    /* ---- abort */
    AbortError,

    /* core */

    /* -- registry */
    Registry,

    /* -- logger */
    Logger,

    /* -- aborter */
    Aborter,

    /* -- runtime */
    Runtime,

    /* infra */

    /* -- connector */

    /* ---- mongodb */

    /* ------ self */
    MongoDBConnector,

    /* ------ factory */
    createMongoDBConnector,

    /* -- transport */

    /* ---- http server */

    /* ------ self */
    HttpServerTransport,

    /* ------ factory */
    createHttpServerTransport,

    /* -- db */

    /* ---- mongodb */

    /* ------ data type */
    MongoDBDataType,

    /* ------ model */
    MongoDBModel,

    /* ------ gateway */
    MongoDBGateway,

    /* ------ repository */
    MongoDBRepository,
};

export type {
    /* core */

    /* -- factory */
    Factory,
    FactoryArgs,

    /* -- registry */
    RegistryToken,

    /* -- logger */
    LoggerOptions,
    LogTarget,

    LogLevel,

    /* -- connector */
    Connector,

    /* -- transport */
    Transport,

    /* -- runtime */
    RuntimeConfig,
    RuntimeInitHook,
    RuntimeConnectorCreator,
    RuntimeTransportCreator,

    RuntimeState,

    /* -- db */

    /* ---- repository */
    DbRepository,

    /* infra */

    /* -- connector */

    /* ---- mongodb */

    /* ------ self */
    MongoDBConnectorArgs,
    MongoDBConnectorDeps,
    MongoDBConnectorOptions,
    MongoDBConnectorConfig,
    MongoDBClientOptions,

    MongoDBConnectorState,

    /* ------ factory */
    MongoDBConnectorFactory,
    MongoDBConnectorFactoryArgs,

    /* -- transport */

    /* ---- http server */

    /* ------ self */
    HttpServerTransportArgs,
    HttpServerTransportDeps,
    HttpServerTransportOptions,
    HttpServerTransportConfig,
    HttpServerOptions,
    HttpsServerOptions,

    HttpServerTransportState,

    /* ------ factory */
    HttpServerTransportFactory,
    HttpServerTransportFactoryArgs,

    /* -- db */

    /* ---- mongodb */

    /* ------ data type */
    MongoDBBsonTypeName,

    /* ------ model */
    MongoDBModelArgs,
    MongoDBModelDefinition,
    MongoDBModelOptions,
    MongoDBModelConfig,

    MongoDBJsonSchema,

    /* ------ gateway */
    MongoDBGatewayArgs,
    MongoDBGatewayDeps,
    MongoDBGatewayOptions,
    MongoDBGatewayConfig,

    /* ------ repository */
    MongoDBRepositoryArgs,
    MongoDBRepositoryDeps,
    MongoDBContext,

    MongoDBDottedObject,
};
