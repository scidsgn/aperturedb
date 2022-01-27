import { prisma } from ".."
import { TestTrack } from "../../core/domain/TestTrack";
import { UUID } from "../../core/domain/types/UUID";
import { ITestTrackRepository } from "../../core/repository/ITestTrackRepository"
import { TestTrack as PrismaTestTrack } from "@prisma/client"
import { TestChamber } from "../../core/domain/TestChamber";
import { TestChamberRepository } from "./TestChamberRepository";

export class TestTrackRepository implements ITestTrackRepository {
    static toPrisma(entity: TestTrack) {
        return {
            name: entity.name,
            managerId: entity.managerId
        }
    }

    static fromPrisma(obj: PrismaTestTrack) {
        return TestTrack.create({
            id: obj.id,
            name: obj.name,
            managerId: obj.managerId as UUID
        })
    }

    async create(entity: TestTrack): Promise<TestTrack> {
        const obj = await prisma.testTrack.create({
            data: TestTrackRepository.toPrisma(entity)
        })

        return TestTrackRepository.fromPrisma(obj)
    }

    async get(id: UUID): Promise<TestTrack> {
        const obj = await prisma.testTrack.findFirst({
            where: {
                id: id
            }
        })
        if (!obj) {
            return null
        }

        return TestTrackRepository.fromPrisma(obj)
    }

    async getAll(): Promise<TestTrack[]> {
        const objs = await prisma.testTrack.findMany()

        return objs.map(obj => TestTrackRepository.fromPrisma(obj))
    }

    async getChambers(id: UUID): Promise<TestChamber[]> {
        const obj = await prisma.testTrack.findFirst({
            where: {
                id: id
            },
            include: {
                testChambers: true
            }
        })

        return obj.testChambers.map(chamber => TestChamberRepository.fromPrisma(chamber))
    }

    async addChamber(id: UUID, chamberId: UUID): Promise<void> {
        await prisma.testTrack.update({
            where: {
                id: id
            },
            data: {
                testChambers: {
                    connect: [{
                        id: chamberId
                    }]
                }
            }
        })
    }

    async removeChamber(id: UUID, chamberId: UUID): Promise<void> {
        await prisma.testTrack.update({
            where: {
                id: id
            },
            data: {
                testChambers: {
                    disconnect: {
                        id: chamberId
                    }
                }
            }
        })
    }
    
    async update(entity: TestTrack): Promise<TestTrack> {
        if (!entity.connected) {
            return null
        }
        
        const obj = await prisma.testTrack.update({
            where: {
                id: entity.identifier
            },
            data: TestTrackRepository.toPrisma(entity)
        })

        return TestTrackRepository.fromPrisma(obj)
    }

    async delete(id: UUID): Promise<void> {
        await prisma.testChamber.delete({
            where: { id }
        })
    }
}