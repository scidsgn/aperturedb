import { IDTO } from "../dto/IDTO"

export interface ICrudRepositoryService<T extends IDTO> {
    create(dto: T): Promise<T>
    get(id: string): Promise<T>
    getAll(): Promise<T[]>
    update(dto: T): Promise<T>
    delete(id: string): Promise<void>
}