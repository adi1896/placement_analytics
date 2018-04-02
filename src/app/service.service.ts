import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServiceService {

  constructor(private http:HttpClient) { 
    console.log('service is running ...');
    let id=1;
    let state='Madhya Pradesh';
  
    
   this.http.get('http://192.168.0.2:8182/html/getdata.php?id='+id+'&state='+state).subscribe((data:any) => {
    console.log(data) ;
    //.map(response => response.json() );
    //subscribe((data) => console.log(data))
     });

    }
  }