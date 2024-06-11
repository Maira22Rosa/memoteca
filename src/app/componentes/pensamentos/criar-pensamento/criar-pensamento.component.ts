import { Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  isEditar: { acao: boolean; pensamento: Pensamento } = {
    acao: false,
    pensamento: {
      id: 0,
      conteudo: '',
      autoria: '',
      modelo: '',
    },
  };

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEditar = this.pensamentoService.acaoFormulario;
  }

  salvarPensamento() {
    if (this.isEditar.acao) {
      this.pensamentoService.editar(this.isEditar.pensamento).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    } else {
      this.pensamentoService.criar(this.isEditar.pensamento).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }
}
