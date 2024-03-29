import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
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
import { TopOfPageComponent } from './shared/components/top-of-page/top-of-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SideNavServiceService } from './shared/services/side-nav-service.service';
import { SnackbarService } from './shared/services/snackbar.service';
import { UserService } from './shared/services/user.service';
import { UserNavListComponent } from './shared/components/user-nav-list/user-nav-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderService } from './shared/services/loader.service';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    HeaderComponent,
    TopOfPageComponent,
    UserNavListComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    HttpClientModule,
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
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [
    BpObserverService,
    SideNavServiceService,
    SnackbarService,
    UserService,
    LoaderService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
