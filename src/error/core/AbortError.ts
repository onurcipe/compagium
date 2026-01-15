import BaseError from "./BaseError.js";

class AbortError extends BaseError
{
    public constructor (code?: string, message?: string)
    {
        super(
            code ?? "ABORT",
            message ?? "Mission aborted.",
        );
    }
}

export default AbortError;
