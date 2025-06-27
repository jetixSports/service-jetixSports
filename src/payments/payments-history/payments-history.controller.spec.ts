import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsHistoryController } from './payments-history.controller';
import { PaymentsHistoryService } from './payments-history.service';

describe('PaymentsHistoryController', () => {
  let controller: PaymentsHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsHistoryController],
      providers: [PaymentsHistoryService],
    }).compile();

    controller = module.get<PaymentsHistoryController>(PaymentsHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
