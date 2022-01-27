import { TestChamber } from "../domain/TestChamber";
import { IEntityCrudRepository } from "./IEntityCrudRepository";

export interface ITestChamberRepository extends IEntityCrudRepository<TestChamber> {}