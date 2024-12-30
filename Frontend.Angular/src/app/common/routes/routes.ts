import {ActivatedRouteSnapshot, Route, Router, Routes} from '@angular/router';
import {HomeComponent} from '@app/features/home/home.component';
import {inject, Type} from '@angular/core';
import {LocaleHost} from '../lang-system/LocaleHost';
import {TextDictionaryServcie} from '../lang-system/TextDictionaryService';
import {UserRoles} from '../permission-system/UserRoles';
import {PermissionService} from '@common/permission-system/UserService';
import {map} from 'rxjs';
import {TestComponent} from '@app/test/test/test.component';
import {LoginComponent} from '@common/permission-system/components/login/login.component';
import {LogsComponent} from "@app/features/logs/logs.component";

export const rootPath = '/'

export const routsPaths = {
  home: '',
  login: 'login',
  test: 'test',
  logs: 'logs'
}

export const authRoleGuard = (role: UserRoles = UserRoles.GUEST) => (route: ActivatedRouteSnapshot) => {
  const userService = inject(PermissionService);
  const router = inject(Router);
  return userService.isPermit(role).pipe(map(permission => permission.isPermited ? true : router.createUrlTree([`/${route.parent!.url.join('/')}`])));
}

export interface RouteContext {
  requiredRole: UserRoles | undefined;
}

export interface RouteData {
  requiredRole: UserRoles | undefined;
  isMenuItem: boolean | undefined;
}

export interface RouteContextDependency {
  localeHost: LocaleHost;
  textDictionaryServcie: TextDictionaryServcie;
}

function createRouteData(requiredRole?: UserRoles, isMenuItem?: boolean): RouteData {
  return {
    requiredRole: requiredRole,
    isMenuItem: isMenuItem,
  }
}

function createContext(requiredRole?: UserRoles): { context: () => RouteContext } {

  return {
    context: () => ({
      requiredRole: requiredRole
    })
  };
}

export const bugComponents = {}

const redirectRoute: Route = {path: '**', redirectTo: '', pathMatch: 'full'};

function createRoutes(items: RouteItem[]): Routes {
  return [...items.map(i => createRoute(i)), redirectRoute];
}

function createRoute(item: RouteItem): Route {

  return item.children && item.children.length > 0 ? {
    path: item.path,
    resolve: createContext(item.userRole),
    data: createRouteData(item.userRole, item.isMenuItem),
    children: [{component: item.component, path: ''}, ...item.children.map(c => createRoute(c)), redirectRoute],
    canActivate: [authRoleGuard(item.userRole)],
  } : {
    component: item.component,
    path: item.path,
    resolve: createContext(item.userRole),
    data: createRouteData(item.userRole, item.isMenuItem),
    canActivate: [authRoleGuard(item.userRole)],
  }
}

export interface RouteItem {
  component?: Type<unknown> | undefined;
  path?: string | undefined;
  userRole?: UserRoles | undefined;
  children?: RouteItem[] | undefined;
  isMenuItem?: boolean;
}

export const routes = createRoutes([
  {component: HomeComponent, path: routsPaths.home, isMenuItem: true},
  {component: LogsComponent, path: routsPaths.logs, isMenuItem: true},
  {component: TestComponent, path: routsPaths.test, userRole: UserRoles.DEVELOPER},
  // {
  //   path: routsPaths.admin,
  //   component: AdminPanelComponent,
  //   userRole: UserRoles.DEVELOPER,
  //   isMenuItem: true,
  //   children: [
  //     {component: FirebasePanelComponent, path: routsPaths.firebase}
  //   ],
  // },
  {component: LoginComponent, path: routsPaths.login, userRole: UserRoles.GUEST},

]);
