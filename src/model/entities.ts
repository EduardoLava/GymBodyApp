export interface Sort {
    orders: SortOrder[]
}

export interface SortOrder {
    direction: SortDirection,
    property: string,
    nullHandlingHint?: NullHandling
}

export type SortDirection = 'ASC' | 'DESC';
export type NullHandling = 'NATIVE' | 'NULLS_FIRST' | 'NULLS_LAST';

export interface Pageable {
    page: number,
    size: number,
    sort?: Sort
}

export interface PageRequest extends Pageable {}

export interface Page<T> {
    content: T[],
    totalElements: number,
    numberOfElements: number,
    totalPages: number,
    pageable?: PageRequest
}

export interface ExercicioGrupoMuscular {
    exercicio?: Exercicio,
    grupoMuscular?: GrupoMuscular,
    id?: number,
    created?: string,
    updated?: string
}


export interface Exercicio {
    nome?: string,
    descricao?: string,
    linkVideo?: string,
    isAtivo?: boolean,
    equipamento?: Equipamento,
    exercicioGrupoMusculares?: ExercicioGrupoMuscular[],
    id?: number,
    created?: string,
    updated?: string
}


export interface GrupoMuscular {
    nome?: string,
    descricao?: string,
    id?: number,
    created?: string,
    updated?: string
}


export interface PredicaoGorduraSiri {
    densidadeCorporal?: number,
    gordura?: number,
    id?: number,
    created?: string,
    updated?: string
}


export interface ProtocoloGuedes extends AvaliacaoAntropometrica {
    
}


export let DiaSemanaValues: string[] = ['DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
export type DiaSemana = 'DOMINGO' | 'SEGUNDA' | 'TERCA' | 'QUARTA' | 'QUINTA' | 'SEXTA' | 'SABADO';


export interface TreinoData {
    data?: Date,
    horaInicio?: Date,
    horaTermino?: Date,
    completo?: boolean,
    treino?: Treino,
    diaSemana?: DiaSemana,
    exerciciosTreinoDatas?: ExercicioRealizado[],
    id?: number,
    created?: string,
    updated?: string
}


export interface Equipamento {
    descricao?: string,
    imagem?: number,
    imagemFileTransfer?: HTMLInputElement,
    isAtivo?: boolean,
    id?: number,
    created?: string,
    updated?: string
}


export let GeneroValues: string[] = ['MASCULINO', 'FEMININO'];
export type Genero = 'MASCULINO' | 'FEMININO';


export let PapelValues: string[] = ['ADMINISTRATOR', 'PERSONAL', 'ALUNO'];
export type Papel = 'ADMINISTRATOR' | 'PERSONAL' | 'ALUNO';


export interface AvaliacaoFisica {
    data?: Date,
    pessoa?: Pessoa,
    perimetria?: Perimetria,
    resposta?: Resposta,
    avaliacaoAntropometrica?: AvaliacaoAntropometrica,
    id?: number,
    created?: string,
    updated?: string
}


export interface ExercicioRealizado {
    completo?: boolean,
    treinoData?: TreinoData,
    treinoExercicio?: TreinoExercicio,
    id?: number,
    created?: string,
    updated?: string
}


export let TipoTreinoExercicioValues: string[] = ['CARGA_REPETICOES', 'TEMPO', 'REPETICOES'];
export type TipoTreinoExercicio = 'CARGA_REPETICOES' | 'TEMPO' | 'REPETICOES';


export interface Notificacao {
    titulo?: string,
    texto?: string,
    destinatarioNotificacoes?: DestinatarioNotificacao[],
    id?: number,
    created?: string,
    updated?: string
}


export interface AvaliacaoAntropometrica {
    dobrasCutaneas?: DobrasCutaneas,
    indiceMassaCorporal?: IndiceMassaCorporal,
    predicaoGorduraSiri?: PredicaoGorduraSiri,
    id?: number,
    created?: string,
    updated?: string
}


export interface Perimetria {
    pescoco?: number,
    torax?: number,
    bracoDireitoRelaxado?: number,
    bracoEsquerdoRelaxado?: number,
    bracoDireitoContraido?: number,
    bracoEsquerdoContraido?: number,
    antebracoDireito?: number,
    antebracoEsquerdo?: number,
    cintura?: number,
    abdomen?: number,
    quadril?: number,
    coxaProximalDireita?: number,
    coxaProximalEsquerda?: number,
    coxaMediaDireita?: number,
    coxaMediaEsquerda?: number,
    coxaDistalDireita?: number,
    coxaDistalEsquerda?: number,
    panturrilhaDireita?: number,
    panturrilhaEsquerda?: number,
    id?: number,
    created?: string,
    updated?: string
}


export interface TreinoExercicio {
    series?: number,
    carga?: number,
    repeticoes?: number,
    tempoMin?: number,
    observacoes?: string,
    treino?: Treino,
    tipoTreinoExercicio?: TipoTreinoExercicio,
    exercicio?: Exercicio,
    id?: number,
    created?: string,
    updated?: string
}


export interface DestinatarioNotificacao {
    pessoa?: Pessoa,
    notificacao?: Notificacao,
    id?: number,
    created?: string,
    updated?: string
}


export interface ProtocoloPollock extends AvaliacaoAntropometrica {
    
}


export interface Pessoa {
    nome?: string,
    email?: string,
    login?: string,
    senha?: string,
    genero?: Genero,
    dataNascimento?: Date,
    objetivo?: string,
    isAtivo?: boolean,
    papeis?: Papel[],
    lastLogin?: string,
    id?: number,
    created?: string,
    updated?: string,
    tokenJwt?: string
}


export interface Treino {
    nome?: string,
    dataInicio?: Date,
    dataFim?: Date,
    horaPrevistaInicio?: Date,
    horaPrevistaTermino?: Date,
    treinoExercicios?: TreinoExercicio[],
    aluno?: Pessoa,
    personal?: Pessoa,
    diasSemanaSelecionados?: DiaSemana[],
    id?: number,
    created?: string,
    updated?: string
}


export interface DobrasCutaneas {
    tricipal?: number,
    bicital?: number,
    subescapular?: number,
    peitoral?: number,
    toracica?: number,
    axilarMedia?: number,
    supraIliaca?: number,
    abdominal?: number,
    coxa?: number,
    panturrilha?: number,
    id?: number,
    created?: string,
    updated?: string
}


export interface IndiceMassaCorporal {
    altura?: number,
    peso?: number,
    id?: number,
    created?: string,
    updated?: string
}


export interface Resposta {
    objetivosAtividadeFisica?: string,
    praticaAtividade?: string,
    medicamento?: string,
    cirurgia?: string,
    doencaFamiliar?: string,
    observacao?: string,
    id?: number,
    created?: string,
    updated?: string
}



