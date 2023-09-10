import { Dispatch, SetStateAction} from 'react';
import './Slider.css';

function Slider({min, max, value, updateValue }: {min: string, max: string, value: string, updateValue: Dispatch<SetStateAction<string>>}) {

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(event.target.value);
  }

  return (
    <div id="slider">
        <input id="slider_track" type="range" min={min} max={max} value={value} onChange={onValueChange}/>
        <input id="slider_thumb" type="range" min={min} max={max} value={value} onChange={onValueChange}/>
    </div>
  );
}

export default Slider;
