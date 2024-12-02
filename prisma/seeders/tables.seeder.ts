import { Prisma } from './prisma.utils';
import { Prisma as PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dayjs from 'dayjs';

export const run = async (loop: number) => {
    const data: PrismaClient.TableCreateManyInput[] = [];
    const latestTable = await Prisma.instance.table.findFirst({ orderBy: { createdAt: 'desc' } });
    let now = dayjs();

    for (let i = 1; i <= loop; i++) {
        now = now.add(1, 'second');
        data.push({
            isActive: faker.datatype.boolean(),
            name: String((Number(latestTable?.name) || 0) + i),
            qty: faker.helpers.rangeToNumber({ min: 2, max: 8 }),
            createdAt: now.toDate(),
            updatedAt: now.toDate(),
        });
    }
    await Prisma.instance.table.createMany({ data, skipDuplicates: true });

    console.log('   └─ Completed: tables.');
};
export default {
    run,
};
