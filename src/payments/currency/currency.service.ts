import { BadRequestException, Injectable,  NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { CurrencyRepository } from './currency.repository';
import { FindCurrencyDto } from './dto/find-currency.dto';

@Injectable()
export class CurrencyService {
    constructor(private readonly currencyRepository: CurrencyRepository
    ) {}

    async create(createCurrencyDto: CreateCurrencyDto) {
        const existingByCode = await this.currencyRepository.existingCurrencyByCode(createCurrencyDto.code);
        if (existingByCode) {
            throw new ConflictException('Ya existe una moneda con este código');
        }

        const existingByName = await this.currencyRepository.existingCurrency({name: createCurrencyDto.name});
        if (existingByName) {
            throw new ConflictException('Ya existe una moneda con este nombre');
        }

        const savedCurrency = await this.currencyRepository.saveCurrency(createCurrencyDto);
        return savedCurrency;
    }

    async findAll() {
        const currencies = await this.currencyRepository.findAll();
        return {
            statusCode: 200,
            data: currencies,
            message: "Monedas obtenidas con éxito"
        };
    }

    async find(findCurrencyDto: FindCurrencyDto) {
        const currencies = await this.currencyRepository.find(findCurrencyDto);
        if (!currencies || currencies.length === 0) {
            throw new NotFoundException("Monedas no encontradas");
        }
        return {
            statusCode: 200,
            data: currencies,
            message: "Monedas obtenidas con éxito"
        };
    }

    async findOne(id: string) {
        const currency = await this.currencyRepository.findById(id);
        if (!currency) {
            throw new NotFoundException("Moneda no encontrada");
        }
        return {
            statusCode: 200,
            data: currency,
            message: "Moneda obtenida con éxito"
        };
    }

    async update(id: string, updateCurrencyDto: UpdateCurrencyDto) {
        if(updateCurrencyDto.code){
            throw new ForbiddenException("No se puede actualizar el codigo de una moneda")
        }
        // Verificar si la moneda existe
        const existingCurrency = await this.currencyRepository.findById(id);
        if (!existingCurrency) {
            throw new NotFoundException("Moneda no encontrada");
        }

        // Si se está actualizando el nombre, verificar que no exista otra moneda con el mismo nombre
        if (updateCurrencyDto.name && updateCurrencyDto.name !== existingCurrency.name) {
            const existingByName = await this.currencyRepository.existingCurrency({name: updateCurrencyDto.name});
            if (existingByName) {
                const foundCurrency = await this.currencyRepository.find({
                    name: updateCurrencyDto.name});
                if (foundCurrency.length > 0) {
                    throw new ConflictException('Ya existe otra moneda con este nombre');
                }
            }
        }

        const updateResult = await this.currencyRepository.update(id, updateCurrencyDto);
        
        if (updateResult.matchedCount < 1) {
            throw new NotFoundException("Moneda no encontrada");
        }
        if (updateResult.modifiedCount < 1) {
            throw new BadRequestException("No se realizaron cambios en la moneda");
        }

        return {
            statusCode: 200,
            message: "Moneda actualizada con éxito"
        };
    }

    async remove(id: string) {
        const existingCurrency = await this.currencyRepository.findById(id);
        if (!existingCurrency) {
            throw new NotFoundException("Moneda no encontrada");
        }

        const deleteResult = await this.currencyRepository.delete(id);
        
        if (deleteResult.matchedCount < 1) {
            throw new NotFoundException("Moneda no encontrada");
        }
        if (deleteResult.modifiedCount < 1) {
            throw new BadRequestException("La moneda ya fue eliminada anteriormente");
        }

        return {
            statusCode: 200,
            message: "Moneda eliminada con éxito"
        };
    }

    // Método para obtener una moneda por código (útil para payments_history)
    async findByCode(code: string) {
        const currency = await this.currencyRepository.find({ code, status: 'active' });
        if (!currency || currency.length === 0) {
            throw new NotFoundException(`Moneda con código ${code} no encontrada`);
        }
        return {statusCode:200,data:currency[0],message:"Moneda obtenida con exito"};
    }

    // Método para validar si una moneda existe por código
    async validateCurrencyCode(code: string): Promise<boolean> {
        return await this.currencyRepository.existingCurrencyByCode(code);
    }
}