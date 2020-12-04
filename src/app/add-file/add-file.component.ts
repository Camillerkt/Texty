import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {
  id_parent = this.route.snapshot.params['id_parent'];
  constructor(private route:ActivatedRoute, private filesService:FilesService) { }

  ngOnInit(): void {
    document.getElementById('nom').focus();
  }
  onSubmit(form: NgForm) {
    if(form.value['nom'] != ''){
      this.filesService.addNewFile(form.value['nom'], this.id_parent);
    }else{
      this.filesService.addNewFile('sans nom', this.id_parent);
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
