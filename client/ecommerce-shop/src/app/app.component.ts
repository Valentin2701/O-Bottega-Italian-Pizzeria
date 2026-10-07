import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';
import { Observable } from 'rxjs';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecommerce-shop';
  isLoading: Observable<boolean>;

  sidebarOpen: boolean = true;

  constructor(private userService: UserService, private loadingService: LoadingService){
    this.isLoading = this.loadingService.loading$;
  }

  ngOnInit(): void {
      this.userService.initializeUser();
  }

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }

  getOutput(sidebarOpen: boolean){
    this.sidebarOpen = sidebarOpen;
  }
}
