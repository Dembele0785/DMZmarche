import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierAdherentComponent } from './modifier-adherent.component';

describe('ModifierAdherentComponent', () => {
  let component: ModifierAdherentComponent;
  let fixture: ComponentFixture<ModifierAdherentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierAdherentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierAdherentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
