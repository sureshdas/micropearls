import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceImageComponent } from './resource-image.component';

describe('ResourceImageComponent', () => {
  let component: ResourceImageComponent;
  let fixture: ComponentFixture<ResourceImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourceImageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
