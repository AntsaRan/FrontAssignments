import { Output, EventEmitter } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ElevesService } from '../../shared/eleves.service';
import { Eleve } from '../../shared/model/eleve.model';



@Component({
  selector: 'app-detaileleve',
  templateUrl: './detaileleve.component.html',
  styleUrls: ['./detaileleve.component.css']
})
export class DetaileleveComponent implements OnInit {
  @Output() assignDeleteEmit = new EventEmitter<Eleve>();
  elevetransmis: Eleve;

  constructor(public dialog: MatDialog,
    private ElevesService: ElevesService,
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthService) { }

  ngOnInit(): void {
    this.getEleveById();

  }
  getEleveById() {
    const id: number = + this.route.snapshot.params.id;
    this.ElevesService.getEleveById(id)
      .subscribe(eleve => {
        this.elevetransmis = eleve;
      })
  }
  onclickEdit() {
    console.log(this.elevetransmis.id);
    this.router.navigate(["/eleve", this.elevetransmis.id, "edit"]);
  }
  isAdmin() {
    const isadmin = localStorage.getItem('isadmin');
    var isADMIN: boolean = false;
    if (isadmin === "false") return isADMIN;
    return true;

  }
  deleteAssignment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      id: this.elevetransmis.id,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.ElevesService.deleteEleve(this.elevetransmis)
            .subscribe(message => {
              this.elevetransmis = null;
              this.router.navigate(["/home"]);
            })
        }
      }
    );
  }

}
