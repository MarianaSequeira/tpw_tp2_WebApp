import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiporeceitaComponent } from './tiporeceita.component';

describe('TiporeceitaComponent', () => {
  let component: TiporeceitaComponent;
  let fixture: ComponentFixture<TiporeceitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiporeceitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiporeceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
