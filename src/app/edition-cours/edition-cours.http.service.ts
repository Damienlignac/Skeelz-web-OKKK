import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Cours} from '../model/cours';
import {Observable} from 'rxjs';
import {Module} from '../model/module';
import {Chapitre} from '../model/chapitre';
import {ElementDeCours} from '../model/elementDeCours';
import {Etat} from '../model/etat';

@Injectable({
  providedIn: 'root'
})
export class EditionCoursHttpService {


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
  }

  findById(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'cours/' + id + '/modules/chapitres');
  }

  findByIdModule(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'module/' + id );
  }

  findById2(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'cours/' + id);
  }
  findByIdElement(id: number): Observable<any> {
    return this.http.get(this.appConfigService.backEnd+'chapitre/' + id+ '/elementDeCourss');
  }


  saveCours(cours: Cours, module: Module, chapitre : Chapitre, elements:Array<ElementDeCours>){
    if (cours.id) {
      this.http.put(this.appConfigService.backEnd + 'cours/' + cours.id, cours).subscribe(resp => {
        if (module.id){
            module.cours = resp;
            this.http.put(this.appConfigService.backEnd + 'module/' + module.id, module).subscribe( resp =>{
              if (chapitre.id){
                  chapitre.module = resp;
                  this.http.put(this.appConfigService.backEnd + 'chapitre/' + chapitre.id, chapitre).subscribe( resp =>{
                    for (let element of elements){
                      if (element.id){
                        element.chapitre = resp;
                        this.http.put(this.appConfigService.backEnd + 'elementDeCours/' + element.id, element).subscribe();
                      }
                    else{
                        element.chapitre = resp;
                        this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe();

                      }}});
                }
              else {
                chapitre.module = resp;
                this.http.post(this.appConfigService.backEnd + 'chapitre', chapitre).subscribe( resp =>{
                  for (let element of elements){
                      element.chapitre = resp;
                      this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe();

                    }});
              }
            });
          }
        else{
          module.cours = resp;
          this.http.post(this.appConfigService.backEnd + 'module', module).subscribe( resp => {
            chapitre.module = resp;
            this.http.post(this.appConfigService.backEnd + 'chapitre', chapitre).subscribe( resp =>{
              for (let element of elements){
                element.chapitre = resp;
                this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe();
              }});
          })
          }
      });
    }
    else {
      this.http.post(this.appConfigService.backEnd + 'cours', cours).subscribe(resp => {
        module.cours = resp;
        this.http.post(this.appConfigService.backEnd + 'module', module).subscribe( resp => {
          chapitre.module = resp;
          this.http.post(this.appConfigService.backEnd + 'chapitre', chapitre).subscribe( resp =>{
            for (let element of elements){
              element.chapitre = resp;
              this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe();
            }});
        })
      })
    }
  }

  saveValidate(cours: Cours, module: Module, chapitre : Chapitre, elements:Array<ElementDeCours>){
    cours.etat="ATTENTE";
    if (cours.id) {
      this.http.put(this.appConfigService.backEnd + 'cours/' + cours.id, cours).subscribe(resp => {
        if (module.id){
          module.cours = resp;
          this.http.put(this.appConfigService.backEnd + 'module/' + module.id, module).subscribe( resp =>{
            if (chapitre.id){
              chapitre.module = resp;
              this.http.put(this.appConfigService.backEnd + 'chapitre/' + chapitre.id, chapitre).subscribe( resp =>{
                for (let element of elements){
                  if (element.id){
                    element.chapitre = resp;
                    this.http.put(this.appConfigService.backEnd + 'elementDeCours/' + element.id, element).subscribe();
                  }
                  else{
                    element.chapitre = resp;
                    this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe();

                  }}});
            }
            else {
              chapitre.module = resp;
              this.http.post(this.appConfigService.backEnd + 'chapitre', chapitre).subscribe( resp =>{
                for (let element of elements){
                  element.chapitre = resp;
                  this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe();

                }});
            }
          });
        }
        else{
          module.cours = resp;
          this.http.post(this.appConfigService.backEnd + 'module', module).subscribe( resp => {
            chapitre.module = resp;
            this.http.post(this.appConfigService.backEnd + 'chapitre', chapitre).subscribe( resp =>{
              for (let element of elements){
                element.chapitre = resp;
                this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe();
              }});
          })
        }
      });
    }
    else {
      this.http.post(this.appConfigService.backEnd + 'cours', cours).subscribe(resp => {
        module.cours = resp;
        this.http.post(this.appConfigService.backEnd + 'module', module).subscribe( resp => {
          chapitre.module = resp;
          this.http.post(this.appConfigService.backEnd + 'chapitre', chapitre).subscribe( resp =>{
            for (let element of elements){
              element.chapitre = resp;
              this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe();
            }});
        })
      })
    }
  }

}

