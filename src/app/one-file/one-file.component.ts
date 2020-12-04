import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-one-file',
  templateUrl: './one-file.component.html',
  styleUrls: ['./one-file.component.scss']
})
export class OneFileComponent implements OnInit {
  @Input() nom:string;
  @Input() id:number;
  @Input() id_parent:any;
  constructor() { }

  ngOnInit(): void {
  }

}
