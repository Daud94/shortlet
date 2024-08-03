import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';
import { ExternalApisModule } from './external-apis/external-apis.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CountriesModule,
    ExternalApisModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
