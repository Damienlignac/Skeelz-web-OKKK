import {Component, OnInit} from '@angular/core';
import {Cours} from '../model/cours';
import {Module} from '../model/module';
import {Chapitre} from '../model/chapitre';
import {ElementDeCours} from '../model/elementDeCours';
import {ActivatedRoute} from '@angular/router';
import {EditionCoursHttpService} from './edition-cours.http.service';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Etat} from '../model/etat';

@Component({
  selector: 'app-edition-cours',
  templateUrl: './edition-cours.component.html',
  styleUrls: ['./edition-cours.component.css']
})
export class EditionCoursComponent implements OnInit {

  idCours: number;
  cours: Cours = new Cours();
  moduleAndChap: Array<Module>;
  currentModule: Module = new Module();
  currentChapitre = new Chapitre();
  elementDeCours: Array<ElementDeCours>;
  aAjouter: string;
  currentElement: ElementDeCours = new ElementDeCours();


  constructor(private route: ActivatedRoute, private editionCoursHttpService: EditionCoursHttpService, private http: HttpClient, private appConfigService: AppConfigService) {
    this.route.params.subscribe(params => {
      this.idCours = params['id'];
      this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
      this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
    });
  }


  moduleCourant($event, moduleId) {
    this.currentModule = this.moduleAndChap.filter(module => module.id == moduleId)[0];
    this.currentChapitre = new Chapitre();
    this.currentElement = new ElementDeCours();
    this.elementDeCours = null;

  }

  chapitreCourant($event, chapitreId) {
    this.currentChapitre = this.currentModule.chapitres.filter(chapitre => chapitre.id == chapitreId)[0];
    this.editionCoursHttpService.findByIdElement(this.currentChapitre.id).subscribe(resp => this.elementDeCours = resp);
    this.currentElement = new ElementDeCours();

  }


  nouveauChapitre() {
    this.currentChapitre = new Chapitre();
    let agencementMax: number = -1;
    this.elementDeCours = null;
    this.currentElement = new ElementDeCours();
    if (this.currentModule.chapitres) {
      for (let chap of this.currentModule.chapitres) {
        if (chap.agencement > agencementMax) {
          agencementMax = chap.agencement;
        }
      }
      this.currentChapitre.agencement = agencementMax + 1;
      this.currentModule.chapitres.push(this.currentChapitre);
    } else {
      this.currentChapitre.agencement = agencementMax + 1;
      this.currentModule.chapitres = new Array<Chapitre>();
      this.currentModule.chapitres.push(this.currentChapitre);
    }
  }

