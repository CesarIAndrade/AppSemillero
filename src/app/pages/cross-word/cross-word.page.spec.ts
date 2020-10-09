import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrossWordPage } from './cross-word.page';

describe('CrossWordPage', () => {
  let component: CrossWordPage;
  let fixture: ComponentFixture<CrossWordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossWordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrossWordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
