import { Component, OnInit } from '@angular/core';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ordersService } from '../orders-list.service';

import tinh from '../../../../../shared/JSON/tinh.json';


@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  totalOrder = 0
  currentData:any = {}

  listTimeline:any = []
  listAuthor:any = {}

  listAddress:any = []

  constructor(
    private DataBroadcastService: DataBroadcastService,
    private route: ActivatedRoute,
    private ordersService:ordersService,
    private router: Router
  ) {
    this.route.params.subscribe((params: any) => {
      this.loadData(params.id);
    });
  }

  ngOnInit() {
  }

  getListAddress(){
    tinh.map((x:any)=>{
      if(x.Id === this.currentData.city){
        this.listAddress.push({
          id: x.Id,
          name: x.Name
        })

        x.Districts.map((z:any)=>{
          if(z.Id === this.currentData.districts){
            this.listAddress.push({
              id: z.Id,
              name: z.Name
            })
            z.Wards.map((k:any)=>{
              if(k.Id === this.currentData.wards){
                this.listAddress.push({
                  id: k.Id,
                  name: k.Name
                })
              }
              return k
            })
          }
          return z
        })

        return x
      }
    })
    // console.log(this.listAddress)
  }

  loadData(id:any){
    this.DataBroadcastService.changeMessage('showLoadding');

    this.ordersService.getDetailOrder(id).subscribe(
      res=>{
        this.currentData = res.data

        if(this.currentData.status_order === 1){
          this.currentData.status_order = "Chờ xử lý";
        }else if(this.currentData.status_order === 2){
          this.currentData.status_order = "Đang xử lý";
        }else if(this.currentData.status_order === 3){
          this.currentData.status_order = "Đang giao hàng";
        }else if(this.currentData.status_order === 4){
          this.currentData.status_order = "Hoàn thành";
        }else if(this.currentData.status_order === 0){
          this.currentData.status_order = "Hủy";
        }
        this.currentData.created_by = this.currentData.author;
        this.currentData.update_by = this.currentData.author_update;

        this.listAuthor = {
          author: this.currentData.author,
          orderId: this.currentData.orderId,
          created_at: this.currentData.created_at,
        };

        this.getListAddress()

        this.DataBroadcastService.changeMessage('hideLoadding');
      },err=>{
        this.router.navigate([`/admin/orders/lisstnull`]); 
        this.DataBroadcastService.changeMessage('hideLoadding');
      }
    )

    this.ordersService.getListLogOrder(id).subscribe(res=>{
      this.listTimeline = res.data
    })
  
  }

  handleColor(type:string):any{
    switch (type) {
      case 'Chờ xử lý':
        return '#fdc14d'
      case 'Đang xử lý':
        return '#36a3f7'
      case 'Đang giao hàng':
        return '#36a3f7'
      case 'Hoàn thành':
        return '#2bcb98'
      case 'Hủy':
        return '#ff0000'
    }
  }
  

}
