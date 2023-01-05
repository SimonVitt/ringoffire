import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-help',
  templateUrl: './dialog-help.component.html',
  styleUrls: ['./dialog-help.component.scss']
})
export class DialogHelpComponent {

  constructor(public dialogRef: MatDialogRef<DialogHelpComponent>){}

  onNoClick(){
    this.dialogRef.close();
  }
}
