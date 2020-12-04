import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchFile } from '../services/search-file.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchedFiles = [];
  constructor(private searchFileService: SearchFile) { }

  ngOnInit() {}

  onSubmit(form: NgForm){
    this.searchFileService.getSeatchFile()
    .subscribe(
      (response) => {
        this.searchedFiles = [];
        for(let file of response){
          /* Dans le cas où l'on trouve un élément qui correspond à la recherche */
          if(file.nom.toUpperCase().includes(form.value['filename'].toUpperCase()) && !file.masquer){
            /* Si le fichier est déjà dans la liste des searchedFiles alors on ne l'ajoute plus */
            if(this.searchedFiles.length > 0){
              var fileFindStatus = false;
              for(let searchedFile of this.searchedFiles){
                if(searchedFile.id_file != response.indexOf(file)){
                  fileFindStatus = false;
                }else{
                  fileFindStatus = true;
                  break
                }
              }
              if(!fileFindStatus){
                this.searchedFiles.push({id_file: response.indexOf(file), nom: file.nom});
              }
            }else{
              this.searchedFiles.push({id_file: response.indexOf(file), nom: file.nom});
            }
             /* Fin de si le fichier est déjà dans la liste des searchedFiles alors on ne l'ajoute plus */
           
          }
          /* Fin dans le cas où l'on trouve un élément qui correspond à la recherche */
        }
      }, (error)=>{console.log(error);}
    )
  }

}
