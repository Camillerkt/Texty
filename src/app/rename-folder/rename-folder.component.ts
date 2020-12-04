import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FoldersService } from '../services/folders.service';
@Component({
  selector: 'app-rename-folder',
  templateUrl: './rename-folder.component.html',
  styleUrls: ['./rename-folder.component.scss']
})
export class RenameFolderComponent implements OnInit {
  id_folder = this.route.snapshot.params['id'];
  constructor(public foldersService: FoldersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.foldersService.getAllFolders();
  }
  /* Renommer le dossier */
  renameFolder(form: NgForm){
    this.foldersService.renameFolder(this.id_folder, form.value['new_name']);
  }
  /* Fin de renommer le dossier */

  /* Revenir à la page précédente */
  getPreviousUrl(){
    if(this.id_folder != 'null'){
      return '/folder/'+this.id_folder;
    }else{
      return '/main';
    } 
  }
  /* Fin de revenir à la page précédente */
}
