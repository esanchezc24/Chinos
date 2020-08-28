import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SedesPage } from './sedes.page';

describe('SedesPage', () => {
  let component: SedesPage;
  let fixture: ComponentFixture<SedesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SedesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SedesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
