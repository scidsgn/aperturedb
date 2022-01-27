import { guard, GuardDefinition, preguard } from "./guard"
import { UUID } from "./UUID"

export class Entity<T> {
    protected readonly id: UUID
    protected properties: T
    protected guards: GuardDefinition<T>[]

    protected constructor(properties: T, id?: UUID, guards?: GuardDefinition<T>[]) {
        this.id = id ?? null
        this.properties = properties
        this.guards = guards ?? []

        guard(this.properties, this.guards)
    }

    get connected() {
        return this.id !== null
    }

    get identifier() {
        return this.id
    }

    protected get(property: keyof T) {
        if (!(property in this.properties)) {
            throw new Error(`Property ${property} not present in entity.`)
        }

        return this.properties[property]
    }

    protected set(property: keyof T, value: T[keyof T]) {
        if (!(property in this.properties)) {
            throw new Error(`Property ${property} not present in entity.`)
        }

        preguard(this.properties, property, value, this.guards)
        this.properties[property] = value
    }

    protected fill(property: keyof T, value: T[keyof T]) {
        if (!(property in this.properties)) {
            throw new Error(`Property ${property} not present in entity.`)
        }

        const v = this.properties[property]
        if (v === null || v === undefined) {
            this.set(property, value)
        }
    }

    public equals(entity: object) {
        if (entity === this) {
            return true
        }

        if (entity instanceof Entity && entity.id === this.id) {
            return true
        }

        return false
    }
}