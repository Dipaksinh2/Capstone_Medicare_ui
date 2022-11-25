import { Component, Input, OnInit } from '@angular/core';
import { link } from 'fs';
import { UserAuthService } from '../_services/user-auth.service';

interface carouselImage {
  imageSrc: string;
  imageAlt: string;
}

interface carouselImages {
  src: string;
  alt: string;
}


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  @Input() newImages: carouselImages[] = [
    {
      src: "../assets/Logo/Logo-1.jpg",
      alt: "logo1"
    },
    {
      src: "../assets/Logo/Logo-2.png",
      alt: "logo2"
    },
    {
      src: "../assets/Logo/Logo-3.jpg",
      alt: "logo3"
    },
    {
      src: "../assets/Logo/Logo-4.svg",
      alt: "logo4"
    },
    {
      src: "../assets/Logo/Logo-5.svg",
      alt: "logo5"
    },
    {
      src: "../assets/Logo/Logo-6.png",
      alt: "logo6"
    },
    {
      src: "../assets/Logo/Logo-7.svg",
      alt: "logo7"
    },
    {
      src: "../assets/Logo/Logo-8.svg",
      alt: "logo8"
    },

  ];



  @Input() images: carouselImage[] = [
    {
      imageSrc: "../assets/banner-1.jpg",
      imageAlt: "banner1"
    },
    {
      imageSrc: "../assets/banner-2.jpg",
      imageAlt: "banner2"
    },
    {
      imageSrc: "../assets/banner-3.jpg",
      imageAlt: "banner3"
    },
    {
      imageSrc: "../assets/banner-4.jpg",
      imageAlt: "banner4"
    },
    {
      imageSrc: "../assets/banner-6.jpg",
      imageAlt: "banner6"
    },
  ];

  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = true;
  @Input() slideInterval = 3000;

  constructor(private userAuthService: UserAuthService) { }

  selectedIndex = 0;


  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }

  autoSlideImages(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval
    )
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

}
