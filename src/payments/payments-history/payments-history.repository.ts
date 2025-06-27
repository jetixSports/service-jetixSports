import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PaymentsHistory } from "./payments-history.schema";
import { RepositoryCreateDto } from "./dto/repository-create-payments.dto";

@Injectable()
export class PaymentsHistoryRepository {
  constructor(
    @InjectModel(PaymentsHistory.name, process.env.PAYMENTS_DB)
    private paymentsHistoryModel: Model<PaymentsHistory>
  ) {}
  async existCode(transactionCode: string) {
    const countDocuments = await this.paymentsHistoryModel.countDocuments({
      transactionCode,
    });
    return countDocuments > 0;
  }
  async create(repositoryCreateDto: RepositoryCreateDto) {
    const newHistory = new this.paymentsHistoryModel(repositoryCreateDto);
    const savedHistory = await newHistory.save();
    return {
      statusCode: 200,
      message: "Pago guardado con exito",
      data: savedHistory,
    };
  }
  async findById(_id: string) {
    return await this.paymentsHistoryModel.findOne({ _id });
  }
  async changeStatus(_id: string, status: string) {
    return await this.paymentsHistoryModel.updateOne(
      { _id },
      { $set: { status } }
    );
  }
}
