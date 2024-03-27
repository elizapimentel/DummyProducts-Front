import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByCategoryComponent } from './get-by-category.component';

describe('GetByCategoryComponent', () => {
  let component: GetByCategoryComponent;
  let fixture: ComponentFixture<GetByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetByCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
