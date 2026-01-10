import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { Message } from 'src/app/services/message';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class ProfilePage implements ViewWillEnter {

  username = "";

  oldPassword = "";
  newPassword = "";
  confirmPassword = "";

  constructor(
    private message: Message,
    private router: Router
  ) {}

  async ionViewWillEnter() {
    this.message.sendMessage("getProfile", {}).subscribe(res => {
      if (res.status === "ok") {
        this.username = res.data.login;
      }
      else {
        this.router.navigate(["login"]);
      }
    });
  }

  changePassword() {
    if (!this.oldPassword || !this.newPassword || this.newPassword !== this.confirmPassword) return;

    this.message.sendMessage("changePassword", {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    }).subscribe(res => {
      if (res.status === "ok") {
        this.oldPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
        alert("Mot de passe mis à jour");
      } else {
        alert(res.data.reason);
      }
    });
  }

  logout() {
    this.message.sendMessage("logout", {}).subscribe(() => {
      this.router.navigate(["login"]);
    });
  }
}
