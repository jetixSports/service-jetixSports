// src/tournaments/schemas/tournament.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true,
    collection: 'tournaments'
})
export class Tournaments extends Document {
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, type: String })
    description: string;

    @Prop({ type: String })
    _idImg: string;

    @Prop({ required: true, type: String })
    typeSport: string;

    @Prop({ required: true, type: [String], default: [] })
    _idPayDetails: string;

    @Prop({ required: true, type: String, default: "active",enum:["active","inactive","delete"] })
    status: string;

    @Prop({
        type: [{
            nRound: { type: Number, required: true },
            _idMatchs: { type: [String], default: [] },
            teamsWinners: { type: [String], default: [] },
            teamsMatches: { type: [String], default: [] },
            status: { type: String, required: true, default: "active", enum: ["active", "finished", "delete"] },
        }],
        default: []
    })
    rounds: {
        nRound: number,
        _idMatchs: string[],
        teamsWinners: string[],
        teamsMatches: string[],
        status: string
    }[];

    @Prop({ type: [String], default: [] })
    _idPayments: string[];

    @Prop({ type: String, required: true })
    _idReferee: string;

    @Prop({ type: [String], default: [] })
    _idUsers: string[];

    @Prop({
        type: [{
            _idTeam: { type: String, required: true },
            status: { type: String, required: true, enum: ["verified", "pending", "cancel"], default: "pending" },
            playersMembers: { type: [String], default: [] },
            _idPayments: { type: String, required: true },
            _idLeader: { type: String, required: true },
        }],
        default: []
    })
    teams: {
        _idTeam: string;
        _idPayments: string;
        _idLeader: string;
        status: string;
        playersMembers: string[];
    }[];

    @Prop({ required: true, type: Number })
    quotas: number;

    @Prop({ required: true, type: Number })
    teamSpace: number;

    @Prop({ required: true, type: Date })
    startDate: Date;

    @Prop({ required: true, type: Date })
    endDate: Date;
}

export const TournamentsSchema = SchemaFactory.createForClass(Tournaments);