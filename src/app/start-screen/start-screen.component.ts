import { Component } from '@angular/core';
import { addDoc, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection } from '@firebase/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  private coll: CollectionReference<DocumentData>;

  constructor(private router: Router, private firestore: Firestore){}

  async newGame(){
    let game = new Game();
    this.coll = collection(this.firestore, 'games');
    let gameinfo = await addDoc(this.coll, game.toJson());
    this.router.navigateByUrl('/game/' + gameinfo.id);
  }
}
