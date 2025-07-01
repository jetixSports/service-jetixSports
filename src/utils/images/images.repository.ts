import {
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { Images } from "./images.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { promises as fs } from 'fs';
import * as path from 'path';
@Injectable()
export class ImagesRepository {
    private readonly uploadPath = './';
    private readonly maxFileSize = 5 * 1024 * 1024;
    constructor(
        @InjectModel(Images.name, process.env.UTILS_DB)
        private imagesModel: Model<Images>
    ) { }
    validateImage(file: Express.Multer.File) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype))
            return { statusCode: 400, message: "Tipo de archivo no permitido" }

        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const fileExt = path.extname(file.originalname).toLowerCase();
        if (!validExtensions.includes(fileExt))
            return { statusCode: 400, message: "Extensión de archivo no válida" }

        if (file.size > this.maxFileSize)
            return { statusCode: 400, message: `El archivo excede el tamaño máximo de ${this.maxFileSize / (1024 * 1024)}MB` }

        return { statusCode: 200, message: "Imagen validad con exito" }
    }
    async saveImage(_idUser: string, type: string) {
        const newImage = new this.imagesModel({ _idUser, type });
        const savedImage = await newImage.save();
        return {
            statusCode: 200,
            message: "Imagen guardada con exito",
            data: savedImage,
        };
    }
    async saveFile({ fileName, file, imgPath, }) {
        const uploadDir = path.join(process.cwd(), 'uploads', imgPath);
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }
        const ext = path.extname(file.originalname);
        const filename = `${fileName}${ext}`;
        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, file.buffer);
        return true
    }
    async getImage(type: string, id: string) {
        const uploadsDir = path.join(process.cwd(), 'uploads', type);
        const files = await fs.readdir(uploadsDir);

        const foundFile = files.find(file => {
            const nameWithoutExt = file.split('.')[0];
            return nameWithoutExt === id;
        });
        if (!foundFile)
            return false

        try {
            const filePath = path.join(uploadsDir, foundFile);
            const fileHandle = await fs.open(filePath, 'r');
            return {
                stream: fileHandle,
                extends:filePath.split('.')[1]
            };
        } catch (error) {
            return false

        }
    }
    async existImage(filter:{_id?:string,type?:string}){
        const countImage=await this.imagesModel.countDocuments({...filter,status:{$ne:"delete"}})
        return countImage>0
    }
}
