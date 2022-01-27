import { prisma } from ".."
import { Announcement } from "../../core/domain/Announcement"
import { IAnnouncementRepository } from "../../core/repository/IAnnouncementRepository"
import { Announcement as PrismaAnnouncement } from "@prisma/client"
import { UUID } from "../../core/domain/types/UUID"

export class AnnouncementRepository implements IAnnouncementRepository {
    toPrisma(entity: Announcement) {
        return {
            title: entity.title,
            contents: entity.contents,
            createdAt: entity.createdAt,
            authorId: entity.authorId
        }
    }

    fromPrisma(obj: PrismaAnnouncement) {
        return Announcement.create({
            id: obj.id,
            title: obj.title,
            contents: obj.contents,
            createdAt: obj.createdAt,
            authorId: obj.authorId as UUID
        })
    }

    async create(entity: Announcement): Promise<Announcement> {
        const obj = await prisma.announcement.create({
            data: this.toPrisma(entity)
        })

        return this.fromPrisma(obj)
    }
    async get(id: UUID): Promise<Announcement> {
        const obj = await prisma.announcement.findFirst({
            where: {
                id: id
            }
        })
        if (!obj) {
            return null
        }

        return this.fromPrisma(obj)
    }
    async getAll(): Promise<Announcement[]> {
        const objs = await prisma.announcement.findMany()

        return objs.map(obj => this.fromPrisma(obj))
    }
    async update(entity: Announcement): Promise<Announcement> {
        if (!entity.connected) {
            return null
        }
        
        const obj = await prisma.announcement.update({
            where: {
                id: entity.identifier
            },
            data: this.toPrisma(entity)
        })

        return this.fromPrisma(obj)
    }
    async delete(id: UUID): Promise<void> {
        await prisma.announcement.delete({
            where: { id }
        })
    }
}