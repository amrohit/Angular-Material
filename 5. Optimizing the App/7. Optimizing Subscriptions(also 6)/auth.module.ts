import { MaterialModule } from "./../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireAuthModule } from "@angular/fire/auth";

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule, //Access to ngif and so on
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireAuthModule
  ],
  exports: []
})
export class AuthModule {}
