import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { TablesModule } from './tables/tables.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, CustomersModule, ReservationsModule, TablesModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
