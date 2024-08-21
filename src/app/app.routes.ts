import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'task',
    loadComponent: () => import('./pages/task/task.page').then( m => m.TaskPage)
  }, 
  {
    path: 'form-add',
    loadComponent: () => import('./pages/form/form-add/form-add.page').then( m => m.FormAddPage)
  },
  {
    path: 'form-add/:id',
    loadComponent: () => import('./pages/form/form-add/form-add.page').then( m => m.FormAddPage)
  },
  {
    path: 'popover',
    loadComponent: () => import('./pages/popover/popover.page').then( m => m.PopoverPage)
  }

];
