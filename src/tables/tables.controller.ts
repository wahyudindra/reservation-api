import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateTableDto } from './dto/update-table.dto';
import { CreateTableDto } from './dto/create-table.dto';
import { QueryTablesDto } from './dto/query-tables.dto';
import { QueryTableDto } from './dto/query-table.dto';
import { TablesService } from './tables.service';
import { Authorize } from 'src/auth/decorators/auth.decorator';

@Authorize()
@ApiBearerAuth()
@ApiTags('Tables')
@Controller('tables')
export class TablesController {
    constructor(private readonly tablesService: TablesService) {}

    @Get()
    findAll(@Query() query: QueryTablesDto) {
        return this.tablesService.findTables(query);
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number, @Query() query: QueryTableDto) {
        return this.tablesService.findTable(id, query);
    }

    @Post()
    create(@Body() data: CreateTableDto) {
        return this.tablesService.create(data);
    }

    @Patch(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Body() data: UpdateTableDto) {
        return this.tablesService.update(id, data);
    }
}
