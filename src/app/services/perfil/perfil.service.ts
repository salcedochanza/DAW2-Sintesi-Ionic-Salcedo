import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient,
    private router: Router) { }

    editProfile(userId: string, user: string, password: string, firstName: string, lastName: string, email: string, phone: string, token: string) {
      let body = {
        'id': userId,
        'user': user,
        'password': password,
        'firstName':firstName,
        'lastName':lastName,
        'email':email,
        'phone':phone,
      };
      console.log(body);
      let options = {
        headers: new HttpHeaders({'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}),
        observe: 'body' as 'body'
      };
      
      this.http.put("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/profile/edit", body, options).subscribe(
        (body: any) => {
          if (body.status){
            localStorage.setItem('token', JSON.stringify(body.token));
            localStorage.setItem('user', JSON.stringify(body.user));
            this.router.navigate(['/perfil']);
          } else {
            alert("El usuari o contrasenya no son correctes");
          }
        }
      );
    }
}
