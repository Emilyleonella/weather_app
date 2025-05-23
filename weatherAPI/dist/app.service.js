"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let AppService = class AppService {
    httpService;
    configService;
    apiKey;
    baseUrl = ' http://api.weatherapi.com/v1';
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.apiKey =
            this.configService.get('WEATHER_API_KEY') ??
                (() => {
                    throw new Error('WEATHER_API_KEY is not set');
                })();
    }
    getHello() {
        return 'Hello World!';
    }
    getWeatherByLocation(q, days) {
        return this.httpService
            .get(`${this.baseUrl}/forecast.json`, {
            params: {
                key: this.apiKey,
                q,
                days,
            },
        })
            .pipe((0, rxjs_1.map)((response) => response.data), (0, rxjs_1.catchError)(() => {
            throw new Error('Failed to fetch weather data');
        }));
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], AppService);
//# sourceMappingURL=app.service.js.map