import { TestBed } from '@angular/core/testing';

import { EditionUtilisateurService } from './edition-utilisateur.service';

describe('EditionUtilisateurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditionUtilisateurService = TestBed.get(EditionUtilisateurService);
    expect(service).toBeTruthy();
  });
});
