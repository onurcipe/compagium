import BaseError from "./BaseError.js";

class DeveloperError extends BaseError
{
    public constructor (code?: string, message?: string)
    {
        super(
            code ?? "DEVELOPER",
            message ?? "It's not a bug, it's a feature.",
        );
    }
}

export default DeveloperError;
