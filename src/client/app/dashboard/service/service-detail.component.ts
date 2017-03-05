import {Component, OnInit, Input} from '@angular/core';
import {Service} from '../service';
import {ServiceService} from '../service.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';


import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'service-detail-cmp',
  templateUrl: 'service-detail.component.html'
})

export class ServiceDetailComponent implements OnInit {
  @Input()
  service: Service;
  isEditing: boolean = false;

  constructor(private serviceService: ServiceService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    this.isEditing = (this.route.data as any).value.isEditing === true;
    this.route.params
      .switchMap((params: Params) => this.serviceService.getService(+params['id']))
      .subscribe(service => this.service = service);
  }

  done(): void {
    this.location.back();
  }
}
