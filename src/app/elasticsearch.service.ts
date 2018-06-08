import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch';


@Injectable()
export class ElasticsearchService {
  private client: Client;

  constructor() { 
    // if (!this.client) {
    //   this.connect();
    // }
  }
 
  // private connect() {
  //   this.client = new Client({
  //     host: 'http://localhost:9200',
  //     log: 'trace'
  //   });
  // }
  // createIndex(name): any {
  //   return this.client.indices.create(name);
  // }
 
  // isAvailable(): any {
  //   return this.client.ping({
  //     requestTimeout: Infinity,
  //     body: 'hello JavaSampleApproach!'
  //   });
  // }

  // queryalldocs = {
  //   'query': {
  //     'match': {
  //       "Country": "India"
  //     }
  //   }
  // };

  // getAllDocuments(): any {
  //   return this.client.search({
  //     index: "jobs",
  //     type: "indianjobs",
  //     body: this.queryalldocs,
  //     filterPath: ['hits.hits._source']
  //   });
  // }

}
