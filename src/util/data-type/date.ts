import _ from "lodash";

import {isPresent} from "../core/value.js";

function isDate (value: unknown): value is Date
{
    return isPresent(value) && _.isDate(value) && _.isFinite(value.getTime());
}

function toDate (value: unknown): Date | null
{
    if (isDate(value))
    {
        return value;
    }

    if (_.isString(value))
    {
        const converted = new Date(value);

        if (isDate(converted))
        {
            return converted;
        }
    }

    return null;
}

export {
    isDate,
    toDate,
};
