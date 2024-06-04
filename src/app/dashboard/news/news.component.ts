import { Component } from '@angular/core';

import feed from './feed.json';

export interface FeedItem {
  title: string;
  thumbnail_url: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  feedData: FeedItem[] = feed.data;

  constructor() {
    //10306291
    //https://app.uberflip.com/hubs/manage/128582/custom/10306291
    //https://developers.uberflip.com/reference/list-items-in-stream-1

    // const sdk = require('api')('@uberflip/v4.0#xom8t35lbl4h9at');
    //
    // sdk.auth('60dff10dc0bab71be5376dd2888e4aa41fe1fd4c');
    // sdk.listItemsInStream({sort: 'created_at', limit: '4', page: '1', streamId: '10306291'})
    //   .then(({ data }) => console.log(data))
    //   .catch(err => console.error(err));
    // console.log(this.feedData);
  }

  openUrl(url: string): void {
    window.open(url);
  }
}
