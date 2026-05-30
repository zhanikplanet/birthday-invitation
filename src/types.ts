export interface RSVPResponse {
  id: string;
  name: string;
  attending: string; // "Әрине, келемін" | "Жұбайыммен келемін" | "Өкінішке орай, келе алмаймын"
  wishing?: string;
  createdAt: string;
}

export type RelationType = 
  | "Баласы/Қызы" 
  | "Немересі" 
  | "Бауыры/Сіңлісі" 
  | "Досы" 
  | "Әріптесі" 
  | "Жақын туысы";
