"use client"

import { useEffect, useState, memo } from "react";

interface Particle {
    key: number;
    tx: string;
    ty: string;
    left: string;
    top: string;
    delay: string;
    duration: string;
}

const PARTICLE_COUNT = 12;

export const Particles = memo(function Particles() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        setParticles([...Array(PARTICLE_COUNT)].map((_, i) => ({
            key: i,
            tx: `${Math.random() * 40 - 20}px`,
            ty: `${Math.random() * -80 - 20}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 2}s`,
            duration: `${3 + Math.random() * 2}s`,
        })));
    }, []); // only runs once on client

    return (
        <>
            {particles.map(p => (
                <div
                    key={p.key}
                    className="absolute w-2 h-2 bg-primary/30 rounded-full animate-particle"
                    style={{
                        '--tx': p.tx,
                        '--ty': p.ty,
                        left: p.left,
                        top: p.top,
                        animationDelay: p.delay,
                        animationDuration: p.duration,
                    } as React.CSSProperties}
                />
            ))}
        </>
    );
});
