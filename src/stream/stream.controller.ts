import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { StreamService } from './stream.service';
import { CreateStreamTournamentDto } from './dto/create-stream-tournament.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { FilterStreamDto } from './dto/filter-stream.dto';
import { CreateStreamMatchDto } from './dto/create-stream-match.dto';
import { Auth } from 'src/decorators/auth/auth.decorator';

@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) { }

  @Auth('Auth')
  @Post("tournament")
  createInTour(@Body() createStreamTournamentDto: CreateStreamTournamentDto) {
    return this.streamService.createInTour(createStreamTournamentDto);
  }

  @Auth('Auth')
  @Post("match")
  createInMatch(@Body() createStreamMatchDto: CreateStreamMatchDto) {
    return this.streamService.createInMatch(createStreamMatchDto);
  }


  @Auth('Auth')
  @Put()
  update(@Body() updateStreamDto: UpdateStreamDto) {
    return this.streamService.update(updateStreamDto);
  }

  @Auth('Auth')
  @Post("filter")
  findAll(@Body() filterStreamDto: FilterStreamDto) {
    return this.streamService.findAll(filterStreamDto);
  }


}
