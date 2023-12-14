import { Component, OnInit, OnDestroy } from '@angular/core';
import tinh from '../../../shared/JSON/tinh.json';
import { salesService } from './sales.service';
import { EventSourceService } from 'src/app/service/admin/event-source.service';
import { productsService } from '../products/products/products.service';
import { managementCollabService } from '../customer/management-collab/management-collab.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit, OnDestroy {

  dataOrder: any = {};
  dataSearch: any = [];

  isType = 'ADD';

  keySearchProduct = '';

  currentData: any = {
    userId: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    districts: '',
    wards: '',
    // isSaveAddress: false,
    shipping: 'GHTK',
    note: '',
  };

  currentOrder: any = {
    totalPrice: 0,
    discount: 0,
    shipping_price: 0,
    totalOrder: 0,
    note: ''
  };

  code_discount = '';
  errCodeDiscount = false;

  methodShip = [
    { value: 'GHTK', id: 'GHTK' },
    { value: 'Trong ngày', id: 'trong-ngay' },
  ];

  listCartOrder: any = []

  listCity: any;
  listDistricts: any;
  listWards: any;

  ids: any = [];
  messages: any = [];

  listUser: any = [];
  listProductSearch: any = [];
  listProduct: any = [];

  isSearchFocused = false;
  isUserOld = false

  constructor(
    public salesService: salesService,
    private productsService: productsService,
    private managementCollabService: managementCollabService,
    private DataBroadcastService:DataBroadcastService
  ) {}

  ngOnInit() {
    this.listCity = tinh;

    // this.currentOrder.shipping_price = 30000;
    this.countOrder();

    // this.searchUser(this.currentData.name)
    // this.searchProduct(this.keySearchProduct)
    this.getListProduct();

    let container: any = document.getElementById('search_id');

    let list_data: any = document.getElementById('list-data');

    list_data.style.display = 'none';

    document.addEventListener('click', function (event: any) {
      const clickedInside = container?.contains(event.target);
      if (!clickedInside) {
        list_data.style.display = 'none';
      }
    });
  }

  showPopupSearchProduct(isShow: string) {
    let list_data: any = document.getElementById('list-data');
    list_data.style.display = isShow;
  }

  addItem(item: any) {
    if (this.listCartOrder.length > 0) {
      let foundElement = this.listCartOrder.find((x: any) => {
        return x.id === item.id;
      });

      if (foundElement) {
        this.listCartOrder.map((x: any) => {
          if (x.id === foundElement.id) {
            x.quantity += 1;
          }
          return x;
        });
      } else {
        this.listCartOrder.push({
          id: item.id,
          quantity: 1,
          avatar: item.avatar,
          name: item.name,
          price: item.sale === 1 ? item.price_sale : item.price,
          branch: item.branch
        })
      }
    } else {
      this.listCartOrder.push({
        id: item.id,
        quantity: 1,
        avatar: item.avatar,
        name: item.name,
        price: item.sale === 1 ? item.price_sale : item.price,
        branch: item.branch
      })
    }

    this.countOrder();
  }

  getListProduct() {
    this.productsService.getListProduct().subscribe((res) => {
      this.listProduct = res.data.filter((x: any) => {
        x.stock = x.stock_status === 1 ? 'Còn hàng' : 'Hết hàng';
        return x;
      });
    });

    this.managementCollabService.getListAllUser().subscribe((res) => {
      
      this.listUser = res.data.map((x: any) => {
        x.label = x.name;
        x.value = x.id;
        return x;
      });
      this.listUser.unshift({label: '-- Tên khách hàng/CTV --',value: ''})
    });
  }

  searchUser(name: string) {
    // this.eventSourceService.disconnect();
    // this.listUser = []
    // this.eventSourceService.connect(name,'user').subscribe(
    //   (message: any) => {
    //     // this.messages.push(message);
    //     this.listUser = message.map((x:any)=>{
    //       return {
    //         label: x.name,
    //         value: x.id
    //       }
    //     })
    //   },
    //   error => {
    //     console.error('Error:', error);
    //   }
    // );
  }

  onChangeUserName(userId:any) {
    let customer = this.listUser.filter((x:any)=>{
      return x.id === userId
    })
    this.currentData.userId = customer[0].id
    this.currentData.name = customer[0].name
    this.currentData.phone = customer[0].phone
    this.currentData.address = customer[0].address
    this.currentData.city = customer[0].city
    this.currentData.districts = customer[0].districts
    this.currentData.wards = customer[0].wards

    this.changeOptionCity('city', true)
    this.changeOptionCity('districts', true)
  }

  countOrder() {
    this.currentOrder.totalPrice = 0
    this.listCartOrder.map((x: any) => {
      x.total = x.quantity * x.price
      this.currentOrder.totalPrice += x.total;
      // if (x.sale === 1) {
      // } else {
      //   this.currentOrder.totalPrice += x.total;
      // }
      return x;
    });

    this.currentOrder.totalOrder =
      this.currentOrder.totalPrice +
      this.currentOrder.shipping_price -
      this.currentOrder.discount;
  }

  onSubmit() {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.currentOrder.discount_code = this.currentOrder.discount > 0 ? this.code_discount : ''
    this.listCartOrder.discount_code = this.currentOrder.discount > 0 ? this.code_discount : ''


    let payload = {
      customer: this.currentData,
      orderDetail: this.listCartOrder,
      order: this.currentOrder,
    }
    // console.log(payload)

    this.salesService.creatrOrder(payload).subscribe(
      res=>{
        this.DataBroadcastService.changeAlert({
          type: 'success',
          title: 'Thành công',
          message: "Thêm đơn hành công!",
        });
        this.resetForm()
        this.DataBroadcastService.changeMessage('hideLoadding');
      },
      err=>{
        this.DataBroadcastService.changeAlert({
          type: 'error',
          title: 'Thất bại',
          message: err.error.message,
        });
        this.DataBroadcastService.changeMessage('hideLoadding');
      }
    )
  }

  resetForm(){
    this.currentData = {
      userId: '',
      name: '',
      phone: '',
      address: '',
      city: '',
      districts: '',
      wards: '',
      // isSaveAddress: false,
      shipping: 'GHTK',
      note: '',
    };
    this.listCartOrder = []
    this.code_discount = ''
    this.currentOrder = {
      totalPrice: 0,
      discount: 0,
      shipping_price: 0,
      totalOrder: 0,
      note: ''
    };
  }

  onChangeSearchProduct() {
    this.listProductSearch = this.listProduct.filter((x: any) => {
      if (
        x.name
          .toLowerCase()
          .trim()
          .includes(this.keySearchProduct.toLowerCase().trim())
      ) {
        return x;
      }
    });
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

  ApplyDiscount() {
    if (this.code_discount === '123') {
      this.currentOrder.discount = 200000;
      this.countOrder();
      this.errCodeDiscount = false;
    } else {
      this.errCodeDiscount = true;
    }
  }

  changeUserOld(){
    this.currentData = {}
  }

  removeItemCart(id:string){
    this.listCartOrder = this.listCartOrder.filter((x:any)=>{
      return x.id !== id
    })
    this.countOrder();
  }

  ngOnDestroy() {}
}
