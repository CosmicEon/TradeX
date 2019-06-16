import { League } from './League';
import { Sport } from './Sport';

export class Event {
  public id: number;
  public name: string;
  public date: string;
  public homeTeamScore: number;
  public awayTeamScore: number;
  public homeTeamOdds: number;
  public awayTeamOdds: number;
  public drawOdds: number;
  public league: League;
  public sport: Sport;
}