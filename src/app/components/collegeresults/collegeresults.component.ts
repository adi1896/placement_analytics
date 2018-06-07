import { Component, OnInit , Pipe, PipeTransform } from '@angular/core';
import { ServiceService } from '../../service.service';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { stringify } from 'querystring';
import {NgxPaginationModule} from 'ngx-pagination';


@Component({
  selector: 'app-collegeresults',
  templateUrl: './collegeresults.component.html',
  styleUrls: ['./collegeresults.component.css']
})

export class CollegeresultsComponent implements OnInit {
 
  constructor(private http: Http) {
    console.log('connected');
  }
 
  ngOnInit() {

 
}
}
