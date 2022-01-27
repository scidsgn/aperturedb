import { Announcement } from "../domain/Announcement"
import { IEntityCrudRepository } from "./IEntityCrudRepository"

export interface IAnnouncementRepository extends IEntityCrudRepository<Announcement> {}