import { Router } from "express"
import { Controller } from "./Controller"

import { AnnouncementDTO } from "../../db/dto/AnnouncementDTO"
import { IAnnouncementService } from "../../db/service/IAnnouncementService"
import { IAuthUserService } from "../../db/service/IAuthUserService"
import { UserRoleDTO } from "../../db/dto/UserDTO"

export class AnnouncementController extends Controller {
    name = "announcement"

    constructor(private service: IAnnouncementService, private auth: IAuthUserService) {
        super()
    }

    routes(router: Router): void {
        // Get all
        router.get("/", async (req, res) => {
            try {
                res.status(200).json(
                    await (await this.service.getAll()).map(dto => dto.data)
                )
            } catch(e) {
                res.status(400).json({
                    error: true
                })
            }
        })

        // Get one
        router.get("/:id", async (req, res) => {
            try {
                res.status(200).json(
                    await (await this.service.get(req.params.id)).data
                )
            } catch(e) {
                res.status(400).json({
                    error: true
                })
            }
        })

        // Create new
        router.post("/", async (req, res) => {
            try {
                await this.auth.ensureTokenRole(this.token(req), [UserRoleDTO.Administrator])
            } catch(e) {
                res.status(403).json({})
                return
            }
            try {
                res.status(200).json(
                    await this.service.create(
                        new AnnouncementDTO(req.body)
                    )
                )
            } catch(e) {
                res.status(400).json({
                    error: true
                })
            }
        })

        // Update
        router.put("/:id", async (req, res) => {
            try {
                const user = await this.auth.ensureTokenRole(this.token(req), [UserRoleDTO.Administrator])
                await this.auth.ensureObjectOwner(user, this.service, "authorId", req.params.id)
            } catch(e) {
                res.status(403).json({})
                return
            }
            try {
                res.status(200).send(
                    await (await this.service.update(new AnnouncementDTO({
                        id: req.params.id,
                        ...req.body
                    }))).data
                )
            } catch(e) {
                res.status(400).json({
                    error: true
                })
            }
        })

        // Delete
        router.delete("/:id", async (req, res) => {
            try {
                const user = await this.auth.ensureTokenRole(this.token(req), [UserRoleDTO.Administrator])
                await this.auth.ensureObjectOwner(user, this.service, "authorId", req.params.id)
            } catch(e) {
                res.status(403).json({})
                return
            }
            try {
                await this.service.delete(req.params.id)
                res.status(200).send({})
            } catch(e) {
                res.status(400).json({
                    error: true
                })
            }
        })
    }
}