import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/features.module';
import { HttpClientModule } from "@angular/common/http"
import { AppInterceptorProvider } from './core/interceptors/app.interceptor';
import { UserService } from './core/services/user.service';
import { GlobalErrorInterceptorProvider } from './core/interceptors/global-error.interceptor';

export function initializeUserFactory(userService: UserService): () => Promise<void> {
  return () => userService.initializeUser();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FeaturesModule,
    HttpClientModule,
  ],
  providers: [AppInterceptorProvider, GlobalErrorInterceptorProvider, {
    provide: APP_INITIALIZER,
    useFactory: initializeUserFactory,
    deps: [UserService],
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
