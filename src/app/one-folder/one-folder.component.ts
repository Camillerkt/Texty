import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-one-folder',
  templateUrl: './one-folder.component.html',
  styleUrls: ['./one-folder.component.scss']
})
export class OneFolderComponent implements OnInit {
  @Input() nom:string;
  @Input() id:number;
  @Input() id_parent:any;
  constructor() { }

  ngOnInit(): void {
  }

}
