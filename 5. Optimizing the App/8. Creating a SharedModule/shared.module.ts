import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule, //Access to ngif and so on
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule, //Access to ngif and so on
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule {}
