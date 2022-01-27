import { UUID } from "../../core/domain/types/UUID"
import { ITestObjectRepository } from "../../core/repository/ITestObjectRepository"
import { TestObjectDTO } from "../dto/TestObjectDTO"
import { ITestObjectService } from "./ITestObjectService"

export class TestObjectService implements ITestObjectService {
    constructor(private repo: ITestObjectRepository) {}

    async create(dto: TestObjectDTO): Promise<TestObjectDTO> {
        return TestObjectDTO.fromDomain(
            await this.repo.create(
                TestObjectDTO.toDomain(dto)
            )
        )
    }

    async get(id: string): Promise<TestObjectDTO> {
        return TestObjectDTO.fromDomain(
            await this.repo.get(id as UUID)
        )
    }

    async getAll(): Promise<TestObjectDTO[]> {
        const entities = await this.repo.getAll()

        return entities.map(ent => TestObjectDTO.fromDomain(ent))
    }

    async update(dto: TestObjectDTO): Promise<TestObjectDTO> {
        return TestObjectDTO.fromDomain(
            await this.repo.update(
                TestObjectDTO.toDomain(dto)
            )
        )
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id as UUID)
    }
}