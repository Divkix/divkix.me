// Types for FAQ schema
export interface FAQ {
  q: string;
  a: string;
}

// Types for HowTo schema
interface HowToStep {
  name: string;
  text: string;
}

export interface HowTo {
  name: string;
  totalTime: string;
  steps: HowToStep[];
}
