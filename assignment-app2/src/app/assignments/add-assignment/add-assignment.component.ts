import { ThrowStmt } from '@angular/compiler';
import { Input, EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Eleve } from 'src/app/shared/model/eleve.model';
import { Matiere } from 'src/app/shared/model/matiere.model';
import { ElevesService } from 'src/app/shared/eleves.service';
import { MatieresService } from 'src/app/shared/matieres.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  nom = "";
  dateRendu = null;
  isLinear = false;
  id_eleve = null;
  id_matiere = null;
  note = null;
  remarque = null;
  error = "";
  /* FORM RELATED VAR */
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  /* LISTS */
  listEleves: Eleve[];
  listMatieres: Matiere[];

  constructor(private _formBuilder: FormBuilder,
    private eleveService: ElevesService,
    private assignmentsService: AssignmentsService,
    private router: Router,
    private matiereService: MatieresService) { }

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      dateRendu: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      ideleve: ['', Validators.required],
      idmatiere: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      note: [''],
      remarque: ['']
    });
    this.getMatieres();
    this.getEleves();
  }
  getEleves() {
    this.eleveService.getEleves()
      .subscribe(data => {
        this.listEleves = data;
      });
  }

  getMatieres() {
    this.matiereService.getMatieres()
      .subscribe(data => {
        this.listMatieres = data;
      });
  }

  onSubmit(event) {

    if (!this.firstFormGroup.value["nom"]
      || !this.firstFormGroup.value["dateRendu"]
      || !this.secondFormGroup.value["ideleve"]
      || !this.secondFormGroup.value["idmatiere"]) {
      this.error = "Renseignez tous les champs obligatoires";
      console.log('error');
      return;
    }
    console.log('nandalo');
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.firstFormGroup.value["nom"];
    nouvelAssignment.dateRendu = this.firstFormGroup.value["dateRendu"];
    nouvelAssignment.rendu = false;
    nouvelAssignment.id_eleve = this.secondFormGroup.value["ideleve"];
    nouvelAssignment.id_matiere = this.secondFormGroup.value["idmatiere"];
    if (this.thirdFormGroup.value["note"]>20 ||this.thirdFormGroup.value["note"]<0) {
      this.error = "La note est invalide";
      return;
    }
    nouvelAssignment.note = this.thirdFormGroup.value["note"];
    nouvelAssignment.remarque = this.thirdFormGroup.value["remarque"];
    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(["/home"]);
      })
  }

}
