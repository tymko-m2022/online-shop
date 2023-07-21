import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LotService } from 'src/app/services/lot.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentModalComponent } from './comment-modal/comment-modal.component';
import { ExchangeRateService } from 'src/app/services/currency.service';
import { Lot } from 'src/app/models/lot.model';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.scss']
})
export class LotComponent implements OnInit {
  lot: any;
  comments: { name: string, text: string }[] = [];
  exchangeRate: number = 1;
  currency = "₴";
  newComment: { name: string, text: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private lotService: LotService,
    private cartService: CartService,
    private modalService: NgbModal,
    private exchangeRateService: ExchangeRateService
  ) { }

  updatePrice(price: number): number {
    return price * this.exchangeRate;
  }

  ngOnInit(): void {
    this.lotService.fetchLots();
    this.route.params.subscribe(params => {
      const lotSlug = params['slug'];
      this.lotService.lots$.subscribe((lots) => {
        this.lot = lots.find((lot) => lot.slug === lotSlug);
        if (this.lot) {
          this.lotService.getCommentsBySlug(this.lot.slug).subscribe((comments) => {
            this.comments = comments;
          });
          this.updatePrices();
        }
      });
    });

    this.exchangeRateService.exchangeRate$.subscribe((rate) => {
      this.exchangeRate = rate;
      switch (this.exchangeRateService.currency) {
        case "UAH":
          this.currency = "₴";
          break;
        case "USD":
          this.currency = "$";
          break;
        case "EUR":
          this.currency = "€";
          break;
      }
      this.updatePrices();
    });
  }

  addToCart() {
    if (this.lot) {
      this.cartService.addToCart(this.lot);
    }
  }

  updatePrices(): void {
    if (this.lot) {
      this.lot.exchangePrice = Number(this.updatePrice(this.lot.price).toFixed(2));
    }
  }

  openCommentModal() {
    if (this.lot) {
      const myModal = this.modalService.open(CommentModalComponent, { centered: true, modalDialogClass: 'my-modal', backdropClass: 'light-pink-backdrop' });
      myModal.componentInstance.lotSlug = this.lot.slug;
      myModal.result.then((newComment: { name: string, text: string }) => {
        if (newComment.text.trim() !== '') {
          let comment = newComment.text;
          const warningWords = ['кокос', 'банан', 'плохой'];
          warningWords.forEach(word => {
            const regex = new RegExp(word, 'gi');
            comment = comment.replace(regex, '*'.repeat(word.length));
          });

          const regex = new RegExp(/@/gi);
          comment = comment.replace(regex, '*');
          newComment.text = comment;

          if (this.lot) {
            this.lotService.addComment(this.lot.slug, newComment);
            this.lotService.getCommentsBySlug(this.lot.slug).subscribe((comments) => {
              this.comments = comments;
            });
          }
        }
      }).catch(() => { });
    }
  }
}