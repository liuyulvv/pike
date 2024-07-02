import { useEffect, useRef } from 'react';
import { run } from 'draft';

export function Canvas() {
    const mainContainer = useRef<HTMLDivElement>(null);
    const mainCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const { current: container } = mainContainer;
        const canvas = document.getElementById('main_canvas') as HTMLCanvasElement;
        if (!container || !canvas) return;
        const resize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        run();
        return () => {
            window.removeEventListener('resize', resize);
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
                id="canvas"
                style={{
                    outline: 'none'
                }}
            ></canvas>
        </div>
    );
}
