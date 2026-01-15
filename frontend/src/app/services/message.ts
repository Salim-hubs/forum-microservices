import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BackendResponse {
  status: "ok" | "error";
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class Message {
  // URL de l'API Gateway (point d'entrée unique vers les microservices)
  private apiGatewayUrl: string = "http://127.0.0.1:3000/";

  constructor(private httpClient: HttpClient) { }

  sendMessage(url : string, data : any): Observable<BackendResponse> {
    // Toutes les requêtes passent par l'API Gateway
    const fullUrl = this.apiGatewayUrl + url;

    return this.httpClient.post<BackendResponse>(fullUrl, data, {withCredentials : true});
  }

}
