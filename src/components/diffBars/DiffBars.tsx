import './DiffBars.css';
import DiffBar from '../diffBar/DiffBar';

function DiffBars({difficulty}: {difficulty: number}) {
  let colors = ["white", "white", "white", "white"];
  let text = "";
  if (difficulty === 1) {
    colors = ["red", "white", "white", "white"];
    text = "TOO WEAK!";
  }
  else if (difficulty === 2) {
    colors = ["orange", "orange", "white", "white"];
    text = "WEAK";
  }
  else if (difficulty === 3) {
    colors = ["yellow", "yellow", "yellow", "white"];
    text = "MEDIUM";
  }
  else if (difficulty === 4) {
    colors = ["green", "green", "green", "green"];
    text = "STRONG"
  }

  return (
    <div id="diff_bars">
      <h2>{text}</h2>
      <DiffBar color={colors[0]}></DiffBar>
      <DiffBar color={colors[1]}></DiffBar>
      <DiffBar color={colors[2]}></DiffBar>
      <DiffBar color={colors[3]}></DiffBar>
    </div>
  );
}

export default DiffBars;
