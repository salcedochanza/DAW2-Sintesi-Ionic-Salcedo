import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecursosService } from 'src/app/services/recursos/recursos.service';

@Component({
  selector: 'app-show-recurs',
  templateUrl: './show-recurs.page.html',
  styleUrls: ['./show-recurs.page.scss'],
})
export class ShowRecursPage implements OnInit {

  public convidat: boolean = true;
  public logged: boolean;
  public rol: string;

  public id: string;
  public titol: string;
  public descripcio: string;
  public disponibilitat: string;
  public categoria: string;
  public explicacio: string;

  constructor(private router: Router, private recursService: RecursosService, private activatedRoute: ActivatedRoute) {
    this.checkUserLogged();

    let id: string;
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params['id'] != null ) {
          id = params['id'];
          this.recursService.getRecurs(id).subscribe(
            (result:any) => {
              console.log(result);
              this.id = result.recurs[0].id;
              this.titol = result.recurs[0].titol;
              this.descripcio = result.recurs[0].descripcio;
              this.disponibilitat = result.recurs[0].disponibilitat;
              this.categoria = result.recurs[0].categoria;
              this.explicacio = result.recurs[0].explicacio;
              console.log(this.id);

              localStorage.setItem('token', JSON.stringify(result.token));
            }, (error: any) => {
              localStorage.setItem('token', JSON.stringify(error.error.token));
              alert(error.error.message);
            }
          );
        } 
      }
    );
  }

  ngOnInit(): void {
  }

  checkUserLogged(){
    let user = JSON.parse(localStorage.getItem('user'));
    if (user != null){
      this.logged = true;
      this.convidat = false;

      this.rol = user.rol;
    }
  }

}
