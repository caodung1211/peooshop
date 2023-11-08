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

  // objectFilter

  objectFilter = {
    category: '',
    price: {
      min: 0,
      max: 100
    }
  }

  rangeValues: number[] = [0, 100];

  maxPrice = 5000000

  constructor() {}


  ngOnInit() {
    this.objectFilter.price.max = this.maxPrice
    this.listCategory.map((x:any,index:any)=>{
      x.checked = false
      x.id += index
      return x
    })
  }

  onChangeFilter(type:any){
    switch (type) {
      case 'category':
        this.objectFilter.category = this.listCategory.filter((x:any)=>{
          return x.checked === true
        })
        console.log(this.objectFilter.category)
        break;
      
      case 'price':
        this.objectFilter.price.min = Math.floor((this.rangeValues[0] / 100)  * this.maxPrice)
        this.objectFilter.price.max = Math.floor((this.rangeValues[1] / 100)  * this.maxPrice)
console.log(this.objectFilter.price)
        break;
        
      default:
        break;
    }
  }

}
