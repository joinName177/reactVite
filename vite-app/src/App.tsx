import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.less'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Vite + React + Less</h1>
      </header>
      
      <div className="app-content">
        <div className="card">
          <div className="card-title">Welcome to Less!</div>
          <div className="card-content">
            <p>This project is now configured with Less support.</p>
            <p>You can use variables, nesting, mixins, and more!</p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-title">Interactive Counter</div>
          <div className="card-content">
            <p>Count is: {count}</p>
            <button 
              className="button" 
              onClick={() => setCount((count) => count + 1)}
            >
              Increment
            </button>
            <button 
              className="button success" 
              onClick={() => setCount(0)}
            >
              Reset
            </button>
          </div>
        </div>
        
        <div className="card">
          <div className="card-title">Less Features Demo</div>
          <div className="card-content">
            <p>This demonstrates:</p>
            <ul>
              <li>Variables (@primary-color, @spacing-md, etc.)</li>
              <li>Nesting (.app .app-header h1)</li>
              <li>Mixins and functions (darken())</li>
              <li>Responsive design with breakpoints</li>
              <li>Hover effects and transitions</li>
            </ul>
          </div>
        </div>
        
        <div className="card">
          <div className="card-title">Button Variants</div>
          <div className="card-content">
            <button className="button">Primary</button>
            <button className="button success">Success</button>
            <button className="button warning">Warning</button>
            <button className="button error">Error</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
