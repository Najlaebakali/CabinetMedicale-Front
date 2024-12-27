import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDossierMedicaleComponent } from './patient-dossier-medicale.component';

describe('PatientDossierMedicaleComponent', () => {
  let component: PatientDossierMedicaleComponent;
  let fixture: ComponentFixture<PatientDossierMedicaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDossierMedicaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientDossierMedicaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
