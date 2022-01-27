import { prisma } from ".."
import { User, UserRole } from "../../core/domain/User"
import { IUserRepository } from "../../core/repository/IUserRepository"
import { User as PrismaUser } from "@prisma/client"
import { UUID } from "../../core/domain/types/UUID"

export class UserRepository implements IUserRepository {
    static toPrisma(entity: User) {
        return {
            userName: entity.userName,
            displayName: entity.displayName,
            passwordHash: entity.passwordHash,
            role: entity.role
        }
    }

    static fromPrisma(obj: PrismaUser) {
        return User.create({
            id: obj.id,
            userName: obj.userName,
            displayName: obj.displayName,
            passwordHash: obj.passwordHash,
            role: obj.role as UserRole
        })
    }

    async create(entity: User): Promise<User> {
        const obj = await prisma.user.create({
            data: UserRepository.toPrisma(entity)
        })

        return UserRepository.fromPrisma(obj)
    }

    async get(id: UUID): Promise<User> {
        const obj = await prisma.user.findFirst({
            where: {
                id: id
            }
        })
        if (!obj) {
            return null
        }

        return UserRepository.fromPrisma(obj)
    }

    async getByUsername(userName: string): Promise<User> {
        const obj = await prisma.user.findFirst({
            where: {
                userName: userName
            }
        })
        if (!obj) {
            return null
        }

        return UserRepository.fromPrisma(obj)
    }

    async getAll(): Promise<User[]> {
        const objs = await prisma.user.findMany()

        return objs.map(obj => UserRepository.fromPrisma(obj))
    }
    
    async update(entity: User): Promise<User> {
        if (!entity.connected) {
            return null
        }
        
        const obj = await prisma.user.update({
            where: {
                id: entity.identifier
            },
            data: UserRepository.toPrisma(entity)
        })

        return UserRepository.fromPrisma(obj)
    }

    async delete(id: UUID): Promise<void> {
        await prisma.testChamber.delete({
            where: { id }
        })
    }
}