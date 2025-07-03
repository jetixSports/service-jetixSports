import { ApiProperty } from "@nestjs/swagger";
import { IsArray,  IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

class MatchSportDto {
    @ApiProperty({ description: "Tournament ID associated with the payment" })
    @IsArray()
    @Min(2)
    teams: string[]

    @ApiProperty({ description: "Tournament ID associated with the payment" })
    @IsNumber()
    initMatch: number
}


export class CreateManySportMatchDto {
    @ApiProperty({ description: "Tournament ID associated with the payment" })
    @IsString()
    @IsNotEmpty()
    _idTournament: string;

    @ApiProperty({ description: "Tournament ID associated with the payment" })
    @IsString()
    @IsNotEmpty()
    typeSport: string;


    @ApiProperty({ description: "Tournament ID associated with the payment" })
    @IsArray()
    matchs: MatchSportDto[];

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    teamsPass?: string[];
}
