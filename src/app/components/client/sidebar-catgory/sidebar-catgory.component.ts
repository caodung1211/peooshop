import { Component , EventEmitter, OnInit, Output} from '@angular/core';
import { clientSidebarService } from './sidebar-catgory.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(public clientSidebarService:clientSidebarService,private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params:any) => {
      params = {...params,...{page: params?.page ? params?.page  : 0}}
      this.objectFilter = params

      this.objectListFilter.price.min = Number((((this.maxPrice - Number(this.objectFilter.minPrice ? this.objectFilter.minPrice : 0)) / Number(this.objectFilter.minPrice ? this.objectFilter.minPrice : 0)) * 100).toFixed(1)) 

      if(Number(this.objectFilter.maxPrice) > 0){
        this.objectListFilter.price.max = Number(this.objectFilter.maxPrice)
        this.rangeValues[1] = Number((Number(this.objectFilter.maxPrice) / this.maxPrice ).toFixed(1)) * 100
      }else{
        this.objectListFilter.price.max = this.maxPrice
      }

      if(Number(this.objectFilter.minPrice) > 0){
        this.objectListFilter.price.min = Number(this.objectFilter.minPrice)
        this.rangeValues[0] = Number((Number(this.objectFilter.minPrice) / this.maxPrice ).toFixed(1)) * 100
      }else{
        this.objectListFilter.price.min = 0
      }

    });

    this.loadData()
  }


  ngOnInit() {
  }

  onChangeFilter(type:any){
    console.log(this.listCategory)
    console.log(this.listColor)
    console.log(this.listSize)

        this.objectListFilter.category = this.listCategory.filter((x:any)=>{
          return x.checked === true
        })

        this.objectListFilter.color = this.listColor.filter((x:any)=>{
          return x.checked === true
        })

        this.objectListFilter.size = this.listSize.filter((x:any)=>{
          return x.checked === true
        })

        this.objectListFilter.price.min = Math.floor((this.rangeValues[0] / 100)  * this.maxPrice)
        this.objectListFilter.price.max = Math.floor((this.rangeValues[1] / 100)  * this.maxPrice)
        this.callbackFilter()

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
      this.objectFilter.category = this.objectFilter.category ? this.objectFilter.category.split(',') : []
      this.listCategory = res.data.map((x:any)=>{
        if(this.objectFilter.category && this.objectFilter.category.length > 0){
          this.objectFilter.category.map((z:any)=>{
            if(x.id == z){
              x.checked = true
            }
            return z
          })
        }else{
          x.checked = false
        }
        return x
      })
    })

    this.clientSidebarService.getListColor().subscribe(res=>{
      this.objectFilter.color = this.objectFilter.color ? this.objectFilter.color.split(',') : []
      this.listColor = res.data.map((x:any)=>{
        if(this.objectFilter.color && this.objectFilter.color.length > 0){
          this.objectFilter.color.map((z:any)=>{
            if(x.id == z){
              x.checked = true
            }
            return z
          })
        }else{
          x.checked = false
        }
        return x
      })
    })

    this.clientSidebarService.getListSize().subscribe(res=>{
      this.objectFilter.size = this.objectFilter.size ? this.objectFilter.size.split(',') : []
      this.listSize = res.data.map((x:any)=>{
        if(this.objectFilter.size && this.objectFilter.size.length > 0){
          this.objectFilter.size.map((z:any)=>{
            if(x.id == z){
              x.checked = true
            }
            return z
          })
        }else{
          x.checked = false
        }
        return x
      })
      
    })
    
  }

}
