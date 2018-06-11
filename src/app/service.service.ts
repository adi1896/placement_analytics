import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServiceService {
  clgname:any;

  constructor(private http:Http) { 
    console.log('service is running ...');
    let id=1;
    let state='Madhya Pradesh';
  
    
  //  this.http.get('http://192.168.0.2:8182/html/getdata.php?id='+id+'&state='+state).subscribe((data:any) => {
  //   console.log(data) ;
    //.map(response => response.json() );
    //subscribe((data) => console.log(data))
    }
    getstudents(){
      let id=1; 
      let country='India';
      return this.http.get('http://192.168.0.2:8182/html/getdata.php?id='+id+'&country='+country);
    }

    elasticPost(clgname = null, country = "India", state = null, city = null) {
      this.clgname='*'+clgname+'*'
      console.log(this.clgname)
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
                    "gte": 137071994078,
                    "lte": 1528486340786,
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
              },
              {
                "wildcard": {
                  "Full_Name": this.clgname
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
              "size": 281,
              "order": {
                "_count": "desc"
              }
            },
            "aggs": {
              "3": {
                "terms": {
                  "field": "Batch",
                  "size": 25,
                  "order": {
                    "_count": "desc"
                  }
                },
                "aggs": {
                  "4": {
                    "terms": {
                      "field": "Branch",
                      "size": 10,
                      "order": {
                        "_count": "desc"
                      }
                    },
                    "aggs": {
                      "5": {
                        "terms": {
                          "field": "Name_of_the_company .keyword",
                          "size": 1000,
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
      return this.http.post('http://192.168.0.3:9200/jobs1/_search', JSON.stringify(obj), { headers: headers })
      .map(res => res.json()) ;
  
    }


 }