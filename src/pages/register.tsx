import Forms from "../components/Forms";
import { FormProps } from "../interfaces/interface";

const Register: React.FC<FormProps> = ({ addItem }: FormProps) => {
  return (
    <Forms addItem={addItem} />
  );
};

export default Register;
