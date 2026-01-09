import {isPresent} from "../../util/core/value.js";

class BaseError extends Error
{
    public readonly code: string;

    public constructor (code?: string, message?: string)
    {
        super(message ?? "Everything is fine.");

        Object.setPrototypeOf(this, BaseError.prototype);
        Error.captureStackTrace(this, BaseError);
        this.code = code ?? "ERROR";
    }

    public toString (isWithError?: boolean): string
    {
        let result: string = `${this.code}\n${this.message}`;

        if (isWithError && isPresent(this.stack))
        {
            result = `${result}\n${this.stack}`;
        }

        return result;
    }

    public toObject (): Record<string, unknown>
    {
        return {
            code: this.code,
            message: this.message,
            stack: this.stack,
        };
    }
}

export default BaseError;
