import { Component, OnInit } from '@angular/core';
import { uniqueList } from './uniqueList';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  uniqueList: any;
  state: any;
  city: any;
  model: any = {};
  elasticresults: any;
  uniqueresultList = new Set();
  year = new Set();


  constructor(private http: Http) { }



  ngOnInit() {


    this.uniqueList = new uniqueList().getJsonCategeries();
    this.state = Object.keys(this.uniqueList);
    console.log(this.uniqueList);
    console.log("hvuvhh", this.state);
    console.log(this.uniqueList.Delhi);



  }
  getcity(state) {
    var key: any;
    var val: any;

    console.log("hello", state);
    console.log(this.uniqueList[state]);
    this.city = this.uniqueList[state];
    // for ( key , val in this.uniqueList) {

    // }
  }
  searchresult(country, state, city) {
    console.log("hellooooooldksncoldsino", country, state, city)
    let headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
    let search = new URLSearchParams();

    let obj = {
      "size": 20,
      "from": 0,
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
      elasticresults => {
        this.elasticresults = elasticresults;
      });
    console.log("Hello1", this.elasticresults);
    console.log(this.elasticresults.hits.hits)
    this.elasticresults = this.elasticresults.hits.hits;

    // this.elasticresults = this.elasticresults.hits.hits[1]._source.Country
    // var m;
    // for (var i = 0; i < this.elasticresults.length; i++) {
    //   m = JSON.stringify({ state: this.elasticresults[i]._source.State, district: this.elasticresults[i]._source.District, citi: this.elasticresults[i]._source.City,college_name: this.elasticresults[i]._source.Full_Name  })
    //   // m = JSON.stringify({country:this.list_jobs1.hits.hits[i]._source.Country})

    //   this.uniqueresultList.add(m);
    // }
    // console.log("FINALLY THE UNIQUE LIST", this.uniqueresultList, m);
    var x: any;

    for (x in this.elasticresults.hits.hits) {
      //this.autoMake = posts.autosFound.autoMake.filter((x, i, a) => x && a.indexOf(x) === i);
      console.log("new");
      if (this.elasticresults.hits.hits[x]._source.Batch) {
        this.year.add(this.elasticresults[x]._source.Batch);
        console.log("yaeadardaerrse", this.year)
      }


      // if (calls.resultParts[x].color) {

      //   this.colors.add(calls.resultParts[x].color);
      //   console.log("colcococlcocloclco", this.colors);

      // }
      // if (calls.resultParts[x].manufacturers) {

      //   this.manufacturers.add(calls.resultParts[x].manufacturers);
      //   console.log("manufactututututututu", this.manufacturers);

      // }
      // if (calls.resultParts[x].fit) {

      //   this.fits.add(calls.resultParts[x].fit);
      // }

    }
    

  }
  

}
