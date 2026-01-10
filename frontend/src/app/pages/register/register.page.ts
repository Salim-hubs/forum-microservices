import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { HeaderComponent } from 'src/app/components/header/header.component';

import { Message } from 'src/app/services/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class RegisterPage {
  login = "";
  password = "";
  passwordConfirm = "";

  constructor(
    private message: Message,
    private router: Router
  ) {}

  register() {
    const login = this.login.trim();
    const password = this.password.trim();
    const confirm = this.passwordConfirm.trim();

    if (!login || !password || password !== confirm) return;

    this.message.sendMessage("register", { login, password })
      .subscribe(res => {
        if (res.status === "ok") {
          this.login = "";
          this.password = "";
          this.passwordConfirm = "";
          this.router.navigate(["topics"]);
        } else {
          alert(res.data.reason);
          console.log(res.data.reason);
        }
      });
  }

  goToLogin() {
    this.router.navigate(["login"]);
  }
}
