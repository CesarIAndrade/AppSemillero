import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalMultiusePage } from './modal-challenge-question.page';

describe('ModalMultiusePage', () => {
  let component: ModalMultiusePage;
  let fixture: ComponentFixture<ModalMultiusePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMultiusePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalMultiusePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
