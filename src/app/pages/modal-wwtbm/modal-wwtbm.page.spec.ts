import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalWwtbmPage } from './modal-wwtbm.page';

describe('ModalWwtbmPage', () => {
  let component: ModalWwtbmPage;
  let fixture: ComponentFixture<ModalWwtbmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWwtbmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalWwtbmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
