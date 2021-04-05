import { ThrowStmt } from '@angular/compiler';
import { Input,EventEmitter,Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  nom = "";
  dateRendu = null;
  constructor(private assignmentsService:AssignmentsService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(event) {
    if (!this.nom || !this.dateRendu)
      return;
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateRendu = this.dateRendu;
    nouvelAssignment.rendu = false;
    this.assignmentsService.addAssignment(nouvelAssignment)
    .subscribe(message => {
      console.log(message);
      this.router.navigate(["/home"]);
    })
  }

}
