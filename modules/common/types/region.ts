export interface IRegionParent {
  id: number;
  name: string;
  soato: string;
  level: number;
  parent: IRegionParent | null;
}

export interface IRegion {
  id: number;
  name: string;
  soato: string;
  level: number;
  parent: IRegionParent | null;
}
