import _ from "lodash";

import {isPresent} from "../core/value.js";

function isNumber (value: unknown): value is number
{
    return isPresent(value) && _.isNumber(value) && _.isFinite(value);
}

function toNumber (value: unknown): number | null
{
    if (isNumber(value))
    {
        return value;
    }

    if (_.isString(value))
    {
        const decimalPattern: RegExp = /^-?(?:\d+(\.\d*)?|\.\d+)$/;

        if (!decimalPattern.test(value))
        {
            return null;
        }

        const converted: number = _.toNumber(value);

        if (isNumber(converted))
        {
            return converted;
        }
    }

    return null;
}

export {
    isNumber,
    toNumber,
};
