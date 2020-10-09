import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalScoresPage } from './modal-scores.page';

describe('ModalScoresPage', () => {
  let component: ModalScoresPage;
  let fixture: ComponentFixture<ModalScoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalScoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalScoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
