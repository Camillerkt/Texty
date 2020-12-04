import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilesService } from '../services/files.service';
import FileSaver  from 'file-saver/dist/FileSaver';

@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.scss']
})
export class OpenFileComponent implements OnInit {
  id = this.route.snapshot.params['id'];
  constructor(public filesService: FilesService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    document.getElementById('contenu').focus();
    this.filesService.getAllFiles();
    if(this.filesService.files[this.id] === undefined){
      this.router.navigate(['/main/']);
    }
  }

  onSubmit(form: NgForm){
    this.filesService.modifyFile(form.value['contenu'].replace(/(?:\r\n|\r|\n)/g, "\n"), this.id);
  }

  /* Récupérer l'ancien URL pour le bouton de retour */
  getPreviousUrl(){
    if(this.filesService.files[this.id].id_parent != 'null'){
      return '/folder/'+this.filesService.files[this.id].id_parent;
    }else{
      return '/main';
    }
    
  }
  /* Fin de récupérer l'ancien URL pour le bouton de retour */

  /* Supprimer le fichier */
  deleteFile(){
    this.filesService.deleteFile(this.id);
  }
  /* Fin de supprimer le fichier */

  /* Exporter le fichier */
  exportFile(){
    var blob = new Blob([this.filesService.files[this.id].contenu],
    {type: "text/plain;charset=utf-8"}
    );
    FileSaver.saveAs(blob, this.filesService.files[this.id].nom+'.txt');  
  }
  /* Fin de exporter le fichier */
}
