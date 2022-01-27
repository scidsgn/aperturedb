import { makeUUID } from "../UUID"

export type GuardFunction<T> = (object: T, property: keyof T, value: any) => void

export type GuardDefinition<T> = {
    property: string
    functions: GuardFunction<T>[]
}

export function define<T>(property: keyof T, ...functions: GuardFunction<T>[]) {
    return { property, functions } as GuardDefinition<T>
}

export function guard<T>(object: T, guards: GuardDefinition<T>[]) {
    for (let guard of guards) {
        if (!(guard.property in object)) {
            throw new Error(`Property ${guard.property} not present in object.`)
        }

        const value = object[guard.property]
        guard.functions.forEach(f => f(object, guard.property as keyof T, value))
    }
}

export function preguard<T>(object: T, property: keyof T, value: any, guards: GuardDefinition<T>[]) {
    for (let guard of guards) {
        if (guard.property !== property) {
            continue
        }

        guard.functions.forEach(f => f(object, property, value))
    }
}

export function guardFactory<T>(check: (v: any) => boolean, errorString: string): GuardFunction<T> {
    return (p, v) => {
        if (!check(v)) {
            throw new Error(`Property ${p} ${errorString}.`)
        }
    }
}