import { Component , EventEmitter, OnInit, Output} from '@angular/core';
import { clientSidebarService } from './sidebar-catgory.service';

@Component({
  selector: 'app-sidebar-catgory',
  templateUrl: './sidebar-catgory.component.html',
  styleUrls: ['./sidebar-catgory.component.scss']
})
export class SidebarCatgoryComponent implements OnInit {

  @Output() callback = new EventEmitter<any>()

  listCategory:any = []
  listColor:any = []
  listSize:any = []


  objectFilter:any = {}

  objectListFilter = {
    category: [],
    color: [],
    size: [],
    price: {
      min: 0,
      max: 100
    }
  }

  rangeValues: number[] = [0, 100];

  maxPrice = 5000000

  constructor(public clientSidebarService:clientSidebarService) {
    this.loadData()
  }


  ngOnInit() {
    this.objectListFilter.price.max = this.maxPrice
  }

  onChangeFilter(type:any){
    switch (type) {
      case 'category':
        this.objectListFilter.category = this.listCategory.filter((x:any)=>{
          return x.checked === true
        })
        this.callbackFilter()
        break;
      case 'color':
        this.objectListFilter.color = this.listColor.filter((x:any)=>{
          return x.checked === true
        })
        this.callbackFilter()
        break; 
      
      case 'size':
        this.objectListFilter.size = this.listSize.filter((x:any)=>{
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

    this.objectFilter.size = []
    this.objectListFilter.size.filter((x:any)=>{
      this.objectFilter.size.push(x.id)
    })

    this.objectFilter.color = []
    this.objectListFilter.color.filter((x:any)=>{
      this.objectFilter.color.push(x.id)
    })

    this.objectFilter.minPrice = this.objectListFilter.price.min
    this.objectFilter.maxPrice = this.objectListFilter.price.max

    this.objectFilter.category = this.objectFilter.category.toString()
    this.objectFilter.size = this.objectFilter.size.toString()
    this.objectFilter.color = this.objectFilter.color.toString()

console.log(this.objectFilter)
    this.callback.emit(this.objectFilter)
  }

  loadData(){
    this.clientSidebarService.getListCategory().subscribe(res=>{
      this.listCategory = res.data.map((x:any)=>{
        x.checked = false
        return x
      })
    })

    this.clientSidebarService.getListColor().subscribe(res=>{
      this.listColor = res.data.map((x:any)=>{
        x.checked = false
        return x
      })
    })

    this.clientSidebarService.getListSize().subscribe(res=>{
      this.listSize = res.data.map((x:any)=>{
        x.checked = false
        return x
      })
    })
  }

}
