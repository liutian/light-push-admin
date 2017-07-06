import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewListComponent } from './overview-list.component';

describe('OverviewListComponent', () => {
  let component: OverviewListComponent;
  let fixture: ComponentFixture<OverviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
