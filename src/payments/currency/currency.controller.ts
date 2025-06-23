import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { FindCurrencyDto } from './dto/find-currency.dto';
import { Auth } from 'src/decorators/auth/auth.decorator';

@Controller('currency')
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService) {}

    @Auth("Auth") // Solo administradores pueden crear monedas
    @Post()
    create(@Body(ValidationPipe) createCurrencyDto: CreateCurrencyDto) {
        return this.currencyService.create(createCurrencyDto);
    }

    @Get()
    findAll() {
        return this.currencyService.findAll();
    }

    @Post('find')
    find(@Body(ValidationPipe) findCurrencyDto: FindCurrencyDto) {
        return this.currencyService.find(findCurrencyDto);
    }

    @Get('code/:code')
    findByCode(@Param('code') code: string) {
        return this.currencyService.findByCode(code);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.currencyService.findOne(id);
    }

    @Auth("Admin") // Solo administradores pueden actualizar monedas
    @Patch(':id')
    update(
        @Param('id') id: string, 
        @Body(ValidationPipe) updateCurrencyDto: UpdateCurrencyDto
    ) {
        return this.currencyService.update(id, updateCurrencyDto);
    }

    @Auth("Admin") // Solo administradores pueden eliminar monedas
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.currencyService.remove(id);
    }

    @Get('validate/code/:code')
    validateCode(@Param('code') code: string) {
        return this.currencyService.validateCurrencyCode(code);
    }
}