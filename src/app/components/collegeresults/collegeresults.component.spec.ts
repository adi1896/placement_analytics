import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeresultsComponent } from './collegeresults.component';

describe('CollegeresultsComponent', () => {
  let component: CollegeresultsComponent;
  let fixture: ComponentFixture<CollegeresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
