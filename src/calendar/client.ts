export interface Block {
  startTime: Date;
  availableUsers: string[];
}

export interface Calendar {
  blocks: Block[];
}

export interface Time {
  hour: number;
  minutes: number;
}

// TODO: Fill this in with methods
const client = {
  // stub
};

export default client;
