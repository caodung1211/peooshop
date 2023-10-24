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
      { label: 'Còn hàng', value: true },
      { label: 'Hết hàng', value: false },
    ],
    dropdownBranch: [
      { label: 'Tất cả', value: null },
      { label: 'CNK', value: 'CNK' },
      { label: 'Shein', value: 'Shein' },
    ]
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.handleColumns();
    this.handleDataTable();

    this.objectOption = {...this.objectOption,...this.optionCustomize}
    console.log(this.objectOption)
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
          z.stock_status = z.stock_status === '1' ? 'Còn hàng' : 'Hết hàng';
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
}
