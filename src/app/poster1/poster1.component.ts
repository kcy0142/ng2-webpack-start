import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'main',
    templateUrl: './src/app/poster1/poster1.component.html',
   styleUrls: ['./src/app/poster1/poster1.component.css']
    // template: `
    // 	<h1> Hello Poster World and Webpack </h1>
    // `,
    //  styleUrls: ['./src/app/poster/poster.component.css']
})
export class Poster1Component implements OnInit {

  posts: Post[];

  constructor(private http: Http) {
    //console.log("post1component constructor 1...........");
    this.http.get('https://jsonplaceholder.typicode.com/posts').
      map(res => res.json()).subscribe(posts => {
        this.posts = posts;
      })

    /*
    this.posts = [{
      id: 1,
      title: 'title1',
      body: 'body1'
    },
      {
        id: 2,
        title: 'title2',
        body: 'body2'
      }
    ]
    */

  }

  ngOnInit() {
  //  console.log("post1 component ngOnInit...........");
  }

}

interface Post {
  id: number;
  title: string;
  body: string;

}
