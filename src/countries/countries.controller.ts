import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseArrayPipe,
  Query,
} from '@nestjs/common';
import { RestCountriesService } from '../external-apis/rest-countries.service';
import { HttpStatus } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { FulltextDto } from './dtos/fulltext.dto';
import { RequestFiltrationDto } from './dtos/request-filtration.dto';
import { FieldsDto } from './dtos/fields.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: RestCountriesService) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getCountries() {
    try {
      const countries = await this.countriesService.getCountries();
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

  @Get('name/:name')
  @HttpCode(HttpStatus.OK)
  async getCountryByName(
    @Param('name') name: string,
    @Query('fulltext') body: FulltextDto,
  ) {
    try {
      const data = await this.countriesService.getCountryByName(
        name,
        body.fulltext,
      );
      return {
        success: true,
        message: 'Country info fetched!',
        data: data,
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get('code/:code')
  @HttpCode(HttpStatus.OK)
  async getCountryByCode(@Param('code') code: string) {
    try {
      const data = await this.countriesService.getCountryByCode(code);
      return {
        success: true,
        message: 'Country fetched by code',
        data: data,
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get('currency/:currency')
  @HttpCode(HttpStatus.OK)
  async getCountryByCurrency(@Param('currency') currency: string) {
    try {
      const data = await this.countriesService.getCountryByCurrency(currency);
      return {
        success: true,
        message: 'Country fetched by currency!',
        data: data,
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get('language/:lang')
  @HttpCode(HttpStatus.OK)
  async getCountryByLanguage(@Param('lang') lang: string) {
    try {
      const data = await this.countriesService.getCountryByLanguage(lang);
      return {
        success: true,
        message: 'Country fetched by language!',
        data: data,
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get('capital/:capital')
  @HttpCode(HttpStatus.OK)
  async getCountryByCapital(@Param('capital') capital: string) {
    try {
      const data = await this.countriesService.getCountryByLanguage(capital);
      return {
        success: true,
        message: 'Capital info fetched!',
        data: data,
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get('region/:region')
  @HttpCode(HttpStatus.OK)
  async getCountriesByRegion(@Param('region') region: string) {
    try {
      const data = await this.countriesService.getCountriesByRegion(region);
      return {
        success: true,
        message: 'Countries fetched by region',
        data: data,
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get('subregion/:subregion')
  @HttpCode(HttpStatus.OK)
  async getCountriesBySubregion(@Param('subregion') subregion: string) {
    try {
      const data =
        await this.countriesService.getCountriesBySubregion(subregion);
      return {
        success: true,
        message: 'Countries fetched by sub-region',
        data: data,
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get('translation/:translation')
  @HttpCode(HttpStatus.OK)
  async getCountriesByTranslation(@Param('translation') translation: string) {
    try {
      const data =
        await this.countriesService.getCountriesByTranslation(translation);
      return {
        success: true,
        message: 'Countries fetched by translation',
        data: data,
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get('all/filter')
  @HttpCode(HttpStatus.OK)
  async getCountriesFiltered(@Query() query: RequestFiltrationDto) {
    try {
      const data = await this.countriesService.getCountriesFiltered(
        query.fields,
      );
      return {
        success: true,
        message: 'Countries fetched by translation',
        data: data,
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e.message);
    }
  }
}
