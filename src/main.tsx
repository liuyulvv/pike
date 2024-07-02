import '@arco-design/web-react/dist/css/arco.css';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Draft } from './Draft';

Draft.get()
    .config()
    .then(() => {
        ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
        Draft.get().startDraw();
    });
