import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const routes: Routes = [
  { path: '', loadChildren: 'app/file-upload/file-uploads.module#FileUploadsModule', data: { preload: true } }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes,
    {
      enableTracing: true, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategy,

    })],
    providers: [
      SelectivePreloadingStrategy
    ]
})

export class AppRoutingModule { }
