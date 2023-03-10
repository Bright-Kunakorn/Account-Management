import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignedDashboardComponent } from './resigned-dashboard.component';

describe('ResignedDashboardComponent', () => {
  let component: ResignedDashboardComponent;
  let fixture: ComponentFixture<ResignedDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResignedDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResignedDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
