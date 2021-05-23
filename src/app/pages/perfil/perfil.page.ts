import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public user;
  public userGroups = [];

  constructor(private router: Router) {
    this.checkUserLogged();
  }

  ngOnInit(): void {
  }

  checkUserLogged(){
    let user = JSON.parse(localStorage.getItem('user'));
    if (user == null){
      this.router.navigate(['/login']);
    } else {
      this.getUserInfo();
    }
  }

  getUserInfo(){
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userGroups = JSON.parse(localStorage.getItem('userGroup'));
  }

  editProfile(){
    this.router.navigate(['/perfil/edit']);
  }

}
