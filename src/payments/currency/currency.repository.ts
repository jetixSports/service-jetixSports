import { Injectable } from "@nestjs/common";
import { Currency } from "./currency.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCurrencyDto } from "./dto/create-currency.dto";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";
import { FindCurrencyDto } from "./dto/find-currency.dto";

@Injectable()
export class CurrencyRepository {
    constructor(
        @InjectModel(Currency.name, process.env.CURRENCY_COLLECTION)
        private currencyModel: Model<Currency>
    ) {}

    async saveCurrency(createCurrencyDto: CreateCurrencyDto) {
        const newCurrency = new this.currencyModel(createCurrencyDto);
        const currency = await newCurrency.save();
        return {
            statusCode: 200,
            message: "Moneda guardada con éxito",
            data: currency,
        };
    }

    async existingCurrency(findCurrencyDto: FindCurrencyDto) {
        const filter = JSON.parse(JSON.stringify(findCurrencyDto));
        const currencyCount = await this.currencyModel.countDocuments({status: { $ne: 'delete' },...filter});
        return currencyCount > 0;
    }

    async existingCurrencyByCode(code: string, excludeId?: string) {
        const filter: any = { code, status: { $ne: 'delete' } };
        if (excludeId) {filter._id = { $ne: excludeId }; }
        const currencyCount = await this.currencyModel.countDocuments(filter);
        return currencyCount > 0;
    }

    async delete(_id: string) {
        return this.currencyModel.updateOne({ _id },{ $set: { status: "delete", updatedAt: new Date()}});
    }

    async find(findCurrencyDto: FindCurrencyDto) {
        const filter = JSON.parse(JSON.stringify(findCurrencyDto));
        return this.currencyModel.find({ status: { $ne: 'delete' },...filter }).sort({ createdAt: -1 });
    }

    async findAll() {
        return this.currencyModel.find({ status: 'active'}).sort({ name: 1 });
    }

    async findById(_id: string) {
        return this.currencyModel.findOne({_id, status: { $ne: 'delete' }});
    }

    async update(_id: string, updateCurrencyDto: UpdateCurrencyDto) {
        const newData = JSON.parse(JSON.stringify(updateCurrencyDto));
        newData.updatedAt = new Date();
        
        return await this.currencyModel.updateOne( { _id, status: { $ne: 'delete'}},{ $set: newData });
    }
}