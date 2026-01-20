  import { Component, OnDestroy } from '@angular/core';                                                                                                                                    
  import { CommonModule } from '@angular/common';                                                                                                                                          
  import { FormsModule } from '@angular/forms';                                                                                                                                            
  import { IonContent, ViewWillEnter, ViewWillLeave } from '@ionic/angular/standalone';                                                                                                    
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
  export class TopicPage implements ViewWillEnter, ViewWillLeave, OnDestroy {                                                                                                              
    @ViewChild(IonContent) content!: IonContent;                                                                                                                                           
                                                                                                                                                                                           
    topicId!: number;                                                                                                                                                                      
    topicTitle = "";                                                                                                                                                                       
    messages: MessageItem[] = [];                                                                                                                                                          
    newMessage = "";                                                                                                                                                                       
                                                                                                                                                                                           
    private pollingInterval: any;                                                                                                                                                          
    private lastMessageCount = 0;                                                                                                                                                          
                                                                                                                                                                                           
    constructor(                                                                                                                                                                           
      private route: ActivatedRoute,                                                                                                                                                       
      private messageService: Message,                                                                                                                                                     
      private router: Router                                                                                                                                                               
    ) {}                                                                                                                                                                                   
                                                                                                                                                                                           
    ionViewWillEnter() {                                                                                                                                                                   
      this.newMessage = "";                                                                                                                                                                
      this.topicId = +this.route.snapshot.paramMap.get('id')!;                                                                                                                             
      this.loadTopic();                                                                                                                                                                    
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
        this.loadTopicSilent();                                                                                                                                                            
      }, 3000);                                                                                                                                                                            
    }                                                                                                                                                                                      
                                                                                                                                                                                           
    stopPolling() {                                                                                                                                                                        
      if (this.pollingInterval) {                                                                                                                                                          
        clearInterval(this.pollingInterval);                                                                                                                                               
        this.pollingInterval = null;                                                                                                                                                       
      }                                                                                                                                                                                    
    }                                                                                                                                                                                      
                                                                                                                                                                                           
    loadTopic() {                                                                                                                                                                          
      this.messageService.sendMessage("getMessages", { id: this.topicId })                                                                                                                 
        .subscribe(res => {                                                                                                                                                                
          if(res.status === "ok") {                                                                                                                                                        
            this.topicTitle = res.data.title;                                                                                                                                              
            this.messages = res.data.messages;                                                                                                                                             
            this.lastMessageCount = this.messages.length;                                                                                                                                  
                                                                                                                                                                                           
            setTimeout(() => {                                                                                                                                                             
              this.content.scrollToBottom(300);                                                                                                                                            
            }, 50);                                                                                                                                                                        
          }                                                                                                                                                                                
          else {                                                                                                                                                                           
            this.stopPolling();                                                                                                                                                            
            this.router.navigate(["login"]);                                                                                                                                               
          }                                                                                                                                                                                
        });                                                                                                                                                                                
    }                                                                                                                                                                                      
                                                                                                                                                                                           
    loadTopicSilent() {                                                                                                                                                                    
      this.messageService.sendMessage("getMessages", { id: this.topicId })                                                                                                                 
        .subscribe(res => {                                                                                                                                                                
          if(res.status === "ok") {                                                                                                                                                        
            this.topicTitle = res.data.title;                                                                                                                                              
            this.messages = res.data.messages;                                                                                                                                             
                                                                                                                                                                                           
            if (this.messages.length > this.lastMessageCount) {                                                                                                                            
              this.lastMessageCount = this.messages.length;                                                                                                                                
              setTimeout(() => {                                                                                                                                                           
                this.content.scrollToBottom(300);                                                                                                                                          
              }, 50);                                                                                                                                                                      
            }                                                                                                                                                                              
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
          this.loadTopic();                                                                                                                                                                
        } else {                                                                                                                                                                           
          alert(res.data.reason);                                                                                                                                                          
        }                                                                                                                                                                                  
      });                                                                                                                                                                                  
    }                                                                                                                                                                                      
  }