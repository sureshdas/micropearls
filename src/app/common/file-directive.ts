import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
  ViewContainerRef,
  TemplateRef
} from '@angular/core';

@Directive({
  selector: '[file-hover]'
})
export class FileHoverDirective {
  @Output() onHoverEvent = new EventEmitter();

  editDiv: any;

  constructor(
    // private templateRef: TemplateRef<any>,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseover') onMouseOver() {
    if (this.elementRef.nativeElement.id === 'navbar-separator') {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'background',
        // 'rgba( 0, 0, 0, 0.1)'
        'rgba(255,255,255, 0.9)'
      );
    } else {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'background',
        'rgb(128,128,128, 0.2)'
      );
      // this.onHoverEvent.emit({
      //   // viewContainerRef: this.viewContainerRef,
      //   // elementRef: this.elementRef.nativeElement,
      //   shouldAttach: true
      // });
    }
  }

  @HostListener('mouseout') onMouseOut() {
    if (this.elementRef.nativeElement.id === 'navbar-separator') {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'background',
        'rgb(0,82,149)'
      );
    } else {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'background',
        '#fff'
      );
    }

    // this.renderer.removeClass(this.elementRef.nativeElement, 'edit-file-wrapper');
    // this.onHoverEvent.emit({
    //     viewContainerRef: this.viewContainerRef,
    //     elementRef: this.elementRef.nativeElement,
    //     shouldAttach: false
    // });
  }
}

// export default FileHoverDirective;
