import { Prisma } from './prisma.utils';
import { Prisma as PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const run = async () => {
    const encryptedPass = await bcrypt.hash('password', 10);

    const data: PrismaClient.UserUncheckedCreateInput = {
        email: 'admin@rsv.id',
        name: 'admin rsv',
        password: encryptedPass,
    };
    await Prisma.instance.user.upsert({ where: { email: data.email }, update: data, create: data });

    console.log('   └─ Completed: users.');
};
export default {
    run,
};
