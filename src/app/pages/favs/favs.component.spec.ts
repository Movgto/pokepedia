import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavsComponent } from './favs.component';

describe('FavsComponent', () => {
  let component: FavsComponent;
  let fixture: ComponentFixture<FavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
