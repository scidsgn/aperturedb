import { prisma } from ".."
import { TestObject } from "../../core/domain/TestObject"
import { UUID } from "../../core/domain/types/UUID"
import { ITestObjectRepository } from "../../core/repository/ITestObjectRepository"
import { TestObject as PrismaTestObject } from "@prisma/client"

export class TestObjectRepository implements ITestObjectRepository {
    static toPrisma(entity: TestObject) {
        return {
            name: entity.name
        }
    }

    static fromPrisma(obj: PrismaTestObject) {
        return TestObject.create({
            id: obj.id,
            name: obj.name
        })
    }

    async create(entity: TestObject): Promise<TestObject> {
        const obj = await prisma.testObject.create({
            data: TestObjectRepository.toPrisma(entity)
        })

        return TestObjectRepository.fromPrisma(obj)
    }

    async get(id: UUID): Promise<TestObject> {
        const obj = await prisma.testObject.findFirst({
            where: {
                id: id
            }
        })
        if (!obj) {
            return null
        }

        return TestObjectRepository.fromPrisma(obj)
    }

    async getAll(): Promise<TestObject[]> {
        const objs = await prisma.testObject.findMany()

        return objs.map(obj => TestObjectRepository.fromPrisma(obj))
    }
    
    async update(entity: TestObject): Promise<TestObject> {
        if (!entity.connected) {
            return null
        }
        
        const obj = await prisma.testObject.update({
            where: {
                id: entity.identifier
            },
            data: TestObjectRepository.toPrisma(entity)
        })

        return TestObjectRepository.fromPrisma(obj)
    }

    async delete(id: UUID): Promise<void> {
        await prisma.testChamber.delete({
            where: { id }
        })
    }
    
}