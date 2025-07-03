import { Injectable } from '@nestjs/common';
import { CreateManySportMatchRepositoryDto } from './dto/create_many-repository-sport_match.dto copy';
import { SportMatch } from './sport_match.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SportMatchRepository {
  constructor(
      @InjectModel(SportMatch.name, process.env.TOURNAMENTS_DB)
      private sportMatchModel: Model<SportMatch>
    ) {}
  async createMany(createSportMatchDto: CreateManySportMatchRepositoryDto[]) {
    const newsMatch=await this.sportMatchModel.insertMany(createSportMatchDto)
    return newsMatch;
  }

}
