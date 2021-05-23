import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil/perfil.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  public userId: string;
  public user: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;

  constructor(private router: Router, private perfilService: PerfilService) {
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
    let userInfo = JSON.parse(localStorage.getItem('user'));

    this.userId = userInfo.id;
    this.user = userInfo.username;
    this.firstName = userInfo.first_name;
    this.lastName = userInfo.last_name;
    this.email = userInfo.email;
    this.phone = userInfo.phone;
  }

  editProfile(){
    let token = JSON.parse(localStorage.getItem('token'));
    this.perfilService.editProfile(this.userId, this.user, this.password, this.firstName, this.lastName, this.email, this.phone, token);
  }

}
