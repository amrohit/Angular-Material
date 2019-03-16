import { AuthModule } from "./auth/auth.module";
import { UIService } from "./shared/ui.service";
import { MaterialModule } from "./material.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import {
  FirestoreSettingsToken,
  AngularFirestoreModule
} from "@angular/fire/firestore";

import { StoreModule } from "@ngrx/store";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { environment } from "../environments/environment";

import { WelcomeComponent } from "./welcome/welcome.component";
import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";
import { reducers } from "./app.reducer";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }, UIService],
  bootstrap: [AppComponent]
})
export class AppModule {}