  deleteChapitre() {
    if (this.currentChapitre.id) {
      for (let element of this.elementDeCours) {
        this.http.delete(this.appConfigService.backEnd + 'elementDeCours/' + element.id).subscribe((OK) => {
          this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
          this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
        });
      }
      this.http.delete(this.appConfigService.backEnd + 'chapitre/' + this.currentChapitre.id).subscribe((OK) => {
        this.http.get(this.appConfigService.backEnd + 'module/' + this.currentModule.id + '/chapitres').subscribe(resp => {
          // @ts-ignore
          let chapitres: Array<Chapitre> = resp;
          for (let chap of chapitres) {
            if (chap.agencement < this.currentChapitre.agencement) {}
            else {
              chap.agencement = chap.agencement - 1;
              chap.module = this.currentModule
              this.http.put(this.appConfigService.backEnd + 'chapitre/' + chap.id, chap).subscribe(resp => {
                this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
                this.currentModule = new Module();
                this.currentChapitre = new Chapitre();
                this.currentElement = new ElementDeCours();
                this.elementDeCours = null;
              });
            }

          }
          this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
          this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
          this.currentModule = new Module();
          this.currentChapitre = new Chapitre();
          this.currentElement = new ElementDeCours();
          this.elementDeCours = null;
        });
        this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
        this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);

      });

    } else {
      this.currentModule = new Module();
      this.currentChapitre = new Chapitre();
      this.currentElement = new ElementDeCours();
      this.elementDeCours = null;
    }
  }

  deleteElement(element:ElementDeCours) {
    let plus : boolean = false;
    if (element.id) {
      this.http.delete(this.appConfigService.backEnd + 'elementDeCours/' + element.id).subscribe((OK) => {
        this.http.get(this.appConfigService.backEnd + 'chapitre/' + this.currentChapitre.id + '/elementDeCourss').subscribe(resp => {
          // @ts-ignore
          let elements: Array<ElementDeCours> = resp;
          for (let elem of elements) {
            if (elem.agencement < element.agencement) {}
            else {
              elem.agencement = elem.agencement - 1;
              elem.chapitre = this.currentChapitre;
              plus=true;
              this.http.put(this.appConfigService.backEnd + 'elementDeCours/' + elem.id, elem).subscribe(resp => {
                this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
                this.currentModule = new Module();
                this.currentChapitre = new Chapitre();
                this.currentElement = new ElementDeCours();
                this.elementDeCours = null;
              });
            }

          }

            this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
            this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
            this.currentModule = new Module();
            this.currentChapitre = new Chapitre();
            this.currentElement = new ElementDeCours();
            this.elementDeCours = null;

        });
        this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
        this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);

      });

    } else {
      this.currentModule = new Module();
      this.currentChapitre = new Chapitre();
      this.currentElement = new ElementDeCours();
      this.elementDeCours = null;
    }
  }

  deleteModule() {
    if (this.currentModule.id) {
        for (let chapitre of this.currentModule.chapitres) {
          this.editionCoursHttpService.findByIdElement(chapitre.id).subscribe(resp=> {
            let elements: Array<ElementDeCours> = resp;
            for (let element of elements) {
              this.http.delete(this.appConfigService.backEnd + 'elementDeCours/' + element.id).subscribe(resp=>{
                this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
              })}})
          this.http.delete(this.appConfigService.backEnd + 'chapitre/' + chapitre.id).subscribe(resp=>{
            this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
            this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
              })

      }


        this.http.delete(this.appConfigService.backEnd + 'module/' + this.currentModule.id).subscribe((OK) => {
          this.http.get(this.appConfigService.backEnd + 'cours/' + this.cours.id + '/modules').subscribe(resp => {
            // @ts-ignore
            let modules: Array<Module> = resp;
            for (let modu of modules) {
              if (modu.agencement < this.currentModule.agencement) {
              } else {
                modu.agencement = modu.agencement - 1;
                modu.cours = this.cours;
                this.http.put(this.appConfigService.backEnd + 'module/' + modu.id, modu).subscribe(resp => {
                  this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                  this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
                  this.currentModule = new Module();
                  this.currentChapitre = new Chapitre();
                  this.currentElement = new ElementDeCours();
                  this.elementDeCours = null;
                });
              }

            }
            this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
            this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
            this.currentModule = new Module();
            this.currentChapitre = new Chapitre();
            this.currentElement = new ElementDeCours();
            this.elementDeCours = null;
          });
          this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
          this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);

        });


    } else {
      this.currentModule = new Module();
      this.currentChapitre = new Chapitre();
      this.currentElement = new ElementDeCours();
      this.elementDeCours = null;
    }
  }

  nouveauElement() {
    this.currentElement = new ElementDeCours();
    let agencementMax: number = -1;
    if (this.elementDeCours) {
      for (let elem of this.elementDeCours) {
        if (elem.agencement > agencementMax) {
          agencementMax = elem.agencement;
        }
      }
    }
    this.currentElement.agencement = agencementMax + 1;
    if (this.aAjouter == 'texte') {
      this.currentElement.type = 'Paragraphe';
    }
    if (this.aAjouter == 'image') {
      this.currentElement.type = 'Image';
    }
    if (this.aAjouter == 'extraitCode') {
      this.currentElement.type = 'ExtraitCode';
    }
  }


  save(cours: Cours, module: Module, chapitre: Chapitre, elements: Array<ElementDeCours>) {
    cours.etat=Etat.FERME
    if (cours.id) {
      this.http.put(this.appConfigService.backEnd + 'cours/' + cours.id, cours).subscribe(resp => {
        if (module.id) {
          module.cours = <Cours> resp;
          this.http.put(this.appConfigService.backEnd + 'module/' + module.id, module).subscribe(resp => {
            if (chapitre.id) {
              chapitre.module = <Module> resp;
              this.http.put(this.appConfigService.backEnd + 'chapitre/' + chapitre.id, chapitre).subscribe(resp => {
                for (let element of elements) {
                  if (element.id) {
                    element.chapitre = <Chapitre> resp;
                    this.http.put(this.appConfigService.backEnd + 'elementDeCours/' + element.id, element).subscribe(resp => {
                      this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                      this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
                    });
                  } else {
                    element.chapitre = <Chapitre> resp;
                    this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe(resp => {
                      this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                      this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
                    });

                  }
                }
              });
            } else {
              chapitre.module = <Module> resp;
              this.http.post(this.appConfigService.backEnd + 'chapitre', chapitre).subscribe(resp => {
                for (let element of elements) {
                  element.chapitre = <Chapitre> resp;
                  this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe(resp => {
                    this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                    this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
                  });

                }
              });
            }
          });
        } else {
          module.cours = <Cours> resp;
          this.http.post(this.appConfigService.backEnd + 'module', module).subscribe(resp => {
            chapitre.module = <Module> resp;
            this.http.post(this.appConfigService.backEnd + 'chapitre', chapitre).subscribe(resp => {
              for (let element of elements) {
                element.chapitre = <Chapitre> resp;
                this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe(resp => {
                  this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                  this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
                });
              }
            });
          });
        }
      });
      this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
      this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
    } else {
      this.http.post(this.appConfigService.backEnd + 'cours', cours).subscribe(resp => {
        module.cours = <Cours> resp;
        this.http.post(this.appConfigService.backEnd + 'module', module).subscribe(resp => {
          chapitre.module = <Module> resp;
          this.http.post(this.appConfigService.backEnd + 'chapitre', chapitre).subscribe(resp => {
            for (let element of elements) {
              element.chapitre = <Chapitre> resp;
              this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe(resp => {
                this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
              });
            }
          });
        });
      });
    }
    // this.editionCoursHttpService.saveCours(cours, currentModule, currentChapitre, elementDeCours);
    this.currentModule = new Module();
    this.currentChapitre = new Chapitre();
    this.elementDeCours = new Array<ElementDeCours>();
    console.log(this.currentModule);

  }

  saveValidate(cours: Cours, module: Module, chapitre: Chapitre, elements: Array<ElementDeCours>) {
    cours.etat = Etat.ATTENTE;
    if (cours.id) {
      this.http.put(this.appConfigService.backEnd + 'cours/' + cours.id, cours).subscribe(resp => {
        if (module.id) {
          module.cours = <Cours> resp;
          this.http.put(this.appConfigService.backEnd + 'module/' + module.id, module).subscribe(resp => {
            if (chapitre.id) {
              chapitre.module = <Module> resp;
              this.http.put(this.appConfigService.backEnd + 'chapitre/' + chapitre.id, chapitre).subscribe(resp => {
                for (let element of elements) {
                  if (element.id) {
                    element.chapitre = <Chapitre> resp;
                    this.http.put(this.appConfigService.backEnd + 'elementDeCours/' + element.id, element).subscribe(resp => {
                      this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                      this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
                    });
                  } else {
                    element.chapitre = <Chapitre> resp;
                    this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe(resp => {
                      this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                      this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
                    });

                  }
                }
              });
            } else {
              chapitre.module = <Module> resp;
              this.http.post(this.appConfigService.backEnd + 'chapitre', chapitre).subscribe(resp => {
                for (let element of elements) {
                  element.chapitre = <Chapitre> resp;
                  this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe(resp => {
                    this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                    this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
                  });

                }
              });
            }
          });
        } else {
          module.cours = <Cours> resp;
          this.http.post(this.appConfigService.backEnd + 'module', module).subscribe(resp => {
            chapitre.module = <Module> resp;
            this.http.post(this.appConfigService.backEnd + 'chapitre', chapitre).subscribe(resp => {
              for (let element of elements) {
                element.chapitre = <Chapitre> resp;
                this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe(resp => {
                  this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                  this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
                });
              }
            });
          });
        }
      });
    } else {
      this.http.post(this.appConfigService.backEnd + 'cours', cours).subscribe(resp => {
        module.cours = <Cours> resp;
        this.http.post(this.appConfigService.backEnd + 'module', module).subscribe(resp => {
          chapitre.module = <Module> resp;
          this.http.post(this.appConfigService.backEnd + 'chapitre', chapitre).subscribe(resp => {
            for (let element of elements) {
              element.chapitre = <Chapitre> resp;
              this.http.post(this.appConfigService.backEnd + 'elementDeCours', element).subscribe(resp => {
                this.editionCoursHttpService.findById2(this.idCours).subscribe(resp => this.cours = resp);
                this.editionCoursHttpService.findById(this.idCours).subscribe(resp => this.moduleAndChap = resp);
              });
            }
          });
        });
      });
    }
    // this.editionCoursHttpService.saveValidate(cours, currentModule, currentChapitre, elementDeCours);
    this.currentModule = new Module();
    this.currentChapitre = new Chapitre();
    this.elementDeCours = new Array<ElementDeCours>();
    console.log(this.currentModule);
  }

  nouveauModule() {
    this.currentModule = new Module();
    let agencementMax: number = -1;
    if (this.moduleAndChap) {
      for (let mod of this.moduleAndChap) {
        if (mod.agencement > agencementMax) {
          agencementMax = mod.agencement;
        }
      }
    }
    this.currentModule.agencement = agencementMax + 1;
    this.moduleAndChap.push(this.currentModule);
    this.currentChapitre = new Chapitre();
    this.elementDeCours = null;
    this.currentElement = new ElementDeCours();
  }


  enregistrerEvent() {
    if (!this.elementDeCours) {
      this.elementDeCours = new Array<ElementDeCours>();
    }
    this.elementDeCours.push(this.currentElement);
    this.currentElement = new ElementDeCours();
  }

  ngOnInit() {

  }


}
