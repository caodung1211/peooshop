import { Component } from '@angular/core';
import { sharedFunctitonService } from 'src/app/service/admin/sharedFunction.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menu: any[] = [];
  isAdmin = false
  toggleShow = true

  constructor(private DataBroadcastService:DataBroadcastService,private sharedFunctitonService: sharedFunctitonService) {
    this.toggleShow = localStorage.getItem('toggleNav') === 'true' ? true : false
console.log(this.toggleShow)
    if(this.sharedFunctitonService.isAdmin()){
        this.menu = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/admin/dashboard'] }
                ]
            },
            {
                label: 'Đơn hàng',
                items: [
                    { label: 'Tạo đơn hàng mới', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/admin/orders/create'] },
                    { label: 'Danh sách đơn hàng', icon: 'pi pi-fw pi-list', routerLink: ['/admin/orders/list'] }
    
                ]
            },
            {
                label: 'Sản phẩm',
                items: [
                    {
                        label: 'Danh sách sản phẩm', icon: 'pi pi-fw pi-box', routerLink: ['/admin/products'],
                        // items: [
                        //     {
                        //         label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                        //         items: [
                        //             { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                        //             { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                        //             { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                        //         ]
                        //     },
                        //     {
                        //         label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                        //         items: [
                        //             { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                        //         ]
                        //     },
                        // ]
                    },
                    {
                        label: 'Danh mục', icon: 'pi pi-fw pi-book', routerLink: ['/admin/categories'],
                    },
                    {
                        label: 'Danh mục size', icon: 'pi pi-fw pi-book', routerLink: ['/admin/size'],
                    },
                    {
                        label: 'Danh mục màu', icon: 'pi pi-fw pi-book', routerLink: ['/admin/color'],
                    }
                ]
            },
            {
                label: 'Hình ảnh',
                items: [
                    {
                        label: 'Danh sách hình ảnh', icon: 'pi pi-fw pi-images', routerLink: ['/admin/library']
                    }
                ]
            },
            {
                label: 'Quản lý khách hàng',
                items: [
                    {
                        label: 'Quản lý khách hàng/CTV', icon: 'pi pi-fw pi-users', routerLink: ['/admin/collab']
                    },
                    // {
                    //     label: 'Quản lý khách hàng', icon: 'pi pi-fw pi-bookmark', routerLink: ['/admin/customer']
                    // }
                ]
            },
          ];
      }else{
        this.menu = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/admin/dashboard'] }
                ]
            },
            {
                label: 'Đơn hàng',
                items: [
                    { label: 'Tạo đơn hàng mới', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/admin/orders/create'] },
                    { label: 'Danh sách đơn hàng', icon: 'pi pi-fw pi-list', routerLink: ['/admin/orders/list'] }
    
                ]
            },
            {
                label: 'Sản phẩm',
                items: [
                    {
                        label: 'Danh sách sản phẩm', icon: 'pi pi-fw pi-box', routerLink: ['/admin/products'],
                    },
                    {
                        label: 'Danh mục', icon: 'pi pi-fw pi-book', routerLink: ['/admin/categories'],
                    },
                    {
                        label: 'Danh mục size', icon: 'pi pi-fw pi-book', routerLink: ['/admin/size'],
                    },
                    {
                        label: 'Danh mục màu', icon: 'pi pi-fw pi-book', routerLink: ['/admin/color'],
                    }
                ]
            },
            {
                label: 'Quản lý khách hàng',
                items: [
                    {
                        label: 'Quản lý khách hàng', icon: 'pi pi-fw pi-users', routerLink: ['/admin/collab']
                    },
                ]
            },
          ];
      }

  }

  ngOnInit() {
  }
  toggle(){
    this.toggleShow = !this.toggleShow
    this.DataBroadcastService.changeMessage('toggle');
    localStorage.setItem('toggleNav',this.toggleShow.toString())
  }
}