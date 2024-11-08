import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-recolha',
  templateUrl: './recolha.component.html',
  styleUrls: ['./recolha.component.scss'],
})
export class RecolhaComponent implements OnInit {

  constructor(private server: ServerService) { }

  ngOnInit() {
    this.getEncomendas
  }

  public getEncomendas() {
  }
}
