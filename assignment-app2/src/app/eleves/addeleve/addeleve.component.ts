import { ThrowStmt } from '@angular/compiler';
import { Input, EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ElevesService } from 'src/app/shared/eleves.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Eleve } from 'src/app/shared/model/eleve.model';

@Component({
  selector: 'app-addeleve',
  templateUrl: './addeleve.component.html',
  styleUrls: ['./addeleve.component.css']
})
export class AddeleveComponent implements OnInit {
  nom = "";
  prenom = "";
  error = "";

  /* FORM RELATED VAR */
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private eleveService: ElevesService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email:['', Validators.required],
    });
  }

  onSubmit(event) {

    if (!this.firstFormGroup.value["nom"]
      || !this.firstFormGroup.value["prenom"]) {
      this.error = "Renseignez tous les champs obligatoires";
      console.log('error');
      return;
    }
    let nouvelEleve = new Eleve();
    nouvelEleve.nom = this.firstFormGroup.value["nom"];
    nouvelEleve.prenom = this.firstFormGroup.value["prenom"];
    nouvelEleve.email = this.firstFormGroup.value["email"];
    this.eleveService.addEleve(nouvelEleve)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(["/listEleve"]);
      })
  }
}
