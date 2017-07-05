import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsListComponent } from './ns-list.component';

describe('NsListComponent', () => {
  let component: NsListComponent;
  let fixture: ComponentFixture<NsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
