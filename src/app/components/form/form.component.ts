import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ServiceService } from '../../service.service';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { stringify } from 'querystring';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  elasticresults: any;
  DispResList = new Set();
  uniqueListRESULT = new Set();
  dataCount: any;
  modelArr = new Array();
  clgname: any;
  resultsFound: boolean;
  public loading = false;
  total_college: any;
  total_state: any;
  total_city: any;
  form_resp: any;

  constructor(private http: Http,private dataService: ServiceService) {
    this.resultsFound = false;

   }
  ngOnInit() {
    this.dataService.RESPONSE_TOTAL().subscribe((form_resp) => {
      console.log("FOORM RESP :", form_resp);
      form_resp = form_resp.hits.hits;
      this.form_resp = form_resp;
      console.log("FORM RESP2:", form_resp[1]._source.Batch)
       });
      
  }
  UPDATE(id,key,value)
  {
    console.log("sunaina",id, key, value);
    // let headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
    // let search = new URLSearchParams();
    // let url = 'http://192.168.0.3:9200/jobs1/indianjobs/'+id;
    // console.log("sunaina",url);
    //key11 = '"'+ key11 +'"'
    // console.log("sunaina",key);
    // search.set(key, value);
    // console.log("helelele",{search})

    // let obj = {
    //     [key] : value
    // }
    // console.log("sunaina",JSON.stringify(obj));

     //this.dataService.UPDATE(id,key,value).subscribe(res => console.log(res.json()));
    //this.http.put(url, JSON.stringify(obj), { headers: headers }).subscribe(res => console.log(res.json()));
    
  }

}