import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  message='';


  constructor(
    private messageService: MessageService,
    private homeService:HomeService
  ) {
    
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngOnInit() {}

  scrollToBottom() {
    setTimeout(() => {
      const container = this.scrollPanel.el.nativeElement.querySelector('.p-scrollpanel-content');
      container.scrollTop = container.scrollHeight;
    }, 0);
  }

  onContentUpdated() {
    this.scrollToBottom();
  }

  logout() {
    this.homeService.logout()
  }
}
