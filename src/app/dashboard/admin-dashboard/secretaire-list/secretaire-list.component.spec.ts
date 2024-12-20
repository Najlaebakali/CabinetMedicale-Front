import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaireListComponent } from './secretaire-list.component';

describe('SecretaireListComponent', () => {
  let component: SecretaireListComponent;
  let fixture: ComponentFixture<SecretaireListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretaireListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecretaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
