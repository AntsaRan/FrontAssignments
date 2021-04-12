import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Matiere } from './model/matiere.model';


@Injectable({
  providedIn: 'root'
})
export class MatieresService {
  matieres: Matiere[];
  constructor(private http:HttpClient) { }
  uri = "http://localhost:8010/api/matiere";

  getMatieres():Observable<Matiere[]>{
    return this.http.get<Matiere[]>(this.uri);
  }
}
