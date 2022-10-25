import { ILog } from "../visitLog";

const isString = (value: unknown): value is string => {
    return typeof value === 'string' || value instanceof String;
};

const parseString = (value: unknown): string => {
    if (!value || !isString(value)) {
        throw new Error('Missing or Invalid: ' + value);
    }
    return value;
};

export interface LogFields {
    name: unknown,
    site: unknown,
    time: unknown
}

const toNewLog = ({
    name,
    site,
    time
}: LogFields ): ILog => {
    return {
        name: parseString(name),
        site: parseString(site),
        time: parseString(time)
    };
};

export default toNewLog;