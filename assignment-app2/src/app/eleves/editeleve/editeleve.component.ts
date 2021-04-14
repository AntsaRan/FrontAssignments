import { Output, EventEmitter } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ElevesService } from '../../shared/eleves.service';
import { Eleve } from '../../shared/model/eleve.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-editeleve',
  templateUrl: './editeleve.component.html',
  styleUrls: ['./editeleve.component.css']
})
export class EditeleveComponent implements OnInit {
  nom = "";
  prenom = "";
  error = "";
  email="";
  eleve:Eleve;
  id = null;

  /* FORM RELATED VAR */
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  constructor(private _formBuilder: FormBuilder,
    private ElevesService: ElevesService,
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthService) { }

  ngOnInit(): void {
    this.getEleveById();

  }
  getEleveById() {
    const id: number = + this.route.snapshot.params.id;
    this.ElevesService.getEleveById(id)
      .subscribe(eleve => {
        this.id = eleve._id;
        this.nom = eleve.nom;
        this.prenom = eleve.prenom;
        this.email = eleve.email;
      })
  }

  onSubmit(event) {
    if (!this.nom || !this.prenom || !this.email ) {
      this.error = "Renseignez tous les champs obligatoires";
    } else {

      this.eleve = new Eleve();
      this.eleve._id = this.id;
      this.eleve.nom = this.nom;
      this.eleve.prenom = this.nom;
      this.eleve.email = this.email;

      this.ElevesService.updateEleve(this.eleve)
        .subscribe(m => {
          console.log(m);
          this.router.navigate(["/listEleve"]);
        })
    }

  }
}
