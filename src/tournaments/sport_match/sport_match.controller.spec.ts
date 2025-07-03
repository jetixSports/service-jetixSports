import { Test, TestingModule } from '@nestjs/testing';
import { SportMatchController } from './sport_match.controller';
import { SportMatchService } from './sport_match.service';

describe('SportMatchController', () => {
  let controller: SportMatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportMatchController],
      providers: [SportMatchService],
    }).compile();

    controller = module.get<SportMatchController>(SportMatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
