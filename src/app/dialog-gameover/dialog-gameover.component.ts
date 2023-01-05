import { Component } from '@angular/core';
import { addDoc, collection, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';


@Component({
  selector: 'app-dialog-gameover',
  templateUrl: './dialog-gameover.component.html',
  styleUrls: ['./dialog-gameover.component.scss']
})
export class DialogGameoverComponent {
  constructor(public dialogRef: MatDialogRef<DialogGameoverComponent>, private router: Router, private firestore: Firestore){}

  private coll: CollectionReference<DocumentData>;

  async startNewGame(){
    let game = new Game();
    this.coll = collection(this.firestore, 'games');
    let gameinfo = await addDoc(this.coll, game.toJson());
    this.router.navigateByUrl('/game/' + gameinfo.id);
    this.dialogRef.close();
  }

}
