import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ForumsService } from "src/app/services/forums.service";

@Component({
  selector: "app-forum-chat",
  templateUrl: "./forum-chat.page.html",
  styleUrls: ["./forum-chat.page.scss"],
})
export class ForumChatPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private forumsSvc: ForumsService
  ) {}

  ngOnInit() {
    this.getForumComments();
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  @Input() topic: string;
  @Input() subTopic: string;
  @Input() forumId: string;
  comments: any[] = [];
  user: any;
  comment: string;

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  getForumComments() {
    this.forumsSvc
      .getForumComments(this.forumId)
      .then((res: any) => {
        console.log(res);
        this.comments = res;
      })
      .catch((err) => console.log(err));
  }

  sendComment(comment) {
    this.forumsSvc
      .commentInForum(comment, this.forumId, this.user.idRegistro)
      .then((res) => {
        this.getForumComments();
        this.forumsSvc.refresh$.emit();
      })
      .catch((err) => console.log(err));
  }
}
