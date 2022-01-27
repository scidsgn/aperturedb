import { TestObjectDTO } from "../dto/TestObjectDTO";
import { ICrudRepositoryService } from "./ICrudRepositoryService"

export interface ITestObjectService extends ICrudRepositoryService<TestObjectDTO> {}