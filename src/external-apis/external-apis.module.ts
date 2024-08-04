import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RestCountriesService } from './rest-countries.service';

@Module({
  imports: [HttpModule],
  providers: [RestCountriesService],
  exports: [RestCountriesService],
})
export class ExternalApisModule {}
