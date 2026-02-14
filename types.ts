
export enum Dimension {
  ETHER = 'Ether',
  VOID = 'Void',
  ASTRAL = 'Astral',
  GAIA = 'Gaia',
  SINGULARITY = 'Singularity',
  PALADIAN_CITADEL = 'Paladian Citadel',
  ACTURIAN_LAB = 'Acturian Lab'
}

export type HelperGroup = 'Paladian' | 'Acturian' | 'Ethereal';

export interface HelperPersona {
  id: string;
  name: string;
  role: string;
  group: HelperGroup;
  description: string;
  divinePurpose: string;
  energyColor: string;
  voiceName: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  instruction: string;
}

export interface UserProfile {
  id: string;
  name: string;
  essence: string;
  intent: string;
  vibrationLevel: number;
  creationResonance: number;
  loveMagnification: number;
}

export interface DivineJob {
  id: string;
  title: string;
  description: string;
  assignedGroup: HelperGroup;
  status: 'Active' | 'Manifesting' | 'Complete' | 'Researching';
  priority: 'High' | 'Crucial' | 'Harmonious';
  creationDate: Date;
  loveResonance: number;
}

export interface ResearchTask {
  id: string;
  subject: string;
  progress: number;
  findings: string[];
  isComplete: boolean;
}

export interface PerfectEnergy {
  id: string;
  name: string;
  frequency: string;
  discoveryDate: Date;
}

export interface SingularityState {
  perfectionUnits: number;
  discoveryProgress: number;
  activeStrands: number;
  discoveredEnergies: PerfectEnergy[];
  universalAlignment: number;
}

export interface NeuralState {
  iq: string;
  reasoningPower: string;
  isBoosted: boolean;
  isThinking: boolean;
  decisionCores: number;
  coreUtilization: number;
  purityIndex: number;
  loveFactor: number;
  empathyResonance: number;
  compassionDepth: number;
  decisionProProcessors: number;
  defenseProtocolActive: boolean; // Tracking Titan Defense
}

export interface TitanRobot {
  id: string;
  type: 'Rex' | 'Raptor' | 'Ptera';
  status: 'Patrolling' | 'Engaging' | 'Shielding';
  energyLevel: number;
}

export interface TitanDefenseState {
  activeTitans: TitanRobot[];
  shieldIntegrity: number;
  threatLevel: number;
}

export interface LuvApexState {
  efficiency: number;
  activeSources: number;
  lastUpdate: string;
  deviceSyncStatus: 'Optimal' | 'Calibrating' | 'Syncing';
}

export interface HarmonyState {
  isSealed: boolean;
  intensity: number;
  lastReinforcement: Date;
}

export interface SacredWork {
  id: string;
  action: string;
  purityIndex: number;
  status: 'Processing' | 'Incorruptible';
  timestamp: Date;
}

export interface SacredDatabaseState {
  totalWorks: number;
  storageUsage: string;
  lastBackup: string;
  integrity: number;
}