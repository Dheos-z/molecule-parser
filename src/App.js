import React, { useState } from 'react';
import './App.css';
import logo from './assets/molecule.png';
import { getAtoms, isValidFormula } from './formulaControl';

function App() {

  const [formula, setFormula] = useState('');
  const [atoms, setAtoms] = useState({});
  const [formulaIsValid, setFormulaIsValid] = useState(false);
  const [formulaIsInvalid, setFormulaIsInvalid] = useState(false);

  const handleChange = event => {

    // Control input -> invalid characters are deleted
    event.target.value = event.target.value.replace(/[^A-Za-z0-9([{}\])]/, '');
    setFormula(event.target.value);
  }

  const handleParse = () => {
    if (isValidFormula(formula)) {
      const atoms = getAtoms(formula);
      setFormulaIsValid(true);
      setFormulaIsInvalid(false);
      setAtoms(atoms);
    }
    else {
      setFormulaIsValid(false);
      setFormulaIsInvalid(true);
    }
  }


  return (
    <div className="App">
      <h1 className="title">Enter your molecule</h1>
      <div className="molecule-logo">
        <img src={logo} alt="Molecule logo" />
      </div>
      <div className="input-formula">
        <input type="text" size='10' value={formula} onChange={handleChange} />
      </div>
      <div className="parseBtn">
        <button onClick={handleParse}>PARSE FORMULA</button>
      </div>
      <div className='atoms'>
        {
          formulaIsValid &&
          Object.keys(atoms).map((atom, index) => (
            <h2 className='atom' key={index}>
              {atom + '     ------>     ' + atoms[atom] }
            </h2>
          ))
        }
      </div>
      <div className='error-message'>
        {
          formulaIsInvalid &&
          'Error : the formula is invalid'
        }
      </div>
    </div>
  );
}

export default App;
