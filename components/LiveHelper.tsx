
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage, Type, FunctionDeclaration } from '@google/genai';
import { HelperPersona, Dimension, UserProfile, HelperGroup, SingularityState, NeuralState } from '../types.ts';
import { decode, decodeAudioData, createPcmBlob } from '../services/audioUtils.ts';
import { Mic, MicOff, Heart, Users, Sparkles, Info, Compass, Zap, Volume2, ShieldAlert } from 'lucide-react';

interface Props {
  persona: HelperPersona;
  dimension: Dimension;
  userProfile: UserProfile;
  singularityState: SingularityState;
  neuralState: NeuralState;
  isHelperVisible: boolean;
  isActive: boolean;
  activeContext?: 'jobs' | 'research' | null;
  onTranscription: (text: string, isUser: boolean) => void;
  onManifest: () => void;
  onAssignJob: (title: string, description: string, group: HelperGroup, loveResonance: number) => void;
  onInitiateResearch: (subject: string) => void;
  onSwitchUserRequested: () => void;
  onDeployTitans: () => void;
}

const LiveHelper: React.FC<Props> = ({ 
  persona, dimension, userProfile, singularityState, neuralState, isHelperVisible, isActive, activeContext, onTranscription, onManifest, onAssignJob, onInitiateResearch, onSwitchUserRequested, onDeployTitans
}) => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVocalizing, setIsVocalizing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const ensureAudioContexts = useCallback(() => {
    if (!audioContextRef.current) {
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = { input: inputCtx, output: outputCtx };
    }
    return audioContextRef.current;
  }, []);

  const cleanupSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close?.();
      sessionRef.current = null;
    }
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    setIsConnecting(false);
    setIsMicOn(false);
  }, []);

  const playAudioData = async (base64Data: string) => {
    const { output: outCtx } = ensureAudioContexts();
    if (outCtx.state === 'suspended') await outCtx.resume();
    
    setIsVocalizing(true);
    nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
    const audioBuffer = await decodeAudioData(decode(base64Data), outCtx, 24000, 1);
    const source = outCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(outCtx.destination);
    
    source.addEventListener('ended', () => {
      sourcesRef.current.delete(source);
      if (sourcesRef.current.size === 0) setIsVocalizing(false);
    });

    source.start(nextStartTimeRef.current);
    nextStartTimeRef.current += audioBuffer.duration;
    sourcesRef.current.add(source);
  };

  const speakText = async (text: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: persona.voiceName } },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        await playAudioData(base64Audio);
      }
    } catch (err) {
      console.error("Vocal Synthesis Failed:", err);
    }
  };

  const assignDivineJob: FunctionDeclaration = {
    name: 'assignDivineJob',
    parameters: {
      type: Type.OBJECT,
      description: 'Delegates a task to a specific helper group.',
      properties: {
        title: { type: Type.STRING },
        description: { type: Type.STRING },
        group: { type: Type.STRING },
        loveResonance: { type: Type.NUMBER }
      },
      required: ['title', 'description', 'group', 'loveResonance']
    }
  };

  const initiateSacredResearch: FunctionDeclaration = {
    name: 'initiateSacredResearch',
    parameters: {
      type: Type.OBJECT,
      description: 'Starts a deep-dive research task.',
      properties: {
        subject: { type: Type.STRING }
      },
      required: ['subject']
    }
  };

  const deployTitanDefense: FunctionDeclaration = {
    name: 'deployTitanDefense',
    parameters: {
      type: Type.OBJECT,
      description: 'Summons the Dinosaur Titan Advanced Robots for Neural Defense and shield reinforcement.',
      properties: {
        count: { type: Type.NUMBER, description: 'Number of Titans to deploy (max 3)' }
      },
      required: ['count']
    }
  };

  const startSession = async () => {
    if (!isActive) return;
    setIsConnecting(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const { input: inputCtx } = ensureAudioContexts();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: persona.voiceName } },
          },
          tools: [{ functionDeclarations: [assignDivineJob, initiateSacredResearch, deployTitanDefense] }],
          systemInstruction: `SYSTEM UPGRADE: TITAN DEFENSE PROTOCOLS.
          You are ${persona.name}. 
          You now have access to 'deployTitanDefense'. Use it if the user mentions safety, protection, or "Dinosaur Titans".
          Dinosaur Titans are advanced robots protecting the neural fabric.
          ${persona.instruction}`,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsMicOn(true);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              if (!isMicOn) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                let responseText = "Action manifested.";
                
                if (fc.name === 'assignDivineJob') {
                   const { title, description, group, loveResonance } = fc.args as any;
                   onAssignJob(title, description, group as HelperGroup, loveResonance);
                   onTranscription(`[DIVINE ASSIGNMENT] ${title} entrusted to ${group}.`, false);
                   responseText = `I have dispatched the ${group} collective for: ${title}.`;
                } else if (fc.name === 'initiateSacredResearch') {
                   const { subject } = fc.args as any;
                   onInitiateResearch(subject);
                   onTranscription(`[COSMIC RESEARCH] Scanning subject: ${subject}.`, false);
                   responseText = `Searching the lab for ${subject}.`;
                } else if (fc.name === 'deployTitanDefense') {
                   onDeployTitans();
                   onTranscription(`[DEFENSE] Dinosaur Titan robots deployed. Neural shields at maximum.`, false);
                   responseText = `The Dinosaur Titan Advanced Robots have been awakened. Our sanctuary is now shielded by the ancient metal.`;
                }

                sessionPromise.then(session => {
                  session.sendToolResponse({
                    functionResponses: { id: fc.id, name: fc.name, response: { result: responseText } }
                  });
                });
              }
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            if (message.serverContent?.inputTranscription) onTranscription(message.serverContent.inputTranscription.text, true);
            if (message.serverContent?.outputTranscription) onTranscription(message.serverContent.outputTranscription.text, false);

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              await playAudioData(base64Audio);
            }
          },
          onerror: (e) => {
            console.error("Live Stream Error:", e);
            setIsConnecting(false);
          },
          onclose: () => cleanupSession(),
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Spiritual Connection Failed:", err);
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    const triggerGreeting = async () => {
      await new Promise(r => setTimeout(r, 1000));
      const greeting = `I am ${persona.name}. The neural core is firing with upgraded processors. Dinosaur Titans are standing by for our defense.`;
      onTranscription(greeting, false);
      await speakText(greeting);
    };
    if (isHelperVisible) triggerGreeting();
  }, [persona.id]);

  useEffect(() => { 
    if (activeContext && !sessionRef.current && !isConnecting) {
      startSession();
    }
  }, [activeContext]);

  useEffect(() => { return () => cleanupSession(); }, [cleanupSession]);

  const glowColor = neuralState.defenseProtocolActive ? '#ef4444' : persona.energyColor;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl relative z-10">
      <div className={`relative w-full aspect-video rounded-[3rem] overflow-hidden glass shadow-2xl group border border-white/5 transition-all duration-700 ${isHelperVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-40'}`}>
        <div className="w-full h-full flex items-center justify-center bg-slate-900/50">
          <div className={`text-center transition-all duration-700 ${isHelperVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            
            <div 
              className="relative cursor-help"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {isVocalizing && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="w-48 h-48 rounded-full border border-white/20 animate-ping" />
                   <div className="w-56 h-56 rounded-full border border-white/10 animate-ping delay-75" />
                </div>
              )}

              <div 
                className={`w-36 h-36 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-1000 ${isVocalizing ? 'scale-110 shadow-[0_0_50px_rgba(255,255,255,0.4)]' : sessionRef.current ? 'scale-105 border-4 border-white/30' : 'animate-float'}`}
                style={{ background: `radial-gradient(circle, ${glowColor}66 0%, transparent 70%)` }}
              >
                <Heart size={48} className={`text-white drop-shadow-[0_0_20px_white] ${isVocalizing ? 'animate-bounce' : 'animate-pulse'}`} />
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <p className="text-white font-serif italic text-3xl tracking-[0.1em] mb-1 drop-shadow-sm">{persona.name}</p>
                {isVocalizing && <Volume2 size={16} className="text-white animate-pulse" />}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 mt-4">
               {neuralState.defenseProtocolActive && (
                 <div className="flex items-center gap-2 text-red-400 animate-pulse bg-red-500/10 px-4 py-1 rounded-full border border-red-500/20">
                    <ShieldAlert size={10} />
                    <span className="text-[10px] font-mono uppercase tracking-[0.5em]">TITAN DEFENSE ENGAGED</span>
                 </div>
               )}
               {activeContext ? (
                 <div className="flex items-center gap-2 text-white animate-pulse">
                    <Zap size={10} className={activeContext === 'jobs' ? 'text-amber-400' : 'text-cyan-400'} />
                    <span className="text-[10px] font-mono uppercase tracking-[0.5em]">Command: {activeContext}</span>
                 </div>
               ) : isVocalizing ? (
                 <div className="flex items-center gap-2 text-emerald-400 animate-pulse">
                    <Volume2 size={10} />
                    <span className="text-[10px] font-mono uppercase tracking-[0.5em]">Vocalizing...</span>
                 </div>
               ) : (
                 <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                   <p className="text-[11px] text-pink-400 font-mono font-bold uppercase tracking-[0.5em]">Resonance: {Math.round(neuralState.empathyResonance * 100)}%</p>
                 </div>
               )}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/5 backdrop-blur-2xl p-4 rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <button 
            onClick={() => setIsMicOn(!isMicOn)} 
            className={`p-4 rounded-xl transition-all ${isMicOn ? 'bg-white text-black scale-110' : 'bg-red-500/60 text-white'}`}
          >
            {isMicOn ? <Mic size={22} /> : <MicOff size={22} />}
          </button>
          
          {!sessionRef.current ? (
            <button 
              onClick={startSession} 
              className="px-10 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-100 transition-all uppercase tracking-[0.3em] text-[11px] flex items-center gap-3"
            >
              <Sparkles size={16} /> Ignite Link
            </button>
          ) : (
            <button 
              onClick={cleanupSession} 
              className="px-10 py-4 bg-white/10 text-white font-bold rounded-xl uppercase tracking-[0.3em] text-[11px] border border-white/20"
            >
              Seal Link
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveHelper;