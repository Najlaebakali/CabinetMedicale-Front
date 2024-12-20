import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-secretaire-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './secretaire-list.component.html',
  styleUrls: ['./secretaire-list.component.css']
})
export class SecretaireListComponent implements OnInit {
  secretaires: any[] = [];
  editedSecretaire: any = {}; // Initialiser en tant qu'objet
  status = false;
  newSecretaire: any = { nom: '', prenom: '', email: '', password: '', role: 'Secretaire', label: '', medecinId: '' };
  showAddSecretaireForm = false;
 
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.loadSecretaires();
  }

  addToggle() {
    this.status = !this.status;
  }

  loadSecretaires() {
    const GET_SECRETAIRES = gql`
      query {
        findAllSecretaires {
          id
          nom
          prenom
          email
          role
          label
          medecin {
            nom
            prenom
          }
        }
      }
    `;

    this.apollo.watchQuery<any>({
      query: GET_SECRETAIRES
    }).valueChanges.subscribe(result => {
      this.secretaires = result?.data?.findAllSecretaires;
    });
  }

  addSecretaire(event: Event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    const ADD_SECRETAIRE = gql`
      mutation ($secretaire: SecretaireInput!, $medecinId: ID!) {
        saveSecretaire(secretaire: $secretaire, medecinId: $medecinId) {
          id
          nom
          prenom
          email
          role
          label
          medecin {
            id
            nom
            prenom
          }
        }
      }
    `;

    this.apollo.mutate({
      mutation: ADD_SECRETAIRE,
      variables: {
        secretaire: {
          nom: this.newSecretaire.nom,
          prenom: this.newSecretaire.prenom,
          email: this.newSecretaire.email,
          password: this.newSecretaire.password,
          role: this.newSecretaire.role,
          label: this.newSecretaire.label
        },
        medecinId: this.newSecretaire.medecinId
      }
    }).subscribe(result => {
      console.log('Nouveau secrétaire ajouté', result);
      this.newSecretaire = { nom: '', prenom: '', email: '', password: '', role: 'Secretaire', label: '', medecinId: '' };
      this.showAddSecretaireForm = false;
      this.loadSecretaires();
    });
  }

  editSecretaire(id: string) {
    const secretaire = this.secretaires.find(secretaire => secretaire.id === id);
    this.editedSecretaire = { ...secretaire };
  }

  saveSecretaire() {
    // Utiliser le mot de passe actuel si le champ password est vide
    if (!this.editedSecretaire.password) {
      this.editedSecretaire.password = "defaultPassword";
    }

    const EDIT_SECRETAIRE = gql`
      mutation ($id: ID!, $secretaire: SecretaireInput!) {
        updateSecretaire(id: $id, secretaire: $secretaire) {
          id
          nom
          prenom
          email
          role
          label
          medecin {
            id
            nom
            prenom
          }
        }
      }
    `;

    this.apollo.mutate({
      mutation: EDIT_SECRETAIRE,
      variables: {
        id: this.editedSecretaire.id,
        secretaire: {
          nom: this.editedSecretaire.nom,
          prenom: this.editedSecretaire.prenom,
          email: this.editedSecretaire.email,
          password: this.editedSecretaire.password,
          role: this.editedSecretaire.role,
          label: this.editedSecretaire.label
        }
      }
    }).subscribe(result => {
      console.log('Secrétaire mis à jour', result);
      this.editedSecretaire = {};
      this.loadSecretaires();
    }, error => {
      console.error('Erreur lors de la mise à jour du secrétaire', error);
    });
  }

  confirmDeleteSecretaire(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce secrétaire ?')) {
      this.deleteSecretaire(id);
    }
  }

  deleteSecretaire(id: string) {
    const DELETE_SECRETAIRE = gql`
      mutation ($id: ID!) {
        deleteSecretaire(id: $id)
      }
    `;

    this.apollo.mutate({
      mutation: DELETE_SECRETAIRE,
      variables: { id }
    }).subscribe(result => {
      console.log('Secrétaire supprimé', result);
      this.loadSecretaires();
    });
  }
}
