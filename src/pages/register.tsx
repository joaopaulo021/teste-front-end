import Forms from "../components/Forms";
import { FormProps } from "../interfaces/interface";

const Register: React.FC<FormProps> = ({ addItem, editItem }) => {
  return (
    <Forms editItem={editItem} addItem={addItem} />
  );
};

export default Register;
