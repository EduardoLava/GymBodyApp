import { DateTime, List } from "ionic-angular/umd";

export class Pessoa {

    id:             number;
    nome:           string; // Nome da pessoa
    email:          string; // email da pessoa
    dataNascimento: string; // data de nacimento
    login:          string; // login para acesso
    senha:          string; // senha para acesso
    objetivo:       string; // objetivo, motivação do aluno a frequentar a academia
    isAtivo:        boolean; // status, se estiver inativo não deve ter acesso ao sistema/app
    genero:         string; // genero, masculino ou feminino
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: List;
    created: DateTime;
    credentialsNonExpired: boolean;
    enabled: boolean;
    lastLogin: DateTime;
    papel: string;
    passwordResetToken: string;
    passwordResetTokenExpiration: DateTime;
    updated: DateTime;

}