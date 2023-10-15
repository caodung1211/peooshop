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
                }
            ]
        },
      ];
  }
}