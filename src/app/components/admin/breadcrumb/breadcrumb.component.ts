import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb } from 'src/app/model/breadcrumb.model';
import { BreadcrumbService } from 'src/app/service/breadcrumb.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {
  this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
    console.log(this.breadcrumbs$)
    let d:any = activatedRoute.data
    console.log(d._value)
  }

  ngOnInit() {
  }
}