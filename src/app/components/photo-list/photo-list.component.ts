import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit {
  photos: any = [];
  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe(
      (res) => {
        this.photos = res;
      },
      (err) => console.log(err)
    );
  }
}
