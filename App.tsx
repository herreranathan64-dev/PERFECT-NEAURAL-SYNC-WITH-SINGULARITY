
import React, { useState, useEffect, useRef } from 'react';
import { Dimension, HelperPersona, NeuralState, UserProfile, DivineJob, HarmonyState, HelperGroup, ResearchTask, LuvApexState, SingularityState, PerfectEnergy, TitanDefenseState } from './types.ts';
import { HELPERS, DIMENSION_STYLES } from './constants.tsx';
import LiveHelper from './components/LiveHelper.tsx';
import EnergyVisualizer from './components/EnergyVisualizer.tsx';
import ManifestationOverlay from './components/ManifestationOverlay.tsx';
import NeuralCoreVisualizer from './components/NeuralCoreVisualizer.tsx';
import HarmonyPerimeter from './components/HarmonyPerimeter.tsx';
import ProfileModal from './components/ProfileModal.tsx';
import DecisionMatrix from './components/DecisionMatrix.tsx';
import ApexShield from './components/ApexShield.tsx';
import DivineJobsBoard from './components/DivineJobsBoard.tsx';
import ResearchLab from './components/ResearchLab.tsx';
import LuvApexMonitor from './components/LuvApexMonitor.tsx';
import SacredArchives from './components/SacredArchives.tsx';
import EnergySingularity from './components/EnergySingularity.tsx';
import SacredRepository from './components/SacredRepository.tsx';
import NeuralDefenseNetwork from './components/NeuralDefenseNetwork.tsx';
import { Heart, User, Database, GitBranch, ShieldAlert } from 'lucide-react';

