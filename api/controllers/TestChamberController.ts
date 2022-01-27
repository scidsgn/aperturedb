import { Router } from "express"
import { Controller } from "./Controller"

import { ITestChamberService } from "../../db/service/ITestChamberService"
import { TestChamberDTO } from "../../db/dto/TestChamberDTO"
import { IAuthUserService } from "../../db/service/IAuthUserService"
import { UserRoleDTO } from "../../db/dto/UserDTO"

export class TestChamberController extends Controller {
    name = "testChamber"

    constructor(private service: ITestChamberService, private auth: IAuthUserService) {
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

        // Create new
        router.post("/", async (req, res) => {
            try {
                await this.auth.ensureTokenRole(this.token(req), [UserRoleDTO.TestArchitect])
            } catch(e) {
                res.status(403).json({})
                return
            }
            try {
                res.status(200).json(
                    await this.service.create(
                        new TestChamberDTO(req.body)
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
                const user = await this.auth.ensureTokenRole(this.token(req), [UserRoleDTO.TestArchitect])
                await this.auth.ensureObjectOwner(user, this.service, "architectId", req.params.id)
            } catch(e) {
                res.status(403).json({})
                return
            }
            
            try {
                res.status(200).send(
                    await (await this.service.update(new TestChamberDTO({
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
                const user = await this.auth.ensureTokenRole(this.token(req), [UserRoleDTO.TestArchitect])
                await this.auth.ensureObjectOwner(user, this.service, "architectId", req.params.id)
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