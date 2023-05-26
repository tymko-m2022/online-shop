import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.css']
})
export class LotComponent implements OnInit {
  lot: any;

  constructor(private route: ActivatedRoute, private lotService: LotService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const lotSlug = params['slug'];
      this.lot = this.lotService.products.find(l => l.slug === lotSlug);
    });
  }
}
