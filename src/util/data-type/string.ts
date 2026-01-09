import _ from "lodash";

import {isPresent} from "../core/value.js";

function isString (value: unknown): value is string
{
    return _.isString(value);
}

function toString (value: unknown): string | null
{
    if (isString(value))
    {
        return value;
    }

    if (isPresent(value))
    {
        const {toString} = value as {toString?: () => unknown;};

        if (isPresent(toString))
        {
            try
            {
                const converted: unknown = (value as any).toString?.();

                if (_.isString(converted))
                {
                    return converted;
                }
            }
            catch
            {
                return null;
            }
        }
    }

    return null;
}

export {
    isString,
    toString,
};
