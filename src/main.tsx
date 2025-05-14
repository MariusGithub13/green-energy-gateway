
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Handle redirects for SPA routing on page load
const redirect = sessionStorage.redirect;
if (redirect && redirect !== location.href) {
  sessionStorage.removeItem('redirect');
  history.replaceState(null, '', redirect.replace(location.origin, ''));
}

createRoot(document.getElementById("root")!).render(<App />);
