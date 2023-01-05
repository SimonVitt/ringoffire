import { Component, HostListener, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { collection, collectionData, CollectionReference, doc, docData, DocumentData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { DialogGameoverComponent } from '../dialog-gameover/dialog-gameover.component';
import { DialogHelpComponent } from '../dialog-help/dialog-help.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  marginBetweenPlayers: number;
  game: Game;
  gameID: string;
  gameover = false;
  counter = 0;

  private coll: CollectionReference<DocumentData>;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {
    this.coll = collection(this.firestore, 'games');
    this.setPlaylistResponsive();
  }

  ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.setGameData(params);
    });
    this.openDialog();
  }

  setGameData(params: any) {
    this.gameID = params['id'];
    let docRef = doc(this.coll, this.gameID);
    let game$ = docData(docRef);
    game$.subscribe((game: any) => {
      this.game.currentPlayer = game.currentPLayer;
      this.game.playedCards = game.playedCards;
      this.game.players = game.players;
      this.game.player_images = game.player_images;
      this.game.stack = game.stack;
      this.game.currentCard = game.currentCard;
      this.game.pickCardAnimation = game.pickCardAnimation;
      if(this.game.stack.length == 0 && this.counter == 0){
        this.counter++;
        this.gameover = true;
        this.openGameover();
      }
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.players.length > 1) {
      if (!this.game.pickCardAnimation) {
        this.takeCardAllowed();
      }
    } else {
      this.openDialog();
    }
  }

  takeCardAllowed() {
    this.game.currentCard = this.game.stack.pop()!;
    this.game.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();

    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.saveGame();
    }, 1200);
  }

  openGameover(){
    this.dialog.open(DialogGameoverComponent, { disableClose: true });
  }

  editPlayer(playerId) {
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if(change === 'DELETE'){
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
        }else{
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('1.webp');
        this.saveGame();
      }
    });
  }

  openDialogQuestion(){
    this.dialog.open(DialogHelpComponent);
  }

  async saveGame() {
    await updateDoc(doc(this.coll, this.gameID), this.game.toJson());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setPlaylistResponsive();
  }

  setPlaylistResponsive() {
    if (document.body.offsetWidth < 800) {
      this.marginBetweenPlayers = 50;
    } else {
      this.marginBetweenPlayers = 90;
    }
  }
}
