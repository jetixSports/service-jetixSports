
import {
    Injectable,
} from "@nestjs/common";
import { PaymentsDetails } from "./payments-details.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreatePaymentsDetailDto } from "./dto/create-payments-detail.dto";
import { UpdatePaymentsDetailDto } from "./dto/update-payments-detail.dto";
import { FindPaymentsDetailDto } from "./dto/find-payments-detail.dto";

@Injectable()
export class PaymentsDetailsRepository {
    constructor(
        @InjectModel(PaymentsDetails.name, process.env.PAYMENTS_DB)
        private paymentsDetailsModel: Model<PaymentsDetails>
    ) {}
    async savePaymentDetail(createPaymentsDetailDto: CreatePaymentsDetailDto) {
       const newPaymentDetail = new this.paymentsDetailsModel(createPaymentsDetailDto);
        const user = await newPaymentDetail.save();
        return {
            statusCode: 200,
            message: "Detalles de pago guardado con exito",
            data: user,
        };
      }
    async existingPaymentDetail(findPaymentsDetailDto:FindPaymentsDetailDto){
        const filter=JSON.parse(JSON.stringify(findPaymentsDetailDto))
        const paymentsCount=await this.paymentsDetailsModel.countDocuments({status:{$ne:'delete'},...filter})
        return paymentsCount>0
    }
    async delete(_id:string){
        return this.paymentsDetailsModel.updateOne({_id},{
            $set:{status:"delete"}
        })
    }
    async find(findPaymentsDetailDto:FindPaymentsDetailDto){
        const filter=JSON.parse(JSON.stringify(findPaymentsDetailDto))
        return this.paymentsDetailsModel.find({status:{$ne:'delete'},...filter})
    }
    async update(_id:string,updatePaymentsDetailDto:UpdatePaymentsDetailDto){
        const newData=JSON.parse(JSON.stringify(updatePaymentsDetailDto))   
        return await this.paymentsDetailsModel.updateOne({_id,status:'active'},{
            $set:newData
        })
    }
}
