import _ from "lodash";

function isBoolean (value: unknown): value is boolean
{
    return _.isBoolean(value);
}

function toBoolean (value: unknown): boolean | null
{
    if (isBoolean(value))
    {
        return value;
    }

    if (_.isString(value))
    {
        if (value === "true")
        {
            return true;
        }

        if (value === "false")
        {
            return false;
        }
    }

    return null;
}

export {
    isBoolean,
    toBoolean,
};
