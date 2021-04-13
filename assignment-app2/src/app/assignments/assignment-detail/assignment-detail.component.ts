import { Output, EventEmitter } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Prof } from 'src/app/shared/model/prof.model';
import { ProfService } from 'src/app/shared/prof.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Matiere } from 'src/app/shared/model/matiere.model';


@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Output() assignDeleteEmit = new EventEmitter<Assignment>();
  imgUrl:string ="../../../assets/img/";
  imgProf:string ="";
  assignmentTransmis: Assignment;
  matiereTransmis: Matiere;
  profTransmis: Prof;


  constructor(public dialog: MatDialog, private assignmentService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthService,
    private profService :ProfService ,
    private matiereService : MatieresService) { }

  ngOnInit(): void {
    this.getAssignementById();
    
  }

  getAssignementById() {
    const id: number = + this.route.snapshot.params.id;
    console.log(id + " id getAssignementById");
    this.assignmentService.getAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
        console.log(assignment.id_matiere['id']+ " ITO ILAY ID ANLAY MATIERE");
        this.getMatiereByID(assignment.id_matiere['id']);
        this.getProfbyIdMatiere(assignment.id_matiere['id']);
      })
  }
  getMatiereByID(id) {
    console.log(id + " id MAtiere dans TS");
    this.matiereService.getMatiere(id)
      .subscribe(assign => {
        this.matiereTransmis = assign;
        //console.log("VALINY "+this.profTransmis.nom);
      })
  }

  getProfbyIdMatiere(idProf) {
    console.log(idProf + " idProf dans TS");
    this.profService.getProf(idProf)
      .subscribe(prof => {
        this.profTransmis = prof;
        //console.log("VALINY "+this.profTransmis.nom);
      })
  }
  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;

    this.assignmentService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(["/home"]);
      })
    //this.assignmentTransmis = null;*/
  }
  deleteAssignment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      id: this.assignmentTransmis.id,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        if (data) {
          this.assignmentService.deleteAssignment(this.assignmentTransmis)
            .subscribe(message => {
              this.assignmentTransmis = null;
              this.router.navigate(["/home"]);
            })
        }
      }
    );
  }

  onclickEdit() {
    console.log(this.assignmentTransmis.id);
    this.router.navigate(["/assignment", this.assignmentTransmis.id, "edit"]);
  }

  isAdmin() {
    const isadmin = localStorage.getItem('isadmin');
    var isADMIN: boolean = false;
    if (isadmin === "false") return isADMIN;
    return true;

  }

}
