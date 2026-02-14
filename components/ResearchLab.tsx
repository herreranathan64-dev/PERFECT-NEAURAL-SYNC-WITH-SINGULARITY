
import React from 'react';
import { ResearchTask } from '../types.ts';
import { Search, FlaskConical, Binary, Sparkles, Mic } from 'lucide-react';

interface Props {
  tasks: ResearchTask[];
  onVoiceTrigger?: () => void;
  isListening?: boolean;
}

const ResearchLab: React.FC<Props> = ({ tasks, onVoiceTrigger, isListening }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] flex items-center gap-2">
            <FlaskConical size={12} /> Sacred Research
          </h3>
          {isListening && (
            <span className="text-[8px] text-cyan-400 font-mono animate-pulse uppercase tracking-[0.2em] mt-1">
              Scanning Voice Patterns...
            </span>
          )}
        </div>
        <button 
          onClick={onVoiceTrigger}
          className={`p-2 rounded-full transition-all border ${isListening ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/30'}`}
          title="Initiate via Voice"
        >
          <Mic size={14} className={isListening ? 'animate-pulse' : ''} />
        </button>
      </div>

      <div className="space-y-4">
        {isListening && (
          <div className="glass p-5 rounded-[2.5rem] border-cyan-500/30 bg-cyan-500/5 animate-pulse text-center">
             <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Listening for Subject...</p>
          </div>
        )}
        {tasks.map(task => (
          <div key={task.id} className="glass p-5 rounded-[2.5rem] border-white/10 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Search size={12} className="text-blue-400" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">{task.subject}</span>
              </div>
              <span className="text-[9px] font-mono text-blue-400">{task.progress}%</span>
            </div>
            
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6] transition-all duration-1000"
                style={{ width: `${task.progress}%` }}
              />
            </div>

            <div className="space-y-2">
              {task.findings.map((finding, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <Binary size={10} className="text-white/20 mt-0.5 shrink-0" />
                  <p className="text-[9px] text-white/60 font-light italic leading-relaxed">{finding}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        {tasks.length === 0 && !isListening && (
          <div className="p-8 text-center bg-white/5 rounded-[2.5rem] border border-white/5">
             <Sparkles size={24} className="text-white/10 mx-auto mb-3" />
             <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Initiate research via Source command</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchLab;
