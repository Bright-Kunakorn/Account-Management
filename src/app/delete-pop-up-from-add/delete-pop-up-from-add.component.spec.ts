import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePopUpFromAddComponent } from './delete-pop-up-from-add.component';

describe('DeletePopUpFromAddComponent', () => {
  let component: DeletePopUpFromAddComponent;
  let fixture: ComponentFixture<DeletePopUpFromAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePopUpFromAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePopUpFromAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
