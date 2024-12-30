import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from "@angular/router";
import {TextHost} from "@common/lang-system/TextHost";

export const canActivateLang: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const lang = route.paramMap.get('lang');
  return lang != null && TextHost.SupportedLanguages.findIndex(item => lang.toLowerCase() === item) >= 0
};
