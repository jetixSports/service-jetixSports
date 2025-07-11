import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTournamentDto } from "./dto/create-tournaments.dto";
import { Tournaments } from "./tournaments.schema";
import { AddPayTeamTournamentDto } from "./dto/add-pay-team-tournament.dto";
import { VerifyPayTeamTournamentDto } from "./dto/verify-pay-team-tournament.dto";
import { AddTeamDto } from "./dto/add-team.dto";
import { FilterTournamentDto } from "./dto/filter-tournament.dto";
import { CreateRoundDto } from "./dto/create-round.dto";

@Injectable()
export class TournamentsRepository {
  constructor(
    @InjectModel(Tournaments.name, process.env.TOURNAMENTS_DB)
    private tournamentsModel: Model<Tournaments>
  ) {}
  async create(createTournamentDto: CreateTournamentDto) {
    const newHistory = new this.tournamentsModel(createTournamentDto);
    const savedHistory = await newHistory.save();
    return {
      statusCode: 200,
      message: "Torneo guardado con exito",
      data: savedHistory,
    };
  }
  async findById(id: string) {
    return await this.tournamentsModel.findOne({
      _id: id,
      status: { $ne: "delete" },
    });
  }
  async addPayTeam({
    _idPayment,
    _idTeam,
    _idTournament,
  }: AddPayTeamTournamentDto) {
    return await this.tournamentsModel.updateOne(
      { _id: _idTournament, "teams._idTeam": _idTeam },
      { $set: { ["teams.$._idPayments"]: _idPayment } }
    );
  }
  async verifyPayTeam({
    _idPayment,
    _idTournament,
    _idTeam,
  }: VerifyPayTeamTournamentDto) {
    const teamQuery = _idTeam ? { "teams._idTeam": _idTeam } : {};
    return await this.tournamentsModel.updateOne(
      {
        _id: _idTournament,
        "teams._idPayments": _idPayment,
        ...teamQuery,
      },
      { $set: { ["teams.$.status"]: "verified" } }
    );
  }
  async deniedPayTeam({
    _idPayment,
    _idTournament,
    _idTeam,
  }: VerifyPayTeamTournamentDto) {
    const teamQuery = _idTeam ? { "teams._idTeam": _idTeam } : {};
    return await this.tournamentsModel.updateOne(
      {
        _id: _idTournament,
        "teams._idPayments": _idPayment,
        ...teamQuery,
      },
      { $unset: { ["teams.$._idPayments"]: "" } }
    );
  }
  async addPay(_idPayment: string, _idTournament: string) {
    return await this.tournamentsModel.updateOne(
      { _id: _idTournament },
      { $push: { _idPayments: _idPayment } }
    );
  }
  async addTeam(_idTournament: string, addTeamDto: AddTeamDto) {
    return await this.tournamentsModel.updateOne(
      { _id: _idTournament },
      { $push: { teams: { ...addTeamDto, status: "pending" } } }
    );
  }
  async countTeamsTournament(_idTournament: string) {
    const teams = await this.tournamentsModel.aggregate([
      {
        $match: {
          _id: _idTournament,
        },
      },
      {
        $project: {
          teams: {
            $filter: {
              input: "$teams",
              as: "item",
              cond: { $ne: ["$$item.status", "cancel"] },
            },
          },
        },
      },
    ]);
    return teams.length > 0 ? teams[0].teams.length : 0;
  }

  async filter(filterTournamentDto: FilterTournamentDto) {
    const { teams, ...dataFilter } = JSON.parse(
      JSON.stringify(filterTournamentDto)
    );
    let filter = { ...dataFilter };
    if (teams) {
      Object.entries(teams).forEach(([key, value]) => {
        filter["teams." + key] = value;
      });
    }
    return await this.tournamentsModel.find(filter);
  }
  async addUsersTeam(_id: string, users: string[]) {
    return await this.tournamentsModel.updateOne(
      { _id },
      {
        $addToSet: {
          _idUsers: { $each: users },
        },
      }
    );
  }
  async createRound(_id: string, createRoundDto: CreateRoundDto) {
    return await this.tournamentsModel.updateOne(
      { _id },
      { $push: { rounds: createRoundDto } }
    );
  }
  async existMatchTour(_id: string, _idMatch: string) {
    const count = await this.tournamentsModel.countDocuments({
      _id,
      "rounds._idMatchs": _idMatch,
    });
    return count > 0;
  }

  async finishedRound(_id: string, nRound: number) {
    return await this.tournamentsModel.updateOne(
      { _id, "rounds.nRound": nRound },
      { $set: { "rounds.$.status": "finished" } }
    );
  }
  async addTeamWinner(_id: string, nRound: number, _idTeamWinner: string) {
    return await this.tournamentsModel.updateOne(
      { _id, "rounds.nRound": nRound },
      { $push: { "rounds.$.teamsWinners": _idTeamWinner } }
    );
  }
  async saveStream(_id: string, _idStream: string) {
    return await this.tournamentsModel.updateOne(
      { _id },
      { $set: { _idStream } }
    );
  }
}
