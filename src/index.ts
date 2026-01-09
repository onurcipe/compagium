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
};
