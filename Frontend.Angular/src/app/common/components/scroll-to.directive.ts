import {AfterViewInit, Directive, ElementRef, input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {scrollOffset} from '@app/Configuration';

@Directive({ selector: '[appScrollTo]' })
export class ScrollToDirective implements AfterViewInit {
  public readonly id = input.required<string>({ alias: "appScrollTo" });

  public constructor(private readonly elRef: ElementRef, private readonly activatedRoute: ActivatedRoute) {
  }

  public ngAfterViewInit() {
    if (this.activatedRoute.snapshot.fragment === this.id()) {
      setTimeout(() => {
        const y = this.elRef.nativeElement.getBoundingClientRect().top + window.scrollY - scrollOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      });
    }
  }
}
