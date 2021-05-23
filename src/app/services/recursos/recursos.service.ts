import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Recursos } from 'src/app/module/recursos';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  private _recurs: BehaviorSubject<Recursos[]> = new BehaviorSubject<Recursos[]>([]);

  constructor(private http: HttpClient, private router: Router) { }

  get recursos(): Observable<Recursos[]> {
    return this._recurs.asObservable();
  }

  getRecurs(id: string){
    let token = JSON.parse(localStorage.getItem('token'));
    let options = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}),
      observe: 'body' as 'body'
    };
    return this.http.get("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/recurs?id=" + id, options);
  }

  getRecursos(id=null){
    this._recurs.next([]);
    let options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    if (id == null){
      this.http.get("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/recursos", options).subscribe(
        (response: any) => {
          response.forEach(
            (recurs:any) => {
              let recursos: Recursos = new Recursos();
              recursos.id = recurs.id;
              recursos.titol = recurs.titol;
              recursos.descripcio = recurs.descripcio;
              recursos.disponibilitat = recurs.disponibilitat;
              recursos.explicacio = recurs.explicacio;
              recursos.categoria = recurs.categoria;
              
              this.recursos.pipe(take(1)).subscribe(
                (originalCategory: Recursos[]) => {
                  this._recurs.next(originalCategory.concat(recursos));
                }
              );
          });
        }
      );
    } else {
      this.http.get("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/recursosCat?id=" + id, options).subscribe(
        (response: any) => {
          response.recurs.forEach(
            (recurs:any) => {
              let recursos: Recursos = new Recursos();
              recursos.id = recurs.id;
              recursos.titol = recurs.titol;
              recursos.descripcio = recurs.descripcio;
              recursos.disponibilitat = recurs.disponibilitat;
              recursos.explicacio = recurs.explicacio;
              recursos.categoria = recurs.categoria;
              
              this.recursos.pipe(take(1)).subscribe(
                (originalCategory: Recursos[]) => {
                  this._recurs.next(originalCategory.concat(recursos));
                }
              );
          });
        }
      );
    }
  }
}
