import { useEffect } from 'react';
import { Draft } from './Draft';

function App() {
    useEffect(() => {
        const canvas = document.getElementById('main_canvas') as HTMLCanvasElement;
        const resize = () => {
            canvas.width = document.body.clientWidth;
            canvas.height = document.body.clientHeight;
            Draft.get().resize(canvas.width, canvas.height);
        };
        resize();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    });

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh'
            }}
        ></div>
    );
}

export default App;
