import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcePresentationComponent } from './resource-presentation.component';

describe('ResourcePresentationComponent', () => {
  let component: ResourcePresentationComponent;
  let fixture: ComponentFixture<ResourcePresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcePresentationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
