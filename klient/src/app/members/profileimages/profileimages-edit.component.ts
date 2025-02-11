import { Component, inject, input, OnInit, output } from '@angular/core';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule} from 'ng2-file-upload';
import { AccountService } from '../../_services/account.service';
import { environment } from '../../../environments/environment';
import { images } from '../../_models/images';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-profileimages-edit',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, NgClass, FileUploadModule, DecimalPipe],
  templateUrl: './profileimages-edit.component.html',
  styleUrl: './profileimages-edit.component.css'
})
export class ProfileImagesComponent implements OnInit{
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  member = input.required<Member>();
  uploader?: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  memberChange = output<Member>();

  ngOnInit(): void {
    this.initializeUploader();
  }
  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }
  deleteImage(photoId: number){
    this.memberService.deleteImage(photoId).subscribe({
      next: _ => {
        const currentUser = {...this.member()};
        currentUser.images = currentUser.images.filter(c => c.id != photoId);
        this.memberChange.emit(currentUser)
      }
    })
  }
  setMainImage(photo: images){
    this.memberService.setMainImage(photo).subscribe({
      next: _ => {
        const user = this.accountService.currentUser();
        if(user){
          user.imageUrl = photo.url;
          this.accountService.setCurrentUser(user)
        }
        const updatedMember = {...this.member()}
        updatedMember.imageUrl = photo.url;
        updatedMember.images.forEach(a => {
          if(a.mainImage) a.mainImage = false;
          if(a.id === photo.id) a.mainImage = true;
        });
        this.memberChange.emit(updatedMember);
      }
    })
  }
  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
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
      const updatedMember = {...this.member()}
      updatedMember.images.push(photo);
      this.memberChange.emit(updatedMember);
      if(photo.mainImage){
        const user = this.accountService.currentUser();
        if(user){
          user.imageUrl = photo.url;
          this.accountService.setCurrentUser(user)
        }
        updatedMember.imageUrl = photo.url;
        updatedMember.images.forEach(a => {
          if(a.mainImage) a.mainImage = false;
          if(a.id === photo.id) a.mainImage = true;
        });
        this.memberChange.emit(updatedMember);
      }
      }
    }
  }

