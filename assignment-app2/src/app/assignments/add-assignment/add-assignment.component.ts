import { ThrowStmt } from '@angular/compiler';
import { Input, EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  nom = "";
  dateRendu = null;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private assignmentsService: AssignmentsService, private router: Router) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nom: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      dateRendu: ['', Validators.required]
    });
  }

  onSubmit(event) {
    if ( !this.firstFormGroup.value["nom"] || !this.secondFormGroup.value["dateRendu"])
      return;
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.firstFormGroup.value["nom"];
    nouvelAssignment.dateRendu = this.secondFormGroup.value["dateRendu"];
    nouvelAssignment.rendu = false;
    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(["/home"]);
      })
  }

}
