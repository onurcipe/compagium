import {isPresent} from "../util/core/value.js";
import {formatUtcDate, formatUtcTime} from "../util/data-type/date.js";
import BaseError from "../error/core/BaseError.js";
import DeveloperError from "../error/core/DeveloperError.js";

type LoggerOptions =
    {
        isEnabled?: boolean;
        verbosity?: number; // non-negative integer
        targets?: LogTarget[];
    };

type LogTarget =
    "console";

type LogLevel =
    "info" | "warning" | "error";

class Logger
{
    private isEnabled: boolean;
    private readonly verbosity: number;
    private readonly targets: readonly LogTarget[];

    public constructor (options?: LoggerOptions)
    {
        this.isEnabled = options?.isEnabled ?? true;

        const verbosity: number | undefined = options?.verbosity;
        if (isPresent(verbosity) && (!Number.isSafeInteger(verbosity) || verbosity < 0))
        {
            throw new DeveloperError("LOGGER-VERBOSITY-INVALID", "The logger verbosity must be a non-negative integer.");
        }

        this.verbosity = verbosity ?? 0;
        this.targets = options?.targets ?? ["console"];
    }

    public enable (): void
    {
        this.isEnabled = true;
    }

    public disable (): void
    {
        this.isEnabled = false;
    }

    public log (verbosity: number, level: LogLevel, payload: unknown): void
    {
        try
        {
            if (!this.isEnabled)
            {
                return;
            }

            if (verbosity > this.verbosity)
            {
                return;
            }

            const timestamp: number = Date.now();

            for (const target of this.targets)
            {
                switch (target)
                {
                    case "console":
                    {
                        this.logToConsole(timestamp, level, payload);
                        break;
                    }
                }
            }
        }
        catch (error: unknown)
        {
            // Logger must never crash the app.
        }
    }

    private logToConsole (timestamp: number, level: LogLevel, payload: unknown): void
    {
        const timestampText: string = `${formatUtcDate(timestamp)} ${formatUtcTime(timestamp)} UTC`;
        const levelText: string = level.toUpperCase();

        let payloadText: string = "";

        if (isPresent(payload))
        {
            payloadText = payload instanceof BaseError ? payload.toString() : String(payload);
        }

        const message: string = `${timestampText}: [${levelText}] ${payloadText}`;

        switch (level)
        {
            case "info":
            {
                console.info(message);
                break;
            }
            case "warning":
            {
                console.warn(message);
                break;
            }
            case "error":
            {
                console.error(message);
                break;
            }
        }
    }
}

export default Logger;

export type {
    LoggerOptions,
    LogTarget,

    LogLevel,
};
