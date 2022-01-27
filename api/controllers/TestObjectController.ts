import { Router } from "express"
import { Controller } from "./Controller"

import { ITestObjectService } from "../../db/service/ITestObjectService"
import { TestObjectDTO } from "../../db/dto/TestObjectDTO"
import { IAuthUserService } from "../../db/service/IAuthUserService"
import { UserRoleDTO } from "../../db/dto/UserDTO"


export class TestObjectController extends Controller {
    name = "testObject"

    constructor(private service: ITestObjectService, private auth: IAuthUserService) {
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
                await this.auth.ensureTokenRole(this.token(req), [UserRoleDTO.Administrator])
            } catch(e) {
                res.status(403).json({})
                return
            }
            try {
                res.status(200).json(
                    await (await this.service.create(
                        new TestObjectDTO(req.body)
                    )).data
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
                await this.auth.ensureTokenRole(this.token(req), [UserRoleDTO.Administrator])
            } catch(e) {
                res.status(403).json({})
                return
            }
            try {
                res.status(200).send(
                    await (await this.service.update(new TestObjectDTO({
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
                await this.auth.ensureTokenRole(this.token(req), [UserRoleDTO.Administrator])
            } catch(e) {
                res.status(403).json({})
                return
            }
            try {
                await this.service.delete(req.params.id)
                res.status(200).send({})
            } catch(e) {
                console.log(e)
                res.status(400).json({
                    error: true
                })
            }
        })
    }
}