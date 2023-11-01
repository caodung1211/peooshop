import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { tableConfigService } from './table-name-config.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-table-name-config',
  templateUrl: './table-name-config.component.html',
  styleUrls: ['./table-name-config.component.scss'],
})
export class TableNameConfigComponent implements OnInit, OnChanges {
  selectedCategories: string[] = ['Technology', 'Sports'];

  @Input() group_name: string;
  @Input() showColumns: boolean;

  @Output() close = new EventEmitter<any>();

  columns: any = [];

  constructor(
    private tableConfigService: tableConfigService,
    private DataBroadcastService: DataBroadcastService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.loadData();
  }

  ngOnInit() {}

  loadData() {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.tableConfigService
      .getTableConfig(this.group_name)
      .subscribe((res: any) => {
        this.columns = JSON.parse(res.data);
        this.close.emit({
        reload: true,
          hide: false,
          data: JSON.parse(res.data),
        });
        this.DataBroadcastService.changeMessage('hideLoadding');
      });
  }

  onSubmit() {
    this.DataBroadcastService.changeMessage('showLoadding');

    let payload = {
      group_name: this.group_name,
      config_table: this.columns,
    };

    this.tableConfigService.editTableConfig(payload).subscribe((res: any) => {
      // this.columns = this.columns;
      this.close.emit({
      reload: true,
        hide: false,
        data: this.columns,
      });
      this.showColumns = false
      this.DataBroadcastService.changeMessage('hideLoadding');
    },err=>{
      this.DataBroadcastService.changeMessage('hideLoadding');
    }
    );
  }

  handleHideDialog($event: any) {
    this.close.emit({
      reload: false,
      hide: true,
      data: this.columns,
    });
  }
}
