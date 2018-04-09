import { Component, OnInit } from '@angular/core';
import {ElasticsearchService} from '../../elasticsearch.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  customerSources: CustomerSource[];


  constructor(private es: ElasticsearchService) { }

  ngOnInit() {
    this.es.getAllDocuments()
    .then(response => {
      this.customerSources = response.hits.hits;
      console.log(response);
    }, error => {
      console.error(error);
    }).then(() => {
      console.log('Show Customer Completed!');
    });
  }

}
export interface CustomerSource {
  source: string[];
}
