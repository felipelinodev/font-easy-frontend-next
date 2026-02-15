'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type FontLetter = {
    id: string;
    letter: string;
    correctIndex: number;
};

const WORD = 'PESQUISANDO';
const LETTERS: FontLetter[] = WORD.split('').map((letter, i) => ({
    id: `letter-${i}`,
    letter,
    correctIndex: i,
}));

function shuffleArray(arr: FontLetter[]): FontLetter[] {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

export const LoaderSearch = () => {
    const [items, setItems] = useState<FontLetter[]>(() => shuffleArray([...LETTERS]));
    const sortStepRef = useRef(0);
    const phaseRef = useRef<'sorting' | 'resolved' | 'shuffling'>('sorting');
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Encontra o próximo swap necessário (bubble sort visual — uma troca por vez)
    const findNextSwap = useCallback((arr: FontLetter[]): [number, number] | null => {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i].correctIndex > arr[i + 1].correctIndex) {
                return [i, i + 1];
            }
        }
        return null;
    }, []);

    const tick = useCallback(() => {
        if (phaseRef.current === 'sorting') {
            setItems((prev) => {
                const swap = findNextSwap(prev);
                if (!swap) {
                    // Já está ordenado → fase "resolved"
                    phaseRef.current = 'resolved';
                    sortStepRef.current = 0;

                    // Após 2.2s mostrando "PESQUISANDO", embaralha
                    timeoutRef.current = setTimeout(() => {
                        phaseRef.current = 'shuffling';
                        sortStepRef.current = 0;
                        tick();
                    }, 2200);

                    return prev;
                }

                // faz o swap
                const newArr = [...prev];
                [newArr[swap[0]], newArr[swap[1]]] = [newArr[swap[1]], newArr[swap[0]]];
                return newArr;
            });

            // Próximo passo de sorting
            if (phaseRef.current === 'sorting') {
                timeoutRef.current = setTimeout(tick, 420);
            }
        } else if (phaseRef.current === 'shuffling') {
            // Faz alguns swaps aleatórios para embaralhar visivelmente
            sortStepRef.current += 1;

            if (sortStepRef.current <= 8) {
                setItems((prev) => {
                    const newArr = [...prev];
                    const i = Math.floor(Math.random() * newArr.length);
                    const j = Math.floor(Math.random() * newArr.length);
                    if (i !== j) {
                        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
                    }
                    return newArr;
                });
                timeoutRef.current = setTimeout(tick, 350);
            } else {
                // Terminou de embaralhar → começa a ordenar de novo
                phaseRef.current = 'sorting';
                sortStepRef.current = 0;
                timeoutRef.current = setTimeout(tick, 600);
            }
        } else if (phaseRef.current === 'resolved') {
            // Esperando — o timeout já foi agendado
        }
    }, [findNextSwap]);

    useEffect(() => {
        // Inicia o loop
        timeoutRef.current = setTimeout(tick, 800);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [tick]);

    return (
        <div className="flex h-9 w-full items-center justify-center gap-2 p-2 overflow-visible">
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    layout
                    transition={{
                        type: 'spring',
                        stiffness: 250,
                        damping: 26,
                        mass: 1.0,
                    }}
                    className={cn(
                        'flex items-center justify-center',
                        'px-2 py-1 rounded-md',
                        'bg-white',
                        'cursor-wait select-none'
                    )}
                >
                    <span className="text-xs font-medium text-neutral-900 leading-none">
                        {item.letter}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

export default LoaderSearch;
