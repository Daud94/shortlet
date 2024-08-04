# Shortlet
## Overview
An integration of [REST Countries API](https://restcountries.com/) using NestJS, is a robust and scalable framework for
building server-side applications using JavaScript or TypeScript. This particular application was built using TypeScript.

## Features
- API Endpoints:
    - Get all countries
    - Get countries by name
    - Get countries by cca2, ccn3, cca3 or cioc country code
    - Get countries by country code
    - Get countries by currency
    - Get countries by language
    - Get countries by capital
    - Get countries by region
    - Get countries by subregion
    - Get countries by translation
    - Get countries filtering out all except what is specified e.g name, currency, language etc.
- Logging:
    - Captures important events, request, and errors.
## Prerequisites
- NodeJs
- NestJS
## Getting Started
### Clone the Repository
```shell
git clone https://github.com/Daud94/shortlet.git
```
### Configuration
Create a `.env` file in the root directory with the following content:
```dotenv
REST_COUNTRIES=https://restcountries.com/v3.1/
API_PORT=  # or any sepcified port of your choice
```
`REST_COUNTRIES` Base url of REST Countries
`API_PORT` is the port number you want the app to run on e.g 3000.
### Installation
Install all dependencies from the `package.json` file:
```shell
npm install
```
Run the application:
```shell
npm run start:dev
```

### API Endpoints
All API endpoints are documented with Swagger and can be accessed from `BASE_URL/api` e.g `localhost:API_PORT/api`.
**APIs**
1. GET `/countries/all` fetches all countries. Query response is optimised through in-memory caching. A total of 250
  records is returned from the original response but now cached. Cache TTL is set 24hrs.
2. GET `countries/name/{name}` fetches countries by name path param.
3. GET `countries/alpha` fetches countries by cca2, ccn3, cca3 or cioc country code. e.g +
   '  `countries/alpha?codes=170&codes=no&codes=est&codes=pe`.'
3. GET `countries/code/{code}` fetches countries by code path param.
4. GET `countries/currency/{currency}` fetches countries by currency path param.
5. GET `countries/language/{lang}` fetches countries by lang(language) path param.
6. GET `countries/capital/{capital}` fetches countries by capital path param.
7. GET `countries/region/{region}` fetches countries by region path param.
8. GET `countries/subregion/{subregion}` fetches countries by subregion path param.
9. GET `countries/translation/{translation}` fetches countries by subregion path param.
10. GET `countries/all/filter` fetches all countries filterable by fields query param e.g 
  `countries/all/filter?fields=name&fields=currencies`. `fields` value can be any of the following and any numbers of them separated by '&': 
    - name
    - currencies
    - code
    - language
    - capital
    - region
    - subregion
    - translation


