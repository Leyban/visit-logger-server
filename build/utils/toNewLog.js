"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isString = (value) => {
    return typeof value === 'string' || value instanceof String;
};
const parseString = (value) => {
    if (!value || !isString(value)) {
        throw new Error('Missing or Invalid: ' + value);
    }
    return value;
};
const toNewLog = ({ name, site, time }) => {
    return {
        name: parseString(name),
        site: parseString(site),
        time: parseString(time)
    };
};
exports.default = toNewLog;
