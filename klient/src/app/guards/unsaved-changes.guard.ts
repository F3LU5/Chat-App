import { CanDeactivateFn } from '@angular/router';
import { MembereditComponent } from '../members/memberedit/memberedit.component';

export const unsavedChangesGuard: CanDeactivateFn<MembereditComponent> = (component) => {
  if(component.editForm?.dirty){
    return confirm('Czy chcesz przejść dalej bez zapisania zmian?')
  }
  return true;
};
