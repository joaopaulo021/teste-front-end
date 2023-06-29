import './styles.scss'
import { useState, ChangeEvent } from 'react'
import { FormProps, FormValues } from '../../interfaces/interface';
import { customAlphabet } from 'nanoid';


const Forms: React.FC<FormProps> = ({ addItem }: FormProps) => {

  const initialFormValues: FormValues = {
    id: '',
    acomodacao: '',
    checkIn: '',
    checkOut: '',
    hospedes: 0,
    nome: '',
    sobrenome: '',
    documento: 0,
    dataNascimento: '',
    telefone: '',
    email: '',
    sexo: '',
    nacionalidade: '',
    cep: '',
    rua: '',
    bairro: '',
    numero: '',
    cidade: '',
    estado: '',
    complemento: '',
    referencia: '',
  };

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  // CONTROLA O INPUT
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const generateShortId = () => {
    const idLength = 6;
    const alphabet = '0123456789';
    const nanoid = customAlphabet(alphabet, idLength);
    return nanoid();
  };

  const shortId = generateShortId();


  // FUNCAO PRA ENVIAR O FORMULARIO E PARA ADICIONAR
  // O ITEM NOVO
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, ...formData } = formValues;
    const newItem: FormValues = {
      id: id || shortId,
      ...formData
    };
    addItem(newItem);
  };



  const renderInput = (
    label: string,
    name: keyof FormValues,
    type: string
  ) => (
    <div className="input-container">
      <p>{label}</p>
      {type === 'select' ? (
        <select
          name={name}
          value={formValues[name]}
          onChange={handleInputChange}
        >
          <option value="">Selecione uma opção</option>
          <option value='Apartamento'>Apartamento</option>
          <option value='Casal Premium'>Casal Premium</option>
          <option value='Chalé Aconchego'>Chalé Aconchego</option>
          <option value='Duplo Luxo'>Duplo Luxo</option>
          <option value='Standard Casal'>Standard Casal</option>
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formValues[name]}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
  const renderInputSection = (
    sectionTitle: string,
    inputs: {
      label: string,
      name: keyof FormValues,
      type: string
    }[]
  ) => (
    <>
      <h2>{sectionTitle}</h2>
      <div className="input-data">
        {inputs.map((input, index) =>
          <div key={index}>
            {renderInput(input.label, input.name, input.type)}
          </div>
        )}
      </div>
    </>
  );
  return (
    <div className='inputs-container' >

      <form onSubmit={handleSubmit}>
        {renderInputSection('Dados da reserva', [
          { label: 'Acomodação', name: 'acomodacao', type: 'select' },
          { label: 'Check-in', name: 'checkIn', type: 'text' },
          { label: 'Check-out', name: 'checkOut', type: 'text' },
          { label: 'Hóspedes', name: 'hospedes', type: 'text' },
        ])}

        {renderInputSection('Dados do responsável', [
          { label: 'Nome', name: 'nome', type: 'text' },
          { label: 'Sobrenome', name: 'sobrenome', type: 'text' },
          { label: 'Documento', name: 'documento', type: 'number' },
          { label: 'Data de Nascimento', name: 'dataNascimento', type: 'text' },
          { label: 'Telefone', name: 'telefone', type: 'text' },
          { label: 'E-mail', name: 'email', type: 'text' },
          { label: 'Sexo', name: 'sexo', type: 'text' },
          { label: 'Nacionalidade', name: 'nacionalidade', type: 'text' },
        ])}
        {renderInputSection('Endereço', [
          { label: 'CEP', name: 'cep', type: 'text' },
          { label: 'Rua', name: 'rua', type: 'text' },
          { label: 'Bairro', name: 'bairro', type: 'text' },
          { label: 'Número', name: 'numero', type: 'text' },
          { label: 'Cidade', name: 'cidade', type: 'text' },
          { label: 'Estado', name: 'estado', type: 'text' },
          { label: 'Complemento', name: 'complemento', type: 'text' },
          { label: 'Referência', name: 'referencia', type: 'text' },
        ])}
        <button type='submit'>Confirmar</button>
      </form>
    </div>
  )
}

export default Forms
