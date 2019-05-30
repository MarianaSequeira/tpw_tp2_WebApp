import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarreceitaComponent } from './adicionarreceita.component';

describe('AdicionarreceitaComponent', () => {
  let component: AdicionarreceitaComponent;
  let fixture: ComponentFixture<AdicionarreceitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarreceitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarreceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
