import { Component, input } from '@angular/core';
import { Uzytkownik } from '../../_modele/uzytkownik';

@Component({
  selector: 'app-zdjprofeditor',
  standalone: true,
  imports: [],
  templateUrl: './zdjprofeditor.component.html',
  styleUrl: './zdjprofeditor.component.css'
})
export class ZdjprofeditorComponent {
  member = input.required<Uzytkownik>();
}
