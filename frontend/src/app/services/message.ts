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
  private backendUrl: string = "http://127.0.0.1:3000/"

  constructor(private httpClient: HttpClient) { }

  sendMessage(url : string, data : any): Observable<BackendResponse> {
    // on construit l'URL sur laquelle on va envoyer la requête au serveur
    const fullUrl = this.backendUrl + url;

    // à l'aide d'un post, on récupère la réponse du serveur
    return this.httpClient.post<BackendResponse>(fullUrl, data, {withCredentials : true});
  }
  
}
