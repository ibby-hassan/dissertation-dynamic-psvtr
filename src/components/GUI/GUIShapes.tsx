import React from 'react';
import type { Voxel } from '../../App';

interface GUIShapesProps {
    selectedType: Voxel['type'];
    onSelect: (type: Voxel['type']) => void;
}

const GUIShapes: React.FC<GUIShapesProps> = ({ selectedType, onSelect }) => {
    const shapes: Voxel['type'][] = ['cube', 'ramp', 'half'];

    return (
        <div className="grid grid-cols-2 gap-2 pointer-events-auto bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-xl">
            {shapes.map((shape) => (
                <button
                    key={shape}
                    onClick={() => onSelect(shape)}
                    className={`
                        w-14 h-14 rounded-lg border flex items-center justify-center transition-all shadow-sm
                        ${selectedType === shape
                            ? 'bg-white/90 border-white text-black scale-105 shadow-lg font-bold'
                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/20 hover:text-white hover:border-white/30'}
                    `}
                    title={shape}
                >
                    <span className="text-xs capitalize">{shape}</span>
                </button>
            ))}
        </div>
    );
};

export default GUIShapes;
