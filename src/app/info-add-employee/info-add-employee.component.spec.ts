import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAddEmployeeComponent } from './info-add-employee.component';

describe('InfoAddEmployeeComponent', () => {
  let component: InfoAddEmployeeComponent;
  let fixture: ComponentFixture<InfoAddEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAddEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoAddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
