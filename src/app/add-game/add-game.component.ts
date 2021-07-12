import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameBoothService } from '../service/game_booth/game-booth.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  gameForm: FormGroup;
  imageSrc: string;

  constructor( private gameBoothService: GameBoothService ) { 
    this.gameForm = new FormGroup({
      'boothname': new FormControl('', Validators.required),
      'price': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$") ]),
      'feature': new FormControl('', Validators.required),
      'image_name': new FormControl('', Validators.required),
       'fileSource': new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.gameForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }

  submitGameform(){
    console.log(this.gameForm.value);
    this.gameBoothService.createNewGameBooth(this.gameForm.value).subscribe(
      ( resp: any ) => {
        console.log(resp);
      },
      (erro: HttpErrorResponse) => {
        if (erro.error instanceof Error) {
          console.log('An error occurred:', erro.message);
        } else {
          console.log('Backend returned status code: ', erro.status);
          console.log('Response body:', erro.error);
        }
      }
    )
  }

}
