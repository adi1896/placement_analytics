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

  constructor() { }



  ngOnInit() {


    this.uniqueList = new uniqueList().getJsonCategeries();
    this.state=Object.keys(this.uniqueList)
    console.log(this.uniqueList); 
    console.log("hvuvhh",this.state); 
    console.log(this.uniqueList.Delhi);
  
   
  // getcountry(e) {
  //    this.try_
  //   // var p: any;
  //   // console.log("getMakeCalled");
  //   // console.log(e);
  //   // console.log(this.try_.a);
  //   // var i;
  //   // for(i=0; i< this.try_.length; i++)
  //   // {
  //   //   if(try_[i]== e)


  //   // }

  //   // for (p in this.try_.a) {
  //   //   console.log("Inside For Loop");
  //   //   console.log(this.try_[p].a);
  //   //   console.log(e);

  //     // if (this.try_.a[p] == e) {
      //   this.try_.add(this.try_[p].a);
      // }
  }
}



