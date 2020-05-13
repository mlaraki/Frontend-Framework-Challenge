import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class GetimagesService {
  constructor(private httpClient: HttpClient) {}

  getImages(searchTerm:string): Observable<any> {
    return this.httpClient.get(
      `https://pixabay.com/api/?key=16470380-d4d16b7e542ef904b93d0542c&q=${searchTerm}&image_type=photo&page=1`
    );
  }
}
