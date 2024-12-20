// src/app/dashboard/patient-list/patient-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    const GET_PATIENTS = gql`
      query {
        findAllUsers {
          id
          nom
          prenom
          email
          role
        }
      }
    `;

    this.apollo.watchQuery<any>({
      query: GET_PATIENTS
    }).valueChanges.subscribe(result => {
      this.patients = result?.data?.findAllUsers.filter((user: any) => user.role === 'patient');
    });
  }
}
