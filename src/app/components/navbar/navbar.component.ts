import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLoggedIn = false;
  public roles:string[] = [];

  constructor(private readonly keycloak: KeycloakService) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.roles = this.keycloak.getUserRoles();
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }

  private haveRoles = (requiredRoles:string[]) => requiredRoles.every(v => this.roles.includes(v));

  public authorizate(requiredRoles:string[]){
    return this.isLoggedIn && this.haveRoles(requiredRoles);
  }

}
