import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { RestCountriesService } from '../external-apis/rest-countries.service';
import { HttpStatus } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { FulltextDto } from './dtos/fulltext.dto';
import { RequestFiltrationDto } from './dtos/request-filtration.dto';
import { ApiOperation } from '@nestjs/swagger';
import { CountryCodesDto } from './dtos/CountryCodes.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: RestCountriesService) {}

  @ApiOperation({
    summary: 'Fetch all countries',
    description:
      'Retrieves a list of all countries. Query response is optimised through in-memory caching. A total of 250\n' +
      '  records is returned from the original response but now cached. Cache TTL is set 24hrs.',
  })
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

  @ApiOperation({
    summary: 'fetch countries by name or full name',
    description:
      "Search by country name or fullname. If you want to get an exact match, pass 'fulltext' as a query parameter with " +
      'value equals true' +
      'value. Example: host_url/countries/name/nigeria?fulltext=true',
  })
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

  @ApiOperation({
    summary: 'Fetch countries by cca2, ccn3, cca3 or cioc country code',
    description:
      'fetches all countries filterable by codes query param e.g \n' +
      '  `countries/alpha?codes=170&codes=no&codes=est&codes=pe`.',
  })
  @Get('alpha')
  @HttpCode(HttpStatus.OK)
  async getListOfCountryCodes(@Query() query: CountryCodesDto) {
    try {
      const data = await this.countriesService.getListOfCountryCodes(
        query.codes,
      );
      return {
        success: true,
        message: 'List of country codes fetched',
        data: data,
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  @ApiOperation({
    summary: 'fetch countries by code',
    description:
      'Search by cca2, ccn3, cca3 or cioc country code (yes, any!).' +
      'Examples: host_ur/countries/code/co, host_ur/countries/code/col, host_ur/countries/code/170',
  })
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

  @ApiOperation({
    summary: 'fetch countries by currency',
    description:
      'Search by currency code or name. ' +
      'Example: host_url/countries/currencies/ngn',
  })
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

  @ApiOperation({
    summary: 'fetch countries by language',
    description:
      'Search by language code or name' +
      'Example: host_url/countries/language/english',
  })
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

  @ApiOperation({
    summary: 'fetch countries by capital city',
    description:
      'Search by capital city.' + 'Example: host_url/countries/capital/abuja',
  })
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

  @ApiOperation({
    summary: 'fetch countries by region',
    description:
      'Search by region.' + 'Example: host_url/countries/region/africa',
  })
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

  @ApiOperation({
    summary: 'fetch countries by subregions',
    description:
      'Search by subregions' +
      'Example: host_url/countries/subregion/Northern Europe',
  })
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

  @ApiOperation({
    summary: 'fetch countries by translation name',
    description:
      'Search by translation name' +
      'Example: host_url/countries/translation/germany',
  })
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

  @ApiOperation({
    summary: 'fetches all countries filterable by fields query param',
    description:
      'fetches all countries filterable by fields query param e.g \n' +
      "  `countries/all/filter?fields=name&fields=currencies`. `fields` value can be any of the following and any numbers of them separated by '&': \n" +
      '    - name\n' +
      '    - currencies\n' +
      '    - code\n' +
      '    - language\n' +
      '    - capital\n' +
      '    - region\n' +
      '    - subregion\n' +
      '    - translation',
  })
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
