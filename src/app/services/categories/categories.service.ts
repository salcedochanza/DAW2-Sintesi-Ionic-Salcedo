import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Category } from 'src/app/module/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private _category: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  private _categoryF: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient, private router: Router) { }

  get categories(): Observable<Category[]> {
    return this._category.asObservable();
  }
  get categoriesF(): Observable<Category[]> {
    return this._categoryF.asObservable();
  }

  getPath(id: string){
    let token = JSON.parse(localStorage.getItem('token'));
    let options = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}),
      observe: 'body' as 'body'
    };
    return this.http.get("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/category?id=" + id, options);
  }

  getCategory(id: string){
    let token = JSON.parse(localStorage.getItem('token'));
    let options = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}),
      observe: 'body' as 'body'
    };
    return this.http.get("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/category?id=" + id, options);
  }

  getCategories(){
    this._category.next([]);
    let options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.http.get("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/categories", options).subscribe(
      (response: any) => {
        response.forEach(
          (category:any) => {
            let categories: Category = new Category();
            categories.id = category.id;
            categories.name = category.name;
            categories.parentId = category.parent_id;
            
            this.categories.pipe(take(1)).subscribe(
              (originalCategory: Category[]) => {
                this._category.next(originalCategory.concat(categories));
              }
            );
        });
      }
    );
  }

  newCategory(name: string, parentId: string){
    let token = JSON.parse(localStorage.getItem('token'));
    let options = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'})
    };
    let data = {
      'name': name,
      'parentId': parentId,
    }
    this.http.post("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/categories", data, options).subscribe(
      (response:any) => {
        console.log(response);
        if (response.status){
          localStorage.setItem('token', JSON.stringify(response.token));
          this.router.navigate(['admin/categories']);
        }
      }, (error: any) => {
          console.log(error);
          localStorage.setItem('token', JSON.stringify(error.error.token));
          alert(error.error.message);
      }
    );
  }

  deleteCategory(id: string){
    let token = JSON.parse(localStorage.getItem('token'));
    let options = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'})
    };
    this.http.delete("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/categories/" + id, options).subscribe(
      (response:any) => {
        if (response.status){
          localStorage.setItem('token', JSON.stringify(response.token));
          this.router.navigate(['admin/categories']);
        }
      }
    );
  }

  editCategory(id: string, name: string, parentId: string, token: string) {
    let body = {
      'id': id,
      'name': name,
      'parentId': parentId,
    };
    let options = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'})
    };
    
    this.http.put("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/categories", body, options).subscribe(
      (body: any) => {
        localStorage.setItem('token', JSON.stringify(body.token));
        this.router.navigate(['/admin/categories']);
      }, (error: any) => {
        console.log(error);
        localStorage.setItem('token', JSON.stringify(error.error.token));
        alert(error.error.message);
      }
    );
  }

  getParents(parent: number){
    this._category.next([]);
    let options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.http.get("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/fills?parent=" + parent, options).subscribe(
      (response: any) => {
        response.forEach(
          (category:any) => {
            let categorys: Category = new Category();
            categorys.id = category.id;
            categorys.name = category.name;
            categorys.parentId = category.parent_id;
            this.categories.pipe(take(1)).subscribe(
              (originalCategory: Category[]) => {
                this._category.next(originalCategory.concat(categorys));
              }
            );
            //this.a(category);
        });
      }
    );
  }
  
  a(category:any){
    let categorys: Category = new Category();
    categorys.id = category.id;
    categorys.name = category.name;
    categorys.parentId = category.parent_id;
    
    this.categories.pipe(take(1)).subscribe(
      (originalCategory: Category[]) => {
        this._category.next(originalCategory.concat(categorys));
      }
    );
    
    if(category?.id != null) {
      this.http.get("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/fills?parent=" + category.id).subscribe(
        (response:any) => {
          if (response.length > 0){
            response.forEach(
              (category:any) => {
                this.a(category);
            });
          }
        }
      );
    }
  }

  getFills(parent: number){
    this._categoryF.next([]);
    let options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.http.get("http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/fills?parent=" + parent, options).subscribe(
      (response: any) => {
        response.forEach(
          (category:any) => {
            let categorys: Category = new Category();
            categorys.id = category.id;
            categorys.name = category.name;
            categorys.parentId = category.parent_id;
            
            this.categoriesF.pipe(take(1)).subscribe(
              (originalCategory: Category[]) => {
                this._categoryF.next(originalCategory.concat(categorys));
              }
            );
        });
      }
    );
  }
}
