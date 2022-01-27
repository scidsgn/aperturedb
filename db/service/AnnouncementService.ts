import { UUID } from "../../core/domain/types/UUID";
import { IAnnouncementRepository } from "../../core/repository/IAnnouncementRepository";
import { AnnouncementDTO } from "../dto/AnnouncementDTO";
import { IAnnouncementService } from "./IAnnouncementService";

export class AnnouncementService implements IAnnouncementService {
    constructor(private repo: IAnnouncementRepository) {}

    async create(dto: AnnouncementDTO): Promise<AnnouncementDTO> {
        return AnnouncementDTO.fromDomain(
            await this.repo.create(
                AnnouncementDTO.toDomain(dto)
            )
        )
    }

    async get(id: string): Promise<AnnouncementDTO> {
        return AnnouncementDTO.fromDomain(
            await this.repo.get(id as UUID)
        )
    }

    async getAll(): Promise<AnnouncementDTO[]> {
        const entities = await this.repo.getAll()

        return entities.map(ent => AnnouncementDTO.fromDomain(ent))
    }

    async update(dto: AnnouncementDTO): Promise<AnnouncementDTO> {
        return AnnouncementDTO.fromDomain(
            await this.repo.update(
                AnnouncementDTO.toDomain(dto)
            )
        )
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id as UUID)
    }
}