import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WwtbmPage } from './wwtbm.page';

describe('WwtbmPage', () => {
  let component: WwtbmPage;
  let fixture: ComponentFixture<WwtbmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WwtbmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WwtbmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
