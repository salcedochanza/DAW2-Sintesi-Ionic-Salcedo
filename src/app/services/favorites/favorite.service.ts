import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  constructor(private http: HttpClient) {}

  addFavorite(userId: number, recursId: number){
    let token = JSON.parse(localStorage.getItem('token'));
    let options = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'})
    };
    let data = {
      'user_id': userId,
      'recurs_id': recursId,
    }
    this.http.post("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/favoritos", data, options).subscribe(
      (response:any) => {
        console.log(response);
        if (response.status){
          localStorage.setItem('token', JSON.stringify(response.token));
        }
      }, (error: any) => {
          localStorage.setItem('token', JSON.stringify(error.error.token));
          alert(error.error.message);
      }
    );
  }
}
