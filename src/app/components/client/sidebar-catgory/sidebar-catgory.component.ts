import { Component , EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar-catgory',
  templateUrl: './sidebar-catgory.component.html',
  styleUrls: ['./sidebar-catgory.component.scss']
})
export class SidebarCatgoryComponent implements OnInit {

  @Output() callback = new EventEmitter<any>()

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

  objectFilter:any = {}

  objectListFilter = {
    category: [],
    price: {
      min: 0,
      max: 100
    }
  }

  rangeValues: number[] = [0, 100];

  maxPrice = 5000000

  constructor() {}


  ngOnInit() {
    this.objectListFilter.price.max = this.maxPrice
    this.listCategory.map((x:any,index:any)=>{
      x.checked = false
      x.id += index
      return x
    })
  }

  onChangeFilter(type:any){
    switch (type) {
      case 'category':
        this.objectListFilter.category = this.listCategory.filter((x:any)=>{
          return x.checked === true
        })
        this.callbackFilter()
        break;
      
      case 'price':
        this.objectListFilter.price.min = Math.floor((this.rangeValues[0] / 100)  * this.maxPrice)
        this.objectListFilter.price.max = Math.floor((this.rangeValues[1] / 100)  * this.maxPrice)
        this.callbackFilter()
        break;
        
      default:
        break;
    }
  }

  callbackFilter(){
    this.objectFilter.category = []
    this.objectListFilter.category.filter((x:any)=>{
      this.objectFilter.category.push(x.id)
    })

    this.objectFilter.minPrice = this.objectListFilter.price.min
    this.objectFilter.maxPrice = this.objectListFilter.price.max


    this.callback.emit(this.objectFilter)
  }

}
