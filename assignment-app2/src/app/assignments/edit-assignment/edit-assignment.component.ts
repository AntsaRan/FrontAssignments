import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  nom = "";
  dateRendu = null;
  id_eleve = null;
  id_matiere = null;
  note = null;
  remarque = null;
  assignment: Assignment;
  constructor(private assignmentService: AssignmentsService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAssignementById();
  }

  getAssignementById() {
    const id: number = + this.route.snapshot.params.id;
    this.assignmentService.getAssignment(id)
      .subscribe(assignment => {
        this.nom = assignment.nom;
        this.dateRendu = assignment.dateRendu;       
        this.id_eleve = assignment.id_eleve;
        this.id_matiere = assignment.id_matiere;
        this.note = assignment.note;
        this.remarque = assignment.remarque;
      })
  }

  onSubmit(event) {
    if (!this.nom || !this.dateRendu) return;
    this.assignment.nom = this.nom;
    this.assignment.dateRendu = this.dateRendu;
    this.assignment.id_eleve = this.id_eleve;
    this.assignment.id_matiere = this.id_matiere;
    this.assignment.note = this.note;
    this.assignment.remarque = this.remarque;
    this.assignmentService.updateAssignment(this.assignment)
      .subscribe(m => {
        console.log(m);
        this.router.navigate(["/home"]);
      })
  }
}