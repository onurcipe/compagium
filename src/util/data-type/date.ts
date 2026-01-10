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

function formatUtcDate (value: Date | number): string
{
    const date: Date = _.isDate(value) ? value : new Date(value);

    const yyyy: string = date.getUTCFullYear().toString();
    const MM: string = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const dd: string = date.getUTCDate().toString().padStart(2, "0");

    return `${yyyy}-${MM}-${dd}`;
}

function formatUtcTime (value: Date | number): string
{
    const date: Date = _.isDate(value) ? value : new Date(value);

    const HH: string = date.getUTCHours().toString().padStart(2, "0");
    const mm: string = date.getUTCMinutes().toString().padStart(2, "0");
    const ss: string = date.getUTCSeconds().toString().padStart(2, "0");

    return `${HH}:${mm}:${ss}`;
}

export {
    isDate,
    toDate,

    formatUtcDate,
    formatUtcTime,
};
