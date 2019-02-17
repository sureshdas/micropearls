import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsPearlComponent } from './tips-pearl.component';

describe('TipsPearlComponent', () => {
  let component: TipsPearlComponent;
  let fixture: ComponentFixture<TipsPearlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TipsPearlComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsPearlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
