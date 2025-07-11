import { Injectable } from '@nestjs/common';
import { CreateManySportMatchRepositoryDto } from './dto/create_many-repository-sport_match.dto';
import { SportMatch } from './sport_match.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MatchFilterDto } from './dto/match-filter.dto';

@Injectable()
export class SportMatchRepository {
  constructor(
    @InjectModel(SportMatch.name, process.env.TOURNAMENTS_DB)
    private sportMatchModel: Model<SportMatch>
  ) { }
  async createMany(createSportMatchDto: CreateManySportMatchRepositoryDto[]) {
    const newsMatch = await this.sportMatchModel.insertMany(createSportMatchDto)
    return newsMatch;
  }
  async exist(_id: string) {
    const countMatch = await this.sportMatchModel.countDocuments({ _id })
    return countMatch > 0
  }
  async closeMatch(update: any,) {
    const { matchedCount, modifiedCount } = await this.sportMatchModel.bulkWrite(update)
    return { matchedCount, modifiedCount }
  }
  async findAll(matchFilterDto: MatchFilterDto) {
    const cleanFilter = Object.fromEntries(
      Object.entries(matchFilterDto).filter(([_, v]) => v != null)
    );
    return this.sportMatchModel.find(cleanFilter).exec();
  }
  async countFinishedMatch(_id:string[]){
    return await this.sportMatchModel.countDocuments({_id:{$in:_id},status:"finished"})
  }
  async saveStream(_id:string,_idTeam:string,_idStream:string){
    return await this.sportMatchModel.updateOne({_id,"teams._idTeam":_idTeam},{$set:{"teams.$._idStream":_idStream}})
  }
  async findByIds(_id:string[]){
    return await this.sportMatchModel.find({_id:{$in:_id}})
  }
}
