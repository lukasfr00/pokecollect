export interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  level: number;
  xp: Map<string, string>;
}
