import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitastagComponent } from './receitastag.component';

describe('ReceitastagComponent', () => {
  let component: ReceitastagComponent;
  let fixture: ComponentFixture<ReceitastagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitastagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitastagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
