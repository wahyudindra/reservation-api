import { isNotEmptyObject } from 'class-validator';
import { FindManyDto } from './dto/find-many.dto';

export type PaginationResponseType = {
    data?: Array<any>;
    total?: number;
};

export class PaginationUtils {
    public static transform(query: FindManyDto) {
        const searchBy = this.constructArray(query?.searchBy);

        return {
            take: query.take,
            skip: (query.page - 1) * query.take,
            orderBy: { [query.orderBy]: query.sortBy },
            ...(isNotEmptyObject(query.select) && { select: query.select }),
            ...(isNotEmptyObject(query.include) && { include: query.include }),
            where: {
                ...query?.filter,
                ...(query?.search &&
                    searchBy.length && { OR: PaginationUtils.searchQueryHandler(query.search, searchBy) }),
            },
        };
    }

    public static constructArray(string?: string): Array<string> {
        return string ? string.replace(/\s/g, '').split(',') : [];
    }

    public static searchQueryHandler(search: string, fields: Array<string> = []): Array<any> {
        return [...fields.map((value) => ({ [`${value}`]: { contains: search, mode: 'insensitive' } }))];
    }
}
