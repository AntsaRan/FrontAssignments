import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { ElevesService } from '../shared/eleves.service';
import { MatieresService } from '../shared/matieres.service';
import { Matiere } from '../shared/model/matiere.model';
@Component({
  selector: 'app-list-matieres',
  templateUrl: './list-matieres.component.html',
  styleUrls: ['./list-matieres.component.css']
})
export class ListMatieresComponent implements OnInit {
  matieres: Matiere[];
  spinnershow = true;

  constructor(private matiereservice: MatieresService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getMatieres();
  }
  getMatieres() {
    this.matiereservice.getMatieres()
      .subscribe(data => {
        this.matieres = data;
        this.spinnershow = false;
      });
  }
}
