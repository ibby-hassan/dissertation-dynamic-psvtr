import React from 'react';

const GUISlots: React.FC = () => {
    const slots = Array.from({ length: 8 }, (_, i) => i);

    return (
        <div className="flex gap-2 p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl pointer-events-auto">
            {slots.map((slot) => (
                <div
                    key={slot}
                    className="w-12 h-12 flex items-center justify-center bg-white border border-white rounded-lg hover:bg-white/20 hover:border-white/20 hover:scale-105 transition-all cursor-pointer group"
                >
                    <span className="text-black text-sm group-hover:text-black transition-colors">
                        {slot + 1}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default GUISlots;
