import ValueObject from "./ValueObject";

export class TimePeriodError extends Error {
    constructor (message: string) {
        super(`[TimePeriod] Error - ${message}`);
    }
}

export type TimePeriodProps = {
    from: number
    to: number
}

export default class TimePeriod extends ValueObject<TimePeriodProps> {
    public static create ({ from, to }: { from: number | string, to: number | string}): TimePeriod {
        const fromDateTime = new Date(from);
        const toDateTime = new Date(to);

        if (!this.isValid(fromDateTime, toDateTime)) {
            throw new TimePeriodError("Time period is not valid");
        }

        return new TimePeriod ({ 
            from: fromDateTime.getTime(), 
            to: toDateTime.getTime(),
        });
    }

    private static isValid (from: Date, to: Date): boolean {
        return from.getTime() < to.getTime();
    }

    public isEqual (object?: ValueObject<TimePeriodProps>): boolean {
        if (!object) {
            return false;
        }

        const thisValue = this.getValue();
        const objectValue = object.getValue();

        return thisValue.from === objectValue.from &&
            thisValue.to === objectValue.to;
    }
}
