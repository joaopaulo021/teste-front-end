import './styles.scss'
import { useState, ChangeEvent } from 'react'
import { FormProps, FormValues } from '../../interfaces/interface';
import { customAlphabet } from 'nanoid';
import { useLocation, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify'

const Forms: React.FC<FormProps> = ({ addItem, editItem }: FormProps) => {
  const navigate = useNavigate()
  const location = useLocation();
  const editData = location.state && location.state.editData;

  const initialFormValues: FormValues = editData || {
    id: '',
    acomodacao: '',
    checkIn: '',
    checkOut: '',
    hospedes: '',
    nome: '',
    sobrenome: '',
    documento: '',
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

  const fetchCep = () => {
    const cep = formValues.cep.replace(/\D/g, '');
    try {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
          if (data.erro) {
            toast.error('CEP inválido');
          }
          setFormValues((prevFormValues) => ({
            ...prevFormValues,
            rua: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            estado: data.uf || '',
          }));
        })
        .catch(error => {
          console.log(error)
          toast.error('Erro ao buscar dados do CEP');
        });
    } catch (error) {
      toast.error('Erro ao buscar dados do CEP');
    }
  }

  const validarCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }
    const digit1 = calcularDigitoVerificador(cpf, 9);
    const digit2 = calcularDigitoVerificador(cpf, 10);

    return cpf.slice(9) === `${digit1}${digit2}`;
  };

  const calcularDigitoVerificador = (cpf: string, length: number): string => {
    let sum = 0;
    let weight = length + 1;
    for (let i = 0; i < length; i++) {
      sum += parseInt(cpf.charAt(i)) * weight;
      weight--;
    }
    const mod = sum % 11;
    const digit = mod < 2 ? 0 : 11 - mod;
    return digit.toString();
  };

  const handleBlur = () => {
    const isValid = validarCPF(formValues.documento);
    if (!isValid) {
      toast.error('CPF invalido')
    }
  };

  const generateShortId = () => {
    const idLength = 6;
    const alphabet = '0123456789';
    const nanoid = customAlphabet(alphabet, idLength);
    return nanoid();
  };

  const shortId = generateShortId();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, ...formData } = formValues;
    if (
      formData.nome === ''
      || formData.sobrenome === ''
      || formData.checkIn === ''
      || formData.checkOut === ''
      || formData.rua === ''
      || formData.documento === ''
    ) {
      const emptyForm = [];
      if (formData.nome === '') emptyForm.push('Nome');
      if (formData.sobrenome === '') emptyForm.push('Sobrenome');
      if (formData.checkIn === '') emptyForm.push('Check-in');
      if (formData.checkOut === '') emptyForm.push('Check-out');
      if (formData.rua === '') emptyForm.push('Endereço');
      if (formData.documento === '') emptyForm.push('Documento');

      toast.error(`Preencha todos os campos: ${emptyForm.join(', ')}`);
      return;
    }

    if (id) {
      const updatedItem: FormValues = {
        id,
        ...formData
      }
      editItem(updatedItem)
      toast.success("Dados atualizados com sucesso!")

    } else {
      const newItem: FormValues = {
        id: shortId,
        ...formData
      }
      addItem(newItem)
      toast.success("Reserva adicionada com sucesso!")
    }
    navigate('/')
  };

  return (
    <section className="form-area">
      <div className='inputs-container'>
        <form onSubmit={handleSubmit}>
          <h2>Dados da reserva</h2>
          <div className="input-data">
            <div>
              <div className="input-container">
                <p>Acomodação</p>
                <select
                  name="acomodacao"
                  value={formValues.acomodacao}
                  onChange={handleInputChange}
                  placeholder="Selecione uma acomodação"
                >
                  <option value="">Selecione uma opção</option>
                  <option value='Apartamento'>Apartamento</option>
                  <option value='Casal Premium'>Casal Premium</option>
                  <option value='Chalé Aconchego'>Chalé Aconchego</option>
                  <option value='Duplo Luxo'>Duplo Luxo</option>
                  <option value='Standard Casal'>Standard Casal</option>
                </select>
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Check-in</p>
                <input
                  type="datetime-local"
                  name="checkIn"
                  value={formValues.checkIn}
                  onChange={handleInputChange}
                  placeholder="02/07/2023 15:40"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Check-out</p>
                <input
                  type="datetime-local"
                  name="checkOut"
                  value={formValues.checkOut}
                  onChange={handleInputChange}
                  placeholder="08/07/2023 21:40"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Hóspedes</p>
                <input
                  type="text"
                  name="hospedes"
                  value={formValues.hospedes}
                  onChange={handleInputChange}
                  placeholder="01 adultos 02 crianças"
                />
              </div>
            </div>
          </div>

          <h2>Dados do responsável</h2>
          <div className="input-data">
            <div>
              <div className="input-container">
                <p>Nome</p>
                <input
                  type="text"
                  name="nome"
                  value={formValues.nome}
                  onChange={handleInputChange}
                  placeholder="João"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Sobrenome</p>
                <input
                  type="text"
                  name="sobrenome"
                  value={formValues.sobrenome}
                  onChange={handleInputChange}
                  placeholder="Paulo"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Documento</p>
                <InputMask
                  mask="999.999.999-99"
                  name="documento"
                  value={formValues.documento}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="CPF"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Data de Nascimento</p>
                <InputMask
                  mask="99/99/9999"
                  name="dataNascimento"
                  value={formValues.dataNascimento}
                  onChange={handleInputChange}
                  placeholder="21/02/1992"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Telefone</p>
                <InputMask
                  mask="(99) 99999-9999"
                  name="telefone"
                  value={formValues.telefone}
                  onChange={handleInputChange}
                  placeholder="(00) 0 00000-0000"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>E-mail</p>
                <input
                  type="text"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  placeholder="name@mail.com"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Sexo</p>
                <input
                  type="text"
                  name="sexo"
                  value={formValues.sexo}
                  onChange={handleInputChange}
                  placeholder="Masculino"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Nacionalidade</p>
                <input
                  type="text"
                  name="nacionalidade"
                  value={formValues.nacionalidade}
                  onChange={handleInputChange}
                  placeholder="Brasileira"
                />
              </div>
            </div>
          </div>

          <h2>Endereço</h2>
          <div className="input-data">
            <div>
              <div className="input-container">
                <p>CEP</p>
                <InputMask
                  mask="99999-999"
                  name="cep"
                  value={formValues.cep}
                  onChange={handleInputChange}
                  placeholder="17013-350"
                  onBlur={fetchCep}
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Rua</p>
                <input
                  type="text"
                  name="rua"
                  value={formValues.rua}
                  onChange={handleInputChange}
                  placeholder="Av. Duque de caxias"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Bairro</p>
                <input
                  type="text"
                  name="bairro"
                  value={formValues.bairro}
                  onChange={handleInputChange}
                  placeholder="Centro"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Número</p>
                <input
                  type="text"
                  name="numero"
                  value={formValues.numero}
                  onChange={handleInputChange}
                  placeholder="750"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Cidade</p>
                <input
                  type="text"
                  name="cidade"
                  value={formValues.cidade}
                  onChange={handleInputChange}
                  placeholder="Bauru"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Estado</p>
                <input
                  type="text"
                  name="estado"
                  value={formValues.estado}
                  onChange={handleInputChange}
                  placeholder="SP"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Complemento</p>
                <input
                  type="text"
                  name="complemento"
                  value={formValues.complemento}
                  onChange={handleInputChange}
                  placeholder="Casa"
                />
              </div>
            </div>
            <div>
              <div className="input-container">
                <p>Referência</p>
                <input
                  type="text"
                  name="referencia"
                  value={formValues.referencia}
                  onChange={handleInputChange}
                  placeholder="Proximo a farmacia"
                />
              </div>
            </div>
          </div>
          <div className="btn-container">
            <a href="/">Cancelar</a>
            <button type="submit">Fazer reserva</button>
          </div>
        </form>
      </div>

    </section>

  );

}
export default Forms
