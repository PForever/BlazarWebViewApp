import {inject, Injectable, RendererFactory2, signal} from "@angular/core";
import {Theme} from "@common/theming/models/Theme";

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitcher {
  private readonly renderer = inject(RendererFactory2).createRenderer(null, null);
  private readonly _theme = signal<Theme>('system');
  public set theme(theme) {
    if (theme === this._theme()) return;

    const htmlElement = document.documentElement;

    if (this._theme()) {
      this.renderer.removeClass(htmlElement, this._theme());
    }
    if (theme) {
      this.renderer.addClass(htmlElement, theme);
    }
    this._theme.set(theme);
  }

  public get theme() {
    return this._theme();
  }
}
