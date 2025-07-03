import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SportMatchService } from './sport_match.service';

@Controller('sport-match')
export class SportMatchController {
  constructor(private readonly sportMatchService: SportMatchService) {}

  
}
