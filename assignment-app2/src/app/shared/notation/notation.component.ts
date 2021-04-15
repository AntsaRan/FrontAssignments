import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notation',
  templateUrl: './notation.component.html',
  styleUrls: ['./notation.component.css']
})
export class NotationComponent implements OnInit {

  note:number;
  remarque:string;
  constructor(private dialogRef: MatDialogRef<NotationComponent>,@Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close("annuler");
  }
  onSubmit() {
    this.dialogRef.close({note:this.note,remarque:this.remarque});
  }
}
