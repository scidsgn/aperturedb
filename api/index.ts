import Router from "express-promise-router"
import bodyParser from "body-parser"
import cors from "cors"

import { TestChamberController } from "./controllers/TestChamberController"
import { TestChamberRepository } from "../db/repository/TestChamberRepository"
import { TestChamberService } from "../db/service/TestChamberService"

import { TestObjectController } from "./controllers/TestObjectController"
import { TestObjectService } from "../db/service/TestObjectService"
import { TestObjectRepository } from "../db/repository/TestObjectRepository"

import { TestTrackController } from "./controllers/TestTrackController"
import { TestTrackService } from "../db/service/TestTrackService"
import { TestTrackRepository } from "../db/repository/TestTrackRepository"

import { AnnouncementController } from "./controllers/AnnouncementController"
import { AnnouncementService } from "../db/service/AnnouncementService"
import { AnnouncementRepository } from "../db/repository/AnnouncementRepository"
import { AuthController } from "./controllers/AuthController"
import { AuthUserService } from "../db/service/AuthUserService"
import { UserRepository } from "../db/repository/UserRepository"
import { UserController } from "./controllers/UserController"
import { GeneralUserService } from "../db/service/GeneralUserService"

const router = Router()

router.use(bodyParser.json())
router.use(cors())

const authService = new AuthUserService(
    new UserRepository()
)

new AuthController(authService).attach(router)

new TestChamberController(
    new TestChamberService(
        new TestChamberRepository()
    ), authService
).attach(router)

new TestObjectController(
    new TestObjectService(
        new TestObjectRepository()
    ), authService
).attach(router)

new TestTrackController(
    new TestTrackService(
        new TestTrackRepository()
    ), authService
).attach(router)

new AnnouncementController(
    new AnnouncementService(
        new AnnouncementRepository()
    ), authService
).attach(router)

new UserController(
    new GeneralUserService(
        new UserRepository()
    ), authService
).attach(router)

export default router