import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menu: any[] = [];

  constructor() { }

  ngOnInit() {
      this.menu = [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin/dashboard'] }
            ]
        },
        {
            label: 'Bán hàng',
            items: [
                { label: 'Thêm đơn hàng', icon: 'pi pi-fw pi-home', routerLink: ['/admin/sales'] }
            ]
        },
        {
            label: 'Sản phẩm',
            items: [
                {
                    label: 'Danh sách sản phẩm', icon: 'pi pi-fw pi-bookmark', routerLink: ['/admin/products'],
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
                    label: 'Danh mục', icon: 'pi pi-fw pi-bookmark', routerLink: ['/admin/categories'],
                },
                {
                    label: 'Danh mục size', icon: 'pi pi-fw pi-bookmark', routerLink: ['/admin/size'],
                },
                {
                    label: 'Danh mục màu', icon: 'pi pi-fw pi-bookmark', routerLink: ['/admin/color'],
                }
            ]
        },
        {
            label: 'Hình ảnh',
            items: [
                {
                    label: 'Danh sách hình ảnh', icon: 'pi pi-fw pi-bookmark', routerLink: ['/admin/library']
                }
            ]
        },
        {
            label: 'Quản lý khách hàng',
            items: [
                {
                    label: 'Quản lý CTV', icon: 'pi pi-fw pi-bookmark', routerLink: ['/admin/collab']
                },
                {
                    label: 'Quản lý khách hàng', icon: 'pi pi-fw pi-bookmark', routerLink: ['/admin/customer']
                }
            ]
        },
      ];
  }
}