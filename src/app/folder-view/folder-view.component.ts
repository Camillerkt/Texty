import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilesService } from '../services/files.service';
import { FoldersService } from '../services/folders.service';
import { Id_ParentService } from '../services/id_parent.service';

@Component({
  selector: 'app-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.scss']
})
export class FolderViewComponent implements OnInit {
  id_parent:any;
  constructor(private route:ActivatedRoute, private id_parentService: Id_ParentService, public foldersService: FoldersService, public filesService: FilesService, private router:Router) { 
    /* Le component se recharge lorsque le paramètre est modifié */
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
    /* Fin le component se recharge lorsque le paramètre est modifié */
  }

  ngOnInit(): void {
    this.id_parent = this.route.snapshot.params['id'];
    this.id_parentService.id_parent = this.id_parent;
    this.filesService.getAllFiles();
    this.foldersService.getAllFolders();
    if(this.foldersService.folders[this.id_parent] === undefined){
      this.router.navigate(['/main/']);
    }
  }

  /* Récupérer l'ancien URL pour le bouton de retour */
  getPreviousUrl(){
    if(this.id_parent != 'null'){
      if(this.foldersService.folders[this.id_parent].id_parent != 'null'){
        return '/folder/'+this.foldersService.folders[this.id_parent].id_parent;
      }else{
        return '/main';
      } 
    }else{
      return '/main';
    }
  }
  /* Fin de récupérer l'ancien URL pour le bouton de retour */

  /* Supprimer le dossier et son contenu */
  deleteFolder(){
    this.foldersService.deleteFolder(this.id_parent);
  }
  /* Fin de supprimer le dossier et son contenu */
}
