import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-collegeresults',
  templateUrl: './collegeresults.component.html',
  styleUrls: ['./collegeresults.component.css']
})
export class CollegeresultsComponent implements OnInit {
  // results:result[];

  constructor(private http:HttpClient) { 
    console.log('connected');
  }
  

  postpro(){
  this.http.post('http://192.168.0.2:8182/html/getdata.php',
   {
     id :1,
     state:'telanga'
   }).subscribe((data:any) => {
    console.log(data) ;
    //.map(response => response.json() );
    //subscribe((data) => console.log(data))
     }, err => { console.log()});
    }

  ngOnInit() {
    let id=1;
    let state='Madhya Pradesh';
  
    
   this.http.get('http://192.168.0.2:8182/html/getdata.php?id='+id+'&state='+state).subscribe((data:any) => {
    console.log(data) ;
    //.map(response => response.json() );
    //subscribe((data) => console.log(data))
     });
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
