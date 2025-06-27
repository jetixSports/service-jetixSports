import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsHistoryService } from './payments-history.service';

describe('PaymentsHistoryService', () => {
  let service: PaymentsHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsHistoryService],
    }).compile();

    service = module.get<PaymentsHistoryService>(PaymentsHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
