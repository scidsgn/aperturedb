import { TestChamberDTO } from "../dto/TestChamberDTO";
import { TestTrackDTO } from "../dto/TestTrackDTO";
import { ICrudRepositoryService } from "./ICrudRepositoryService";

export interface ITestTrackService extends ICrudRepositoryService<TestTrackDTO> {
    getChambers(id: string): Promise<TestChamberDTO[]>
    addChamber(id: string, chamberId: string): Promise<void>
    removeChamber(id: string, chamberId: string): Promise<void>
}