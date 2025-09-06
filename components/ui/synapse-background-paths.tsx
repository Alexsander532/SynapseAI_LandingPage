"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.3 + i * 0.02,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none opacity-30">
            <svg
                className="w-full h-full text-blue-500"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.02}
                        initial={{ pathLength: 0.2, opacity: 0.4 }}
                        animate={{
                            pathLength: [0.2, 1, 0.2],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: path.id * 0.2,
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function SynapseBackgroundPaths({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-0.5} />
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}