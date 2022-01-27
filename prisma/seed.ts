import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function seed() {
    const cave = await prisma.user.create({
        data: {
            userName: "cjohnson",
            displayName: "Cave Johnson",
            passwordHash: "$2a$13$H4BIt20jF0rk3diaxUFFsejZSkSAuLTpEbaWMOIXVl8HRGPHLAi/q",
            role: "ADMINISTRATOR"
        }
    })
    const dave = await prisma.user.create({
        data: {
            userName: "djohnson",
            displayName: "Dave Johnson",
            passwordHash: "$2a$13$H4BIt20jF0rk3diaxUFFsejZSkSAuLTpEbaWMOIXVl8HRGPHLAi/q",
            role: "TESTARCHITECT"
        }
    })
    const bave = await prisma.user.create({
        data: {
            userName: "bjohnson",
            displayName: "Bave Johnson",
            passwordHash: "$2a$13$H4BIt20jF0rk3diaxUFFsejZSkSAuLTpEbaWMOIXVl8HRGPHLAi/q",
            role: "TESTTRACKMANAGER"
        }
    })

    const portalgun = await prisma.testObject.create({
        data: {
            name: "Portal Gun"
        }
    })

    const ch1 = await prisma.testChamber.create({
        data: {
            architectId: dave.id,
            name: "Test",
            design: {},
            createdAt: new Date(),
            modifiedAt: new Date(),
            testObjectId: portalgun.id
        }
    })

    await prisma.testTrack.create({
        data: {
            name: "PGTC1",
            managerId: bave.id
        }
    })

    await prisma.announcement.create({
        data: {
            title: "GET BACK TO WORK",
            authorId: cave.id,
            contents: "you heard me",
            createdAt: new Date()
        }
    })
}

seed()