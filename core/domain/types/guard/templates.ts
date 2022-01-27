import { guardFactory, GuardFunction } from ".";
import { makeUUID } from "../UUID";

export const guardNullUndefined = guardFactory(
    (v) => v !== null && v !== undefined,
    "is null or undefined"
)

export function guardIsOneOf<T>(values: T[keyof T][]): GuardFunction<T> {
    return (o, p, v) => {
        if (!values.includes(v)) {
            throw new Error(`Property ${String(p)} is not equal to any of the required values.`)
        }
    }
}

export function guardEach<T>(...functions: GuardFunction<any>[]): GuardFunction<T> {
    return (o, p, v) => {
        if (!Array.isArray(v)) {
            throw new Error(`Property ${String(p)} not an array.`)
        }
    
        v.forEach(
            (item, i) => functions.forEach(f => f(o, i, item))
        )
    }
}

export const guardUUID = guardFactory(
    (v) => makeUUID(v) !== null,
    "not an UUID"
)

export function guardTimeTravel<T>(referenceDateProperty: keyof T): GuardFunction<T> {
    return (o, p, v) => {
        const referenceDate = o[referenceDateProperty]

        if (!(referenceDate instanceof Date)) {
            throw new Error(`Property ${referenceDateProperty} not a date.`)
        }
        if (!(v instanceof Date)) {
            throw new Error(`Property ${p} not a date.`)
        }

        if ((referenceDate as Date) > (v as Date)) {
            throw new Error(`Property ${p} occured earlier than ${referenceDateProperty}.`)
        }
    }
}