import { Component, OnInit , Pipe, PipeTransform } from '@angular/core';
import { uniqueList } from './uniqueList';
import { ServiceService } from '../../service.service';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { stringify } from 'querystring';
import {NgxPaginationModule} from 'ngx-pagination';


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
  year = new Set();
  results: result[];
  countresults: any;
  list_jobs1: any;
  pageNo: any;
  DispResList = new Set();
  uniqueListRESULT = new Set();
  dataCount: any;
  modelArr = new Array();

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
      pages: pages
    };
  }

  constructor(private http: Http) { }

  elasticPost(country, state, city) {
    this.DispResList.clear();
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
                        "State": state
                      }
                    },
                    {
                      "match": {
                        "City": city
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
      elasticresults => { this.elasticresults = elasticresults;  });
    console.log("ELASTICRESULT", this.elasticresults);

  }

  EP_College(college, state, city) {
    this.DispResList.clear();
    let headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
    let search = new URLSearchParams();
    //console.log("Page Index(elasticPOst):", this.pageNo)
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
                        "State": state
                      }
                    },
                    {
                      "match": {
                        "City": city
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

      var i, k, l, j;
      var count2017 = "", count2016 = "", count2015 = "", count2014 = "", count2013 = "", count2012 = "";
     
    for(i=0; i< this.elasticresults.aggregations[2].buckets.length; i++)
    {
      for(j=0; j< this.elasticresults.aggregations[2].buckets[i][3].buckets.length; j++)
      {
        // for(k=0; k< this.elasticresults.aggregations[2].buckets[i][3].buckets[j][4].buckets.length; k++)
        // {
        //   for(l=0; l< this.elasticresults.aggregations[2].buckets[i][3].buckets[j][4].buckets[k][5].buckets.length; l++)
        //   {
            if("2017" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key)
            {
               count2017 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
            }
            if("2016" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key)
            {
               count2016 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
            }
            if("2015" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key)
            {
               count2015 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
            }
            if("2014" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key)
            {
               count2014 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
            }
            if("2013" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key)
            {
               count2013 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
            }
            if("2012" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key)
            {
               count2012 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
            }            
        //   }
        // }
         }
         this.DispResList.add ({"college" : this.elasticresults.aggregations[2].buckets[i].key, "c2k17":count2017, "c2k16" :count2016, "c2k15" :count2015, "c2k14" : count2014, "c2k13": count2013, "c2k12": count2012
            // "branch": this.elasticresults.aggregations[2].buckets[i][3].buckets[j][4].buckets[k].key, "company": this.elasticresults.aggregations[2].buckets[i][3].buckets[j][4].buckets[k][5].buckets[l].key,
            } );
    }

    console.log("DISPRESLIST:", this.DispResList);
  }

  listCompilation(){
  
    var i, k, l, j;
    var count2017 = "", count2016 = "", count2015 = "", count2014 = "", count2013 = "", count2012 = "";
   
  for(i=0; i< this.elasticresults.aggregations[2].buckets.length; i++)
  {
    for(j=0; j< this.elasticresults.aggregations[2].buckets[i][3].buckets.length; j++)
    {
      // for(k=0; k< this.elasticresults.aggregations[2].buckets[i][3].buckets[j][4].buckets.length; k++)
      // {
      //   for(l=0; l< this.elasticresults.aggregations[2].buckets[i][3].buckets[j][4].buckets[k][5].buckets.length; l++)
      //   {
          if("2017" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key)
          {
             count2017 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
          }
          if("2016" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key)
          {
             count2016 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
          }
          if("2015" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key)
          {
             count2015 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
          }
          if("2014" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key)
          {
             count2014 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
          }
          if("2013" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key)
          {
             count2013 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
          }
          if("2012" == this.elasticresults.aggregations[2].buckets[i][3].buckets[j].key)
          {
             count2012 = this.elasticresults.aggregations[2].buckets[i][3].buckets[j].doc_count;
          }            
      //   }
      // }
       }
       this.DispResList.add ({"college" : this.elasticresults.aggregations[2].buckets[i].key, "c2k17":count2017, "c2k16" :count2016, "c2k15" :count2015, "c2k14" : count2014, "c2k13": count2013, "c2k12": count2012
          // "branch": this.elasticresults.aggregations[2].buckets[i][3].buckets[j][4].buckets[k].key, "company": this.elasticresults.aggregations[2].buckets[i][3].buckets[j][4].buckets[k][5].buckets[l].key,
          } );
          // console.log("DOONE", this.DispResList);
  }

  console.log("DISPRESLIST:", this.DispResList);

  }


  PostForUList()
  {
      this.DispResList.clear();
      let headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
      let search = new URLSearchParams();
      let obj ={
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
        uniqueList1 => { this.uniqueList1 = uniqueList1;});
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
  }
  getcity(state) {
    var key: any;
    var val: any;
    var i, j;
    this.city.clear();
    for(i=0; i<this.uniqueList.aggregations[2].buckets.length; i++)
    { 
      if(this.uniqueList.aggregations[2].buckets[i].key == state)
      {
        for(j=0; j< this.uniqueList.aggregations[2].buckets[i][3].buckets.length; j++)
        {
          if(this.uniqueList.aggregations[2].buckets[i][3].buckets[j].key != "")
          {
            this.city.add(this.uniqueList.aggregations[2].buckets[i][3].buckets[j].key);
          }
        }
      }
    }
  }
//   searchresult(country, state, city) {
//     console.log("hellooooooldksncoldsino", country, state, city)
//     let headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
//     let search = new URLSearchParams();

//     let obj = {
//       "size": 20,
//       "from": 0,
//       "query": {
//         "bool": {
//           "should": [
//             {
//               "match": {
//                 "State": state
//               }
//             },
//             {
//               "match": {
//                 "City": city
//               }
//             }
//           ]
//         }
//       }
//     };
//     var json = JSON.stringify(obj);
//     var data = 'json=' + json;
//     //  this.http.post('http://192.168.0.2:8182/html/postdata.php', JSON.stringify(obj), {headers: headers}).map(res => res.json()).subscribe(results => {console.log(results);});
//     this.http.post('http://192.168.0.3:9200/jobs1/_search?pretty&filter_path=hits.hits._source', JSON.stringify(obj), { headers: headers }).map(res => res.json()).subscribe(
//       elasticresults => {
//         this.elasticresults = elasticresults;
//       });
//     console.log("Hello1", this.elasticresults);
//     console.log(this.elasticresults.hits.hits)
//     this.elasticresults = this.elasticresults.hits.hits;
//     var x: any;
//     for (x in this.elasticresults.hits.hits) {
//       //this.autoMake = posts.autosFound.autoMake.filter((x, i, a) => x && a.indexOf(x) === i);
//       console.log("new");
//       if (this.elasticresults.hits.hits[x]._source.Batch) {
//         this.year.add(this.elasticresults[x]._source.Batch);
//         console.log("yaeadardaerrse", this.year)
//       }
//     }
//   }
 }

interface result {
  Country: string;
  State: string;
  District: string;
}
interface student {
  Country: string;
}

