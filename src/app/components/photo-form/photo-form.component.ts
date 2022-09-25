import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Router } from '@angular/router';

// No funciona no se puede llamar el evento de tipoHtmlInputEvent
// interface HtmlInputEvent extends Event {
//   target: HTMLInputElement & EventTarget;
// }

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  file!: File;
  photoSelected!: string | ArrayBuffer | null;
  // photoSelected = 'assets/no-image.png';

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit(): void {}

  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      //image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      // Tambien Funciona
      // reader.onload = (event: any) =>
      //   (this.photoSelected = event.target.result);
      reader.readAsDataURL(this.file);
      console.log(this.file);
    }
  }
  // uploadPhoto(title:any, description:any) Tmbn funciona
  uploadPhoto(
    title: HTMLInputElement,
    description: HTMLTextAreaElement
  ): boolean {
    this.photoService
      .createPhoto(title.value, description.value, this.file)
      .subscribe(
        (res) => {
          this.router.navigate(['/photos']);
        },
        (err) => console.log(err)
      );
    return false;
  }
}
