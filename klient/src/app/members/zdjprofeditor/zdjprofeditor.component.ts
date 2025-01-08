import { Component, inject, input, OnInit, output } from '@angular/core';
import { Uzytkownik } from '../../_modele/uzytkownik';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule} from 'ng2-file-upload';
import { AccountService } from '../../_uslugi/account.service';
import { environment } from '../../../environments/environment';
import { zdjecia } from '../../_modele/zdjecie';
import { UzytkownicyService } from '../../_uslugi/uzytkownicy.service';

@Component({
  selector: 'app-zdjprofeditor',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, NgClass, FileUploadModule, DecimalPipe],
  templateUrl: './zdjprofeditor.component.html',
  styleUrl: './zdjprofeditor.component.css'
})
export class ZdjprofeditorComponent implements OnInit{
  private accService = inject(AccountService);
  private uzytkownicyService = inject(UzytkownicyService);
  member = input.required<Uzytkownik>();
  uploader?: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  memberChange = output<Uzytkownik>();

  ngOnInit(): void {
    this.initializeUploader();
  }
  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }
  usunZdjecie(photoId: number){
    this.uzytkownicyService.usunZdjecie(photoId).subscribe({
      next: _ => {
        const aktualnyUzytkownik = {...this.member()};
        aktualnyUzytkownik.zdjecia = aktualnyUzytkownik.zdjecia.filter(c => c.id != photoId);
        this.memberChange.emit(aktualnyUzytkownik)
      }
    })
  }
  ustawGlowneZdjecie(photo: zdjecia){
    this.uzytkownicyService.ustawGlowneZdjecie(photo).subscribe({
      next: _ => {
        const user = this.accService.aktualnyUzytkownik();
        if(user){
          user.zdjecieUrl = photo.url;
          this.accService.ustawAktualnegoUzytkownika(user)
        }
        const zaktualizowanyuzytkownik = {...this.member()}
        zaktualizowanyuzytkownik.zdjecieUrl = photo.url;
        zaktualizowanyuzytkownik.zdjecia.forEach(a => {
          if(a.glownezdj) a.glownezdj = false;
          if(a.id === photo.id) a.glownezdj = true;
        });
        this.memberChange.emit(zaktualizowanyuzytkownik);
      }
    })
  }
  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.accService.aktualnyUzytkownik()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const photo =JSON.parse(response);
      const zaktualizowanyuzytkownik = {...this.member()}
      zaktualizowanyuzytkownik.zdjecia.push(photo);
      this.memberChange.emit(zaktualizowanyuzytkownik);
      if(photo.glownezdj){
        const user = this.accService.aktualnyUzytkownik();
        if(user){
          user.zdjecieUrl = photo.url;
          this.accService.ustawAktualnegoUzytkownika(user)
        }
        zaktualizowanyuzytkownik.zdjecieUrl = photo.url;
        zaktualizowanyuzytkownik.zdjecia.forEach(a => {
          if(a.glownezdj) a.glownezdj = false;
          if(a.id === photo.id) a.glownezdj = true;
        });
        this.memberChange.emit(zaktualizowanyuzytkownik);
      }
      }
    }
  }

