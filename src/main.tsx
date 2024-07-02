import '@arco-design/web-react/dist/css/arco.css';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { run } from 'draft';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

run();
