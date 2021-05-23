import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private router: Router) { }

  Login(user: String, pass: String) {
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'body' as 'body'
    };

    this.http.post("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/login", { 'user': user, 'pass': pass }, options).subscribe(
      (body: any) => {
        if (body.status) {
          localStorage.setItem('token', JSON.stringify(body.token));
          localStorage.setItem('user', JSON.stringify(body.user));
          localStorage.setItem('userGroup', JSON.stringify(body.userGroup));
          this.router.navigate(['/home']);
        } else {
          alert("El usuari o contrasenya no son correctes");
        }
      }
    );
  }
}
