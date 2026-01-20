  import { Component, OnDestroy } from '@angular/core';                                                                                                                                    
  import { CommonModule } from '@angular/common';                                                                                                                                          
  import { IonContent, ViewWillEnter, ViewWillLeave } from '@ionic/angular/standalone';                                                                                                    
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
  export class OnlinePage implements ViewWillEnter, ViewWillLeave, OnDestroy {                                                                                                             
    users: { login: string; connected: boolean }[] = [];                                                                                                                                   
                                                                                                                                                                                           
    private pollingInterval: any;                                                                                                                                                          
                                                                                                                                                                                           
    constructor(                                                                                                                                                                           
      private message: Message,                                                                                                                                                            
      private router: Router                                                                                                                                                               
    ) {}                                                                                                                                                                                   
                                                                                                                                                                                           
    ionViewWillEnter() {                                                                                                                                                                   
      this.loadUsers();                                                                                                                                                                    
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
        this.loadUsers();                                                                                                                                                                  
      }, 5000);                                                                                                                                                                            
    }                                                                                                                                                                                      
                                                                                                                                                                                           
    stopPolling() {                                                                                                                                                                        
      if (this.pollingInterval) {                                                                                                                                                          
        clearInterval(this.pollingInterval);                                                                                                                                               
        this.pollingInterval = null;                                                                                                                                                       
      }                                                                                                                                                                                    
    }                                                                                                                                                                                      
                                                                                                                                                                                           
    loadUsers() {                                                                                                                                                                          
      this.message.sendMessage("getOnlineUsers", {}).subscribe(res => {                                                                                                                    
        if(res.status === "ok") {                                                                                                                                                          
          this.users = res.data.users;                                                                                                                                                     
        }                                                                                                                                                                                  
        else {                                                                                                                                                                             
          this.stopPolling();                                                                                                                                                              
          this.router.navigate(["login"]);                                                                                                                                                 
        }                                                                                                                                                                                  
      });                                                                                                                                                                                  
    }                                                                                                                                                                                      
  } 