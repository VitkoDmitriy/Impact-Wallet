import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { map, catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class ApiService {
    constructor(private http: HttpService) { }


    async createWallet(password: string) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("x-api-key", "xdKM4xYv9r-uONmT");

        const config: AxiosRequestConfig = {
            headers: Object.fromEntries(headers.entries()),
        };

        const request = JSON.stringify({
            "password": password
        });

        return await firstValueFrom(this.http
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


    async createFungibleTokensForOrganization(orgName: string, wallet: string) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("x-api-key", "xdKM4xYv9r-uONmT");

        let formData = new FormData();
        formData.append("network", "devnet");
        formData.append("wallet", wallet);
        formData.append("name", orgName);
        formData.append("symbol", orgName);

        const config: AxiosRequestConfig = {
            headers: Object.fromEntries(headers.entries()),
            timeout: 100000
        };

        let requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
          };


        return this.http.axiosRef
            .post('https://api.shyft.to/sol/v1/token/create_detach',
                requestOptions,
                config)
            // .pipe(
            //     map((res) => res.data?.result),
            //     map((result) => {
            //         console.log(result);
            //         return result;
            //     }),
            // )
            // // .pipe(
            // //     catchError(() => {
            // //         throw new ForbiddenException('API create fungible tokens not available');
            // //     }),
            // );
    }

}
