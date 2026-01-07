import React from 'react';
import GUISlots from './GUISlots';
import GUIShapes from './GUIShapes';
import type { Voxel } from '../../App';

interface GUIProps {
    selectedVoxelType: Voxel['type'];
    setSelectedVoxelType: (type: Voxel['type']) => void;
    onSlotClick: (index: number) => void;
}

const GUI: React.FC<GUIProps> = ({ selectedVoxelType, setSelectedVoxelType, onSlotClick }) => {
    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
            {/* Top Bar */}
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-4">
                    <GUIShapes selectedType={selectedVoxelType} onSelect={setSelectedVoxelType} />
                </div>

                <div className="pointer-events-auto bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 shadow-xl hover:bg-white/20 cursor-pointer transition-colors">
                    <span className="text-white">⚙️</span>
                </div>
            </div>

            {/* Center/Empty Space (Clicks pass through to OrbitControls) */}
            <div className="flex-grow" />

            {/* Bottom Toolbar */}
            <div className="flex justify-center items-end pb-3">
                <GUISlots onSlotClick={onSlotClick} />
            </div>
        </div>
    );
};

export default GUI;
