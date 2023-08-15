import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router} from 'react-router-dom'
import { CredentialContextProvider } from './components/CredentialProvider.jsx'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
        <CredentialContextProvider>
            <App />
        </CredentialContextProvider>
      </Router>
  </React.StrictMode>,
)
