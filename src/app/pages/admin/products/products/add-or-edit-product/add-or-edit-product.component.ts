import { Component, Inject } from '@angular/core';
import { DialogModule, InputSwitchModule, MessageService } from 'primeng';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { productsService } from '../products.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ErrorsMessageModule } from 'src/app/components/admin/errors-message/errors-message.module';
import { MatSelectModule } from '@angular/material/select';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-add-or-edit-product',
  templateUrl: './add-or-edit-product.component.html',
  styleUrls: ['./add-or-edit-product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    ErrorsMessageModule,
    InputSwitchModule,
    MatSelectModule,
    DialogModule
  ],
})
export class AddOrEditProductComponent {
  currentData: any = {};
  id = '';
  header = '';
  imgFile: any;
  imgGalleryUpload: any = []


  optionDropdow: any = {
    stock: [
      { label: 'Còn hàng', id: 1 },
      { label: 'Hết hàng', id: 0 },
    ],
    branch:[
      { label: 'CNK', id: 'CNK' },
      { label: 'Shein', id: 'Shein' }
    ],
    category: [],
    size: [],
    color: [],
  };

  tempCategory:any = []
  tempSize:any = []
  tempColor:any = []
  tempGallery:any = []

  lightBoxImg = false
  lightBoxImgURL = ''

  constructor(
    public dialogRef: MatDialogRef<AddOrEditProductComponent>,
    private productsService: productsService,
    private DataBroadcastService: DataBroadcastService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = this.data.data.id;
    this.header = this.data.header;

    this.optionDropdow.category = cloneDeep(this.data.data.listCategory)
    this.optionDropdow.category.shift()

    this.optionDropdow.size = cloneDeep(this.data.data.listSize)
    this.optionDropdow.size.shift()

    this.optionDropdow.color = cloneDeep(this.data.data.listColor)
    this.optionDropdow.color.shift()

    if (this.data.data.id) {
      this.loadData(this.id);
    } else {
      this.currentData = {
        id: '',
        name: '',
        description: '',
        category: '',
        avatar: '',
        sale: false,
        status: true,
        stock_status: '',
        quantity: '',
        color: '',
        size: '',
        price_cost: '',
        price: '',
        price_collab: '',
        price_sale: '',
        gallery: []
      };
    }
  }

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

  ngOnInit() {}

  loadData(id: string) {
    this.imgGalleryUpload = []

    this.DataBroadcastService.changeMessage('showLoadding');
console.log(this.optionDropdow)
    this.productsService.getDetailProduct(id).subscribe((res) => {
      this.currentData = res.data;
      JSON.parse(res.data.gallery).map((x:any,index:number)=>{
        this.tempGallery.push({img: x, id: index})
      })
      // this.tempCategory = [12,13,14]
      this.tempCategory = this.currentData.category.split(',').map((x:any)=>{
        return parseInt(x, 10)
      });

      this.tempSize = this.currentData.size.split(',').map((x:any)=>{
        return parseInt(x, 10)
      });;

      this.tempColor = this.currentData.color.split(',').map((x:any)=>{
        return parseInt(x, 10)
      });;

      this.currentData.status = this.currentData.status === 1 ? true : false;
      this.currentData.sale = this.currentData.sale === 1 ? true : false;
      this.DataBroadcastService.changeMessage('hideLoadding');
    });
  }

