import { InjectModel } from "@nestjs/mongoose";
import { Stream } from "./stream.schema";
import { Model } from "mongoose";
import { FilterStreamDto } from "./dto/filter-stream.dto";
import { CreateStreamDto } from "./dto/create-stream.dto";
import { UpdateStreamDto } from "./dto/update-stream.dto";

export class StreamRepository {
  constructor(
    @InjectModel(Stream.name, process.env.TOURNAMENTS_DB)
    private streamModel: Model<Stream>
  ) {}
  async findAll(filterStreamDto: FilterStreamDto) {
    const cleanFilter = Object.fromEntries(
      Object.entries(filterStreamDto).filter(([_, v]) => v != null)
    );
    return this.streamModel.find(cleanFilter).exec();
  }
  async saveStream(createSportMatchDto: CreateStreamDto) {
    const newStream = new this.streamModel(createSportMatchDto);
    const savedStream = await newStream.save();
    return {
      statusCode: 200,
      message: "Pago guardado con exito",
      data: savedStream,
    };
  }
  async update({ _id, _idUser, ...updateData }: UpdateStreamDto) {
    const data = JSON.parse(JSON.stringify(updateData));
    return await this.streamModel.updateOne({ _id, _idUser }, { $set: data });
  }
}
