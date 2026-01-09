import BaseError from "./BaseError.js";

class FrameworkError extends BaseError
{
    public constructor (code?: string, message?: string)
    {
        super(
            code ?? "FRAMEWORK",
            message ?? "It worked on my machine.",
        );
    }
}

export default FrameworkError;
