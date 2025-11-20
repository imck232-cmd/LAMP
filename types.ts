export interface SimulationState {
  voltage: number;
  resistance: number;
}

export interface CalculationResult {
  current: number; // Amperes
  power: number;   // Watts
}

export enum LightStatus {
  OFF = "Off",
  DIM = "Dim",
  MODERATE = "Moderate",
  BRIGHT = "Bright",
  BLINDING = "Maximum"
}