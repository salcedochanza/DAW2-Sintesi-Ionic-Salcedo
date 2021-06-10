import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  public userId: string;
  public userGroups: any;

  public id: string;
  public titol: string;
  public descripcio: string;
  public explicacio: string;
  public categoria: string;
  public tipus_disponibilitat: string;
  public disponibilitat: string;
  public tipus: string;
  public canvas: string;
  public videorecurs: any;
  public propietari: string;

  constructor(private router: Router, private recursService: RecursosService, private activatedRoute: ActivatedRoute, private _sanitizer: DomSanitizer) {
    this.checkUserLogged();
    this.checkUserGroups();

    let id: string;
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params['id'] != null ) {
          id = params['id'];
          this.recursService.getRecurs(id).subscribe(
            (result:any) => {
              this.id = result.recurs[0].id;
              this.titol = result.recurs[0].titol;
              this.descripcio = result.recurs[0].descripcio;
              this.explicacio = result.recurs[0].explicacio;
              this.categoria = result.recurs[0].categoria;
              this.tipus_disponibilitat = result.recurs[0].tipus_disponibilitat;
              this.disponibilitat = result.recurs[0].disponibilitat;
              this.tipus = result.recurs[0].tipus;
              if (this.tipus == '1' || this.tipus == '2'){
                this.videorecurs = "http://localhost/DAW/M7_PHP/DAW2-Sintesi-Api-Salcedo/files/" + result.recurs[0].videorecurs;
              } else if (this.tipus == '3') {
                // loadYoutubePlayer(this.videorecurs);
                this.videorecurs = this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + result.recurs[0].videorecurs);
              } else if (this.tipus == '4'){
                this.canvas = "data:image/png;base64," + result.recurs[0].canvas;
              }
              this.propietari = result.recurs[0].propietari;

              if (this.rol != "admin"){
                if (this.userId != this.propietari){
                  if (this.tipus_disponibilitat == '1'){
                    let valGroup: boolean = false;
                    this.userGroups.forEach(
                      (element: any) => {
                        if (element.name == this.disponibilitat){
                          valGroup = true;
                        }
                      });
                    if (!valGroup){
                      alert("No estàs inclos en aquest grup d'usuari");
                      this.goToHome();
                    }               
                  } else if (this.tipus_disponibilitat == '2'){
                    let valRol:boolean = false;
    
                    if (this.rol == this.disponibilitat) {
                      valRol = true;
                    }
                    if (!valRol){
                      alert("No tens el rol necessari");
                      this.goToHome();
                    } 
                  } else if (this.tipus_disponibilitat == '3'){
                    let codi = prompt("Entra el codi necessari per entrar al recurs:", "");
                    if(codi != this.disponibilitat){
                      alert("Codi incorrecte");
                      this.goToHome();
                    }
                  } else {}
                }
              }
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
      this.userId = user.id;
    }
  }

  checkUserGroups(){
    this.userGroups = JSON.parse(localStorage.getItem('userGroup'));
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  goToPerfil(){
    this.router.navigate(['/perfil']);
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

}
