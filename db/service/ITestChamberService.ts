import { TestChamberDTO } from "../dto/TestChamberDTO";
import { ICrudRepositoryService } from "./ICrudRepositoryService";

export interface ITestChamberService extends ICrudRepositoryService<TestChamberDTO> {}