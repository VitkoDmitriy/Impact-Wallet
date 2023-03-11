import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { OrgsModule } from './orgs/orgs.module';
import { ApiServiceModule } from './api-service/api.module';
import { MembersModule } from './members/members.module';
import { OffersService } from './offers/offers.service';
import { OffersModule } from './offers/offers.module';


@Module({
  imports: [
    UsersModule,
    OrgsModule,
    ApiServiceModule,
    MongooseModule.forRoot('mongodb+srv://vitko:jhCn7xn2m2JJ9l8q@cluster0.dg4ud.mongodb.net/?retryWrites=true&w=majority', {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      }
    }),
    MembersModule,
    OffersModule,
  ],
  providers: [OffersService],
})

export class AppModule { }


