import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipestableComponent } from './recipestable.component';

describe('RecipestableComponent', () => {
  let component: RecipestableComponent;
  let fixture: ComponentFixture<RecipestableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipestableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipestableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
