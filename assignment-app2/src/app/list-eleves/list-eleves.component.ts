import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { ElevesService } from '../shared/eleves.service';
import { Eleve } from '../shared/model/eleve.model';


@Component({
  selector: 'app-list-eleves',
  templateUrl: './list-eleves.component.html',
  styleUrls: ['./list-eleves.component.css']
})
export class ListElevesComponent implements OnInit {
  eleves: Eleve[];
  spinnershow = true;

  constructor(private eleveservice: ElevesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getEleves();
  }
  getEleves() {
    this.eleveservice.getEleves()
      .subscribe(data => {
        this.eleves = data;
        this.spinnershow = false;
      });
  }

}
