import {Injectable} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {distinctUntilChanged, filter, map, Observable, ReplaySubject, startWith} from "rxjs";

@Injectable({providedIn: 'root'})
export class RouteService {
  private readonly observable = new ReplaySubject<string>(1);
  private readonly activatedRoute$ = new ReplaySubject<ActivatedRoute>(1);

  public constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {

    this.router.events
      .pipe(
        filter((evt: unknown) => evt instanceof NavigationEnd),
        // filter((evt: unknown) => evt instanceof Scroll && evt.routerEvent instanceof NavigationEnd),
        // map(evt => evt as Scroll & { routerEvent: NavigationEnd }),
        // map(x => x.routerEvent.urlAfterRedirects),
        map(x => x.urlAfterRedirects),
        startWith(this.router.url),
        distinctUntilChanged(),
      ).subscribe(x => {
      this.observable.next(x);

      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      this.activatedRoute$.next(route);
    })
  }

  public getFullPath(): Observable<string> {
    return this.observable;
  }

  public getActivatedRoute(): Observable<ActivatedRoute> {
    return this.activatedRoute$.pipe(distinctUntilChanged());
  }
}
