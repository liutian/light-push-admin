import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewEmitterComponent } from './overview-emitter.component';

describe('OverviewEmitterComponent', () => {
  let component: OverviewEmitterComponent;
  let fixture: ComponentFixture<OverviewEmitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewEmitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewEmitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
