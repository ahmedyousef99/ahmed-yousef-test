import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownLocationComponent } from './drop-down-location.component';

describe('DropDownLocationComponent', () => {
  let component: DropDownLocationComponent;
  let fixture: ComponentFixture<DropDownLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
