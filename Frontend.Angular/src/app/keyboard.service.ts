import {Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2} from '@angular/core';
import {fromEvent, Subscription, tap} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  private renderer: Renderer2;
  private resizeSubscription: Subscription | undefined;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public initializeKeyboardListener() {
    if (isPlatformBrowser(this.platformId) && window.visualViewport) {
      return fromEvent<Event>(window.visualViewport, 'resize')
        .pipe(debounceTime(50), tap(() => this.handleResize()));
    }
    return;
  }

  private handleResize(): void {
    console.log((window as any).visualViewport.height);
    const keyboardHeight = window.innerHeight - Math.round((window as any).visualViewport.height);
    this.renderer.setStyle(document.documentElement, '--keyboard-inset-height', `${keyboardHeight}px`);
  }
}
