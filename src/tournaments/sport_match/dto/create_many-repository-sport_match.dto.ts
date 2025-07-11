import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

class TeamsMatchSportDto {
    @ApiProperty({ description: "Tournament ID associated with the payment" })
    @IsArray()
    @Min(1)
    playersMembers: string[]

    @ApiProperty({ description: "Tournament ID associated with the payment" })
    @IsString()
    _idTeam: string
}


export class CreateManySportMatchRepositoryDto {
    @ApiProperty({ description: "Tournament ID associated with the payment" })
    @IsString()
    @IsNotEmpty()
    _idTournament: string;

    @ApiProperty({ description: "Tournament ID associated with the payment" })
    @IsString()
    @IsNotEmpty()
    typeSport: string;

    @ApiProperty({ description: "Tournament ID associated with the payment" })
    @IsNumber()
    @IsNotEmpty()
    initMatch: Number;

    @ApiProperty({ description: "Tournament ID associated with the payment" })
    @IsArray()
    @Min(2)
    teams: TeamsMatchSportDto[];
}
