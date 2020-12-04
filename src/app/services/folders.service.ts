import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from './files.service';
import { Id_ParentService } from './id_parent.service';
@Injectable()
export class FoldersService {
    folders = [];
    constructor(private httpClient: HttpClient, private router:Router, private filesService: FilesService, private id_parentService: Id_ParentService){}

    /* Récupérer tous les dossiers de la base de données */
    getAllFolders(){
        this.httpClient.get<any[]>('https://texty-3c9ff.firebaseio.com/folders.json')
        .subscribe(
            (response) =>{
                if(response != null){
                    this.folders = response;
                }
            },
            (error) => {
                console.log(error);
            }
        )
    }
    /* Fin de récupérer tous les dossiers de la base de données */

    /* Ajouter un nouveau dossier dans la base de données */
    addNewFolder(nom, id_parent){
        this.httpClient.get<any[]>('https://texty-3c9ff.firebaseio.com/folders.json')
        .subscribe(
            (response) =>{
                if(response != null){
                    this.folders = response;
                    this.folders.push(
                        { nom:nom, id_parent:id_parent, masquer:false }
                    );
                    this.httpClient.put('https://texty-3c9ff.firebaseio.com/folders.json', this.folders)
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
                    this.httpClient.put('https://texty-3c9ff.firebaseio.com/folders.json', [{nom: nom, id_parent:id_parent, masquer:false}])
                    .subscribe(
                        ()=>{
                            this.folders = [
                                { nom:nom, id_parent:id_parent, masquer:false }
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
    /* Fin d'ajouter un nouveau dossier dans la base de données */

    /* Masquer un dossier et son contenu */
    deleteFolder(id:number){
        this.getAllFolders();
        this.id_parentService.id_parent = this.folders[id].id_parent;
        /* Masquer le dossier dans la liste locale this.folders */
        for(let folder of this.folders){
            if(this.folders.indexOf(folder) == id){
                folder.masquer = true;
                break
            }
        }
        /* Fin de masquer le dossier dans la liste locale this.folders */

        /* Masquer aussi ses sous-dossiers et fichiers */
        /* Masquer les premiers fichiers enfants direct du dossier */
        for(let file of this.filesService.files){
            if(file.id_parent === id){
                file.masquer = true;
            }
        }
        /* Fin de masquer les premiers fichiers enfants direct du dossier */
        /* Masquer les premiers dossiers enfants direct du dossier */
        var id_parent_previous_folder;
        for(let sous_folder of this.folders){
            if(sous_folder.id_parent === id){
                sous_folder.masquer = true;
                id_parent_previous_folder = this.folders.indexOf(sous_folder);
                /* Masquer les fichiers des premiers dossiers enfants */
                for(let sous_file of this.filesService.files){
                    if(sous_file.id_parent === id_parent_previous_folder){
                        sous_file.masquer = true;
                    }
                }
                /* Masquer les fichiers des premiers dossiers enfants */
        /* Fin de masquer les premiers dossiers enfants direct du dossier */
                /* Les sous dossiers des premiers enfants du dossier à supprimer */
                for(let sous_sous_folder of this.folders){
                    if(+sous_sous_folder.id_parent === id_parent_previous_folder){
                        sous_sous_folder.masquer = true;
                        /* Masquer les fichiers qui appartiennent à ces sous-dossiers */
                        for(let sous_sous_file of this.filesService.files){
                            if(sous_sous_file.id_parent === this.folders.indexOf(sous_sous_folder)){
                                sous_sous_file.masquer = true;
                            }  
                        }
                        /* Fin Masquer les fihciers qui appartiennent à ces sous-dossiers */
                        id_parent_previous_folder = this.folders.indexOf(sous_sous_folder);
                    }else{
                        console.log('non pour id : '+this.folders.indexOf(sous_sous_folder));
                    }
                }
                /* Fin les sous dossiers des premiers enfants du dossier à supprimer */
            }
        }
        /* Fin de masquer aussi ses sous-dossiers et fichiers */

        /* Masquer le dossier et sous dossiers de la table folders */
        this.httpClient.put('https://texty-3c9ff.firebaseio.com/folders.json', this.folders)
        .subscribe(
            () => {}, (error) => {console.log(error);}
        );
        /* Fin de masquer le dossier et sous dossiers de la table folders */

        /* Masquer les fichiers du dossier de la table folders */
        this.httpClient.put('https://texty-3c9ff.firebaseio.com/files.json', this.filesService.files)
        .subscribe(
            () => {
                this.getAllFolders()
                this.filesService.getAllFiles();
                /* Rediriger vers la page précédente */
                if(this.id_parentService.id_parent != 'null'){
                    this.router.navigate(['/folder/'+this.id_parentService.id_parent]);
                }else{
                    this.router.navigate(['/main']);
                }
                /* Fin rediriger vers la page précédente */
            }, (error) => {console.log(error);}
        );
        /* Fin de masquer les fichiers du dossier de la table folders */
    }
    /* Fin de masquer un dossier et son contenu */

    /* Renommer le dossier */
    renameFolder(id, new_name){
        this.getAllFolders();
        this.folders[id].nom = new_name;
        this.httpClient.put('https://texty-3c9ff.firebaseio.com/folders.json', this.folders)
        .subscribe(
            ()=>{
                /* Rediriger vers la page précédente */
                if(this.folders[id].id_parent != 'null'){
                    this.router.navigate(['/folder/'+this.folders[id].id_parent]);
                }else{
                    this.router.navigate(['/main']);
                }
                /* Fin rediriger vers la page précédente */
            }, (error) => {console.log(error);}
        )
    }
    /* Fin de renommer le dossier */
}