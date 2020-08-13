import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubcategoriasPage } from './subcategorias.page';

describe('SubcategoriasPage', () => {
  let component: SubcategoriasPage;
  let fixture: ComponentFixture<SubcategoriasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoriasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubcategoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
