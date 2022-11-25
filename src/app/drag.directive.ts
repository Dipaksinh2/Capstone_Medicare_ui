import { Directive, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
import { FileHandle } from './_model/file-handler.model';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {
  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  @HostBinding("style.background") private background = "#E6E6FA";

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#FFFFE0";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#E6E6FA"
  }

  @HostListener("drop", ["$event"])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#E6E6FA";

    let fileHandle: FileHandle = null;
    const file = evt.dataTransfer.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));

    fileHandle = { file, url };
    this.files.emit(fileHandle);

  }

}
