import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceClinicalComponent } from './resource-clinical.component';

describe('ResourceClinicalComponent', () => {
  let component: ResourceClinicalComponent;
  let fixture: ComponentFixture<ResourceClinicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourceClinicalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceClinicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
