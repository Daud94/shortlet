import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

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
}
