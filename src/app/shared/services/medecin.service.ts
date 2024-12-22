import { Injectable,  OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  medecins: any[] = [];
  medecinById: any = null;

  constructor(private apollo: Apollo) {}
  ngOnInit(): void {
    this.loadMedecins();
  }
  loadMedecins() {
    const GET_MEDECINS = gql`
      query {
        findAllMedecins {
          id
          nom
          prenom
          email
          role
          label
        }
      }
    `;
    this.apollo
      .watchQuery<any>({
        query: GET_MEDECINS,
      })
      .valueChanges.subscribe((result) => {
        this.medecins = result?.data?.findAllMedecins;
      });
  }

  loadMedecinById(id: number) {
    const GET_MEDECIN_BY_ID = gql`
      query findMedecinById($id: Long!) {
        findMedecinById(id: $id) {
          id
          nom
          prenom
          email
          role
          label
        }
      }
    `;

    this.apollo
      .watchQuery<any>({
        query: GET_MEDECIN_BY_ID,
        variables: { id },
      })
      .valueChanges.subscribe((result) => {
        this.medecinById = result?.data?.findMedecinById || null;
      });
  }
}
