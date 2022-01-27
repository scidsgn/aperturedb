import { TestChamber } from "../domain/TestChamber";
import { TestTrack } from "../domain/TestTrack";
import { UUID } from "../domain/types/UUID";
import { IEntityCrudRepository } from "./IEntityCrudRepository";

export interface ITestTrackRepository extends IEntityCrudRepository<TestTrack> {
    getChambers(id: UUID): Promise<TestChamber[]>
    addChamber(id: UUID, chamberId: UUID): Promise<void>
    removeChamber(id: UUID, chamberId: UUID): Promise<void>
}