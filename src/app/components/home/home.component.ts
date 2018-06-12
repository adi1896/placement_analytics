import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { uniqueList } from './uniqueList';
import { ServiceService } from '../../service.service';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { stringify } from 'querystring';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  uniqueList: any;
  uniqueList1: any;
  state: any;
  model: any = {};
  elasticresults: any;
  uniqueresultList = new Set();
  city = new Set();
  stateList = new Set();
  year = new Set();
  results: result[];
  countresults: any;
  list_jobs1: any;
  pageNo: any;
  DispResList = new Set();
  uniqueListRESULT = new Set();
  dataCount: any;
  modelArr = new Array();
  clgname: any;
  resultsFound: boolean;
  public loading = false;
  moreinfo = new Set();
  info: any;
  sort:any;
  cityList:any;


  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

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
      pages: pages,
      
    };
  }

  constructor(private http: Http,private dataService: ServiceService) {
    this.resultsFound = false;

   }

  elasticPost(clgname, country, state, city) {
   
    this.resultsFound = true;
    this.loading = true;
    
    this.dataService.elasticPost(clgname, country, state, city).subscribe((elasticresults) => {
    console.log("ELASTICRESULT", elasticresults);
    this.resultsFound = true;


      if (elasticresults) {
        this.elasticresults = elasticresults;
      }
      else {
        this.elasticresults = ["No results found", "No results found", "No results found", "No results found", "No results found", "No results found", "No results found", "No results found"];
      }
      this.DispResList.clear();

      var i, k, l, j;
      var count2017 = "", count2016 = "", count2015 = "", count2014 = "", count2013 = "", count2012 = "";
  
      for (i = 0; i < this.elasticresults.aggregations[2].buckets.length; i++) {
        var count2017 = "", count2016 = "", count2015 = "", count2014 = "", count2013 = "", count2012 = "";
  
        for (j = 0; j < this.elasticresults.aggregations[2].buckets[i][3].buckets.length; j++) {
  
          if ("2017" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key) {
            count2017 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
          }
          if ("2016" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key) {
            count2016 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
          }
          if ("2015" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key) {
            count2015 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
          }
          if ("2014" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key) {
            count2014 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
          }
          if ("2013" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key) {
            count2013 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
          }
          if ("2012" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key) {
            count2012 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
          }
  
        }
        this.DispResList.add({ "college": this.elasticresults.aggregations[2].buckets[i].key, "c2k17": count2017, "c2k16": count2016, "c2k15": count2015, "c2k14": count2014, "c2k13": count2013, "c2k12": count2012 });
      }

      if (this.elasticresults.aggregations[2].buckets.length > 0) {
        this.loading = false;
        this.resultsFound = true;
      } else {
        this.loading = false;
        this.resultsFound = false;
      }
    });
    this.sort(this.city);
    this.listCompilation()
  }
  LinktoCollege(college_name,country, state, city) {
    var blah = "blah blah"
    this.moreinfo.clear();
    this.dataService.elasticPost(college_name, country, state, city).subscribe((info) => {
    console.log("ELASTICRESULT", info);
    this.resultsFound = true;


      if (info) {
        this.info = info;
      }
      else {
        this.info = ["No results found", "No results found", "No results found", "No results found", "No results found", "No results found", "No results found", "No results found"];
      }
      var i, k, l, j;

      for (i = 0; i < this.info.aggregations[2].buckets.length; i++) {
        for (j = 0; j < this.elasticresults.aggregations[2].buckets[i][3].buckets.length; j++) {
  
      
   
          for (k = 0; k < this.info.aggregations[2].buckets[i][3].buckets[j][4].buckets.length; k++) {
            for (l = 0; l < this.info.aggregations[2].buckets[i][3].buckets[j][4].buckets[k][5].buckets.length; l++) {
              this.moreinfo.add({
                "college": this.info.aggregations[2].buckets[i].key, "batch": this.info.aggregations[2].buckets[i][3].buckets[j].key,
                "count": this.info.aggregations[2].buckets[i][3].buckets[j][4].buckets[k][5].buckets[l].doc_count,
                "branch": this.info.aggregations[2].buckets[i][3].buckets[j][4].buckets[k].key, "company": this.info.aggregations[2].buckets[i][3].buckets[j][4].buckets[k][5].buckets[l].key,
              });
            }
          }
        }
      }
      if (this.info.aggregations[2].buckets.length > 0) {
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
    // console.log(college_name, state, city);

    // this.moreinfo.clear();
    // let headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
    // let search = new URLSearchParams();
    // //console.log("Page Index(elasticPOst):", this.pageNo)
    // let obj = {
    //   "query": {
    //     "bool": {
    //       "must": [
    //         {
    //           "query_string": {
    //             "query": "*",
    //             "analyze_wildcard": false
    //           }
    //         },
    //         {
    //           "query_string": {
    //             "query": "*",
    //             "analyze_wildcard": false
    //           }
    //         },
    //         {
    //           "range": {
    //             "Date": {
    //               "gte": 1370456813443,
    //               "lte": 1528223213444,
    //               "format": "epoch_millis"
    //             }
    //           }
    //         },
    //         {
    //           "match": {
    //             "Full_Name": college_name
    //           }
    //         },
    //         {
    //           "match": {
    //             "State": state
    //           }
    //         },
    //         {
    //           "match": {
    //             "City": city
    //           }
    //         }
    //       ],
    //       "must_not": []
    //     }
    //   },
    //   "size": 0,
    //   "_source": {
    //     "excludes": []
    //   },
    //   "aggs": {
    //     "2": {
    //       "terms": {
    //         "field": "Full_Name",
    //         "size": 5,
    //         "order": {
    //           "_count": "desc"
    //         }
    //       },
    //       "aggs": {
    //         "3": {
    //           "terms": {
    //             "field": "Batch",
    //             "size": 5,
    //             "order": {
    //               "_count": "desc"
    //             }
    //           },
    //           "aggs": {
    //             "4": {
    //               "terms": {
    //                 "field": "Branch",
    //                 "size": 5,
    //                 "order": {
    //                   "_count": "desc"
    //                 }
    //               },
    //               "aggs": {
    //                 "5": {
    //                   "terms": {
    //                     "field": "Name_of_the_company .keyword",
    //                     "size": 5,
    //                     "order": {
    //                       "_count": "desc"
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // };
    // this.http.post('http://192.168.0.3:9200/jobs1/_search', JSON.stringify(obj), { headers: headers }).map(res => res.json()).subscribe(
    //   info => { this.info = info; this.setPage(1); });
    // console.log("COLLEGE_INFO", this.info);

    // var i, k, l, j;

    // for (i = 0; i < this.info.aggregations[2].buckets.length; i++) {
    //   for (j = 0; j < this.elasticresults.aggregations[2].buckets[i][3].buckets.length; j++) {

    
 
    //     for (k = 0; k < this.info.aggregations[2].buckets[i][3].buckets[j][4].buckets.length; k++) {
    //       for (l = 0; l < this.info.aggregations[2].buckets[i][3].buckets[j][4].buckets[k][5].buckets.length; l++) {
    //         this.moreinfo.add({
    //           "college": this.info.aggregations[2].buckets[i].key, "batch": this.info.aggregations[2].buckets[i][3].buckets[j].key,
    //           "count": this.info.aggregations[2].buckets[i][3].buckets[j][4].buckets[k][5].buckets[l].doc_count,
    //           "branch": this.info.aggregations[2].buckets[i][3].buckets[j][4].buckets[k].key, "company": this.info.aggregations[2].buckets[i][3].buckets[j][4].buckets[k][5].buckets[l].key,
    //         });
    //       }
    //     }
    //   }
    // }
  }

  listCompilation() {
    this.DispResList.clear();
    var i, k, l, j;
    var count2017 = "", count2016 = "", count2015 = "", count2014 = "", count2013 = "", count2012 = "";

    for (i = 0; i < this.elasticresults.aggregations[2].buckets.length; i++) {
      var count2017 = "", count2016 = "", count2015 = "", count2014 = "", count2013 = "", count2012 = "";

      for (j = 0; j < this.elasticresults.aggregations[2].buckets[i][3].buckets.length; j++) {

        if ("2017" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key) {
          count2017 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
        }
        if ("2016" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key) {
          count2016 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
        }
        if ("2015" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key) {
          count2015 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
        }
        if ("2014" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key) {
          count2014 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
        }
        if ("2013" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key) {
          count2013 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
        }
        if ("2012" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key) {
          count2012 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
        }

      }
      this.DispResList.add({ "college": this.elasticresults.aggregations[2].buckets[i].key, "c2k17": count2017, "c2k16": count2016, "c2k15": count2015, "c2k14": count2014, "c2k13": count2013, "c2k12": count2012 });
    }

    console.log("DISPRESLIST:", this.DispResList);

  }

  PostForUList() {
    this.DispResList.clear();
    let headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
    let search = new URLSearchParams();
    let obj = {
      "query": {
        "bool": {
          "must": [
            {
              "query_string": {
                "analyze_wildcard": false,
                "query": "*"
              }
            },
            {
              "query_string": {
                "analyze_wildcard": false,
                "query": "*"
              }
            },
            {
              "range": {
                "Date": {
                  "gte": 1370617256535,
                  "lte": 1528383656535,
                  "format": "epoch_millis"
                }
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
            "field": "State",
            "size": 40,
            "order": {
              "_count": "desc"
            }
          },
          "aggs": {
            "3": {
              "terms": {
                "field": "City",
                "size": 100,
                "order": {
                  "_count": "desc"
                }
              }
            }
          }
        }
      }
    };

    this.http.post('http://192.168.0.3:9200/jobs1/_search', JSON.stringify(obj), { headers: headers }).map(res => res.json()).subscribe(
      uniqueList1 => { this.uniqueList1 = uniqueList1; });
    console.log("UNIQUELIST:", this.uniqueList1);
  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pageNo = (page - 1) * 10 + 1;
    console.log("Page On:", page, "Page Index:", this.pageNo);

    this.pager = this.getPager(this.elasticresults.length, page);

    // get current page of items
    this.pagedItems = this.elasticresults.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }



  ngOnInit() {

    var a: any;
    this.http.get('http://192.168.0.3:9200/jobs1/_search?pretty&filter_path=hits').map(res => res.json()).subscribe(
      list_jobs1 => {
        this.list_jobs1 = list_jobs1;
        this.dataCount = this.list_jobs1.hits.total;
        console.log("DataCount:", this.dataCount);
      }
    );

    this.uniqueList = new uniqueList().getJsonCategeries();
    var i;
    console.log("mahender",this.state)

    for (i = 0; i < this.uniqueList.aggregations[2].buckets.length; i++) {
            this.stateList.add(this.uniqueList.aggregations[2].buckets[i].key);
    }
    console.log("mahender",this.state)
    this.uniqueList1=Array.from(this.stateList.values()).sort();

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
    this.cityList=Array.from(this.city.values()).sort();

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

