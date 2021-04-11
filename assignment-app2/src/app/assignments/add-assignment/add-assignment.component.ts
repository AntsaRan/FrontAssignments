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
  thirdFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private assignmentsService: AssignmentsService, private router: Router) { }
  id_eleve = null;
  id_matiere = null;
  note = null;
  remarque = null;
  error ="";
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      dateRendu:['',Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      ideleve: ['', Validators.required],
      idmatiere: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      note: ['', Validators.required],
      remarque: ['']
    });
  }

  onSubmit(event) {

    if ( !this.firstFormGroup.value["nom"] 
    || !this.firstFormGroup.value["dateRendu"]
    || !this.secondFormGroup.value["ideleve"]
    || !this.secondFormGroup.value["idmatiere"]
    || !this.thirdFormGroup.value["note"]) {
      this.error="Renseignez tous les champs obligatoires";
      return;
    }
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.firstFormGroup.value["nom"];
    nouvelAssignment.dateRendu = this.firstFormGroup.value["dateRendu"];
    nouvelAssignment.rendu = false;
    nouvelAssignment.id_eleve = this.secondFormGroup.value["ideleve"];
    nouvelAssignment.id_matiere = this.secondFormGroup.value["idmatiere"];
    nouvelAssignment.note = this.thirdFormGroup.value["note"];
    nouvelAssignment.remarque = this.thirdFormGroup.value["remarque"];
    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(["/home"]);
      })
  }

}
