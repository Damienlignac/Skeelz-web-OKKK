import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Cours} from '../model/cours';
import {Observable} from 'rxjs';
import {Module} from '../model/module';
import {Chapitre} from '../model/chapitre';
import {ElementDeCours} from '../model/elementDeCours';
import {Etat} from '../model/etat';
import {Question} from '../model/question';
import {Reponse} from '../model/reponse';

@Injectable({
  providedIn: 'root'
})
export class EditionQcmHttpService {


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
  }

  findByIdModule(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'module/' + id );
  }

  findQuestionReponses(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'module/' + id +'/questionsAndReponses');
  }

  findById2(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'cours/' + id);
  }
  //
  //
  //
  // saveCours(cours: Cours, module: Module, chapitre : Chapitre, elements:Array<ElementDeCours>){
  //   if (cours.id) {
  //     this.http.put(this.appConfigService.backEnd + 'cours/' + cours.id, cours).subscribe(resp => {
  //       if (module.id){
  //           module.cours = resp;
  //           this.http.put(this.appConfigService.backEnd + 'module/' + module.id, module).subscribe( resp =>{
  //             if (chapitre.id){
  //                 chapitre.module = resp;
  //                 this.http.put(this.appConfigService.backEnd + 'chapitre/' + chapitre.id, chapitre).subscribe( resp =>{
  //                   for (let element of elements){
  //                     if (element.id){
  //                       element.chapitre = resp;
  //                       this.http.put(this.appConfigService.backEnd + 'elementDeCours/' + element.id, element).subscribe();
  //                     }
  //                   else{
  //                       element.chapitre = resp;
  //                       this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe();
  //
  //                     }}});
  //               }
  //             else {
  //               chapitre.module = resp;
  //               this.http.post(this.appConfigService.backEnd + 'chapitre', chapitre).subscribe( resp =>{
  //                 for (let element of elements){
  //                     element.chapitre = resp;
  //                     this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe();
  //
  //                   }});
  //             }
  //           });
  //         }
  //     });
  //   }
  // }





  // saveQcm( module: Module, question:Question, reponses:Array<Reponse>){
  //   this.http.put(this.appConfigService.backEnd + 'module/' + module.id, module).subscribe( resp =>{
  //     if (question.id){
  //       this.http.put(this.appConfigService.backEnd + 'question/' + question.id, question).subscribe( resp =>{
  //       for (let reponse of reponses){
  //         if (reponse.id){
  //           reponse.question = resp;
  //           this.http.put(this.appConfigService.backEnd + 'reponse/' + reponse.id, reponse).subscribe();
  //         }
  //         else{
  //           reponse.question = resp;
  //
  //           this.http.post(this.appConfigService.backEnd + 'reponse', reponse).subscribe();
  //
  //         }}})}
  //   else {
  //       question.module = resp;
  //       // this.http.post(this.appConfigService.backEnd + 'question', question).subscribe( resp =>{
  //         for (let reponse of reponses){
  //           if (reponse.id){
  //             reponse.question = resp;
  //             this.http.put(this.appConfigService.backEnd + 'reponse/' + reponse.id, reponse).subscribe();
  //           }
  //           else{
  //             console.log(reponse)
  //             reponse.question = resp;
  //             this.http.post(this.appConfigService.backEnd + 'reponse', reponse).subscribe();
  //
  //           }}})
  //     }}
  //     )
  //
  // };






}

