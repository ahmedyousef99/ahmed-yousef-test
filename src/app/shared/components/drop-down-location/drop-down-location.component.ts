import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-drop-down-location',
  templateUrl: './drop-down-location.component.html',
  styleUrls: ['./drop-down-location.component.scss'],
})
export class DropDownLocationComponent implements OnInit {
  @Input() title: string = '';
  @Input() select: string = '';
  @Input() data: any[] = [];
  @Output() selctedValue: EventEmitter<any> = new EventEmitter<any>();
  @Input() all: boolean = true;
  constructor() {}

  ngOnInit(): void {}
  detectChanges(event: any) {
    this.selctedValue.emit(event);
  }
}
