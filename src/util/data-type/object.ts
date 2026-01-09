import _ from "lodash";

function isObject (value: unknown): value is {[key: PropertyKey]: unknown}
{
    return _.isPlainObject(value);
}

export {
    isObject,
};
