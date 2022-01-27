import { User } from "../domain/User";
import { IEntityCrudRepository } from "./IEntityCrudRepository";

export interface IUserRepository extends IEntityCrudRepository<User> {
    getByUsername(userName: string): Promise<User>
}