import { Test, TestingModule } from '@nestjs/testing';
import { SportMatchService } from './sport_match.service';

describe('SportMatchService', () => {
  let service: SportMatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportMatchService],
    }).compile();

    service = module.get<SportMatchService>(SportMatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
