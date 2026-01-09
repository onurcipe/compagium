import _ from "lodash";

function isDefined<T> (value: T | undefined): value is T
{
    return value !== undefined;
}

function isPresent<T> (value: T | undefined | null): value is T
{
    return isDefined(value) && value !== null;
}

function isPopulated<T> (value: T | undefined | null): value is NonNullable<T>
{
    if (!isPresent(value))
    {
        return false;
    }

    if (_.isBoolean(value))
    {
        return true;
    }

    if (_.isNumber(value))
    {
        return _.isFinite(value);
    }

    if (typeof value === "bigint")
    {
        return true;
    }

    if (_.isString(value))
    {
        return !_.isEmpty(value);
    }

    if (_.isSymbol(value))
    {
        return true;
    }

    if (_.isDate(value))
    {
        return _.isFinite(value.getTime());
    }

    if (_.isPlainObject(value))
    {
        return !_.isEmpty(value);
    }

    if (_.isArray(value) || _.isTypedArray(value))
    {
        return !_.isEmpty(value);
    }

    if (_.isMap(value) || _.isSet(value))
    {
        return !_.isEmpty(value);
    }

    return true;
}

function clone<T> (value: T): T
{
    return _.cloneDeep(value);
}

export {
    isDefined,
    isPresent,
    isPopulated,

    clone,
};
