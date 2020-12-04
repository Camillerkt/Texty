import { Component, OnInit } from '@angular/core';
import { FilesService } from '../services/files.service';
import { FoldersService } from '../services/folders.service';
import { Id_ParentService } from '../services/id_parent.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  constructor(public foldersService: FoldersService, public filesService: FilesService, private id_parentService: Id_ParentService) {}

  ngOnInit(): void {
    this.foldersService.getAllFolders();
    this.filesService.getAllFiles();
    this.id_parentService.id_parent = 'null';
  }

}
