import {Departement} from './Departement';

export interface Employee{
  id: number;
  name: string;
  email: string;
  jobTitle: string;
  phone: string;
  imageUrl: string;
  employeeCode: string;
  //departement_id: string;
  departement : Departement;
}
