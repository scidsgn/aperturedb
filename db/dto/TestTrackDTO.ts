import { TestTrack } from "../../core/domain/TestTrack"
import { UUID } from "../../core/domain/types/UUID"
import { IDTO } from "./IDTO"

type TestTrackDTOProperties = {
    id?: string
    name: string
    managerId: string
}

export class TestTrackDTO implements IDTO {
    constructor(public data: TestTrackDTOProperties) {}

    public static fromDomain(entity: TestTrack) {
        return new TestTrackDTO({
            id: entity.identifier,
            name: entity.name,
            managerId: entity.managerId
        })
    }

    public static toDomain(dto: TestTrackDTO) {
        return TestTrack.create({
            id: dto.data.id as UUID,
            name: dto.data.name,
            managerId: dto.data.managerId as UUID
        })
    }
}