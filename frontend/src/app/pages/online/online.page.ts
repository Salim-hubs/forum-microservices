import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, ViewWillEnter } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { Message } from 'src/app/services/message';

@Component({
  selector: 'app-online',
  templateUrl: './online.page.html',
  styleUrls: ['./online.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class OnlinePage implements ViewWillEnter {
  users: { login: string; connected: boolean }[] = [];

  constructor(private message: Message,
    private router: Router  
  ) {}

  ionViewWillEnter() {
    this.message.sendMessage("getOnlineUsers", {}).subscribe(res => {
      if(res.status === "ok") {
        this.users = res.data.users;
      }
      else {
        this.router.navigate(["login"]);
      }
    });
  }
}
