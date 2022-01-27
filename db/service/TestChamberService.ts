
import { UUID } from "../../core/domain/types/UUID"
import { ITestChamberRepository } from "../../core/repository/ITestChamberRepository"
import { TestChamberDTO } from "../dto/TestChamberDTO"
import { ITestChamberService } from "./ITestChamberService"

export class TestChamberService implements ITestChamberService {
    constructor(private repo: ITestChamberRepository) {}

    async create(dto: TestChamberDTO): Promise<TestChamberDTO> {
        return TestChamberDTO.fromDomain(
            await this.repo.create(
                TestChamberDTO.toDomain(dto)
            )
        )
    }

    async get(id: string): Promise<TestChamberDTO> {
        return TestChamberDTO.fromDomain(
            await this.repo.get(id as UUID)
        )
    }

    async getAll(): Promise<TestChamberDTO[]> {
        const entities = await this.repo.getAll()

        return entities.map(ent => TestChamberDTO.fromDomain(ent))
    }

    async update(dto: TestChamberDTO): Promise<TestChamberDTO> {
        return TestChamberDTO.fromDomain(
            await this.repo.update(
                TestChamberDTO.toDomain(dto)
            )
        )
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id as UUID)
    }
}