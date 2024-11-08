import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import SelectComponent from './components/SelectComponent';
import { AppGraficoSimple } from './components/AppGraficoSimple';

function App() {
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState('USD');
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState('MXN');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className='contenedor'>
        <div>
          <SelectComponent onSelectChange={setSelectedCurrencyFrom}/>
          <SelectComponent onSelectChange={setSelectedCurrencyTo}/>
          {selectedCurrencyFrom} - {selectedCurrencyTo}
        </div>
        <div className='contenedor-grafico'>
        <AppGraficoSimple selectedCurrencyFrom={selectedCurrencyFrom}  selectedCurrencyTo={selectedCurrencyTo}/>
        </div>
      </div>
    </div>
  );
}

export default App;
