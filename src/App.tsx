import { useEffect } from 'react';
import { Navigation } from './components/Navigation';

function App() {
    useEffect(() => {
        const canvas = document.getElementById('main_canvas') as HTMLCanvasElement;
        const resize = () => {
            canvas.width = document.body.clientWidth;
            canvas.height = document.body.clientHeight;
            console.log('Resized canvas to', canvas.width, canvas.height);
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
        >
            <Navigation />
        </div>
    );
}

export default App;
