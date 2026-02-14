
import React from 'react';
import { DivineJob } from '../types.ts';
import { Briefcase, CheckCircle2, Clock, Heart, Mic } from 'lucide-react';

interface Props {
  jobs: DivineJob[];
  onComplete: (id: string) => void;
  onVoiceTrigger?: () => void;
  isListening?: boolean;
}

const DivineJobsBoard: React.FC<Props> = ({ jobs, onComplete, onVoiceTrigger, isListening }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] flex items-center gap-2">
            <Briefcase size={12} /> Divine Assignments
          </h3>
          {isListening && (
            <span className="text-[8px] text-amber-400 font-mono animate-pulse uppercase tracking-[0.2em] mt-1">
              Assistant Listening...
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onVoiceTrigger}
            className={`p-2 rounded-full transition-all border ${isListening ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/30'}`}
            title="Create via Voice"
          >
            <Mic size={14} className={isListening ? 'animate-pulse' : ''} />
          </button>
          <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            {jobs.filter(j => j.status === 'Active').length} Active
          </span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-[300px] overflow-y-auto no-scrollbar">
        {jobs.length === 0 && !isListening && (
          <div className="p-6 text-center border border-dashed border-white/10 rounded-[2rem]">
            <p className="text-[10px] text-white/30 italic uppercase tracking-widest">Awaiting Command...</p>
          </div>
        )}
        {isListening && jobs.length === 0 && (
          <div className="p-6 text-center border border-dashed border-amber-500/30 bg-amber-500/5 rounded-[2rem] animate-pulse">
            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Speak the Assignment...</p>
          </div>
        )}
        {jobs.map(job => (
          <div key={job.id} className="glass p-4 rounded-[2rem] border-white/10 hover:border-white/20 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
               {job.status === 'Complete' ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Clock size={14} className="text-amber-400 animate-pulse" />}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-1.5 h-1.5 rounded-full ${job.status === 'Complete' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">{job.title}</h4>
            </div>
            <p className="text-[10px] text-white/50 leading-relaxed mb-3">{job.description}</p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono text-white/40 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                  {job.assignedGroup}
                </span>
                <div className="flex items-center gap-1 text-[8px] text-pink-400 font-bold uppercase">
                  <Heart size={8} /> {job.loveResonance}%
                </div>
              </div>
              {job.status !== 'Complete' && (
                <button 
                  onClick={() => onComplete(job.id)}
                  className="text-[9px] font-bold text-emerald-400 hover:text-white transition-colors uppercase tracking-widest"
                >
                  Seal
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DivineJobsBoard;
