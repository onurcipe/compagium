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
};
