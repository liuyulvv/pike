import '@arco-design/web-react/dist/css/arco.css';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { run } from 'draft';

run().then(() => {
    const canvas = document.getElementById('main_canvas') as HTMLCanvasElement;
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
});
