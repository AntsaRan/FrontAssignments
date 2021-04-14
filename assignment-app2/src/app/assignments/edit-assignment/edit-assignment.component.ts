import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ElevesService } from 'src/app/shared/eleves.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Eleve } from 'src/app/shared/model/eleve.model';
import { Matiere } from 'src/app/shared/model/matiere.model';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  id = null;
  nom = "";
  dateRendu = null;
  id_eleve = null;
  id_matiere = null;
  id_eleve_new = null;
  id_matiere_new = null;
  note = null;
  remarque = null;
  assignment: Assignment;
  error = "";
  /* LISTS */
  listEleves: Eleve[];
  listMatieres: Matiere[];
  selectedEl:string;
  constructor(
    private assignmentService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private eleveService: ElevesService,
    private assignmentsService: AssignmentsService,
    private matiereService: MatieresService) { }

  ngOnInit(): void {
    this.getAssignementById();
  }

  getAssignementById() {
    const id: number = + this.route.snapshot.params.id;
    this.assignmentService.getAssignment(id)
      .subscribe(assignment => {
        this.id = assignment._id;
        this.nom = assignment.nom;
        this.dateRendu = assignment.dateRendu;
        this.id_eleve = assignment.id_eleve['nom'];
        this.id_matiere = assignment.id_matiere['nom'];
        this.note = assignment.note;
        this.remarque = assignment.remarque;

      })
    this.getMatieres();
    this.getEleves();
  }
  getEleves() {
    this.eleveService.getEleves()
      .subscribe(data => {
        this.listEleves = data;
        this.listEleves.forEach(e=>{
          if(e._id===this.id_eleve)
          this.selectedEl=e._id;


        })
      });
  }

  getMatieres() {
    this.matiereService.getMatieres()
      .subscribe(data => {
        this.listMatieres = data;
      });
  }

  onSubmit(event) {
    console.log( this.note + "  this.note ");
    if (!this.nom || !this.dateRendu || !this.id_eleve_new || !this.id_matiere_new) {
      this.error = "Renseignez tous les champs obligatoires";
    } else {

      this.assignment = new Assignment();
      this.assignment._id = this.id;
      this.assignment.nom = this.nom;
      this.assignment.dateRendu = this.dateRendu;
      this.assignment.id_eleve = this.id_eleve_new;
      this.assignment.id_matiere = this.id_matiere_new;
      this.assignment.note = this.note;
      this.assignment.remarque = this.remarque;
      if(this.note){
        this.assignment.rendu=true;
      }
      this.assignmentService.updateAssignment(this.assignment)
        .subscribe(m => {
          console.log(m);
          this.router.navigate(["/home"]);
        })
    }

  }
}