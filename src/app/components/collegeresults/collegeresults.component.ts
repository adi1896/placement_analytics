import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

// export class PagerService {
//   getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
//       // calculate total pages
//       let totalPages = Math.ceil(totalItems / pageSize);

//       let startPage: number, endPage: number;
//       if (totalPages <= 10) {
//           // less than 10 total pages so show all
//           startPage = 1;
//           endPage = totalPages;
//       } else {
//           // more than 10 total pages so calculate start and end pages
//           if (currentPage <= 6) {
//               startPage = 1;
//               endPage = 10;
//           } else if (currentPage + 4 >= totalPages) {
//               startPage = totalPages - 9;
//               endPage = totalPages;
//           } else {
//               startPage = currentPage - 5;
//               endPage = currentPage + 4;
//           }
//       }

//       // calculate start and end item indexes
//       let startIndex = (currentPage - 1) * pageSize;
//       let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

//       // create an array of pages to ng-repeat in the pager control
//       let pages = _.range(startPage, endPage + 1);

//       // return object with all pager properties required by the view
//       return {
//           totalItems: totalItems,
//           currentPage: currentPage,
//           pageSize: pageSize,
//           totalPages: totalPages,
//           startPage: startPage,
//           endPage: endPage,
//           startIndex: startIndex,
//           endIndex: endIndex,
//           pages: pages
//       };
//   }
// }

@Component({
  selector: 'app-collegeresults',
  templateUrl: './collegeresults.component.html',
  styleUrls: ['./collegeresults.component.css']
})
export class CollegeresultsComponent implements OnInit {
  results: result[];
  elasticresults: any;
  list_jobs1: any;
  state = new Set();
  // uniqueList: any;
  uniqueList = new Set();


  students: student[];
  apiRoot: string = "http://httpbin.org";
  studentroot: string = "http://192.168.0.2:8182/html/getdata.php";

  constructor(private http: Http) {
    console.log('connected');
  }
  doPost(country) {
    let headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
    let search = new URLSearchParams();
    search.set('id', '1');
    search.set('country', 'India');
    let obj = { country: country };
    var json = JSON.stringify(obj);
    var data = 'json=' + json;
    //  this.http.post('http://192.168.0.2:8182/html/postdata.php', JSON.stringify(obj), {headers: headers}).map(res => res.json()).subscribe(results => {console.log(results);});
    this.http.post('http://192.168.0.2:8182/html/postdata.php', JSON.stringify(obj), { headers: headers }).map(res => res.json()).subscribe(
      results => { this.results = results; });
  }
  doGet() {
    let search = new URLSearchParams();
    search.set('id', '1');
    search.set('country', 'India');
    this.http.get('http://192.168.0.2:8182/html/getdata.php', { search }).map(res => res.json()).subscribe(students => { this.students = students; });
  }
  doExp() {
    console.log("POST");
    let url = `${this.apiRoot}/post`;
    this.http.post(url, { moo: "foo", goo: "loo" }).subscribe(res => console.log(res.json()));
  }
  doTest() {
    let headers = new Headers({ 'Content-Type': "application/json" });
    console.log("POST");
    let url = 'http://192.168.0.2:8182/html/post_test.php';
    let search = new URLSearchParams();
    //  search.set('id','1');
    search.set('country', 'India');
    let obj = { name: 'India' };

    this.http.post(url, JSON.stringify(obj)).subscribe(res => console.log(res.json()));
  }

  elasticPost(state, city) {
    let headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
    let search = new URLSearchParams();

    let obj = {
      "query": {
        "bool": {
          "should": [
            {
              "match": {
                "State": state
              }
            },
            {
              "match": {
                "City": city
              }
            }
          ]
        }
      }
    };
    var json = JSON.stringify(obj);
    var data = 'json=' + json;
    //  this.http.post('http://192.168.0.2:8182/html/postdata.php', JSON.stringify(obj), {headers: headers}).map(res => res.json()).subscribe(results => {console.log(results);});
    this.http.post('http://192.168.0.3:9200/jobs1/_search?pretty&filter_path=hits.hits._source', JSON.stringify(obj), { headers: headers }).map(res => res.json()).subscribe(
      elasticresults => { this.elasticresults = elasticresults; });
    console.log("Hello1", this.elasticresults);
    this.elasticresults = this.elasticresults.hits.hits[1]._source.Country
    console.log("source list", this.elasticresults);


  }

  ngOnInit() {

    var a: any;
    let headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
    let obj = {
      "query": {
        "bool": {
          "should": [
            {
              "match": {
                "State": "Telangana"
              }
            },
            {
              "match": {
                "City": "Hyderabad"
              }
            }
          ]
        }
      }
    };
    var json = JSON.stringify(obj);
    var data = 'json=' + json;
    //  this.http.post('http://192.168.0.2:8182/html/postdata.php', JSON.stringify(obj), {headers: headers}).map(res => res.json()).subscribe(results => {console.log(results);});
    this.http.post('http://192.168.0.3:9200/jobs1/_search?pretty&filter_path=hits.hits._source', JSON.stringify(obj), { headers: headers }).map(res => res.json()).subscribe(
      list_jobs1 => { this.list_jobs1 = list_jobs1; });
    console.log("LIST_JOBS!", this.list_jobs1);

    // this.http.post('http://192.168.0.3:9200/jobs1/_search?pretty&filter_path=hits.hits._source').map(res => res.json()).subscribe(
    //   list_jobs1 => {
    //     this.list_jobs1 = list_jobs1;
    //     console.log("I CAN SEE DATA HERE: ", this.list_jobs1);


    //     //   var m;
    //     //   for ( var i=0 ; i<this.list_jobs1.hits.hits.length ; i++ ){
    //     //      m  = JSON.stringify({country:this.list_jobs1.hits.hits[i]._source.Country,state: this.list_jobs1.hits.hits[i]._source.State, district: this.list_jobs1.hits.hits[i]._source.District ,  citi: this.list_jobs1.hits.hits[i]._source.City } )
    //     //     // m = JSON.stringify({country:this.list_jobs1.hits.hits[i]._source.Country})

    //     //      this.uniqueList.add(m);
    //     //   }
    //     // console.log("FINALLY THE UNIQUE LIST", this.uniqueList, m);

    //   }
    // );
  }

}
interface result {
  Country: string;
  State: string;
  District: string;
}
interface student {
  Country: string;
}
