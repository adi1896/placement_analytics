import { Component, OnInit } from '@angular/core';
import {uniqueList} from './uniqueList'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {
try_: any;
uniqueList: any;
state:any;
city:any;
model : any ={};

  constructor() { }



  ngOnInit() {


    this.uniqueList = new uniqueList().getJsonCategeries();
    this.state=Object.keys(this.uniqueList);
    console.log(this.uniqueList); 
    console.log("hvuvhh",this.state); 
    console.log(this.uniqueList.Delhi);
  
   
  
  }
  getcity(state){
    var key:any;
    var val:any;
     
    console.log("hello",state);
    console.log(this.uniqueList[state]);
    this.city=this.uniqueList[state];
    // for ( key , val in this.uniqueList) {

    // }
  }
}



