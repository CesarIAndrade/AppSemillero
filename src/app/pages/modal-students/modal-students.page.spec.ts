import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalStudentsPage } from './modal-students.page';

describe('ModalStudentsPage', () => {
  let component: ModalStudentsPage;
  let fixture: ComponentFixture<ModalStudentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalStudentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalStudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
