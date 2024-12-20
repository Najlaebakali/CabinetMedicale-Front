import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-medecin-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './medecin-list.component.html',
  styleUrls: ['./medecin-list.component.css']
})
export class MedecinListComponent implements OnInit {
  medecins: any[] = [];
  editedMedecin: any = {};
  status = false;
  newMedecin: any = { nom: '', prenom: '', email: '', password: '', role: 'Medecin', label: '', adminId: '' };
  showAddMedecinForm = false;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.loadMedecins();
  }

  addToggle() {
    this.status = !this.status;
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
          admin {
            nom
            prenom
          }
        }
      }
    `;

    this.apollo.watchQuery<any>({
      query: GET_MEDECINS
    }).valueChanges.subscribe(result => {
      this.medecins = result?.data?.findAllMedecins;
    });
  }

  addMedecin(event: Event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    const ADD_MEDECIN = gql`
      mutation ($medecin: MedecinInput!, $adminId: ID!) {
        saveMedecin(medecin: $medecin, adminId: $adminId) {
          id
          nom
          prenom
          email
          role
          label
          admin {
            id
            nom
            prenom
          }
        }
      }
    `;

    this.apollo.mutate({
      mutation: ADD_MEDECIN,
      variables: {
        medecin: {
          nom: this.newMedecin.nom,
          prenom: this.newMedecin.prenom,
          email: this.newMedecin.email,
          password: this.newMedecin.password,
          role: this.newMedecin.role,
          label: this.newMedecin.label
        },
        adminId: this.newMedecin.adminId
      }
    }).subscribe(result => {
      console.log('Nouveau médecin ajouté', result);
      this.newMedecin = { nom: '', prenom: '', email: '', password: '', role: 'Medecin', label: '', adminId: '' };
      this.showAddMedecinForm = false;
      this.loadMedecins();
    });
  }

  editMedecin(id: string) {
    const medecin = this.medecins.find(medecin => medecin.id === id);
    this.editedMedecin = { ...medecin };
  }

  saveMedecin() {
    // Ajoutez un mot de passe par défaut si le champ est vide
    if (!this.editedMedecin.password) {
      this.editedMedecin.password = "defaultPassword";
    }

    const EDIT_MEDECIN = gql`
      mutation ($id: ID!, $medecin: MedecinInput!) {
        updateMedecin(id: $id, medecin: $medecin) {
          id
          nom
          prenom
          email
          role
          label
          admin {
            id
            nom
            prenom
          }
        }
      }
    `;

    this.apollo.mutate({
      mutation: EDIT_MEDECIN,
      variables: {
        id: this.editedMedecin.id,
        medecin: {
          nom: this.editedMedecin.nom,
          prenom: this.editedMedecin.prenom,
          email: this.editedMedecin.email,
          password: this.editedMedecin.password,
          role: this.editedMedecin.role,
          label: this.editedMedecin.label
        }
      }
    }).subscribe(result => {
      console.log('Médecin mis à jour', result);
      this.editedMedecin = {};
      this.loadMedecins();
    }, error => {
      console.error('Erreur lors de la mise à jour du médecin', error);
    });
  }

  confirmDeleteMedecin(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce médecin ?')) {
      this.deleteMedecin(id);
    }
  }

  deleteMedecin(id: string) {
    const DELETE_MEDECIN = gql`
      mutation ($id: ID!) {
        deleteMedecin(id: $id)
      }
    `;

    this.apollo.mutate({
      mutation: DELETE_MEDECIN,
      variables: { id }
    }).subscribe(result => {
      console.log('Médecin supprimé', result);
      this.loadMedecins();
    });
  }
}
