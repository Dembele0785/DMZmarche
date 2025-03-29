import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAdherentComponent } from './ajouter-adherent.component';

describe('AjouterAdherentComponent', () => {
  let component: AjouterAdherentComponent;
  let fixture: ComponentFixture<AjouterAdherentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterAdherentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterAdherentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
