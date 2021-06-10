import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Category } from 'src/app/module/category';
import { Recursos } from 'src/app/module/recursos';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FavoriteService } from 'src/app/services/favorites/favorite.service';
import { RecursosService } from 'src/app/services/recursos/recursos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public convidat: boolean = true;
  public logged: boolean;
  public userId: number;
  public rol: string;
  private _categories: Category[];
  public catFilter: Category[];
  private _recursos: Recursos[];

  public path: any = [ {nom:"dwtube",id:"0"} ];

  constructor(private router: Router, private categoriesService: CategoriesService, private recursService: RecursosService, private favoriteService: FavoriteService) {
    this.checkUserLogged();
    this.categoriesService.getParents(0);
    this.categoriesService.categories.subscribe(
      (originalCategory: Category[]) => {
        this._categories = originalCategory;
      }
    );

    this.recursService.getRecursos(0);
    this.recursService.recursos.subscribe(
      (originalRecursos: Recursos[]) => {
        this._recursos = originalRecursos;
      }
    );
  }

  ngOnInit(): void {
  }

  getCategories(categoryId){
    this.categoriesService.getParents(categoryId);
    this.categoriesService.categories.subscribe(
      (originalCategory: Category[]) => {
        this._categories = originalCategory;
      }
    );

    this.recursService.getRecursos(categoryId);
    this.recursService.recursos.subscribe(
      (originalRecursos: Recursos[]) => {
        this._recursos = originalRecursos;
      }
    );

    this.path = [];
    this.getPath(categoryId);
  }
  
  getPath(categoryId){
    if (categoryId == '0'){
      let objpath = {nom:'DwTube',id:'0'};
      this.path.push(objpath);
    } else {
      this.categoriesService.getPath(categoryId).subscribe(
        (result: any) => {
          localStorage.setItem('token', JSON.stringify(result.token));
          let objpath = {nom:result.group[0].name,id:result.group[0].id};
  
          this.path.push(objpath);
  
          if(result.group[0].parent_id != 0) {
            this.getPath(result.group[0].parent_id);
          } else {
            let objpath = {nom:'DwTube',id:'0'};
            this.path.push(objpath);
            this.path.reverse();
          }
        }
      )
    }
  }

  get categories(): Category[] {
    return this._categories;
  }

  get recursos(): Recursos[] {
    return this._recursos;
  }

  addFavoritos(id){
    this.favoriteService.addFavorite(this.userId, id);
  }

  checkUserLogged(){
    let user = JSON.parse(localStorage.getItem('user'));
    if (user != null){
      this.logged = true;
      this.convidat = false;
      this.userId = user.id;
      this.rol = user.rol;
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  goToPerfil(){
    this.router.navigate(['/perfil']);
  }

}
