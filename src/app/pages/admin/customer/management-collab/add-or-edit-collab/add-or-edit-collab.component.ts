import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { managementCollabService } from '../management-collab.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { Inject } from '@angular/core';
import moment from 'moment';
import 'moment/locale/vi';
import { cloneDeep } from 'lodash';
import * as CryptoJS from 'crypto-js';
import tinh from '../../../../../shared/JSON/tinh.json';

@Component({
  selector: 'app-add-or-edit-collab',
  templateUrl: './add-or-edit-collab.component.html',
  styleUrls: ['./add-or-edit-collab.component.scss'],
})
export class AddOrEditCollabComponent {
  currentData: any;
  header = '';
  imgFile: any;
  id = '';

  optionRole = [
    { label: 'CTV', value: 'collab' },
    { label: 'Khách hàng', value: 'customer' },
  ];

  listCity: any;
  listDistricts: any;
  listWards: any;

  constructor(
    public dialogRef: MatDialogRef<AddOrEditCollabComponent>,
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
        role: 'collab',
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
        city: '',
        districts: '',
        wards: '',
        phone: ''
      };
    }
  }

  ngOnInit() {
    this.listCity = tinh;
  }

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

      this.changeOptionCity('city', true)
      this.changeOptionCity('districts', true)

      this.DataBroadcastService.changeMessage('hideLoadding');
    });
  }

  onSubmit(type: string) {
    this.DataBroadcastService.changeMessage('showLoadding');

    let payload = cloneDeep(this.currentData);
    payload.created_date = this.toTimestamp(payload.created_date);
    payload.birthday_date = new Date(payload.birthday_date).getTime();
    payload.password = this.logMd5(payload.password);

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
                },err => {
                  this.DataBroadcastService.changeAlert({
                    type: 'error',
                    title: 'Thất bại',
                    message: res.message,
                  });
                this.DataBroadcastService.changeMessage('hideLoadding');

                this.dialogRef.close(true);
              });
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
        this.managementCollabService.createCustomer(payload).subscribe(
          (resCreate) => {
            this.DataBroadcastService.changeAlert({
              type: 'success',
              title: 'Thành công',
              message: resCreate.message,
            });
            this.DataBroadcastService.changeMessage('hideLoadding');

            this.dialogRef.close(true);
          },
          (error) => {
            console.log(error);
            this.DataBroadcastService.changeAlert({
              type: 'error',
              title: 'Thất bại',
              message: error.error.message,
            });
            this.DataBroadcastService.changeMessage('hideLoadding');
          }
        );
      } else {
        this.managementCollabService
          .editCustomer(payload.id, payload)
          .subscribe(
            (resCreate) => {
              this.DataBroadcastService.changeAlert({
                type: 'success',
                title: 'Thành công',
                message: resCreate.message,
              });

              this.DataBroadcastService.changeMessage('hideLoadding');

              this.dialogRef.close(true);
            },
            (error) => {
              console.log(error);
              this.DataBroadcastService.changeAlert({
                type: 'error',
                title: 'Thất bại',
                message: error.error.message,
              });
              this.DataBroadcastService.changeMessage('hideLoadding');
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

  private logMd5(data: string) {
    const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(data));
    return hash.toString(CryptoJS.enc.Hex);
  }

  changeOptionCity(type: string, loaddata?: boolean) {
    switch (type) {
      case 'city':
        this.listDistricts = [];
        this.listCity.map((x: any) => {
          if (x.Id === this.currentData.city) {
            this.listDistricts = x.Districts;
          }
          return x;
        });
        if(!loaddata){
          this.currentData.districts = null;
          this.currentData.wards = null;
        }

        break;
      case 'districts':
        this.listWards = [];

        if(!loaddata){
          this.currentData.wards = null;
        }

        this.listDistricts.map((x: any) => {
          if (x.Id === this.currentData.districts) {
            this.listWards = x.Wards;
          }
          return x;
        });

        break;

      case 'wards':
        break;
      default:
        break;
    }
  }

}
