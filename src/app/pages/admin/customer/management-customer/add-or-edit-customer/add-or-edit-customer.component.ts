import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as CryptoJS from "crypto-js";

import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { Inject } from '@angular/core';
import moment from 'moment';
import 'moment/locale/vi';
import { cloneDeep } from 'lodash';
import { managementCollabService } from '../../management-collab/management-collab.service';

@Component({
  selector: 'app-add-or-edit-customer',
  templateUrl: './add-or-edit-customer.component.html',
  styleUrls: ['./add-or-edit-customer.component.scss'],
})
export class AddOrEditCustomerComponent {
  currentData: any;
  header = '';
  imgFile: any;
  id = '';

  optionRole = [
    { label: 'CTV', value: 'collab' },
    { label: 'Khách hàng', value: 'customer' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddOrEditCustomerComponent>,
    private managementCollabService: managementCollabService,
    private DataBroadcastService: DataBroadcastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = this.data.data.id;
    this.header = this.data.header;

    if (this.data.data.id) {
      this.loadData(this.id);
      this.currentData = this.data.data;
    } else {
      this.currentData = {
        name: '',
        role: 'customer',
        password: '',
        username: '',
        birthday_date: '',
        avatar: '',
        total_order: null,
        total_sales: null,
        address: '',
        last_active: '',
        created_date: '',
        status: true,
      };
    }
  }

  ngOnInit() {}

  loadData(id: string) {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.managementCollabService.getDetailCustomer(id).subscribe((res) => {
      this.currentData = res.data;

      this.currentData.birthday_date = moment(
        Number(this.currentData.birthday_date)
      ).format('YYYY-MM-DD');
      this.currentData.created_date = moment(
        Number(this.currentData.created_date)
      ).format('DD/MM/YYYY');
      this.currentData.status = this.currentData.status === '1' ? true : false;

      this.DataBroadcastService.changeMessage('hideLoadding');
    });
  }

  onSubmit(type: string) {
    this.DataBroadcastService.changeMessage('showLoadding');

    let payload = cloneDeep(this.currentData);
    payload.created_date = this.toTimestamp(payload.created_date);
    payload.birthday_date = new Date(payload.birthday_date).getTime();
    payload.password = this.logMd5(payload.password)
    payload.last_active = Date.now();

    // console.log( payload )
    if (this.imgFile) {
      const formdata = new FormData();
      formdata.append('image', this.imgFile);
      this.managementCollabService.uploadImage(formdata).subscribe((res) => {
          this.currentData.avatar = res.url;
          payload.avatar = res.url;

          if (type === 'add') {
            this.managementCollabService
              .createCustomer(payload)
              .subscribe((resCreate) => {
      
                  this.DataBroadcastService.changeAlert({
                    type: 'success',
                    title: 'Thành công',
                    message: res.message,
                  });

                this.DataBroadcastService.changeMessage('hideLoadding');

                this.dialogRef.close(true);
              },error=>{
                this.DataBroadcastService.changeAlert({
                  type: 'error',
                  title: 'Thất bại',
                  message: error.error.message,
                });
                this.DataBroadcastService.changeMessage('hideLoadding');
              });
          } else {
            this.managementCollabService
              .editCustomer(payload.id, payload)
              .subscribe((resCreate) => {
                  this.DataBroadcastService.changeAlert({
                    type: 'success',
                    title: 'Thành công',
                    message: res.message,
                  });
                  this.DataBroadcastService.changeMessage('hideLoadding');

                this.dialogRef.close(true);
                } ,err=> {
                  this.DataBroadcastService.changeAlert({
                    type: 'error',
                    title: 'Thất bại',
                    message: err.error.message,
                  });
                  this.DataBroadcastService.changeMessage('hideLoadding');

                this.dialogRef.close(true);
                }
                
              );
          }

      });
    } else {
      this.currentData.avatar = this.currentData.avatar
        ? this.currentData.avatar
        : 'https://peooshop.top/wp/wp-content/themes/peooshop/images/no_image.png';

      payload.avatar = payload.avatar
        ? payload.avatar
        : 'https://peooshop.top/wp/wp-content/themes/peooshop/images/no_image.png';

      if (type === 'add') {
        this.managementCollabService
          .createCustomer(payload)
          .subscribe((resCreate) => {
     
              this.DataBroadcastService.changeAlert({
                type: 'success',
                title: 'Thành công',
                message: resCreate.message,
              });

            this.DataBroadcastService.changeMessage('hideLoadding');

            this.dialogRef.close(true);
          },error=>{
            this.DataBroadcastService.changeAlert({
              type: 'error',
              title: 'Thất bại',
              message: error.error.message,
            });
            this.DataBroadcastService.changeMessage('hideLoadding');
          });
      } else {
        this.managementCollabService
          .editCustomer(payload.id, payload)
          .subscribe((resCreate) => {
        
              this.DataBroadcastService.changeAlert({
                type: 'success',
                title: 'Thành công',
                message: resCreate.message,
              });

              this.DataBroadcastService.changeMessage('hideLoadding');

            this.dialogRef.close(true);

            } ,errCreate=> {
              this.DataBroadcastService.changeAlert({
                type: 'error',
                title: 'Thất bại',
                message: errCreate.error.message,
              });

              this.DataBroadcastService.changeMessage('hideLoadding');

            this.dialogRef.close(true);

            }
            
          );
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  hanldeChangeStatus($event: any) {
    console.log($event);
  }

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.imgFile = e.target.files[0];
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.currentData.avatar = reader.result;
  }

  toTimestamp(myDate: any) {
    myDate = myDate.split('/');
    let newDate: any = new Date(myDate[2], myDate[1] - 1, myDate[0]);
    var datum = Date.parse(newDate);
    return datum / 1000;
  }

  private logMd5(data:string) {
    const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(data));
    return(hash.toString(CryptoJS.enc.Hex))
  }
}
