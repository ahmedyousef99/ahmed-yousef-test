import { DropDownLocation } from './drop-down-location.model';
export interface Details {
  workItem: string;
  description: string;
  location: DropDownLocation;
  progress: number;
}
