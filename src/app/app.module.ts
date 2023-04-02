import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NavComponent } from './shared/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainComponent } from './shared/main/main.component';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './shared/header/header.component';
import { BpObserverService } from './shared/services/bp-observer.service';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { TopOfPageComponent } from './shared/components/top-of-page/top-of-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './shared/components/login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    HeaderComponent,
    SignUpComponent,
    PageNotFoundComponent,
    TopOfPageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [BpObserverService],
  bootstrap: [AppComponent],
})
export class AppModule {}
