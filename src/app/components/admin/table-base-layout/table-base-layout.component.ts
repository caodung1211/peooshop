import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { IConfigTableBase } from './table-base-layout.model';
import { Table } from 'primeng';

@Component({
  selector: 'app-table-base-layout',
  templateUrl: './table-base-layout.component.html',
  styleUrls: ['./table-base-layout.component.scss'],
})
export class TableBaseLayoutComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() dataTable!: any[];
  @Input() columns!: any[];
  @Input() optionCustomize!: any;
  @Input() isScreen!: any;
  
  @Input() config!: IConfigTableBase;
  @Input() showCurrentPageReport = false;
  
  @Output() actionTable = new EventEmitter<any>();

  @ViewChild('dt') table: Table;

  pageSizeOptions = [5, 10, 20, 50, 100];
  pageSize = 10;

  objectFilter: any = {};
  congfigWidthColumns: any = [];

  minWidthColumn = 0;

  widthCheckBox = 30;
  widthStt = 30;
  widthActions = 140;

  objectOption: any = {
    statusEnable: [
      { label: 'Tất cả', value: null },
      { label: 'Kích hoạt', value: true },
      { label: 'Không kích hoạt', value: false },
    ],
    dropdownStock: [
      { label: 'Tất cả', value: null },
      { label: 'Còn hàng', value: 1 },
      { label: 'Hết hàng', value: 0 },
    ],
    dropdownBranch: [
      { label: 'Tất cả', value: null },
      { label: 'CNK', value: 'CNK' },
      { label: 'Shein', value: 'Shein' },
    ],
    statusOrder: [
      { label: 'Tất cả', value: null },
      { label: 'Order', value: 'Order' },
      { label: 'Chờ xử lý', value: 'Chờ xử lý' },
      { label: 'Đang xử lý', value: 'Đang xử lý' },
      { label: 'Đang giao hàng', value: 'Đang giao hàng' },
      { label: 'Hoàn thành', value: 'Hoàn thành' },
      { label: 'Hủy', value: 'Hủy' },
    ],
    shippingOrder: [
      { label: 'Tất cả', value: null },
      { label: 'GHTK', value: 'GHTK' },
      { label: 'Trong ngày', value: 'Trong ngày' }
    ]
  };

  onChangeStatusOrder = [
    { label: 'Order', value: 'Order',id: 5 },
    { label: 'Chờ xử lý', value: 'Chờ xử lý',id: 1 },
    { label: 'Đang xử lý', value: 'Đang xử lý',id: 2 },
    { label: 'Đang giao hàng', value: 'Đang giao hàng',id: 3},
    { label: 'Hoàn thành', value: 'Hoàn thành',id: 4 },
    { label: 'Hủy', value: 'Hủy',id: 0 },
  ]

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.handleColumns();
    this.handleDataTable();

    this.objectOption = {...this.objectOption,...this.optionCustomize}
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  handleColumns() {
    this.congfigWidthColumns = [];
    if (this.config.checkbox) {
      this.dataTable.map((x: any) => {
        x.checkbox = false;
        return x;
      });
    }

    if (this.config.stt) {
      this.dataTable.map((x: any, index: number) => {
        x.stt = index + 1;
        return x;
      });
    }

    this.columns.map((x: any) => {
      this.objectFilter[x.field] = '';
      return x;
    });

    this.setWidthColumns();
  }

  setWidthColumns() {
    let totalWidthCustom = 0;
    let totalColumns = 0;

    this.columns.map((x: any) => {
      if (x.visible) {
        if(x.customWidth){
          totalWidthCustom += x.customWidth;
        }else{
          totalWidthCustom += 0;
          totalColumns += 1;
        }
      }
    });

    totalWidthCustom = totalWidthCustom + (this.config.stt ? this.widthStt : 0) + (this.config.checkbox ? this.widthCheckBox : 0) + (this.config.actions ? this.widthActions : 0);

    this.minWidthColumn = (document.getElementsByClassName('getWidth')[0].clientWidth - totalWidthCustom) / totalColumns;


    this.columns.map((x: any, index: number) => {
      if (x.visible) {
        if (x.customWidth) {
          this.congfigWidthColumns.push(x.customWidth);
        } else {
          this.congfigWidthColumns.push(this.minWidthColumn);
        }
      }
      return x;
    });
  }

  handleDataTable() {
    this.columns.map((x: any) => {
      if (x.field === 'stock_status') {
        this.dataTable.map((z) => {
          z.stock_status = z.stock_status === 1 ? 'Còn hàng' : 'Hết hàng';
          return z;
        });
      }
      return x;
    });
  }

  tableAction(action: string, dataItem: any) {
    let dataEmit = {
      type: action,
      data: dataItem,
    };
    this.actionTable.emit(dataEmit);
  }

  hanldeChangeStatus(type:string,data: any, id: string) {
    this.actionTable.emit({
      type: type,
      id: id,
      data: data,
    });
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

  changeStatusOrder($event:any,id:any){
    if($event.value)
    this.actionTable.emit({
      type: 'status_order',
      id: id,
      data: this.onChangeStatusOrder.filter((x:any)=>{return x.value === $event.value})[0].id
    });
  }
}
