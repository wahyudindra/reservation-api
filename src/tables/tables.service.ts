import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { BaseRepository } from 'src/utils/base-repository';
import { QueryTablesDto } from './dto/query-tables.dto';
import { QueryTableDto } from './dto/query-table.dto';

@Injectable()
export class TablesService extends BaseRepository {
    constructor(private prisma: PrismaService) {
        super(prisma, Prisma.ModelName.Table);
    }

    findTables(query: QueryTablesDto) {
        const select = this.constructSelect(query);
        return super.findAll({ ...query, select });
    }

    findTable(id: number, query: QueryTableDto) {
        const select = this.constructSelect(query);
        return super.findOne(id, { select });
    }

    constructSelect({ includeReservations }: QueryTableDto): Prisma.TableSelect {
        return {
            id: true,
            name: true,
            qty: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            reservations: !!includeReservations,
        };
    }
}
