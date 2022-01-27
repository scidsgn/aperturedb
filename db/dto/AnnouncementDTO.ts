import { Announcement } from "../../core/domain/Announcement"
import { UUID } from "../../core/domain/types/UUID"
import { IDTO } from "./IDTO"

type AnnouncementDTOProperties = {
    id?: string
    title: string
    contents: string
    authorId: string
    createdAt: string
}

export class AnnouncementDTO implements IDTO {
    constructor(public data: AnnouncementDTOProperties) {}

    public static fromDomain(entity: Announcement) {
        return new AnnouncementDTO({
            id: entity.identifier,
            title: entity.title,
            contents: entity.contents,
            authorId: entity.authorId,
            createdAt: entity.createdAt.toString()
        })
    }

    public static toDomain(dto: AnnouncementDTO) {
        return Announcement.create({
            id: dto.data.id as UUID,
            title: dto.data.title,
            contents: dto.data.contents,
            authorId: dto.data.authorId as UUID,
            createdAt: new Date(dto.data.createdAt)
        })
    }
}