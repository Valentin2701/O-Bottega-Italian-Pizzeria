import { Component } from '@angular/core';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.css']
})
export class GlobalErrorComponent {
  error$ = this.errorService.error$;

  constructor(private errorService: ErrorService) {}

  closeError(): void {
    this.errorService.clearError();
  }
}
