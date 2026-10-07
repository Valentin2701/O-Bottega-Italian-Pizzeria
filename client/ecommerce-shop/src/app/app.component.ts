import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ecommerce-shop';

  isLoading: Observable<boolean>;

  sidebarOpen = true;

  constructor(
    private loadingService: LoadingService
  ) {
    this.isLoading = this.loadingService.loading$;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  getOutput(sidebarOpen: boolean) {
    this.sidebarOpen = sidebarOpen;
  }
}