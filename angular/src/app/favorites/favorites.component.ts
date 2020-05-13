import { Component } from '@angular/core';
import { GlobalVariables } from "../global-variables";
import { _Image } from "../types/Interfaces"

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
	favorites = GlobalVariables.favorites;

  removeFromFavorites(img : _Image) : void {
    GlobalVariables.favorites.splice(
      GlobalVariables.favorites.indexOf(img),1);
  }
}
