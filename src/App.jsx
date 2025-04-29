import React from 'react';
import DocViewer from './components/DocViewer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Word to HTML Converter</h1>
      </header>
      <main>
        <DocViewer />
      </main>
      <footer>
        <p>Powered by Mammoth.js</p>
      </footer>
    </div>
  );
}

export default App;
