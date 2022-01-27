import { Router } from "express"
import { IAuthUserService } from "../../db/service/IAuthUserService"
import { IGeneralUserService } from "../../db/service/IGeneralUserService"
import { Controller } from "./Controller"

export class UserController extends Controller {
    name = "user"

    constructor(private service: IGeneralUserService, private auth: IAuthUserService) {
        super()
    }

    routes(router: Router): void {
        // Get by username
        router.get("/userName/:username", async (req, res) => {
            try {
                await this.auth.ensureTokenRole(this.token(req), [])
            } catch(e) {
                res.status(403).json({})
                return
            }

            try {
                res.status(200).json(
                    await (
                        await this.service.getByUsername(req.params.username)
                    ).data
                )
            } catch(e) {
                res.status(400).json({
                    error: true
                })
            }
        })
        
        // Get by id
        router.get("/:id", async (req, res) => {
            try {
                await this.auth.ensureTokenRole(this.token(req), [])
            } catch(e) {
                res.status(403).json({})
                return
            }

            try {
                res.status(200).json(
                    await (
                        await this.service.getById(req.params.id)
                    ).data
                )
            } catch(e) {
                res.status(400).json({
                    error: true
                })
            }
        })
        
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
    }
}