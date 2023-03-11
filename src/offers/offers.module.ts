import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OffersService } from './offers.service';
import { Offer, OfferSchema } from './schema/offer.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema }])],
    providers: [OffersService],
    exports: [OffersService]
  })
export class OffersModule {}
