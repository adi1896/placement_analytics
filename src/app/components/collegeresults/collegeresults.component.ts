import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';

@Component({
  selector: 'app-collegeresults',
  templateUrl: './collegeresults.component.html',
  styleUrls: ['./collegeresults.component.css']
})

export class CollegeresultsComponent implements OnInit {
  results: result[];
  elasticresults: any;
  countresults: any;
  list_jobs1: any;
  pageNo: any;
  PState: any;
  PCity: any;
  uniqueList = new Set();
  dataCount: any;

  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  students: student[];
  apiRoot: string = "http://httpbin.org";
  studentroot: string = "http://192.168.0.2:8182/html/getdata.php";

  getPager(totalItems: number = this.dataCount, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    console.log("Pagenumbers:", startPage, endPage)

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

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
    this.PState = state;
    this.PCity = city;
    let headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
    let search = new URLSearchParams();
    console.log("Page Index(elasticPOst):", this.pageNo)
    let obj ={
      "query": {
        "bool": {
          "must": [
            {
              "query_string": {
                "query": "*",
                "analyze_wildcard": false
              }
            },
            {
              "query_string": {
                "query": "*",
                "analyze_wildcard": false
              }
            },
            {
              "range": {
                "Date": {
                  "gte": 1370456813443,
                  "lte": 1528223213444,
                  "format": "epoch_millis"
                }
              }
            },
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
          ],
          "must_not": []
        }
      },
      "size": 0,
      "_source": {
        "excludes": []
      },
      "aggs": {
        "2": {
          "terms": {
            "field": "Full_Name",
            "size": 5,
            "order": {
              "_count": "desc"
            }
          },
          "aggs": {
            "3": {
              "terms": {
                "field": "Batch",
                "size": 5,
                "order": {
                  "_count": "desc"
                }
              },
              "aggs": {
                "4": {
                  "terms": {
                    "field": "Branch",
                    "size": 5,
                    "order": {
                      "_count": "desc"
                    }
                  },
                  "aggs": {
                    "5": {
                      "terms": {
                        "field": "Name_of_the_company .keyword",
                        "size": 5,
                        "order": {
                          "_count": "desc"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    this.http.post('http://192.168.0.3:9200/jobs1/_search', JSON.stringify(obj), { headers: headers }).map(res => res.json()).subscribe(
      elasticresults => { this.elasticresults = elasticresults; this.setPage(1); });
    console.log("ELASTICRESULT", this.elasticresults);

  //this.elasticresults = this.elasticresults.aggregations[2].buckets[0][3].buckets[0][4].buckets[0].key;
  console.log("SOURCE:", this.elasticresults);

    //   var m;
    //   console.log("hey")
    //   for ( var i=0 ; i<this.elasticresults.hits.hits.length ; i++ ){
    //     // m  = JSON.stringify({country:this.list_jobs1.hits.hits[i]._source.Country,state: this.list_jobs1.hits.hits[i]._source.State, district: this.list_jobs1.hits.hits[i]._source.District ,  citi: this.list_jobs1.hits.hits[i]._source.City } )
    //      m = JSON.stringify(this.elasticresults.hits.hits[i]._source.College_Key)
    //      console.log("hey1")
    //      this.uniqueList.add(m);
    //      console.log("hey2")
    //   }
    // console.log("FINALLY THE UNIQUE LIST", this.uniqueList, "VALUEEE OF M",m);

  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pageNo = (page - 1) * 10 + 1;
    console.log("Page On:", page, "Page Index:", this.pageNo);

  //   let headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
  //   let search = new URLSearchParams();
  //   console.log("Page Index(elasticPOst):", this.pageNo)
  //   let obj = {
  //     "size": 10,
  //     "from": this.pageNo,
  //     "aggs": {
  //       "groups_by_hits": {
  //         "terms": {
  //           "field": "College_Key"
  //         }
  //       }
  //     },
  //     "query": {
  //       "bool": {
  //         "should": [
  //           {
  //             "match": {
  //               "State": "Telangana"
  //             }
  //           },
  //           {
  //             "match": {
  //               "City": "Hyderabad"
  //             }
  //           }
  //         ]
  //       }
  //     }
  //   };
  //   this.http.post('http://192.168.0.3:9200/jobs1/_search', JSON.stringify(obj), { headers: headers }).map(res => res.json()).subscribe(
  //     elasticresults => { this.elasticresults = elasticresults; });
  //  console.log("ES from set page", this.elasticresults)
  //      // get pager object from service
    this.pager = this.getPager(this.elasticresults.length, page);

    // get current page of items
    this.pagedItems = this.elasticresults.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }




  ngOnInit() {

    var a: any;

    this.http.get('http://192.168.0.3:9200/jobs1/_search?pretty&filter_path=hits').map(res => res.json()).subscribe(
      list_jobs1 => {
        this.list_jobs1 = list_jobs1;
        console.log("I CAN SEE DATA HERE: ", this.list_jobs1);
        this.dataCount = this.list_jobs1.hits.total;
        console.log("THE TOOOOTAL COUNT OF DAAAAAAATA IS:", this.dataCount);


        //   var m;
        //   for ( var i=0 ; i<this.list_jobs1.hits.hits.length ; i++ ){
        //     // m  = JSON.stringify({country:this.list_jobs1.hits.hits[i]._source.Country,state: this.list_jobs1.hits.hits[i]._source.State, district: this.list_jobs1.hits.hits[i]._source.District ,  citi: this.list_jobs1.hits.hits[i]._source.City } )
        //      m = JSON.stringify(this.list_jobs1.hits.hits[i]._source.State)
        //      this.uniqueList.add(m);
        //   }
        // console.log("FINALLY THE UNIQUE LIST", this.uniqueList, "VALUEEE OF M",m);

        //  console.log("STATE OF U_LIST", this.uniqueList[0][0])

      }
    );
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
