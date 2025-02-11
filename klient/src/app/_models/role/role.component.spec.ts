import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleComponent } from './role.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { By } from '@angular/platform-browser';

describe('RoleComponent', () => {
  let component: RoleComponent;
  let fixture: ComponentFixture<RoleComponent>;
  let mockBsModalRef: jasmine.SpyObj<BsModalRef>;

  beforeEach(() => {
    mockBsModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);

    TestBed.configureTestingModule({
      imports: [RoleComponent],
      providers: [
        { provide: BsModalRef, useValue: mockBsModalRef }
      ]
    });

    fixture = TestBed.createComponent(RoleComponent);
    component = fixture.componentInstance;
  });

  it('powinien utworzyć komponent', () => {
    expect(component).toBeTruthy();
  });

  it('powinna aktualizować selectedRoles po wywołaniu updateChecked', () => {
    expect(component.selectedRoles).toEqual([]);

    component.updateChecked('Admin');
    expect(component.selectedRoles).toContain('Admin');

    component.updateChecked('Admin');
    expect(component.selectedRoles).not.toContain('Admin');
  });

  it('powinien ustawiać rolesUpdated na true i ukrywać modal, gdy wywoływany jest onSelectRoles', () => {
    component.onSelectRoles();

    expect(component.rolesUpdated).toBeTrue();
    expect(mockBsModalRef.hide).toHaveBeenCalled();
  });

  it('powinien wyłączać przycisk przesyłania, jeśli nie wybrano żadnych ról', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.btn-success')).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  it('powinien włączyć przycisk przesyłania, jeśli wybrane są role', () => {
    component.selectedRoles = ['Admin'];
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.btn-success')).nativeElement;
    expect(button.disabled).toBeFalse();
  });

  it('powinien renderować dostępne role w treści modalu', () => {
    component.availableRoles = ['Admin', 'User', 'Moderator'];
    fixture.detectChanges();

    const checkboxes = fixture.debugElement.queryAll(By.css('.form-check-input'));
    expect(checkboxes.length).toBe(3);

    const labels = fixture.debugElement.queryAll(By.css('.form-check label'));
    const labelTexts = labels.map(label => label.nativeElement.textContent.trim());
    expect(labelTexts).toEqual(['Admin', 'User', 'Moderator']);
  });

  it('powinien wyłączyć rolę administratora, jeśli nazwa użytkownika to admin', () => {
    component.username = 'Admin';
    component.availableRoles = ['Admin', 'User'];
    fixture.detectChanges();

    const adminCheckbox = fixture.debugElement.query(By.css('input[value="role"]'));
    expect(adminCheckbox.nativeElement.disabled).toBeTrue();
  });
});
