import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionUtilisateurComponent } from './edition-utilisateur.component';

describe('EditionUtilisateurComponent', () => {
  let component: EditionUtilisateurComponent;
  let fixture: ComponentFixture<EditionUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
