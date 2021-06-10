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
              recursos.adjunts = recurs.adjunts;
              recursos.canvas = recurs.canvas;
              recursos.propietari = recurs.propietari;
              recursos.tipus = recurs.tipus;
              recursos.tipus_disponibilitat = recurs.tipus_disponibilitat;
              recursos.videorecurs = recurs.videorecurs;
              
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
              recursos.adjunts = recurs.adjunts;
              recursos.canvas = recurs.canvas;
              recursos.propietari = recurs.propietari;
              recursos.tipus = recurs.tipus;
              recursos.tipus_disponibilitat = recurs.tipus_disponibilitat;
              recursos.videorecurs = recurs.videorecurs;
              
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

  getRecursosByProfe(id){
    let options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.http.get("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/recursosProfe?id="+id, options).subscribe(
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
            recursos.adjunts = recurs.adjunts;
            recursos.canvas = recurs.canvas;
            recursos.propietari = recurs.propietari;
            recursos.tipus = recurs.tipus;
            recursos.tipus_disponibilitat = recurs.tipus_disponibilitat;
            recursos.videorecurs = recurs.videorecurs;
            
            this.recursos.pipe(take(1)).subscribe(
              (originalCategory: Recursos[]) => {
                this._recurs.next(originalCategory.concat(recursos));
              }
            );
        });
      }
    );
  }

  newRecurs(file){
    let token = JSON.parse(localStorage.getItem('token'));
    console.log(file.get('etiquetes').value);

    
    var formData: any = new FormData();
    formData.append("file", file.get('file').value);
    formData.append("titol", file.get('titol').value);
    formData.append("descripcio", file.get('descripcio').value);
    formData.append("explicacio", file.get('explicacio').value);
    formData.append("categoria", file.get('categoria').value);
    formData.append("etiquetes", file.get('etiquetes').value);
    formData.append("selVideorecurs", file.get('selVideorecurs').value);
    formData.append("selDisponibilitat", file.get('selDisponibilitat').value);
    formData.append("disponibilitat", file.get('disponibilitat').value);
    formData.append("propietari", file.get('propietari').value);
    if (file.get('selVideorecurs').value == 4){
      let dataUrlCanvas = file.get('videorecurs').value.split(",");
      console.log(dataUrlCanvas);
      formData.append("videorecurs", dataUrlCanvas[1]);
    } else {
      formData.append("videorecurs", file.get('videorecurs').value);
    }
    console.log(formData);
    // console.log(file.get('videorecurs').value);
    // console.log(file.get('file').value);
    // console.log(file);

    let options = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + token})
    };
    
    this.http.post("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/recursos", formData, options).subscribe(
      (response:any) => {
        console.log(response);
        if (response.status){
          localStorage.setItem('token', JSON.stringify(response.token));
          this.router.navigate(['home']);
        }
      }, (error: any) => {
          console.log(error);
          localStorage.setItem('token', JSON.stringify(error.error.token));
          alert(error.error.message);
      }
    );
  }

  deleteRecurs(id: string){
    let token = JSON.parse(localStorage.getItem('token'));
    let options = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'})
    };
    this.http.delete("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/recursos/" + id, options).subscribe(
      (response:any) => {
        console.log(response);
        if (response.status){
          localStorage.setItem('token', JSON.stringify(response.token));
          this.router.navigate(['admin/recursos']);
        }
      }
    );
  }

  editRecurs(file) {
    let token = JSON.parse(localStorage.getItem('token'));
    var formData: any = new FormData();
    formData.append("id", file.get('id').value);
    formData.append("file", file.get('file').value);
    formData.append("titol", file.get('titol').value);
    formData.append("descripcio", file.get('descripcio').value);
    formData.append("explicacio", file.get('explicacio').value);
    formData.append("categoria", file.get('categoria').value);
    formData.append("etiquetes", file.get('etiquetes').value);
    formData.append("selVideorecurs", file.get('selVideorecurs').value);
    formData.append("selDisponibilitat", file.get('selDisponibilitat').value);
    formData.append("disponibilitat", file.get('disponibilitat').value);
    formData.append("propietari", file.get('propietari').value);
    if (file.get('selVideorecurs').value == 4){
      let dataUrlCanvas = file.get('videorecurs').value.split(",");
      console.log(dataUrlCanvas);
      formData.append("videorecurs", dataUrlCanvas[1]);
    } else {
      formData.append("videorecurs", file.get('videorecurs').value);
    }
    let options = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'})
    };
    console.log("service");
    console.log(formData);
    this.http.put("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/recursos", formData, options).subscribe(
      (body: any) => {
        localStorage.setItem('token', JSON.stringify(body.token));
        this.router.navigate(['/home']);
      }, (error: any) => {
        console.log(error);
        localStorage.setItem('token', JSON.stringify(error.error.token));
        alert(error.error.message);
      }
    );
  }
}
