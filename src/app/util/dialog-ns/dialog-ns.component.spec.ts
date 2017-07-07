import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNsComponent } from './dialog-ns.component';

describe('DialogNsComponent', () => {
  let component: DialogNsComponent;
  let fixture: ComponentFixture<DialogNsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
