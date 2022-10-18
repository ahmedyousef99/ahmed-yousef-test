import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownLocationComponent } from './components/drop-down-location/drop-down-location.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [DropDownLocationComponent, HeaderComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [DropDownLocationComponent, HeaderComponent],
})
export class SharedModule {}
