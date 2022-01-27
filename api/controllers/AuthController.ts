import { Router } from "express"
import { IAuthUserService } from "../../db/service/IAuthUserService"
import { generate } from "../auth"
import { Controller } from "./Controller"

export class AuthController extends Controller {
    name = "auth"

    constructor(private service: IAuthUserService) {
        super()
    }

    routes(router: Router): void {
        // Log in
        router.post("/login", async (req, res) => {
            const { userName, password } = req.body

            if (typeof userName === "string" && typeof password === "string") {
                const user = await this.service.getFromLoginData(userName, password)
                if (!user) {
                    res.status(400).json({error: true})
                    return
                }

                const token = generate(user)

                res.status(200).json({token})
                return
            }

            res.status(400).json({error: true})
        })

        // Get my own data
        router.get("/me", async (req, res) => {
            const token = this.token(req)
            
            if (!token) {
                res.status(400).json({error: true})
            } else {
                res.status(200).json(
                    await (await this.service.getFromToken(token)).data
                )
            }
        })
    }
}