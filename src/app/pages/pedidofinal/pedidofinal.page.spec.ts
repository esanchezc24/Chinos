import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidofinalPage } from './pedidofinal.page';

describe('PedidofinalPage', () => {
  let component: PedidofinalPage;
  let fixture: ComponentFixture<PedidofinalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidofinalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidofinalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
