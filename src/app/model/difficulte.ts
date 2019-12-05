export enum Difficulte {
  FACILE=("Facile"),
  MOYEN=("Moyen"),
  DIFFICILE=("Difficile")
}

export namespace Difficulte {

  export function values() {
    return Object.keys(Difficulte).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}
