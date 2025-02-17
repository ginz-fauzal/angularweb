import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ImportsModule } from '../../import/import'
import { MenuItem, MessageService } from 'primeng/api';
import { HomeService } from "./home.service";
import { ScrollPanel } from 'primeng/scrollpanel';

@Component({
  selector: 'app-home',
  imports: [ImportsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MessageService]
})
export class HomeComponent implements OnInit,AfterViewInit{
    
  @ViewChild('scrollPanel') scrollPanel!: ScrollPanel;
  data:any=[];
  message:string ='';
  name:string = 'Damn';
  email:any= '';
  chats: any[] = [];


  constructor(
    private messageService: MessageService,
    private homeService:HomeService, 
    private ngZone: NgZone
  ) {
    
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  formatTimestamp(timestamp: any): string {
    if (!timestamp || !timestamp.seconds) {
      return '';
    }

    const date = new Date(timestamp.seconds * 1000);
    const now = new Date();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      return date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return date.toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  }

  ngOnInit() {
    this.homeService.getUser().subscribe((user) => {
      if (user) {
        const email =user.email
        this.email=email
        console.log(this.email)
      }
    });
    this.homeService.getChats((chats) => {
      this.chats = chats;
      this.scrollToBottom()
      console.log('Chats updated:', this.chats);
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      const container = this.scrollPanel.el.nativeElement.querySelector('.p-scrollpanel-content');
      container.scrollTop = container.scrollHeight;
    }, 0);
  }

  onContentUpdated() {
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.message) {
      this.homeService.addChat(this.name, this.email, this.message);
      this.message = ''; 
    } else {
      console.error('All fields are required!');
    }
  }

  logout() {
    this.homeService.logout()
  }
}
