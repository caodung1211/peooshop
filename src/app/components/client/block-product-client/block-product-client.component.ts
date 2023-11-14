import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-block-product-client',
  templateUrl: './block-product-client.component.html',
  styleUrls: ['./block-product-client.component.scss'],
})
export class BlockProductClientComponent implements OnInit, OnChanges {
  @Input() products: any;
  @Input() columns: any;

  maxWidth = '';

  constructor(private DataBroadcastService: DataBroadcastService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.getListLike();
  }

  ngOnInit() {
    this.maxWidth = 100 / this.columns + '%';
  }

  addToCart(id: any) {
    this.DataBroadcastService.addToCart({
      id: id,
      type: 'addToCart',
    });
  }

  likeProduct(id: any) {
    this.products.map((x: any) => {
      if (x.id === id) {
        x.like = !x.like;
      }
      return x;
    });
    this.DataBroadcastService.addToCart({
      id: id,
      type: 'likeProduct',
    });
  }

  getListLike() {
    let likeIds = localStorage.getItem('like')
      ? JSON.parse(localStorage.getItem('like') || '')
      : {
          number: 0,
          ids: [],
        };
    if (likeIds.ids.length > 0) {
      console.log(this.products);
      this.products.map((x: any) => {
        likeIds.ids.map((z: any) => {
          if (x.id === z) {
            x.like = true;
          }
          return z;
        });
        return x;
      });
    }
  }
}
