import { Component, OnDestroy } from '@angular/core';                                                                                                                                    
  import { CommonModule } from '@angular/common';                                                                                                                                          
  import { FormsModule } from '@angular/forms';                                                                                                                                            
  import { IonContent, ViewWillEnter, ViewWillLeave } from '@ionic/angular/standalone';                                                                                                    
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
  export class TopicsPage implements ViewWillEnter, ViewWillLeave, OnDestroy {                                                                                                             
                                                                                                                                                                                           
    topics: Topic[] = [];                                                                                                                                                                  
    filteredTopics: Topic[] = [];                                                                                                                                                          
                                                                                                                                                                                           
    searchTerm = "";                                                                                                                                                                       
    searchBy: 'title' | 'creator' = 'title';                                                                                                                                               
                                                                                                                                                                                           
    showPopup = false;                                                                                                                                                                     
    newTopicTitle = "";                                                                                                                                                                    
                                                                                                                                                                                           
    private pollingInterval: any;                                                                                                                                                          
                                                                                                                                                                                           
    constructor(                                                                                                                                                                           
      private message: Message,                                                                                                                                                            
      private router: Router                                                                                                                                                               
    ) {}                                                                                                                                                                                   
                                                                                                                                                                                           
    ionViewWillEnter() {                                                                                                                                                                   
      this.searchTerm = "";                                                                                                                                                                
      this.searchBy = "title";                                                                                                                                                             
      this.loadTopics();                                                                                                                                                                   
      this.startPolling();                                                                                                                                                                 
    }                                                                                                                                                                                      
                                                                                                                                                                                           
    ionViewWillLeave() {                                                                                                                                                                   
      this.stopPolling();                                                                                                                                                                  
    }                                                                                                                                                                                      
                                                                                                                                                                                           
    ngOnDestroy() {                                                                                                                                                                        
      this.stopPolling();                                                                                                                                                                  
    }                                                                                                                                                                                      
                                                                                                                                                                                           
    startPolling() {                                                                                                                                                                       
      this.pollingInterval = setInterval(() => {                                                                                                                                           
        this.loadTopics();                                                                                                                                                                 
      }, 3000);                                                                                                                                                                            
    }                                                                                                                                                                                      
                                                                                                                                                                                           
    stopPolling() {                                                                                                                                                                        
      if (this.pollingInterval) {                                                                                                                                                          
        clearInterval(this.pollingInterval);                                                                                                                                               
        this.pollingInterval = null;                                                                                                                                                       
      }                                                                                                                                                                                    
    }                                                                                                                                                                                      
                                                                                                                                                                                           
    loadTopics() {                                                                                                                                                                         
      this.message.sendMessage("getTopics", {}).subscribe(res => {                                                                                                                         
        if(res.status === "ok") {                                                                                                                                                          
          this.topics = res.data.topics;                                                                                                                                                   
          this.filterTopics();                                                                                                                                                             
        }                                                                                                                                                                                  
        else {                                                                                                                                                                             
          this.stopPolling();                                                                                                                                                              
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