import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Org, OrgSchema } from './schema/org.schema';
import { OrgsController } from './orgs.controller';
import { OrgsService } from './orgs.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Org.name, schema: OrgSchema }])],
    providers: [OrgsService],
    controllers: [OrgsController]
})
export class OrgsModule {}
