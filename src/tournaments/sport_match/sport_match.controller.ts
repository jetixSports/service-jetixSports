import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SportMatchService } from './sport_match.service';
import { MatchFilterDto } from './dto/match-filter.dto';

@Controller('sport-match')
export class SportMatchController {
  constructor(private readonly sportMatchService: SportMatchService) {}
 @Post()
  async findAll( @Body() matchFilterDto: MatchFilterDto) {
    const body = JSON.parse(JSON.stringify(matchFilterDto));
    return this.sportMatchService.findAll(body);
  }
  @Post('findByIds')
  async findByIds( @Body() {_id}: {_id:string[]}) {
    return this.sportMatchService.findByIds(_id);
  }
}
