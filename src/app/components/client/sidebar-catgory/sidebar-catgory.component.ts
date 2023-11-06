import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar-catgory',
  templateUrl: './sidebar-catgory.component.html',
  styleUrls: ['./sidebar-catgory.component.scss']
})
export class SidebarCatgoryComponent implements OnInit {

  listCategory:any = [
    {
      id: 1,
      name: "Túi đeo chéo"
    },
    {
      id: 1,
      name: "Túi đeo chéo"
    },{
      id: 1,
      name: "Túi đeo chéo"
    },{
      id: 1,
      name: "Túi đeo chéo"
    },{
      id: 1,
      name: "Túi đeo chéo"
    },{
      id: 1,
      name: "Túi đeo chéo"
    },{
      id: 1,
      name: "Túi đeo chéo"
    },{
      id: 1,
      name: "Túi đeo chéo"
    },{
      id: 1,
      name: "Túi đeo chéo"
    },{
      id: 1,
      name: "Túi đeo chéo"
    },{
      id: 1,
      name: "Túi đeo chéo"
    },{
      id: 1,
      name: "Túi đeo chéo"
    },
  ]

  constructor() {}


  ngOnInit() {
  }
}
