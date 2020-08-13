import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeadertituloatrasComponent } from './headertituloatras.component';

describe('HeadertituloatrasComponent', () => {
  let component: HeadertituloatrasComponent;
  let fixture: ComponentFixture<HeadertituloatrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadertituloatrasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeadertituloatrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