  onSubmit(type: string) {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.currentData.category = this.tempCategory.toString();
    this.currentData.size = this.tempSize.toString();
    this.currentData.color = this.tempColor.toString();
console.log(this.currentData.category)
    // if (this.imgFile) {
    //   const formdata = new FormData();
    //   formdata.append('image', this.imgFile);
    //   this.productsService.uploadImage(formdata).subscribe((res) => {
    //     if (res.status === 200) {
    //       this.currentData.avatar = res.url;

    //       if(this.imgGalleryUpload && this.imgGalleryUpload.length > 0){

    //         this.currentData.gallery = []

    //         this.currentData.gallery = this.tempGallery.filter((x:any)=>{
    //           if(x.img.substring(0,10) !== "data:image"){
    //             return x
    //           }
    //         }).map((z:any)=>{
    //           return z.img
    //         })

    //           const formdataImgGalleryUpload = new FormData();

    //           for(var i = 0; i <  this.imgGalleryUpload.length; i++)  {  
    //             formdataImgGalleryUpload.append("image[]",  this.imgGalleryUpload[i]);
    //           } 

    //           this.productsService.uploadImageMulti(formdataImgGalleryUpload).subscribe((resImgGalleryUpload) => {
    //             this.currentData.gallery = this.currentData.gallery.concat(resImgGalleryUpload.url)

    //               if (type === 'add') {
    //                 this.productsService
    //                   .createProduct(this.currentData)
    //                   .subscribe((resCreate) => {
    //                     if (resCreate.status === 200) {
    //                       this.dialogRef.close(true);
    //                       this.alertSuccess('Thành công', resCreate.message);
    //                       this.DataBroadcastService.changeMessage('hideLoadding');
    //                     } else {
    //                       this.DataBroadcastService.changeMessage('hideLoadding');
        
    //                       this.alertFailed('Thất bại', resCreate.message);
    //                     }
    //                   });
    //               } else {
    //                 this.productsService
    //                   .editProduct(this.id, this.currentData)
    //                   .subscribe((resCreate) => {
    //                     if (resCreate.status === 200) {
    //                       this.DataBroadcastService.changeMessage('hideLoadding');
    //                       this.dialogRef.close(true);
    //                       this.alertSuccess('Thành công', resCreate.message);
    //                     } else {
    //                       this.DataBroadcastService.changeMessage('hideLoadding');
        
    //                       this.alertFailed('Thất bại', resCreate.message);
    //                     }
    //                   });
    //               }

    //           }) 
    //       }else{
         
    //         if (type === 'add') {
    //           this.productsService
    //             .createProduct(this.currentData)
    //             .subscribe((resCreate) => {
    //               if (resCreate.status === 200) {
    //                 this.dialogRef.close(true);
    //                 this.alertSuccess('Thành công', resCreate.message);
    //                 this.DataBroadcastService.changeMessage('hideLoadding');
    //               } else {
    //                 this.DataBroadcastService.changeMessage('hideLoadding');
  
    //                 this.alertFailed('Thất bại', resCreate.message);
    //               }
    //             });
    //         } else {
    //           this.productsService
    //             .editProduct(this.id, this.currentData)
    //             .subscribe((resCreate) => {
    //               if (resCreate.status === 200) {
    //                 this.DataBroadcastService.changeMessage('hideLoadding');
    //                 this.dialogRef.close(true);
    //                 this.alertSuccess('Thành công', resCreate.message);
    //               } else {
    //                 this.DataBroadcastService.changeMessage('hideLoadding');
  
    //                 this.alertFailed('Thất bại', resCreate.message);
    //               }
    //             });
    //         }
    //       }

    //     } else {
    //       this.DataBroadcastService.changeMessage('hideLoadding');

    //       this.alertFailed('Thất bại', res.message);
    //     }
    //   });
    // } else {
    //   this.currentData.avatar = this.currentData.avatar
    //     ? this.currentData.avatar
    //     : 'https://peooshop.top/wp/wp-content/themes/peooshop/images/no_image.png';

    //     if(this.imgGalleryUpload && this.imgGalleryUpload.length > 0){

    //       this.currentData.gallery = []

    //       this.currentData.gallery = this.tempGallery.filter((x:any)=>{
    //         if(x.img.substring(0,10) !== "data:image"){
    //           return x
    //         }
    //       }).map((z:any)=>{
    //         return z.img
    //       })

    //         const formdataImgGalleryUpload = new FormData();

    //         for(var i = 0; i <  this.imgGalleryUpload.length; i++)  {  
    //           formdataImgGalleryUpload.append("image[]",  this.imgGalleryUpload[i]);
    //         } 
    //         this.productsService.uploadImageMulti(formdataImgGalleryUpload).subscribe((resImgGalleryUpload) => {
    //           this.currentData.gallery = this.currentData.gallery.concat(resImgGalleryUpload.url)

    //             if (type === 'add') {
    //               this.productsService
    //                 .createProduct(this.currentData)
    //                 .subscribe((resCreate) => {
    //                   if (resCreate.status === 200) {
    //                     this.dialogRef.close(true);
    //                     this.alertSuccess('Thành công', resCreate.message);
    //                     this.DataBroadcastService.changeMessage('hideLoadding');
    //                   } else {
    //                     this.DataBroadcastService.changeMessage('hideLoadding');
      
    //                     this.alertFailed('Thất bại', resCreate.message);
    //                   }
    //                 });
    //             } else {
    //               this.productsService
    //                 .editProduct(this.id, this.currentData)
    //                 .subscribe((resCreate) => {
    //                   if (resCreate.status === 200) {
    //                     this.DataBroadcastService.changeMessage('hideLoadding');
    //                     this.dialogRef.close(true);
    //                     this.alertSuccess('Thành công', resCreate.message);
    //                   } else {
    //                     this.DataBroadcastService.changeMessage('hideLoadding');
      
    //                     this.alertFailed('Thất bại', resCreate.message);
    //                   }
    //                 });
    //             }

    //         }) 
    //     }else{
       
    //       if (type === 'add') {
    //         this.productsService
    //           .createProduct(this.currentData)
    //           .subscribe((resCreate) => {
    //             if (resCreate.status === 200) {
    //               this.dialogRef.close(true);
    //               this.alertSuccess('Thành công', resCreate.message);
    //               this.DataBroadcastService.changeMessage('hideLoadding');
    //             } else {
    //               this.DataBroadcastService.changeMessage('hideLoadding');

    //               this.alertFailed('Thất bại', resCreate.message);
    //             }
    //           });
    //       } else {
    //         this.productsService
    //           .editProduct(this.id, this.currentData)
    //           .subscribe((resCreate) => {
    //             if (resCreate.status === 200) {
    //               this.DataBroadcastService.changeMessage('hideLoadding');
    //               this.dialogRef.close(true);
    //               this.alertSuccess('Thành công', resCreate.message);
    //             } else {
    //               this.DataBroadcastService.changeMessage('hideLoadding');

    //               this.alertFailed('Thất bại', resCreate.message);
    //             }
    //           });
    //       }
    //     }

      
    // }
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

  removeGallery(id:string){
    this.tempGallery = this.tempGallery.filter((x:any)=>{
      return x.id !== id
    })

    this.currentData.gallery = this.tempGallery.filter((x:any)=>{
      if(x.img.substring(0,10) !== "data:image"){
        return x
      }
    }).map((z:any)=>{
      return z.img
    })
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
      this.imgGalleryUpload.push(e.target.files[i])

      reader.onload = this._handleReaderLoadedImageGallery.bind(this);
      reader.readAsDataURL(file);
    }
  }
  _handleReaderLoadedImageGallery(e: any):void {
    let reader = e.target;
    this.tempGallery.push({img: reader.result, id: (Math.random() + 1).toString(36).substring(7)})
  }

  showLightBox($event:string){
    this.lightBoxImgURL = $event
    this.lightBoxImg =true
  }

}
