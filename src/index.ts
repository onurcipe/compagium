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

/* core */
import type {
    Factory,
    FactoryArgs,
} from "./core/Factory.js";

import Registry from "./core/Registry.js";
import type {RegistryToken} from "./core/Registry.js";

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

    /* core */

    /* -- registry */
    Registry,
};

export type {
    /* core */

    /* -- factory */
    Factory,
    FactoryArgs,

    /* -- registry */
    RegistryToken,
};
