import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Eleve } from './model/eleve.model';


@Injectable({

  providedIn: 'root'
})
export class ElevesService {
  eleves: Eleve[];
  constructor(private http:HttpClient) { }
  uri = "http://localhost:8010/api/eleve";

  getEleves():Observable<Eleve[]>{
    return this.http.get<Eleve[]>(this.uri);
  }
}
