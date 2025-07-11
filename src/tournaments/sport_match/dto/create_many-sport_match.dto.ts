import { ApiProperty } from "@nestjs/swagger";
import { IsArray,  IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

class MatchSportDto {
     @ApiProperty({ 
        description: "Array de IDs de equipos que participan en el partido",
        example: ["id_equipo1", "id_equipo2"],
        minItems: 2,
        type: [String]
    })
    @IsArray()
    @Min(2)
    teams: string[]

    @ApiProperty({ 
        description: "Hora programada para el inicio del partido (timestamp en milisegundos)",
        example: 1678905600000,
        type: Number
    })
    @IsNumber()
    initMatch: number
}


export class CreateManySportMatchDto {
   @ApiProperty({ 
        description: "ID del torneo donde se crearán los partidos",
        example: "torneo123",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    _idTournament: string;

    @ApiProperty({ 
        description: "Tipo de deporte para estos partidos",
        example: "fútbol",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    typeSport: string;

    @ApiProperty({ 
        description: "Array de partidos a crear",
        type: [MatchSportDto],
        required: true
    })
    @IsArray()
    matchs: MatchSportDto[];

    @ApiProperty({ 
        description: "Opcional: Array de IDs de equipos que avanzan automáticamente a la siguiente ronda",
        example: ["id_equipo3", "id_equipo4"],
        type: [String],
        required: false
    })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    teamsPass?: string[];
}
