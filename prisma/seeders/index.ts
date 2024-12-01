import { Prisma } from './prisma.utils';
import configs from './configs.seeder';
import users from './users.seeder';
import customers from './customers.seeder';
import tables from './tables.seeder';

async function main() {
    console.log('\n-> START::SEEDING');

    await configs.run();
    await users.run();
    await customers.run(10);
    await tables.run(15);

    console.log('-> FINISH::SEEDING\n');
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await Prisma.instance.$disconnect();
    });
