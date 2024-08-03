import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RestCountriesService } from './rest-countries.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Module({
  imports: [HttpModule],
  providers: [RestCountriesService],
  exports: [RestCountriesService],
})
export class ExternalApisModule {}
