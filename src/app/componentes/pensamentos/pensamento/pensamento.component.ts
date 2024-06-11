import { Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css'],
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: 'I love Angular',
    autoria: 'Nay',
    modelo: 'modelo3',
  };

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  excluir(id: number) {
    this.pensamentoService.excluir(id).subscribe(() => location.reload());
  }

  editarPensamento(id: number) {
    this.pensamentoService.mudarFormularioParaEdicao(id);
    this.router.navigate(['/criarPensamento']);
  }

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }
}
