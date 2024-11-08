import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss'],
})
export class VendaComponent implements OnInit {

  constructor(private server: ServerService) { }

  ngOnInit() {
    this.venda()
  }

  public venda() {

  }
}
