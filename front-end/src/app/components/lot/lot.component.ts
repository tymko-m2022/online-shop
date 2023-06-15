import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LotService } from 'src/app/services/lot.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentModalComponent } from './comment-modal/comment-modal.component';


@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.scss']
})
export class LotComponent implements OnInit {
  lot: any;
  comments: string[] = [];
  newComment: string = "";

  constructor(
    private route: ActivatedRoute, 
    private lotService: LotService,
    private cartService: CartService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const lotSlug = params['slug'];
      this.lot = this.lotService.products.find(l => l.slug === lotSlug);
      setTimeout(() => {
        this.comments = this.lotService.getCommentsBySlug(lotSlug);
      });
    });
  }

  addToCart() {
    this.cartService.addToCart(this.lot);
  }

  openCommentModal() {
    const myModal = this.modalService.open(CommentModalComponent, { centered: true, modalDialogClass: 'my-modal', backdropClass: 'light-pink-backdrop' });
    myModal.componentInstance.lotSlug = this.lot.slug;
    myModal.result.then((newComment: string) => {
      if (newComment.trim() !== '') {
        let comment = newComment;
        const warningWords = ['кокос', 'банан', 'плохой'];
        warningWords.forEach(word => {
          const regex = new RegExp(word, 'gi');
          comment = comment.replace(regex, '*'.repeat(word.length));
        })

        const regex = new RegExp(/@/gi);
        comment = comment.replace(regex, '*');

        this.lotService.addComment(this.lot.slug, comment);
        this.comments = this.lotService.getCommentsBySlug(this.lot.slug);
      }
    }).catch(() => {});
  }
}
