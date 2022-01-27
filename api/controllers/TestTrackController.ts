import { Router } from "express"
import { Controller } from "./Controller"

import { ITestTrackService } from "../../db/service/ITestTrackService"
import { TestTrackDTO } from "../../db/dto/TestTrackDTO"
import { IAuthUserService } from "../../db/service/IAuthUserService"
import { UserRoleDTO } from "../../db/dto/UserDTO"

export class TestTrackController extends Controller {
    name = "testTrack"

    constructor(private service: ITestTrackService, private auth: IAuthUserService) {
        super()
    }

    routes(router: Router): void {
        // Get all
        router.get("/", async (req, res) => {
            try {
                await this.auth.ensureTokenRole(this.token(req), [])
            } catch(e) {
                res.status(403).json({})
                return
            }
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
                await this.auth.ensureTokenRole(this.token(req), [])
            } catch(e) {
                res.status(403).json({})
                return
            }
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

        // Get chambers
        router.get("/:id/chambers", async (req, res) => {
            try {
                await this.auth.ensureTokenRole(this.token(req), [])
            } catch(e) {
                res.status(403).json({})
                return
            }
            try {
                res.status(200).json(
                    await (await this.service.getChambers(req.params.id)).map(dto => dto.data)
                )
            } catch(e) {
                res.status(400).json({
                    error: true
                })
            }
        })

        // Add chamber
        router.post("/:id/chambers/:chamber", async (req, res) => {
            try {
                const user = await this.auth.ensureTokenRole(this.token(req), [UserRoleDTO.TestTrackManager])
                await this.auth.ensureObjectOwner(user, this.service, "managerId", req.params.id)
            } catch(e) {
                res.status(403).json({})
                return
            }
            
            try {
                await this.service.addChamber(
                    req.params.id, req.params.chamber
                )
                res.status(200).send({})
            } catch(e) {
                res.status(400).json({
                    error: true
                })
            }
        })

        // Delete chamber
        router.delete("/:id/chambers/:chamber", async (req, res) => {
            try {
                const user = await this.auth.ensureTokenRole(this.token(req), [UserRoleDTO.TestTrackManager])
                await this.auth.ensureObjectOwner(user, this.service, "managerId", req.params.id)
            } catch(e) {
                res.status(403).json({})
                return
            }

            try {
                await this.service.removeChamber(
                    req.params.id, req.params.chamber
                )
                res.status(200).send({})
            } catch(e) {
                res.status(400).json({
                    error: true
                })
            }
        })

        // Create new
        router.post("/", async (req, res) => {
            try {
                await this.auth.ensureTokenRole(this.token(req), [UserRoleDTO.TestTrackManager])
            } catch(e) {
                res.status(403).json({})
                return
            }
            try {
                res.status(200).json(
                    await this.service.create(
                        new TestTrackDTO(req.body)
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
                const user = await this.auth.ensureTokenRole(this.token(req), [UserRoleDTO.TestTrackManager])
                await this.auth.ensureObjectOwner(user, this.service, "managerId", req.params.id)
            } catch(e) {
                res.status(403).json({})
                return
            }

            try {
                res.status(200).send(
                    await (await this.service.update(new TestTrackDTO({
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
                const user = await this.auth.ensureTokenRole(this.token(req), [UserRoleDTO.TestTrackManager])
                await this.auth.ensureObjectOwner(user, this.service, "managerId", req.params.id)
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