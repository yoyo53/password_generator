import React from 'react';
import icon_copy from '../../assets/icon-copy.svg';
import icon_arrow from '../../assets/icon-arrow-right.svg';
import './App.css';
import Slider from '../slider/Slider';
import Checkbox from '../checkbox/Checkbox';
import DiffBars from '../diffBars/DiffBars';

function App() {
  const [password, setPassword] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [character_length, setCharacterLength] = React.useState("0");
  const [use_caps, setUseCaps] = React.useState(true);
  const [use_lowercase, setUseLowercase] = React.useState(true);
  const [use_numbers, setUseNumbers] = React.useState(true);
  const [use_symbols, setUseSymbols] = React.useState(true);
  const [difficulty, setDifficulty] = React.useState(0);

  const copy_password = () => {
    setCopied(true);
    navigator.clipboard.writeText(password);
  }

  const containsCaps = (password: string): boolean => {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").some(char => password.includes(char));
  }

  const containsLowercase = (password: string): boolean => {
    return "abcdefghijklmnopqrstuvwxyz".split("").some(char => password.includes(char));
  }

  const containsNumbers = (password: string): boolean => {
    return "01234567890".split("").some(char => password.includes(char));
  }

  const containsSymbols = (password: string): boolean => {
    return " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split("").some(char => password.includes(char));
  }


  const generate_password = () => {
    setCopied(false);
    if (+character_length === 0 || (!use_caps && !use_lowercase && !use_numbers && !use_symbols)) {
      setPassword("");
    }
    else {
      let characters = "";
      if (use_caps) {
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      if (use_lowercase) {
        characters += "abcdefghijklmnopqrstuvwxyz";
      }
      if (use_numbers) {
        characters += "01234567890";
      }
      if (use_symbols) {
        characters += " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
      }
      let password = "";
      while ((password.length >= 6 || password.length === 0) && (use_caps !== containsCaps(password) || use_lowercase !== containsLowercase(password) || use_numbers !== containsNumbers(password) || use_symbols !== containsSymbols(password))) {
        password = "";
        let rand_array = new Uint32Array(+character_length);
        window.crypto.getRandomValues(rand_array);
        for (let i = 0; i < rand_array.length; i++) {
          password += characters[rand_array[i] % characters.length]      
        }  
      }
      setPassword(password);
    }      
  }

  const compute_difficulty = () => {
    let difficulty = 0;
    let len = password.length;
    let numbers = containsNumbers(password);
    let caps = containsCaps(password);
    let lowercase = containsLowercase(password);
    let symbols = containsSymbols(password);

    if (len !== 0) {
      if (numbers) {
        if (!caps && !lowercase && !symbols) {
          if (len <= 15) {
            difficulty = 1;
          }
          else {
            difficulty = 2;
          }
        }
        else if ((caps && !lowercase && !symbols) || (!caps && lowercase && !symbols) || (!caps && !lowercase && symbols)) {
          if (len <= 10) {
            difficulty = 1;
          }
          else if (len <= 12) {
            difficulty = 2;
          }
          else if (len <= 16){
            difficulty = 3;
          }
          else {
            difficulty = 4;
          }
        }
        else if ((!caps && lowercase && symbols) || (caps && !lowercase && symbols) || (caps && lowercase && !symbols)) {
          if (len <= 9) {
            difficulty = 1;
          }
          else if (len <= 10) {
            difficulty = 2;
          }
          else if (len <= 13){
            difficulty = 3;
          }
          else {
            difficulty = 4;
          }
        }
        else {
          if (len <= 8) {
            difficulty = 1;
          }
          else if (len <= 10) {
            difficulty = 2;
          }
          else if (len <= 12){
            difficulty = 3;
          }
          else {
            difficulty = 4;
          }
        }
      }
      else {
        if (!caps && !lowercase && !symbols) {
          difficulty = 0;
        }
        else if ((caps && !lowercase && !symbols) || (!caps && lowercase && !symbols) || (!caps && !lowercase && symbols)) {
          if (len <= 11) {
            difficulty = 1;
          }
          else if (len <= 13) {
            difficulty = 2;
          }
          else if (len <= 17){
            difficulty = 3;
          }
          else {
            difficulty = 4;
          }
        }
        else if ((!caps && lowercase && symbols) || (caps && !lowercase && symbols) || (caps && lowercase && !symbols)) {
          if (len <= 9) {
            difficulty = 1;
          }
          else if (len <= 11) {
            difficulty = 2;
          }
          else if (len <= 14){
            difficulty = 3;
          }
          else {
            difficulty = 4;
          }
        }
        else {
          if (len <= 9) {
            difficulty = 1;
          }
          else if (len <= 10) {
            difficulty = 2;
          }
          else if (len <= 13){
            difficulty = 3;
          }
          else {
            difficulty = 4;
          }
        }
      }
    }
    setDifficulty(difficulty);
  }

  React.useEffect(generate_password, [character_length, use_caps, use_lowercase, use_numbers, use_symbols]);
  React.useEffect(compute_difficulty, [password]);

  return (
    <div className="App">
      <div id="main_container">
        <h2 id="title">Password Generator</h2>
        <div id="password_div">
          <h1 className={+character_length === 0 ? "empty" : ""}>{password || "P4$5W0rD!"}</h1>
          <button id="copy_button" onClick={copy_password} disabled={password.length === 0}>
            {copied && "COPIED"}
            <img src={icon_copy} alt="logo"/>
          </button>
        </div>
        <div id="settings_div">
          <div id="length_div">
            <p>Character Length</p>
            <h1>{character_length}</h1>
          </div>
          <br/>
          <Slider min="0" max="20" value={character_length} updateValue={setCharacterLength}></Slider>
          <Checkbox text="Include Uppercase Letters" value={use_caps} updateValue={setUseCaps}></Checkbox>
          <Checkbox text="Include Lowercase Letters" value={use_lowercase} updateValue={setUseLowercase}></Checkbox>
          <Checkbox text="Include Numbers" value={use_numbers} updateValue={setUseNumbers}></Checkbox>
          <Checkbox text="Include Symbols" value={use_symbols} updateValue={setUseSymbols}></Checkbox>
          <div id="strength_div">
            <p>Strength</p>
            <DiffBars difficulty={difficulty}></DiffBars>
          </div>
          <button id="generate_button" onClick={generate_password} disabled={password.length === 0}>
            GENERATE
            <img src={icon_arrow} alt="logo" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
