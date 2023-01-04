import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog) {
    this.game = new Game();
  }

  /*ngOnInit(){
    this.newGame();
  }*/

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;

        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      }, 1200);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0 ){
        this.game.players.push(name);
      }
    });
  }
}
