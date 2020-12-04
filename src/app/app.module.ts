import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { OneFolderComponent } from './one-folder/one-folder.component';

import { FoldersService } from './services/folders.service';
import { FilesService } from './services/files.service';
import { Id_ParentService } from './services/id_parent.service';
import { SearchFile } from './services/search-file.service';

import { OneFileComponent } from './one-file/one-file.component';
import { AddFolderComponent } from './add-folder/add-folder.component';
import { FolderViewComponent } from './folder-view/folder-view.component';
import { AddFileComponent } from './add-file/add-file.component';
import { OpenFileComponent } from './open-file/open-file.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RenameFolderComponent } from './rename-folder/rename-folder.component';
import { RenameFileComponent } from './rename-file/rename-file.component';

const appRoutes: Routes = [
  { path: '', component: MainViewComponent},
  { path: 'add-file/:id_parent', component: AddFileComponent },
  { path: 'add-folder/:id_parent', component: AddFolderComponent},
  { path: 'folder/:id', component: FolderViewComponent },
  { path: 'file/:id', component: OpenFileComponent },
  { path: 'main', component:MainViewComponent},
  { path: 'rename-folder/:id', component: RenameFolderComponent},
  { path: 'rename-file/:id', component: RenameFileComponent},
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found'}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainViewComponent,
    OneFolderComponent,
    OneFileComponent,
    AddFolderComponent,
    FolderViewComponent,
    AddFileComponent,
    OpenFileComponent,
    FourOhFourComponent,
    SearchBarComponent,
    RenameFolderComponent,
    RenameFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
  ],
  providers: [
    FoldersService,
    FilesService,
    Id_ParentService,
    SearchFile
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
