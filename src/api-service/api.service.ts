import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { map, catchError, firstValueFrom } from 'rxjs';
import { AxiosError, AxiosRequestConfig } from 'axios';

@Injectable()
export class ApiService {
    constructor(private http: HttpService) { }


    createWallet(password: string) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("x-api-key", "xdKM4xYv9r-uONmT");

        const config: AxiosRequestConfig = {
            headers: Object.fromEntries(headers.entries()),
        };

        const request = JSON.stringify({
            "password": password
        });

        return firstValueFrom(this.http
            .post('https://api.shyft.to/sol/v1/wallet/create_semi_wallet',
                request,
                config)
            .pipe(
                map((res) => res.data?.result),
                map((result) => {
                    return result?.wallet_address;
                }),
            )
            .pipe(
                catchError(() => {
                    throw new ForbiddenException('API create wallet not available');
                }),
            ));
    }

}
