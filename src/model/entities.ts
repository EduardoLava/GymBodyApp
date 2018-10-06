export class Sort {
    orders: SortOrder[];
}

export class SortOrder {
    direction: SortDirection;
    property: string;
    nullHandlingHint?: NullHandling;
}

export type SortDirection = 'ASC' | 'DESC';
export type NullHandling = 'NATIVE' | 'NULLS_FIRST' | 'NULLS_LAST';

export class Pageable {
    page: number;
    size: number;
    sort?: Sort;
}

export class PageRequest extends Pageable {}

export class Page<T> {
    content: T[];
    totalElements: number;
    numberOfElements: number;
    totalPages: number;
    pageable?: PageRequest;
}

export class ExercicioGrupoMuscular {
    exercicio?: Exercicio;
    grupoMuscular?: GrupoMuscular;
    id?: number;
    created?: string;
    updated?: string;
}


export class Exercicio {
    nome?: string;
    descricao?: string;
    linkVideo?: string;
    isAtivo?: boolean;
    equipamento?: Equipamento;
    exercicioGrupoMusculares?: ExercicioGrupoMuscular[];
    id?: number;
    created?: string;
    updated?: string;
}


export class GrupoMuscular {
    nome?: string;
    descricao?: string;
    id?: number;
    created?: string;
    updated?: string;
}


export class PredicaoGorduraSiri {
    densidadeCorporal?: number;
    gordura?: number;
    id?: number;
    created?: string;
    updated?: string;
}

export let DiaSemanaValues: string[] = ['DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
export type DiaSemana = 'DOMINGO' | 'SEGUNDA' | 'TERCA' | 'QUARTA' | 'QUINTA' | 'SEXTA' | 'SABADO';


export class TreinoData {
    data?: Date;
    horaInicio?: Date;
    horaTermino?: Date;
    tempoGasto?: Date;
    completo?: boolean;
    treino?: Treino;
    diaSemana?: DiaSemana;
    exerciciosRealizados?: ExercicioRealizado[];
    id?: number;
    created?: string;
    updated?: string;

}


export class Equipamento {
    descricao?: string;
    imagem?: number;
    imagemFileTransfer?: HTMLInputElement;
    isAtivo?: boolean;
    id?: number;
    created?: string;
    updated?: string;
}


export let GeneroValues: string[] = ['MASCULINO', 'FEMININO'];
export type Genero = 'MASCULINO' | 'FEMININO';


export let PapelValues: string[] = ['ADMINISTRATOR', 'PERSONAL', 'ALUNO'];
export type Papel = 'ADMINISTRATOR' | 'PERSONAL' | 'ALUNO';


export class AvaliacaoFisica {
    data?: Date;
    pessoa?: Pessoa;
    perimetria?: Perimetria;
    resposta?: Resposta;
    avaliacaoAntropometrica?: AvaliacaoAntropometrica;
    id?: number;
    created?: string;
    updated?: string;
}


export class ExercicioRealizado {
    completo?: boolean;
    treinoData?: TreinoData;
    treinoExercicio?: TreinoExercicio;
    id?: number;
    created?: string;
    updated?: string;

    constructor(treinoExercicio: TreinoExercicio, treinoData: TreinoData){
        this.completo = false;
        this.treinoData = treinoData;
        this.treinoExercicio = treinoExercicio;
        this.id = null;
        this.created = null;
        this.updated = null;
    }

}


export let TipoTreinoExercicioValues: string[] = ['CARGA_REPETICOES', 'TEMPO', 'REPETICOES'];
export type TipoTreinoExercicio = 'CARGA_REPETICOES' | 'TEMPO' | 'REPETICOES';


export class Notificacao {
    titulo?: string;
    texto?: string;
    destinatarioNotificacoes?: DestinatarioNotificacao[];
    id?: number;
    created?: string;
    updated?: string;
}


export class AvaliacaoAntropometrica {
    dobrasCutaneas?: DobrasCutaneas;
    indiceMassaCorporal?: IndiceMassaCorporal;
    predicaoGorduraSiri?: PredicaoGorduraSiri;
    densidadeCorporal?: number;
    id?: number;
    created?: string;
    updated?: string;
}


export class Perimetria {
    pescoco?: number;
    torax?: number;
    bracoDireitoRelaxado?: number;
    bracoEsquerdoRelaxado?: number;
    bracoDireitoContraido?: number;
    bracoEsquerdoContraido?: number;
    antebracoDireito?: number;
    antebracoEsquerdo?: number;
    cintura?: number;
    abdomen?: number;
    quadril?: number;
    coxaProximalDireita?: number;
    coxaProximalEsquerda?: number;
    coxaMediaDireita?: number;
    coxaMediaEsquerda?: number;
    coxaDistalDireita?: number;
    coxaDistalEsquerda?: number;
    panturrilhaDireita?: number;
    panturrilhaEsquerda?: number;
    id?: number;
    created?: string;
    updated?: string;
}


export class TreinoExercicio {
    series?: number;
    carga?: number;
    repeticoes?: number;
    tempoMin?: number;
    observacoes?: string;
    treino?: Treino;
    tipoTreinoExercicio?: TipoTreinoExercicio;
    exercicio?: Exercicio;
    id?: number;
    created?: string;
    updated?: string;
}


export class DestinatarioNotificacao {
    pessoa?: Pessoa;
    notificacao?: Notificacao;
    id?: number;
    created?: string;
    updated?: string;
}


export class ProtocoloGuedes extends AvaliacaoAntropometrica {
    
}

export class ProtocoloPollock extends AvaliacaoAntropometrica {
    
}


export class Pessoa {
    nome?: string;
    email?: string;
    login?: string;
    senha?: string;
    genero?: Genero;
    dataNascimento?: Date;
    objetivo?: string;
    isAtivo?: boolean;
    papeis?: Papel[];
    lastLogin?: string;
    id?: number;
    created?: string;
    updated?: string;
    tokenJwt?: string;
}


export class Treino {
    nome?: string;
    dataInicio?: Date;
    dataFim?: Date;
    horaPrevistaInicio?: Date;
    horaPrevistaTermino?: Date;
    treinoExercicios?: TreinoExercicio[];
    aluno?: Pessoa;
    personal?: Pessoa;
    diasSemanaSelecionados?: DiaSemana[];
    id?: number;
    created?: string;
    updated?: string;
}


export class DobrasCutaneas {
    tricipal?: number;
    bicital?: number;
    subescapular?: number;
    peitoral?: number;
    toracica?: number;
    axilarMedia?: number;
    supraIliaca?: number;
    abdominal?: number;
    coxa?: number;
    panturrilha?: number;
    id?: number;
    created?: string;
    updated?: string;
}


export class IndiceMassaCorporal {
    altura?: number;
    peso?: number;
    resultado?:number;
    id?: number;
    created?: string;
    updated?: string;
}


export class Resposta {
    objetivosAtividadeFisica?: string;
    praticaAtividade?: string;
    medicamento?: string;
    cirurgia?: string;
    doencaFamiliar?: string;
    observacao?: string;
    id?: number;
    created?: string;
    updated?: string;
}



