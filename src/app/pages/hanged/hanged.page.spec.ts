import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HangedPage } from './hanged.page';

describe('HangedPage', () => {
  let component: HangedPage;
  let fixture: ComponentFixture<HangedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HangedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
