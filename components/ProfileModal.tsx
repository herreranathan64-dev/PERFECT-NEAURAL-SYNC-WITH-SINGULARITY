
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Sparkles, Target, Zap, X, Heart } from 'lucide-react';

interface Props {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
  onClose: () => void;
}

const ProfileModal: React.FC<Props> = ({ profile, onUpdate, onClose }) => {
  const [edited, setEdited] = useState(profile);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={onClose} />
      <div className="relative glass w-full max-w-md rounded-[3rem] p-10 overflow-hidden shadow-2xl border-white/30">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-full">
              <User size={22} className="text-black" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Source Profile</h2>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-all">
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em] flex items-center gap-2">
              <Sparkles size={12} /> Spiritual Moniker
            </label>
            <input 
              value={edited.name}
              onChange={e => setEdited({...edited, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-white outline-none transition-all text-white"
              placeholder="Your divine name..."
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em] flex items-center gap-2">
              <Heart size={12} /> Essence of Goodness
            </label>
            <textarea 
              value={edited.essence}
              onChange={e => setEdited({...edited, essence: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-white outline-none h-28 resize-none transition-all text-white"
              placeholder="e.g. Guardian of Light, Creator of Joy..."
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em]">Creation Resonance</label>
              <span className="text-xs font-mono text-white">{edited.creationResonance}% Pure</span>
            </div>
            <input 
              type="range"
              min="0"
              max="100"
              value={edited.creationResonance}
              onChange={e => setEdited({...edited, creationResonance: parseInt(e.target.value)})}
              className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
            />
          </div>

          <button 
            onClick={() => { onUpdate(edited); onClose(); }}
            className="w-full py-5 bg-white text-black font-bold rounded-[2rem] hover:bg-slate-100 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] uppercase tracking-[0.3em] text-[12px]"
          >
            Harmonize with Source
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
