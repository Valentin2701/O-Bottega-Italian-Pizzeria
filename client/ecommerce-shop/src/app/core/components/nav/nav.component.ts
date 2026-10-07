import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Input() sidebarOpen = false;
  @Input() toggleSidebar = () => {};
  @Output() outputData = new EventEmitter<boolean>();
  constructor(public userService: UserService){}

  sendData(){
    this.outputData.emit(this.sidebarOpen);
  }
}
