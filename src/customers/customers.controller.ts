import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { Authorize } from 'src/auth/decorators/auth.decorator';
import { QueryCustomersDto } from './dto/query-customers.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Authorize()
@ApiBearerAuth()
@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Get()
    findAll(@Query() query: QueryCustomersDto) {
        return this.customersService.findCustomers(query);
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number, @Query() query: QueryCustomerDto) {
        return this.customersService.findCustomer(id, query);
    }

    @Patch(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Body() data: UpdateCustomerDto) {
        return this.customersService.updateCustomer(id, data);
    }
}
