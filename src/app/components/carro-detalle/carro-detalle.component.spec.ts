import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroDetalleComponent } from './carro-detalle.component';

describe('CarroDetalleComponent', () => {
  let component: CarroDetalleComponent;
  let fixture: ComponentFixture<CarroDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarroDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarroDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
