import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { ExternalApisModule } from '../external-apis/external-apis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ExternalApisModule, ConfigModule],
  controllers: [CountriesController],
})
export class CountriesModule {}
