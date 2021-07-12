import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameBoothService } from '../service/game_booth/game-booth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userForm: FormGroup;
  gameBooth = [];

  duration;

  startBtn = true;
  stopBtn = false;
  showTimer = false;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private gameBoothService: GameBoothService) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.userForm = new FormGroup({
      'customer': new FormControl('', Validators.required),
      'hour': new FormControl('0', [Validators.required, Validators.pattern("^[0-9]*$") ]),
      'minute': new FormControl('0', [Validators.required, Validators.pattern("^[0-9]*$")]),
    });
  }

  ngOnInit() {
    this.getAllGAmeBooth();
  }

  getAllGAmeBooth(){
    this.gameBoothService.getGameBooths().subscribe(
      ( resp: any ) => {
        
        this.gameBooth = resp.data;
        console.log(this.gameBooth);
      },
      (erro: HttpErrorResponse) => {
        if (erro.error instanceof Error) {
          console.log('An error occurred:', erro.message);
        } else {
          console.log('Backend returned status code: ', erro.status);
          console.log('Response body:', erro.error);
        }
      }
    );
  }

  open(content, id) {
    this.modalService.open(content);
    console.log(id);
    this.userForm.reset();
  }

  closeGame(content){
    this.duration = '';
    this.startBtn = false;
    this.showTimer = false;
    this.stopBtn = false;
    this.modalService.open(content);
  }

  beginGame(){
    this.duration = new Date( Date.now() + ( this.userForm.get('hour').value*60*60 + this.userForm.get('minute').value * 60 ) * 1000 );
    this.startBtn = false;
    this.stopBtn = true;
    this.showTimer = true;
    this.modalService.dismissAll();
    console.log(this.userForm.get('hour').value);
  }

  // date = new Date( Date.now() + ( 0*60*60 + 1 * 60 ) * 1000 );
  
  triggerFunction(content) {
    console.log('Timer Ended');
    this.modalService.open(content);
    this.duration = '';
    this.startBtn = false;
    this.stopBtn = false;
    this.showTimer = false;
  }

  payAmount(){
    console.log('pay amount');
    this.startBtn = true;
    this.stopBtn = false;
    this.showTimer = false;
    this.modalService.dismissAll();
  }

}
