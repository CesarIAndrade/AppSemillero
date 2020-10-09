import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WordSoupPage } from './word-soup.page';

describe('WordSoupPage', () => {
  let component: WordSoupPage;
  let fixture: ComponentFixture<WordSoupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordSoupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WordSoupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
