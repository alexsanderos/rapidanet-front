import { Contato } from './contato';
import { Endereco } from './endereco';

export class Pessoa {
    id: number;
    nome: string;
    tipoPessoa: string;
    responsavel: string;
    cargo: string;
    setor: string;
    cpf: string;
    cnpj: string;
    profissao: string;
    status: string;
    enderecos: Array<Endereco>;
    contatos: Array<Contato>;
  }
    /*
    email: string;
    telefone: string;
    nomeContato: string;
    tipoContato: string;
    tipo: string;
    dataAlteracao: Date; 
  }*/