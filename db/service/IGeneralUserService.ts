import { UserDTO } from "../dto/UserDTO"

export interface IGeneralUserService {
    getAll(): Promise<UserDTO[]>
    getById(id: string): Promise<UserDTO>
    getByUsername(userName: string): Promise<UserDTO>
}