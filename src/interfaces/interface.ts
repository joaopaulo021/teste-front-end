export interface FormProps {
  addItem: (
    reservaData: FormValues
  ) => void;
}
export interface BookingProps {
  item: ReservaData;
}
export interface MainProps {
  data: ReservaData[];
}

export interface ReservaData {
  id: string;
  nome: string;
  acomodacao: string;
  checkIn: string;
  checkOut: string;
  hospedes: number;
}

export interface DadosPessoais {
  nome: string;
  sobrenome: string;
  documento: number;
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
