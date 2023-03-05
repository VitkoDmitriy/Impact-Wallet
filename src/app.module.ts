import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { OrgsModule } from './orgs/orgs.module';


@Module({
  imports: [
    UsersModule,
    OrgsModule,
    MongooseModule.forRoot('mongodb+srv://vitko:jhCn7xn2m2JJ9l8q@cluster0.dg4ud.mongodb.net/?retryWrites=true&w=majority', {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      }
    }),
  ],
})

export class AppModule { }


