import { JwtPayload, sign, verify } from "jsonwebtoken"
import { UserDTO } from "../../db/dto/UserDTO"

const tokenSecret = process.env.JWT_SECRET

export function generate(user: UserDTO) {
    return sign({
        userName: user.data.userName
    }, tokenSecret, {
        expiresIn: "15m"
    })
}

export function check(token: string): JwtPayload {
    try {
        const jwt = verify(token, tokenSecret)

        return jwt as JwtPayload
    } catch(e) {
        return null
    }
}