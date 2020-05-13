import { Component } from "@angular/core";
import { GetimagesService } from "../get-images.service";
import { GlobalVariables } from "../global-variables";
import {_Image, _Favorite} from "../types/Interfaces"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})

export class HomeComponent {

  searchTerm: string = "";
  loading: boolean = false;
  images: _Image[] = [];
  formSubmitted: boolean = false;

  constructor(private GetimagesService: GetimagesService) {}

  addToFavorites({ webformatURL: url, id }: _Favorite) : void {
    GlobalVariables.favorites.push({ url, id });
  }
  removeFromFavorites({ webformatURL: url, id }: _Favorite) : void{
    GlobalVariables.favorites.splice(
      GlobalVariables.favorites.indexOf({ url, id }),
      1
    );
  }
  isFavorite({ id }) : boolean {
    return GlobalVariables.favorites.find((img) => img.id === id) ? true : false;
  }

  toggleLoading() : void {
    this.loading = !this.loading;
  }
  handleFormSubmit() : void {
    this.images = [];
    this.toggleLoading();
    this.formSubmitted = true;
    this.GetimagesService.getImages(this.searchTerm).subscribe((res) => {
      this.images = res.hits;
      this.toggleLoading();
    });
  }
}
