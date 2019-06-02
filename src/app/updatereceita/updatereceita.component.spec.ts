import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatereceitaComponent } from './updatereceita.component';

describe('UpdatereceitaComponent', () => {
  let component: UpdatereceitaComponent;
  let fixture: ComponentFixture<UpdatereceitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatereceitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatereceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
