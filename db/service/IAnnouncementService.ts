import { AnnouncementDTO } from "../dto/AnnouncementDTO"
import { ICrudRepositoryService } from "./ICrudRepositoryService"

export interface IAnnouncementService extends ICrudRepositoryService<AnnouncementDTO> {}