import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ServiceService } from '../../service.service';
import { HttpClient } from '@angular/common/http';
import { uniqueList } from './uniqueList';
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
  uniqueList: any;
  uniqueList1: any;
  state: any;
  model: any = {};
  uniqueresultList = new Set();
  city = new Set();
  stateList = new Set();
  countresults: any;
  list_jobs1: any;
  pageNo: any;
  moreinfo = new Set();
  info: any;
  sort:any;
  cityList:any;


  constructor(private http: Http, private dataService: ServiceService) {
    this.resultsFound = false;

  }

  elasticPost_form(clgname, country, state, city) {
    console.log("CL_N: form", clgname)
    console.log("CONTRY: form", country)
    console.log("STATE: form", state)
    console.log("CITY: form", city)
    this.dataService.elasticPost_form(clgname, country, state, city).subscribe((form_resp) => {
      console.log("FOORM RESP :", form_resp);
      form_resp = form_resp.hits.hits;
      this.form_resp = form_resp;
      console.log("FORM RESP2:", form_resp[1]._source.Batch)
    });


  }
  ngOnInit() {

    this.uniqueList = new uniqueList().getJsonCategeries();
    var i;

    for (i = 0; i < this.uniqueList.aggregations[2].buckets.length; i++) {
      this.stateList.add(this.uniqueList.aggregations[2].buckets[i].key);
    }
    this.total_city = 0;
    for (i = 0; i < this.uniqueList.aggregations[2].buckets.length; i++) {
      this.total_city = this.total_city + this.uniqueList.aggregations[2].buckets[i][3].buckets.length;
      console.log("m here")
    }
    console.log("mahender", this.stateList)
    this.total_state = this.uniqueList.aggregations[2].buckets.length
    console.log("TOTAL_STATE:", this.total_state);
    console.log("TOTAL_CITY:", this.total_city);

    this.uniqueList1 = Array.from(this.stateList.values()).sort();

    this.dataService.elasticPost1_form().subscribe((form_resp) => {
      console.log("FOORM RESP :", form_resp);
      form_resp = form_resp.hits.hits;
      this.form_resp = form_resp;
      console.log("FORM RESP2:", form_resp[1]._source.Batch)
    });

  }
  getcity(state) {
    var key: any;
    var val: any;
    var i, j;
    this.city.clear();

    for (i = 0; i < this.uniqueList.aggregations[2].buckets.length; i++) {
      if (this.uniqueList.aggregations[2].buckets[i].key == state) {
        for (j = 0; j < this.uniqueList.aggregations[2].buckets[i][3].buckets.length; j++) {
          if (this.uniqueList.aggregations[2].buckets[i][3].buckets[j].key != "") {
            this.city.add(this.uniqueList.aggregations[2].buckets[i][3].buckets[j].key);
          }
        }
      }
    }
    this.cityList = Array.from(this.city.values()).sort();
  }

  UPDATE(id, key, value) {
    console.log("sunaina", id, key, value);
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