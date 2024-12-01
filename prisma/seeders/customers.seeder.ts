import { Prisma } from './prisma.utils';
import { Prisma as PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const run = async (loop: number) => {
    const data: PrismaClient.CustomerCreateManyInput[] = [];

    for (let i = 0; i < loop; i++) {
        data.push({
            email: faker.internet.email({ provider: 'faker.id' }),
            name: faker.person.fullName({ sex: faker.datatype.boolean() ? 'female' : 'male' }),
            ...(faker.datatype.boolean() && { blockedAt: new Date() }),
        });
    }
    await Prisma.instance.customer.createMany({ data, skipDuplicates: true });

    console.log('   └─ Completed: customers.');
};
export default {
    run,
};
