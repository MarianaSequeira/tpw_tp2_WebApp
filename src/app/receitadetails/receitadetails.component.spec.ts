import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitadetailsComponent } from './receitadetails.component';

describe('ReceitadetailsComponent', () => {
  let component: ReceitadetailsComponent;
  let fixture: ComponentFixture<ReceitadetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitadetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitadetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
