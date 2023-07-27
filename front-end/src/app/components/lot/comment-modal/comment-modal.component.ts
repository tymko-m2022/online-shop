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

  validName: boolean = false;
  validText: boolean = false;
  hideBtn: boolean = false;

  validWarnName: boolean = true;
  validWarnText: boolean = true;

  constructor(public activeModal: NgbActiveModal) { }

  changeField(event: Event) {
    const target = event.target as HTMLInputElement;
    let value = target.value;
    const fieldName = target.name;
    switch (fieldName) {
      case "name":
        this.validName = this.checkName(value);
        this.validWarnName = this.validName ? true : false;
        break;
      case "text":
        this.validText = this.checkDesc(value);
        this.validWarnText = this.validText ? true : false;
        break;
    }
    this.hideButton();
  }

  hideButton() {
    this.hideBtn = this.validName && this.validText;
  }

  checkName(value: string): boolean {
    if (!value) {
      return false;
    }
    const strRegExp: string = `[\\p{L}\`]{${value.length}}`;
    const regexp = new RegExp(strRegExp, "u");
    if (regexp.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  checkDesc(value: string): boolean {
    if (!value) {
      return false;
    } else {
      return true;
    }
  }

  saveComment() {

    this.activeModal.close(this.newComment);
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
