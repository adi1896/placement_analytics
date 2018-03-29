import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor() {   }

  ngOnInit() {
    //this.serviceservice.getposts('http://localhost:8182/html/getdata.php').map(response => response.json() ).subscribe((data) =>
      //console.log(data))
      // this.result = datas
  }

}
