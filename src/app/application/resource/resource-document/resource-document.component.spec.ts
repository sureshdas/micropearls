import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDocumentComponent } from './resource-document.component';

describe('ResourceDocumentComponent', () => {
  let component: ResourceDocumentComponent;
  let fixture: ComponentFixture<ResourceDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourceDocumentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
