import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {
  allProfilePictures = ['2.png', '1.webp', 'monkey.png', 'pinguin.svg'];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>){}

  onNoClick(){
    this.dialogRef.close();
  }
}
