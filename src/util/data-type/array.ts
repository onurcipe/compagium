import _ from "lodash";

function isArray (value: unknown): value is unknown[]
{
    return _.isArrayLikeObject(value);
}

export {
    isArray,
};
