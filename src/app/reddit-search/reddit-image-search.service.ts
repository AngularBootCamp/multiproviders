import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flatMap } from 'lodash-es';
import { map, Observable } from 'rxjs';

export interface RedditResult {
  thumbnail: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class RedditImageSearchService {
  constructor(private http: HttpClient) {}

  search(
    subReddit: string,
    search: string
  ): Observable<RedditResult[]> {
    const url = `https://www.reddit.com/r/${subReddit}/search.json`;
    const params = { restrict_sr: 'on', q: search };
    return this.http
      .get<RedditSubredditSearchResponse>(url, { params })
      .pipe(map(translateRedditSubredditSearchResponse));
  }
}

function translateRedditSubredditSearchResponse(
  response: RedditSubredditSearchResponse
): RedditResult[] {
  // This function doesn't know anything about HTTP or Observable; it just
  // manages the messy shape of this API's data return layout.

  return flatMap(
    response.data.children,
    (listing: {
      data?: {
        thumbnail: string;
        title: string;
      };
    }): RedditResult[] => {
      if (listing) {
        const listingData = listing.data;
        if (listingData) {
          const thumbnail = listingData.thumbnail;
          const title = listingData.title;
          if (thumbnail.startsWith('http')) {
            return [{ thumbnail, title }];
          }
        }
      }
      return [];
    }
  );
}

interface RedditSubredditSearchResponse {
  data: {
    children: RedditSearchListing[];
  };
}

interface RedditSearchListing {
  data: {
    title: string;
    thumbnail: string;
  };
}
