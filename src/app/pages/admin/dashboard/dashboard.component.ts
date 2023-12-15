import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { dashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data_doanhthu: any = {
    labels: ['Tháng 1', 'Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
    datasets: [
        {
            label: 'Doanh thu',
            backgroundColor: '#9CCC65',
            borderColor: '#7CB342',
            data: []
        }
    ]
}
;
  data_order: any;
  dataCount = [
    {
      name: "Số đơn hàng trong tháng",
      number: 0,
      type: 'text',
      color: "#00c0ef",
      icon: "pi-chart-line"
    }, {
      name: "Doanh thu trong tháng",
      number: 0,
      type: 'price',
      color: "#00c0ef",
      icon: "pi-money-bill"
    }, {
      name: "Số lượng sản phẩm tồn kho",
      number: 0,
      type: 'text',
      color: "#00c0ef",
      icon: "pi-inbox"
    }, {
      name: "Số CTV",
      number: 0,
      type: 'text',
      color: "#00c0ef",
      icon: "pi-users"
    }
  ]
    constructor(private dashboardService:dashboardService){

    }

  ngOnInit() {
    this.loadData(moment().format('YYYY-MM-DD'))
  }

  loadData(current_day:any){

    this.dashboardService.getData({current_day: current_day }).subscribe(res=>{
        this.dataCount[0].number = res.order
        this.dataCount[1].number = res.totalOrder
        this.dataCount[2].number = res.totalProduct
        this.dataCount[3].number = res.totalCollab

        this.data_order = {
            labels: ['Chờ xử lý','Đang xử lý','Đang giao hàng'],
            datasets: [
                {
                    data: [res.order_waiting, res.order_processing, res.order_delivering],
                    backgroundColor: [
                        "#fdc14d",
                        "#36a3f7",
                        "#2bcb98"
                    ],
                    hoverBackgroundColor: [
                        "#fdc14d",
                        "#36a3f7",
                        "#2bcb98"
                    ]
                }]    
            };
    })

    // this.data_doanhthu 


  }
}
