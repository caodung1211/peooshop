import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng';
import { libraryService } from './library.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { productsService } from '../products/products/products.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  library: any = [];

  lightBoxImg = false;
  lightBoxImgURL = '';

  imgGalleryUpload: any = [];

  constructor(
    private confirmationService: ConfirmationService,
    private libraryService: libraryService,
    private DataBroadcastService: DataBroadcastService,
    private messageService: MessageService,
    private productsService: productsService
  ) {}

  alertSuccess(title: string, detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: detail,
      life: 5000,
    });
  }

  alertFailed(title: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: detail,
      life: 5000,
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.libraryService.getListLibrary().subscribe((res) => {
      this.library = res.url;


      this.DataBroadcastService.changeMessage('hideLoadding');
    });
  }

  addNew() {}

  showLightBox($event: string) {
    this.lightBoxImgURL = $event;
    this.lightBoxImg = true;
  }

  removeGallery(name: string) {
    this.confirmationService.confirm({
      message: 'Bạn muốn xóa ảnh này?',
      header: 'Xác nhận xóa ảnh',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.library = this.library.filter((x:any)=>{
        //   return x !== name
        // })
        this.DataBroadcastService.changeMessage('showLoadding');

        this.libraryService
          .removeLibrary({
            image: name.split(
              'http://peooshop.top/wp/wp-content/themes/peooshop/images/'
            )[1],
          })
          .subscribe((res) => {
            if (res.status === 200) {
              this.DataBroadcastService.changeAlert({
                type: "success",
                title:"Thành công",
                message: res.message
              });
              this.loadData();
              this.DataBroadcastService.changeMessage('hideLoadding');
            } else {
              this.DataBroadcastService.changeMessage('hideLoadding');

              this.DataBroadcastService.changeAlert({
                type: "error",
                title:"Thất bại",
                message: res.message
              });
            }

            this.DataBroadcastService.changeMessage('hideLoadding');
          });
      },
      reject: () => {},
    });
  }

  addGallery(e: any) {
    for (let i = 0; i < e.target.files.length; i++) {
      var file = e.dataTransfer ? e.dataTransfer.files[i] : e.target.files[i];
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      this.imgGalleryUpload.push(e.target.files[i]);

      reader.onload = this._handleReaderLoadedImageGallery.bind(this);
      reader.readAsDataURL(file);
    }

    this.upload();
  }

  _handleReaderLoadedImageGallery(e: any): void {
    let reader = e.target;
  }

  upload() {
    this.DataBroadcastService.changeMessage('showLoadding');

    const formdataImgGalleryUpload = new FormData();
    for (var i = 0; i < this.imgGalleryUpload.length; i++) {
      formdataImgGalleryUpload.append('image[]', this.imgGalleryUpload[i]);
    }

    this.productsService
      .uploadImageMulti(formdataImgGalleryUpload)
      .subscribe((res) => {
        this.DataBroadcastService.changeAlert({
          type: "success",
          title:"Thành công",
          message: res.message
        });
        this.loadData();
        this.DataBroadcastService.changeMessage('hideLoadding');
      });
  }
}




// console.log(res.split('<h1 class="product-name   product-name--xl_large js-product-name" itemprop="name">')[1].split('<span class="product-color"> ')[0])

// let countImg = res.split('<div class="carousel-inner js-carousel-inner" role="listbox" data-images-count="')[1].split('"')[0]


// let tempImg:any = []

// let string = res.split('<div class="carousel-inner js-carousel-inner" role="listbox"')[1].split('<a class="carousel-control-prev carousel-control carousel-prev js-carousel-control')[0]

// for (let i = 1; i <= countImg; i++) {
// tempImg.push(string.split('<img src="')[i].split("?")[0])
// }
// console.log(tempImg)

// console.log(res.split('content=\"SGD\" \/>\n<span class=\"sales \">\n')[1].split('</span>')[0])