import Canvas from './components/Canvas';
import Navigation from './components/Navigation';

function App() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh'
            }}
        >
            <Navigation />
            <div
                style={{
                    display: 'flex',
                    flexGrow: '1',
                    flexShrink: '1',
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                    position: 'relative'
                }}
            >
                <Canvas />
            </div>
        </div>
    );
}

export default App;
