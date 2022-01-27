import { TestObject } from "../domain/TestObject";
import { IEntityCrudRepository } from "./IEntityCrudRepository";

export interface ITestObjectRepository extends IEntityCrudRepository<TestObject> {}