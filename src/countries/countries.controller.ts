import { Controller, Get, HttpCode } from '@nestjs/common';
import { RestCountriesService } from '../external-apis/rest-countries.service';
import { HttpStatus } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import flatted from 'flatted';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: RestCountriesService) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getCountries() {
    try {
      const countries = await this.countriesService.getCountries();
      // console.log(countries.length);
      return {
        success: true,
        message: 'All countries fetched!',
        data: countries,
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e.message);
    }
  }
}
