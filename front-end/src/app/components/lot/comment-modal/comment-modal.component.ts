import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent {
  @Input() lotSlug: string = '';
  newComment: { name: string, text: string } = {
    name: "",
    text: "",
  };

  constructor(public activeModal: NgbActiveModal) { }

  saveComment() {
    this.activeModal.close(this.newComment);
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
