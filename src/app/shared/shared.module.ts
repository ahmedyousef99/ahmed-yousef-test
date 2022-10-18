import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownLocationComponent } from './components/drop-down-location/drop-down-location.component';

@NgModule({
  declarations: [DropDownLocationComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [DropDownLocationComponent],
})
export class SharedModule {}
