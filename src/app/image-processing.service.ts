import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './_model/file-handler.model';
import { Product } from './_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImage(product: Product) {
    const productImages: any[] = product.productImages;

    const productImagestoFileHandle: FileHandle[] = [];

    for (let i = 0; i < productImages.length; i++) {
      const imageFileData = productImages[i];
      const imageBlob = this.dataURItoBlob(imageFileData.imgByte, imageFileData.imgType);

      const imageFile = new File([imageBlob], imageFileData.imgName, { type: imageFileData.imgType });

      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      productImagestoFileHandle.push(finalFileHandle);

    }

    product.productImages=productImagestoFileHandle;
    return product;
  }


  public dataURItoBlob(imageBytes, imageType) {
    const byteString = window.atob(imageBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }
}
