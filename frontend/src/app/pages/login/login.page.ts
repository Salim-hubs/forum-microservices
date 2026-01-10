import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { HeaderComponent } from 'src/app/components/header/header.component';

import { Message } from 'src/app/services/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class LoginPage implements ViewWillEnter {
  login: string = "";
  password: string = "";

  ionViewWillEnter(): void {
    this.login = "";
    this.password = "";
  }

  constructor(
    private message: Message,
    private router: Router
  ) { }

  tryLogin() {
    const login = this.login.trim();
    const password = this.password.trim();

    if (!login || !password) return;

    this.message.sendMessage("tryLogin", {login, password}).subscribe(res => {
      if(res.status == "ok") {
        this.login = "";
        this.password = "";
        this.router.navigate(["topics"]);
      }
      else {
        alert(res.data.reason);
        console.log(res.data.reason);
      }
    })
  }

  goToRegister() {
    this.router.navigate(["register"]);
  }
}
