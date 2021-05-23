import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public convidat: boolean = true;
  public logged: boolean;
  public rol: string;
  constructor(private menu: MenuController, private router: Router) {
    this.checkUserLogged();
  }

  checkUserLogged(){
    let user = JSON.parse(localStorage.getItem('user'));
    if (user != null){
      this.logged = true;
      this.convidat = false;

      this.rol = user.rol;
    }
    
    console.log(this.logged);
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
    this.menu.close('first');
  }

  goToPerfil(){
    this.router.navigate(['/perfil']);
  }
}
