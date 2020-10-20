import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForumChatPage } from './forum-chat.page';

describe('ForumChatPage', () => {
  let component: ForumChatPage;
  let fixture: ComponentFixture<ForumChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForumChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
