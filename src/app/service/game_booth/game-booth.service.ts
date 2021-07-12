import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameBoothService {

  public url = 'http://localhost/game_city/';

  constructor(private htttpClient: HttpClient) { }

  public createNewGameBooth(booth){
    return this.htttpClient.post(this.url+'api/game_booth/create.php', booth);
  }

  public getGameBooths() {
    return this.htttpClient.get(this.url+'api/game_booth/get.php');
  }

}
