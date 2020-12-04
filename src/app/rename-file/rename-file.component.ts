import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'app-rename-file',
  templateUrl: './rename-file.component.html',
  styleUrls: ['./rename-file.component.scss']
})
export class RenameFileComponent implements OnInit {
  id_file = this.route.snapshot.params['id'];
  constructor(private route: ActivatedRoute, public filesService: FilesService) { }

  ngOnInit(): void {
    this.filesService.getAllFiles();
  }

  /* Renommer le dossier */
  renameFile(form: NgForm){
    this.filesService.renameFile(this.id_file, form.value['new_name']);
  }
  /* Fin de renommer le dossier */

  /* Revenir à la page précédente */
  getPreviousUrl(){
    return '/file/'+this.id_file;
  }
  /* Fin de revenir à la page précédente */

}
