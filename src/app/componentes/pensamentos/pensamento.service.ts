import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';
  isEditar: { acao: boolean; pensamento: Pensamento } = {
    acao: false,
    pensamento: {
      id: 0,
      conteudo: '',
      autoria: '',
      modelo: '',
    },
  };

  pesamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
  };
  constructor(private http: HttpClient) {}

  listar(): Observable<Pensamento[]> {
    return this.http.get<Pensamento[]>(this.API);
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    this.pesamento = pensamento;
    return this.http.put<Pensamento>(
      `${this.API}/${pensamento.id}`,
      pensamento
    );
  }

  mudarFormularioParaCricao() {
    this.isEditar = {
      acao: false,
      pensamento: {
        id: 0,
        conteudo: '',
        autoria: '',
        modelo: '',
      },
    };
  }

  mudarFormularioParaEdicao(id: number) {
    this.buscarPorId(id).subscribe((response) => {
      this.isEditar = { acao: true, pensamento: response };
    });
  }

  get acaoFormulario(): any {
    return this.isEditar;
  }

  excluir(id: number): Observable<Pensamento> {
    return this.http.delete<Pensamento>(`${this.API}/${id}`);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    return this.http.get<Pensamento>(`${this.API}/${id}`);
  }
}
