import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FoldersService } from '../services/folders.service';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss']
})
export class AddFolderComponent implements OnInit {
  id_parent = this.route.snapshot.params['id_parent'];
  constructor(private route:ActivatedRoute, private foldersService:FoldersService) { }

  ngOnInit(): void {
    document.getElementById('nom').focus();
  }

  onSubmit(form: NgForm) {
    if(form.value['nom'] != ''){
      this.foldersService.addNewFolder(form.value['nom'], this.id_parent);
    }else{
      this.foldersService.addNewFolder('sans nom', this.id_parent);
    }
    
    
  }

  /* Récupérer l'ancien URL pour le bouton de retour */
  getPreviousUrl(){
    if(this.id_parent != 'null'){
      return '/folder/'+this.id_parent;
    }else{
      return '/main';
    }
  }
  /* Fin de récupérer l'ancien URL pour le bouton de retour */

}
