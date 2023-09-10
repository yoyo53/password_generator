import { Dispatch, SetStateAction} from 'react';
import './Checkbox.css';

function Checkbox({text, value, updateValue }: {text: string, value: boolean, updateValue: Dispatch<SetStateAction<boolean>>}) {

  const onCheckboxClick = () => {
    updateValue(!value);
  }

  return (
    <div id="container">
        <input id="checkbox" type="checkbox" checked={value} onChange={onCheckboxClick}/>
        {text}
    </div>
  );
}

export default Checkbox;
