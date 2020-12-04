import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Id_ParentService } from './id_parent.service';
@Injectable()
export class FilesService{
    files = [];
    constructor(private httpClient: HttpClient, private router:Router, private id_parentService: Id_ParentService) {}
    
    /* Récupérer tous les fichiers de la base de données */
    getAllFiles(){
        this.httpClient.get<any[]>('https://texty-3c9ff.firebaseio.com/files.json')
        .subscribe(
            (response) =>{
                if(response != null){
                    this.files = response;
                }
            },
            (error) => {
                console.log(error);
            }
        )
    }
    /* Fin de récupérer tous les fichiers de la base de données */

    /* Ajouter un nouveau fichier dans la base de données */
    addNewFile(nom, id_parent){
        this.httpClient.get<any[]>('https://texty-3c9ff.firebaseio.com/files.json')
        .subscribe(
            (response) =>{
                if(response != null){
                    this.files = response;
                    this.files.push(
                        { nom:nom, id_parent:id_parent, contenu:'', masquer:false }
                    );
                    this.httpClient.put('https://texty-3c9ff.firebaseio.com/files.json', this.files)
                    .subscribe(
                        ()=>{
                            /* Rediriger vers la page précédente */
                            if(id_parent === 'null'){
                                this.router.navigate(['/main']);
                            }else{
                                this.router.navigate(['/folder/'+id_parent]);
                            }
                            /* Fin redigier vers la page précédente */
                        },(error)=>{console.log(error);}
                    );

                }else{
                    this.httpClient.put('https://texty-3c9ff.firebaseio.com/files.json', [{nom: nom, id_parent:id_parent, contenu:'', masquer:false}])
                    .subscribe(
                        ()=>{
                            this.files = [
                                { nom:nom, id_parent:id_parent, contenu:'', masquer:false }
                            ]
                            /* Rediriger vers la page précédente */
                            if(id_parent === 'null'){
                                this.router.navigate(['/main']);
                            }else{
                                this.router.navigate(['/folder/'+id_parent]);
                            }
                            /* Fin redigier vers la page précédente */
                        },(error)=>{console.log(error);}
                    );
                }
            },
            (error) => {
                console.log(error);
            }
        )
    }
    /* Fin d'ajouter un nouveau fichier dans la base de données */

    /* Partie pour modifier un fichier txt */
    modifyFile(contenu:string, id:number){
        this.getAllFiles();
        this.files[id].contenu = contenu;
        this.httpClient.put('https://texty-3c9ff.firebaseio.com/files.json', this.files)
        .subscribe(
            () => {
                /* Rediriger vers la page précédente */
                if(this.files[id].id_parent === 'null'){
                    this.router.navigate(['/main']);
                }else{
                    this.router.navigate(['/folder/'+this.files[id].id_parent]);
                }
                /* Fin redigier vers la page précédente */
            },
            (error) => {console.log(error);}
        )
    }
    /* Fin de partie pour modifier un fichier txt */


    /* Masquer un fichier */
    deleteFile(id){
        this.getAllFiles();
        this.id_parentService.id_parent = this.files[id].id_parent;
        for(let file of this.files){
            if(this.files.indexOf(file) == id){
                file.masquer = true;
            }
        }
        this.httpClient.put('https://texty-3c9ff.firebaseio.com/files.json', this.files)
        .subscribe(
            ()=>{
                /* Rediriger vers la page précédente */
                if(this.id_parentService.id_parent != 'null'){
                    this.router.navigate(['/folder/'+this.id_parentService.id_parent]);
                }else{
                    this.router.navigate(['/main']);
                }
                /* Fin rediriger vers la page précédente */
            },(error)=>{console.log(error)}
        )
    }
    /* Fin de masquer un fichier */

    /* Renommer un fichier */ 
    renameFile(id, new_name){
        this.getAllFiles();
        this.files[id].nom = new_name;
        this.httpClient.put('https://texty-3c9ff.firebaseio.com/files.json', this.files)
        .subscribe(
            ()=>{
                /* Rediriger vers la page précédente */
                if(this.files[id].id_parent != 'null'){
                    this.router.navigate(['/folder/'+this.files[id].id_parent]);
                }else{
                    this.router.navigate(['/main']);
                }
                /* Fin rediriger vers la page précédente */
            }, (error) => {console.log(error);}
        )
    }
    /* Fin de renommer un fichier */
}