import { Entity } from "../domain/types/Entity";
import { UUID } from "../domain/types/UUID";

export interface IEntityCrudRepository<T extends Entity<any>> {
    create(entity: T): Promise<T>
    get(id: UUID): Promise<T>
    getAll(): Promise<T[]>
    update(entity: T): Promise<T>
    delete(id: UUID): Promise<void>
}