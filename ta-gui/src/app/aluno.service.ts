import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Aluno } from '../../../common/aluno';

@Injectable()
export class AlunoService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  criar(aluno: Aluno): Observable<Aluno> {
    return this.http.post<any>(this.taURL + "/aluno", aluno, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return aluno;} else {return null;}} )
              ); 
  }

  excluir(aluno: Aluno): Observable<Aluno> {
    console.log("CHEGOU AQUI")
    console.log(aluno)
    
    // Até aqui
    return this.http.post<any>(this.taURL + "/excluir", JSON.stringify(aluno), {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {
                  console.log(res); 
                  return aluno;
                } else {
                  console.log("UE")
                  return null;
                }} )
              ); 
  }

  atualizar(aluno: Aluno): Observable<Aluno> {
    return this.http.put<any>(this.taURL + "/aluno",JSON.stringify(aluno), {headers: this.headers})          .pipe( 
                retry(2),
                map( res => {if (res.success) {return aluno;} else {return null;}} )
              ); 
  }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.taURL + "/alunos")
              .pipe(
                 retry(2)
               );
  }

}