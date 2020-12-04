import { Component, OnInit } from '@angular/core';
import { Id_ParentService } from '../services/id_parent.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  clicked = false;
  constructor(public id_parentService: Id_ParentService) { }

  ngOnInit(): void {}
  showChoice(){
    if(!this.clicked){
      document.getElementById('choice').style.display = "block";
      this.clicked = true;
    }else{
      document.getElementById('choice').style.display = "none";
      this.clicked = false;
    }
    
  }

}
