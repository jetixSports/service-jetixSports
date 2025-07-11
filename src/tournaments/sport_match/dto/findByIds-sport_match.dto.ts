import { ApiProperty } from "@nestjs/swagger";

export class FindByIdsDto {
  @ApiProperty({
    description: 'Array de IDs de los encuentros a buscar',
    type: [String],
    example: ['65d4f5a9e1a8c6a9c9b3b3b1', '65d4f5a9e1a8c6a9c9b3b3b2'],
    required: true
  })
  _id: string[];
}