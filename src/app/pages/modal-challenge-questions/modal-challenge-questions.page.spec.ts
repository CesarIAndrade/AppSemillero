import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalChallengeQuestionsPage } from './modal-challenge-questions.page';

describe('ModalChallengeQuestionsPage', () => {
  let component: ModalChallengeQuestionsPage;
  let fixture: ComponentFixture<ModalChallengeQuestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalChallengeQuestionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalChallengeQuestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
