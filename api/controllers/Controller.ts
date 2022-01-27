import e, { Request } from "express"
import Router from "express-promise-router"
import { check } from "../auth"

export abstract class Controller {
    abstract name: string
    abstract routes(router: e.Router): void

    public attach(router: e.Router) {
        const controllerRouter = Router()

        this.routes(controllerRouter)

        router.use(`/${this.name}`, controllerRouter)
    }

    protected token(request: Request) {
        const auth = request.headers["authorization"]
        const tokenString = auth && auth.split(" ")[1]

        return check(tokenString)
    }
}