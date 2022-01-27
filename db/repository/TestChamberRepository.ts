import { prisma } from "..";
import { TestChamber } from "../../core/domain/TestChamber";
import { TestChamber as PrismaTestChamber } from "@prisma/client"
import { UUID } from "../../core/domain/types/UUID";
import { ITestChamberRepository } from "../../core/repository/ITestChamberRepository"

export class TestChamberRepository implements ITestChamberRepository {
    static toPrisma(entity: TestChamber) {
        return {
            name: entity.name,
            design: entity.design,
            createdAt: entity.createdAt,
            modifiedAt: entity.modifiedAt,
            architectId: entity.architectId,
            testObjectId: entity.testObjectId
        }
    }

    static fromPrisma(obj: PrismaTestChamber) {
        return TestChamber.create({
            id: obj.id,
            name: obj.name,
            design: obj.design,
            createdAt: obj.createdAt,
            modifiedAt: obj.modifiedAt,
            architectId: obj.architectId as UUID,
            testObjectId: obj.testObjectId as UUID
        })
    }

    async create(entity: TestChamber): Promise<TestChamber> {
        const obj = await prisma.testChamber.create({
            data: TestChamberRepository.toPrisma(entity)
        })

        return TestChamberRepository.fromPrisma(obj)
    }
    async get(id: UUID): Promise<TestChamber> {
        const obj = await prisma.testChamber.findFirst({
            where: {
                id: id
            }
        })
        if (!obj) {
            return null
        }

        return TestChamberRepository.fromPrisma(obj)
    }
    async getAll(): Promise<TestChamber[]> {
        const objs = await prisma.testChamber.findMany()

        return objs.map(obj => TestChamberRepository.fromPrisma(obj))
    }
    async update(entity: TestChamber): Promise<TestChamber> {
        if (!entity.connected) {
            return null
        }
        
        const obj = await prisma.testChamber.update({
            where: {
                id: entity.identifier
            },
            data: TestChamberRepository.toPrisma(entity)
        })

        return TestChamberRepository.fromPrisma(obj)
    }
    async delete(id: UUID): Promise<void> {
        await prisma.testChamber.delete({
            where: { id }
        })
    }
    
}