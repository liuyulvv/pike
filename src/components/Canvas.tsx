import { useEffect, useRef } from 'react';
import Stage from '../3D/Stage';
import useStageStore from '../store/StageStore';

function Canvas() {
    const mainContainer = useRef<HTMLDivElement>(null);
    const mainCanvas = useRef<HTMLCanvasElement>(null);

    const stage = Stage.getInstance();
    useStageStore.setState({ stage: stage });

    useEffect(() => {
        const { current: container } = mainContainer;
        const { current: canvas } = mainCanvas;
        if (!container || !canvas) return;

        const resize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            stage.resize();
        };
        resize();

        window.addEventListener('resize', resize);

        stage.init();

        return () => {
            window.removeEventListener('resize', resize);
            stage.dispose();
        };
    });

    return (
        <div
            ref={mainContainer}
            style={{
                flexGrow: '1',
                flexShrink: '1',
                flexBasis: '0',
                overflowX: 'hidden',
                overflowY: 'hidden',
                position: 'absolute',
                zIndex: '0',
                left: '0px',
                right: '0px',
                height: '100%'
            }}
        >
            <canvas
                ref={mainCanvas}
                id="main_canvas"
                style={{
                    outline: 'none'
                }}
            ></canvas>
        </div>
    );
}

export default Canvas;
