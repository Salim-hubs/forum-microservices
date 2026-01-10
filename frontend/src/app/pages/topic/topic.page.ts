import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';

import { HeaderComponent } from 'src/app/components/header/header.component';

import { Message } from 'src/app/services/message';

interface MessageItem {
  id: number;
  content: string;
  creator: string;
  date: string;
}

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class TopicPage implements ViewWillEnter {
  @ViewChild(IonContent) content!: IonContent;

  topicId!: number;
  topicTitle = "";
  messages: MessageItem[] = [];
  newMessage = "";

  constructor(
    private route: ActivatedRoute,
    private messageService: Message,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.newMessage = "";
    this.topicId = +this.route.snapshot.paramMap.get('id')!;
    this.loadTopic();
  }

  loadTopic() {
    this.messageService.sendMessage("getMessages", { id: this.topicId })
      .subscribe(res => {
        if(res.status === "ok") {
          this.topicTitle = res.data.title;
          this.messages = res.data.messages;

          setTimeout(() => {
            this.content.scrollToBottom(300);
          }, 50);
        }
        else {
          this.router.navigate(["login"]);
        }
      });
  }

  postMessage() {
    if(!this.newMessage.trim()) return;

    this.messageService.sendMessage("postMessage", {
      topicId: this.topicId,
      content: this.newMessage.trim()
    }).subscribe(res => {
      if(res.status === "ok") {
        this.newMessage = "";
        this.loadTopic(); // recharge messages + update counts
      } else {
        alert(res.data.reason);
      }
    });
  }
}
