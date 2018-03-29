import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-collegeresults',
  templateUrl: './collegeresults.component.html',
  styleUrls: ['./collegeresults.component.css']
})
export class CollegeresultsComponent implements OnInit {
  // results:result[];

  constructor(private serviceservice:ServiceService) { 
    console.log('connected');
  }

  ngOnInit() {
    //this.serviceservice.getposts().subscribe((posts) => {
     // console.log(posts);
      //this.results = posts;

  //  });
  }

}
// interface result{
//   Country:string;
//   State:string;
// }