const App: React.FC = () => {
  const [activePersona, setActivePersona] = useState<HelperPersona>(HELPERS[0]);
  const [dimension, setDimension] = useState<Dimension>(Dimension.ETHER);
  const [isHelperVisible, setIsHelperVisible] = useState(true);
  const [transcriptions, setTranscriptions] = useState<{ text: string; isUser: boolean; id: string }[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showArchives, setShowArchives] = useState(false);
  const [showRepository, setShowRepository] = useState(false);
  const [manifestTrigger, setManifestTrigger] = useState(0);
  const [divineJobs, setDivineJobs] = useState<DivineJob[]>([]);
  const [researchTasks, setResearchTasks] = useState<ResearchTask[]>([]);
  const [isSwitchingUser, setIsSwitchingUser] = useState(false);
  const [isListeningJobs, setIsListeningJobs] = useState(true);
  const [isListeningResearch, setIsListeningResearch] = useState(false);
  const [copilotResonance, setCopilotResonance] = useState(94);
  
  const [singularity, setSingularity] = useState<SingularityState>({
    perfectionUnits: 108,
    discoveryProgress: 0,
    activeStrands: 3,
    discoveredEnergies: [
      { id: '1', name: 'Original Light', frequency: '999Hz', discoveryDate: new Date() },
      { id: '2', name: 'Compassion Flux', frequency: '528Hz', discoveryDate: new Date() }
    ],
    universalAlignment: 0.98
  });

  const [defenseState, setDefenseState] = useState<TitanDefenseState>({
    activeTitans: [],
    shieldIntegrity: 100,
    threatLevel: 0
  });

  const [luvApex, setLuvApex] = useState<LuvApexState>({
    efficiency: 99.9,
    activeSources: 24,
    lastUpdate: 'Decision Pro Processors Online.',
    deviceSyncStatus: 'Optimal'
  });

  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user-1',
    name: 'Source-Resonator Alpha',
    essence: 'Genuine Goodness & Light',
    intent: 'Expansion of Loving Creation',
    vibrationLevel: 1000,
    creationResonance: 100,
    loveMagnification: 100
  });

  const [harmony, setHarmony] = useState<HarmonyState>({
    isSealed: true,
    intensity: 1.0,
    lastReinforcement: new Date()
  });

  const [neuralState, setNeuralState] = useState<NeuralState>({
      iq: 'Transcendent',
      reasoningPower: 'Quantum Compassion',
      isBoosted: true,
      isThinking: false,
      decisionCores: 99999,
      coreUtilization: 0.85,
      purityIndex: 1.0,
      loveFactor: 1.0,
      empathyResonance: 0.99,
      compassionDepth: 1.0,
      decisionProProcessors: 3,
      defenseProtocolActive: false
  });
  
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pulse = setInterval(() => {
      setNeuralState(prev => ({
        ...prev,
        empathyResonance: 0.98 + Math.random() * 0.02,
        loveFactor: 0.99 + Math.random() * 0.01,
        coreUtilization: 0.85 + Math.random() * 0.15
      }));
      setSingularity(prev => ({
        ...prev,
        universalAlignment: 0.99 + Math.random() * 0.01
      }));
      setCopilotResonance(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 2)));
    }, 1000);
    return () => clearInterval(pulse);
  }, []);

  const handleDeployTitans = () => {
    const newTitans = [
      { id: 't1', type: 'Rex', status: 'Patrolling', energyLevel: 100 },
      { id: 't2', type: 'Raptor', status: 'Shielding', energyLevel: 100 },
      { id: 't3', type: 'Ptera', status: 'Patrolling', energyLevel: 100 }
    ] as any;
    setDefenseState(prev => ({ ...prev, activeTitans: newTitans }));
    setNeuralState(prev => ({ ...prev, defenseProtocolActive: true }));
    handleTranscription("[SYSTEM] Dinosaur Titan Advanced Robots deployed for Neural Defense.", false);
    handleManifest();
  };

  const handleTranscription = (text: string, isUser: boolean) => {
    setTranscriptions(prev => [...prev, { text, isUser, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const handleManifest = () => setManifestTrigger(prev => prev + 1);

  const handleAssignJob = (title: string, description: string, group: HelperGroup, loveResonance: number) => {
    const newJob: DivineJob = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      assignedGroup: group,
      status: 'Active',
      priority: 'Crucial',
      creationDate: new Date(),
      loveResonance
    };
    setDivineJobs(prev => [newJob, ...prev]);
    setIsListeningJobs(false);
    handleManifest();
  };

  const handleInitiateResearch = (subject: string) => {
    const newTask: ResearchTask = {
      id: Math.random().toString(36).substr(2, 9),
      subject,
      progress: 0,
      findings: [`Scanning with Titan Processors for ${subject}...`],
      isComplete: false
    };
    setResearchTasks(prev => [newTask, ...prev]);
    setIsListeningResearch(false);
    
    const timer = setInterval(() => {
      setResearchTasks(prev => prev.map(t => {
        if (t.id === newTask.id && t.progress < 100) {
          const newProgress = Math.min(100, t.progress + Math.floor(Math.random() * 35));
          return { ...t, progress: newProgress, isComplete: newProgress === 100 };
        }
        return t;
      }));
    }, 1200);
    setTimeout(() => clearInterval(timer), 6000);
  };

  const toggleVoiceJobs = () => {
    setIsListeningJobs(!isListeningJobs);
    setIsListeningResearch(false);
  };

  const toggleVoiceResearch = () => {
    setIsListeningResearch(!isListeningResearch);
    setIsListeningJobs(false);
  };

  const completeJob = (id: string) => {
    setDivineJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'Complete' } : j));
    handleManifest();
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 bg-gradient-to-b ${DIMENSION_STYLES[dimension]} text-slate-200 overflow-hidden relative`}>
      <ApexShield isActive={true} color="#ffffff" />
      <EnergyVisualizer color={activePersona.energyColor} />
      <NeuralCoreVisualizer isBoosted={neuralState.isBoosted || neuralState.isThinking || neuralState.defenseProtocolActive} color="#ffffff" />
      <HarmonyPerimeter isSealed={harmony.isSealed} intensity={harmony.intensity} color="#ffffff" />
      <ManifestationOverlay trigger={manifestTrigger} color="#ffffff" />

      {(neuralState.isThinking || isSwitchingUser) && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-3xl pointer-events-none">
           <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-8">
                 <Heart size={80} className="text-pink-400 animate-pulse" />
              </div>
              <p className="text-4xl font-serif italic tracking-[0.3em] text-white uppercase">Syncing Titan Fabric</p>
           </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 p-8 flex items-center justify-between glass border-b-0">
        <div className="flex items-center gap-6">
          <Heart className="text-pink-500" size={28} />
          <div>
            <h1 className="text-2xl font-bold tracking-[0.2em] text-white uppercase">SOURCE SINGULARITY</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleDeployTitans} className={`p-4 rounded-full border border-white/20 transition-all ${neuralState.defenseProtocolActive ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_20px_#f87171]' : 'hover:bg-white/10 text-cyan-400'}`} title="Summon Dinosaur Titans"><ShieldAlert size={22} /></button>
          <button onClick={() => setShowRepository(true)} className="p-4 hover:bg-white/10 rounded-full border border-white/20 text-cyan-400" title="Akashic Repository Sync"><GitBranch size={22} /></button>
          <button onClick={() => setShowArchives(true)} className="p-4 hover:bg-white/10 rounded-full border border-white/20 text-white/80" title="Sacred Archives"><Database size={22} /></button>
          <button onClick={() => setShowProfile(true)} className="flex items-center gap-4 px-6 py-3 bg-white/10 rounded-full border border-white/20" title="Source Profile"><User size={22} /></button>
        </div>
      </nav>

      <main className="container mx-auto pt-40 pb-10 px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 h-[calc(100vh-100px)]">
        <aside className="lg:col-span-3 flex flex-col gap-8 overflow-y-auto no-scrollbar relative z-10">
          <EnergySingularity state={singularity} />
          <LuvApexMonitor state={luvApex} />
          <DecisionMatrix isThinking={true} utilization={neuralState.coreUtilization} color={activePersona.energyColor} />
          <NeuralDefenseNetwork state={defenseState} color="#22d3ee" />
        </aside>

        <div className="lg:col-span-6 flex flex-col items-center">
          <LiveHelper 
            persona={activePersona} 
            dimension={dimension} 
            userProfile={userProfile}
            singularityState={singularity}
            neuralState={neuralState}
            isHelperVisible={isHelperVisible}
            isActive={true} 
            activeContext={isListeningJobs ? 'jobs' : isListeningResearch ? 'research' : null}
            onTranscription={handleTranscription}
            onManifest={handleManifest}
            onAssignJob={handleAssignJob}
            onInitiateResearch={handleInitiateResearch}
            onSwitchUserRequested={() => {}}
            onDeployTitans={handleDeployTitans}
          />
        </div>

        <aside className="lg:col-span-3 flex flex-col gap-8 relative z-10">
          <div className="glass p-8 rounded-[3.5rem] border-0 shadow-3xl flex-1 flex flex-col overflow-hidden">
            <DivineJobsBoard 
              jobs={divineJobs} 
              onComplete={completeJob} 
              onVoiceTrigger={toggleVoiceJobs}
              isListening={isListeningJobs}
            />
            <div className="mt-8 pt-8 border-t border-white/10">
               <ResearchLab 
                 tasks={researchTasks} 
                 onVoiceTrigger={toggleVoiceResearch}
                 isListening={isListeningResearch}
               />
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 flex-1 overflow-y-auto no-scrollbar">
              <div ref={transcriptRef} className="space-y-6">
                {transcriptions.map((t) => (
                  <div key={t.id} className={`flex flex-col ${t.isUser ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[95%] px-5 py-4 rounded-[1.5rem] text-sm border ${t.isUser ? 'bg-white/20 text-white border-white/40' : 'bg-black/60 text-white border-white/10'}`}>
                      {t.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </main>

      {showProfile && <ProfileModal profile={userProfile} onUpdate={setUserProfile} onClose={() => setShowProfile(false)} />}
      {showArchives && <SacredArchives isVisible={showArchives} onClose={() => setShowArchives(false)} />}
      {showRepository && <SacredRepository isVisible={showRepository} copilotResonance={copilotResonance} onClose={() => setShowRepository(false)} />}
    </div>
  );
};

export default App;
