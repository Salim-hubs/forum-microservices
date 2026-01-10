import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { Message } from 'src/app/services/message';

interface Topic {
  id: number;
  title: string;
  messages: number;
  creator: string;
  date: string;
}

@Component({
  selector: 'app-topics',
  templateUrl: './topics.page.html',
  styleUrls: ['./topics.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class TopicsPage implements ViewWillEnter {

  topics: Topic[] = [];
  filteredTopics: Topic[] = [];

  searchTerm = "";
  searchBy: 'title' | 'creator' = 'title';

  showPopup = false;
  newTopicTitle = "";

  constructor(
    private message: Message,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.searchTerm = "";
    this.searchBy = "title";

    this.loadTopics();
  }

  loadTopics() {
    this.message.sendMessage("getTopics", {}).subscribe(res => {
      if(res.status === "ok") {
        this.topics = res.data.topics;
        this.filteredTopics = [...this.topics];
      }
      else {
        this.router.navigate(["login"]);
      }
    });
  }

  filterTopics() {
    const term = this.searchTerm.toLowerCase();
    if(!term) { this.filteredTopics = [...this.topics]; return; }

    this.filteredTopics = this.topics.filter(t => 
      this.searchBy === 'title' ? t.title.toLowerCase().includes(term)
                                : t.creator.toLowerCase().includes(term)
    );
  }

  openTopic(id: number) {
    this.router.navigate(["topic", id]);
  }

  openCreateTopicPopup() {
    this.newTopicTitle = "";
    this.showPopup = true;
  }

  createTopic() {
    if(!this.newTopicTitle.trim()) return;

    this.message.sendMessage("createTopic", { title: this.newTopicTitle.trim() })
      .subscribe(res => {
        if(res.status === "ok") {
          this.showPopup = false;
          this.router.navigate(["topic", res.data.id]);
        } else {
          alert(res.data.reason);
        }
      });
  }

  goToOnline() {
    this.router.navigate(["online"]);
  }
}
