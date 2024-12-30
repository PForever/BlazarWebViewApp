import {ChangeDetectionStrategy, Component, computed, ElementRef, input, viewChild} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-slider',
  template: `
    <!--    <div class="container" [ngClass]="opened() ? '' : 'container-close'">-->
    <div class="container" [style.height]="opened() ? childHeight() : 0">
      <div #child class="slider" [ngClass]="opened() ? 'slider-opened' : sliderOpenedClass()">
        <ng-content/>
      </div>
    </div>
  `,
  styles: `
    .container {
      position: absolute;
      overflow: hidden;
      z-index: 1000;

      /* Find better solution */
      transition: height 0.3s ease-in;
    }

    .container-close {
      height: 0;
    }

    .slider {
      transition: transform 0.3s ease-in;
    }

    .slider-closed-left {
      transform: translateX(-100%);
    }

    .slider-closed-top {
      transform: translateY(-100%);
    }

    .slider-closed-right {
      transform: translateX(+100%);
    }

    .slider-closed-bottom {
      transform: translateY(+100%);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass]
})
export class SliderComponent {
  public readonly opened = input(true);
  public readonly direction = input<Direction>('left');
  public readonly sliderOpenedClass = computed(() => getSliderOpenedClass(this.direction()));
  public readonly child = viewChild<ElementRef>('child');
  public readonly childHeight = computed(() => this.child()?.nativeElement.offsetHeight + 'px');
}

type SliderClass = 'slider-closed-left' | 'slider-closed-top' | 'slider-closed-right' | 'slider-closed-bottom';
type Direction = 'left' | 'top' | 'right' | 'bottom';

function getSliderOpenedClass(value: Direction): SliderClass {
  switch (value) {
    case 'left':
      return 'slider-closed-left';
    case 'top':
      return 'slider-closed-top';
    case 'right':
      return 'slider-closed-right';
    case 'bottom':
      return 'slider-closed-bottom';
  }
}
