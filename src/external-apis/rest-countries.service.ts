import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { FieldsDto } from '../countries/dtos/fields.dto';

export class RestCountriesService {
  private readonly REST_COUNTRIES;
  constructor(
    private readonly httpService: HttpService,
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.REST_COUNTRIES = this.configService.get<string>('REST_COUNTRIES');
  }

  async getCountries() {
    const cachedData = await this.cacheManager.get('ALL-COUNTRIES');
    if (cachedData) {
      return cachedData;
    }
    const result: any = await firstValueFrom(
      this.httpService.get(`${this.REST_COUNTRIES}all`).pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error.response.data);
        }),
      ),
    );
    const data = result.data;
    await this.cacheManager.set('ALL-COUNTRIES', data, 0);
    return result.data;
  }

  async getCountryByName(name: string, fulltext?: boolean) {
    let query = '';
    if (fulltext) {
      query = query + `fulltext=${fulltext}`;
    }
    const result: any = await firstValueFrom(
      this.httpService.get(`${this.REST_COUNTRIES}name/${name}?${query}`).pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error.response.data);
        }),
      ),
    );
    return result.data;
  }

  async getCountryByCode(code: string) {
    const result: any = await firstValueFrom(
      this.httpService.get(`${this.REST_COUNTRIES}alpha/${code}`).pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error.response.data);
        }),
      ),
    );
    return result.data;
  }

  async getCountryByCurrency(currency: string) {
    const result: any = await firstValueFrom(
      this.httpService.get(`${this.REST_COUNTRIES}currency/${currency}`).pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error.response.data);
        }),
      ),
    );
    return result.data;
  }

  async getCountryByLanguage(lang: string) {
    const result: any = await firstValueFrom(
      this.httpService.get(`${this.REST_COUNTRIES}lang/${lang}`).pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error.response.data);
        }),
      ),
    );
    return result.data;
  }

  async getCountryByCapital(capital: string) {
    const result: any = await firstValueFrom(
      this.httpService.get(`${this.REST_COUNTRIES}capital/${capital}`).pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error.response.data);
        }),
      ),
    );
    return result.data;
  }

  async getCountriesByRegion(region: string) {
    const result: any = await firstValueFrom(
      this.httpService.get(`${this.REST_COUNTRIES}region/${region}`).pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error.response.data);
        }),
      ),
    );
    return result.data;
  }

  async getCountriesBySubregion(region: string) {
    const result: any = await firstValueFrom(
      this.httpService.get(`${this.REST_COUNTRIES}subregion/${region}`).pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error.response.data);
        }),
      ),
    );
    return result.data;
  }

  async getCountriesByTranslation(translation: string) {
    const result: any = await firstValueFrom(
      this.httpService
        .get(`${this.REST_COUNTRIES}translation/${translation}`)
        .pipe(
          catchError((error: AxiosError) => {
            throw new InternalServerErrorException(error.response.data);
          }),
        ),
    );
    return result.data;
  }
  async getCountriesFiltered(fields: string | string[]) {
    let query;
    if (typeof fields === 'string') {
      query = fields;
    } else {
      query = fields.join(',');
    }
    const result: any = await firstValueFrom(
      this.httpService.get(`${this.REST_COUNTRIES}all?fields=${query}`).pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error.response.data);
        }),
      ),
    );
    return result.data;
  }

  async getListOfCountryCodes(codes: string | string[]) {
    let query;
    if (typeof codes === 'string') {
      query = codes;
    } else {
      query = codes.join(',');
    }
    const result: any = await firstValueFrom(
      this.httpService.get(`${this.REST_COUNTRIES}alpha?codes=${query}`).pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error.response.data);
        }),
      ),
    );
    return result.data;
  }
}
