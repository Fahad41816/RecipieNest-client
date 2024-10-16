/* eslint-disable prettier/prettier */
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface TLogin{
  email: string;
  password: string;
} 

export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string; 
  image: string;    
}