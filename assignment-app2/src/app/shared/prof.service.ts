import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Prof } from './model/prof.model';

@Injectable({
  providedIn: 'root'
})
export class ProfService {
 
  profs: Prof[];

  constructor(private http:HttpClient) { }
  uri = "http://localhost:8010/api/prof";

  getProfs():Observable<Prof[]>{
    return this.http.get<Prof[]>(this.uri);
  }
  getProf(id:number): Observable<Prof> {
    console.log(id + " Id dans ProfService");
    console.log(this.uri+"/"+id);
    return this.http.get<Prof>(this.uri+"/"+id)
    .pipe(
      map(a => {
        console.log(a._id+ " ___id");
        return a;
      }),
      catchError(this.handleError<any>('### catchError: getProfByID avec id= '+id))
      );
      /*,
      filtrer les données avant de les envoyer
      filter(a => {
        return (a.rendu)
      })*/
    }
    getProfsPagine(page: number, limit: number): Observable<any> {
      return this.http.get<Prof[]>(this.uri + "?page=" + page + "&limit=" + limit);
    }

  private handleError<T>(operation: any, result?: T){
    return (error:any): Observable<T> => {
      console.log(error);
      console.log(operation + ' a échoué' + error.message);
      return of(result as T); 
    }

  }
}
