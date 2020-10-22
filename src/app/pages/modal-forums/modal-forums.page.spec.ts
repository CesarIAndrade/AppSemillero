import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalForumsPage } from './modal-forums.page';

describe('ModalForumsPage', () => {
  let component: ModalForumsPage;
  let fixture: ComponentFixture<ModalForumsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalForumsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalForumsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
