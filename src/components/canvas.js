'use client';

import { useState } from 'react';

export default function Canvas ({ children }) {
    const [isPointerDown, setIsPointerDown] = useState(false);

    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    const maxTranslateX = 1024;
    const minTranslateX = -1024;

    const onPointerDown = () => {
        setIsPointerDown(true);
    };

    const onPointerUp = () => {
        setIsPointerDown(false);
    };

    const onPointerMove = (event) => {
        if (!isPointerDown) {
            return;
        }

        const { movementX, movementY } = event;

        setTranslateX(translateX => {
            const newTranslateX = translateX + movementX;

            if (newTranslateX > maxTranslateX) {
                return maxTranslateX;
            } else if (newTranslateX < minTranslateX) {
                return minTranslateX;
            } else {
                return newTranslateX;
            }
        });

        setTranslateY(translateY => {
            const newTranslateY = translateY + movementY;

            if (newTranslateY > 0) {
                return 0;
            } else {
                return newTranslateY;
            }
        });
    };

    return (
        <Pane
            isPointerDown={isPointerDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}>
            <Pattern
                translateX={translateX}
                translateY={translateY}
            />

            <Viewport
                translateX={translateX}
                translateY={translateY}>
                    {children}
            </Viewport>
        </Pane>
    );
}

function Viewport({
    translateX,
    translateY,
    children,
}) {
    return (
        <div
            className="flex flex-col items-center gap-4 p-10"
            style={{
                transform: `translate(${translateX}px, ${translateY}px)`,
            }}>
            {children}
        </div>
    )
}

function Pattern({
    translateX,
    translateY,
}) {
    return (
        <svg className="absolute w-full h-full text-outline-variant">
            <pattern
                id="pattern"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
                x={translateX}
                y={translateY}>
                <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>

            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
        </svg>
    );
}

function Pane({
    isPointerDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    children,
}) {
    return (
        <div
            className={`relative w-full h-full overflow-hidden ${isPointerDown ? "cursor-grabbing" : "cursor-grab"}`}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}>
            {children}
        </div>
    )
}

