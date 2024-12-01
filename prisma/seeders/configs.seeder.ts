import * as dayjs from 'dayjs';
import { Prisma } from './prisma.utils';
import { Prisma as PrismaClient } from '@prisma/client';

export const run = async () => {
    const config = await Prisma.instance.config.findFirst();

    const data: PrismaClient.ConfigUncheckedCreateInput = {
        openedAt: '09:00',
        closedAt: '21:00',
        daysOff: [
            dayjs().add(2, 'week').startOf('date').toDate(),
            dayjs().add(4, 'week').startOf('date').toDate(),
            dayjs().add(6, 'week').startOf('date').toDate(),
        ],
    };

    await Prisma.instance.config.upsert({ where: { id: config?.id || 0 }, update: data, create: data });

    console.log('   └─ Completed: configs.');
};
export default {
    run,
};
