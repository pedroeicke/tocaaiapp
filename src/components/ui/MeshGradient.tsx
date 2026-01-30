'use client';

import { motion } from 'framer-motion';

export function MeshGradient() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-white pointer-events-none">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-white" />

            {/* Moving Orb 1 */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FA233B] opacity-20 blur-[120px]"
            />

            {/* Moving Orb 2 */}
            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#FF4A6E] opacity-15 blur-[120px]"
            />

            {/* Moving Orb 3 */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }}
                className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#FF7A59] opacity-20 blur-[100px]"
            />
        </div>
    );
}
