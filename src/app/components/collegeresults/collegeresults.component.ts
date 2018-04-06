import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { HttpClient } from '@angular/common/http';
import { HttpModule,Http,Response,RequestOptions,Headers,URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-collegeresults',
  templateUrl: './collegeresults.component.html',
  styleUrls: ['./collegeresults.component.css']
})
export class CollegeresultsComponent implements OnInit {
  //public students = [];
   results:result[];
  students:student[];
  apiRoot: string = "http://httpbin.org";
  studentroot: string ="http://192.168.0.2:8182/html/getdata.php";

  constructor(private http:Http) { 
    console.log('connected');
  }
   doPost(){
     let headers = new Headers({'Content-Type': "application/x-www-form-urlencoded"});
     let search = new URLSearchParams();
     search.set('id','1');
     search.set('country','India');
     let obj = {country:'India'};
     var json =JSON.stringify(obj);
     var data = 'json='+ json;
    //  this.http.post('http://192.168.0.2:8182/html/postdata.php', JSON.stringify(obj), {headers: headers}).map(res => res.json()).subscribe(results => {console.log(results);});
      this.http.post('http://192.168.0.2:8182/html/postdata.php', JSON.stringify(obj), {headers: headers}).map(res => res.json()).subscribe(
        results => {this.results=results;});
  }
    doGet(){
     let search = new URLSearchParams();
     search.set('id','1');
     search.set('country','India');
     this.http.get('http://192.168.0.2:8182/html/getdata.php',{search}).map(res => res.json()).subscribe(students => {this.students=students;});
    }
    doExp() {
      console.log("POST");
      let url = `${this.apiRoot}/post`;
      this.http.post(url, {moo:"foo",goo:"loo"}).subscribe(res => console.log(res.json()));
    }
    doTest() {
      let headers = new Headers({'Content-Type': "application/json"});
      console.log("POST");
      let url = 'http://192.168.0.2:8182/html/post_test.php';
      let search = new URLSearchParams();
    //  search.set('id','1');
      search.set('country','India');
      let obj = {name:'India'};

      this.http.post(url, JSON.stringify(obj)).subscribe(res => console.log(res.json()));
    }


  ngOnInit() {
    // let id=1;
    // let state='Madhya Pradesh';
    // this.serviceservice.getstudents().subscribe(data => this.students=data);
  
    
  //  this.http.get('http://192.168.0.2:8182/html/getdata.php?id='+id+'&state='+state).subscribe((data:any) => {
  //   console.log(data) ;
    //.map(response => response.json() );
    //subscribe((data) => console.log(data))
   //  });
    //this.serviceservice.getposts().subscribe((posts) => {
     // console.log(posts);
      //this.results = posts;

  //  });
  }

}
interface result{
  Country:string;
  State:string;
}
interface student{
  Country:string;
}
