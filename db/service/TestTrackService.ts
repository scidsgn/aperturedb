import { TestTrack } from "../../core/domain/TestTrack"
import { UUID } from "../../core/domain/types/UUID"
import { ITestTrackRepository } from "../../core/repository/ITestTrackRepository"
import { TestChamberDTO } from "../dto/TestChamberDTO"
import { TestTrackDTO } from "../dto/TestTrackDTO"
import { ITestTrackService } from "./ITestTrackService"

export class TestTrackService implements ITestTrackService {
    constructor(private repo: ITestTrackRepository) {}

    async create(dto: TestTrackDTO): Promise<TestTrackDTO> {
        return TestTrackDTO.fromDomain(
            await this.repo.create(
                TestTrackDTO.toDomain(dto)
            )
        )
    }

    async get(id: string): Promise<TestTrackDTO> {
        return TestTrackDTO.fromDomain(
            await this.repo.get(id as UUID)
        )
    }

    async getAll(): Promise<TestTrackDTO[]> {
        const entities = await this.repo.getAll()

        return entities.map(ent => TestTrackDTO.fromDomain(ent))
    }

    async getChambers(id: string): Promise<TestChamberDTO[]> {
        const entities = await this.repo.getChambers(id as UUID)

        return entities.map(ent => TestChamberDTO.fromDomain(ent))
    }

    async addChamber(id: string, chamberId: string): Promise<void> {
        await this.repo.addChamber(id as UUID, chamberId as UUID)
    }

    async removeChamber(id: string, chamberId: string): Promise<void> {
        await this.repo.removeChamber(id as UUID, chamberId as UUID)
    }

    async update(dto: TestTrackDTO): Promise<TestTrackDTO> {
        return TestTrackDTO.fromDomain(
            await this.repo.update(
                TestTrackDTO.toDomain(dto)
            )
        )
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id as UUID)
    }
}