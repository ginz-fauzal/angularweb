import { Component } from '@angular/core';
import { ImportsModule } from '../../import/import';

@Component({
  selector: 'app-user',
  imports: [ImportsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {


  constructor(){

  }

  
}
