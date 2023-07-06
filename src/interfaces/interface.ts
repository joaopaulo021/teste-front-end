export enum SortCriteria {
  Acomodacao = 'acomodacao',
  Nome = 'nome',
  CheckIn = 'checkIn',
}
export interface FormattedDateTime {
  date: string;
  time: string;
}
export interface FormProps {
  addItem: (
    reservaData: FormValues
  ) => void;
  editItem: (
    updatedItem: FormValues
  ) => void;
}
export interface LogoutProps {
  handleLogout: () => void;
}

export interface BookingsProps {
  noResults: boolean;
  sortData: (
    criteria: SortCriteria
  ) => void;
  deleteItem: (
    id: string
  ) => void;
  handleSearch: (
    searchItem: string
  ) => void;
  data: ReservaData[];
}
export interface BookingProps {
  data: ReservaData[];
  item: ReservaData;
  deleteItem: (
    id: string
  ) => void;
}

export interface ModalProps {
  checkOut: FormattedDateTime;
  checkIn: FormattedDateTime;
  item: ReservaData;
  deleteItem: (
    id: string
  ) => void;

  toggleModal: () => void;
  getImagePath: (
    acomodacao: string
  ) => string;
}
export interface SearchProps {
  handleSearch: (
    searchItem: string
  ) => void;
}

export interface ReservaData {
  id: string;
  nome: string;
  acomodacao: string;
  checkIn: string;
  checkOut: string;
  hospedes: string;
  sobrenome: string;
}

export interface DadosPessoais {
  nome: string;
  sobrenome: string;
  documento: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  sexo: string;
  nacionalidade: string;
}

export interface Endereco {
  cep: string;
  rua: string;
  bairro: string;
  numero: string;
  cidade: string;
  estado: string;
  complemento: string;
  referencia: string;
}

export interface FormValues
  extends ReservaData,
    DadosPessoais,
    Endereco {}
