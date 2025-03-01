// Global type declarations

// Fix JSX element errors
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Declare modules that are missing type definitions
declare module 'framer-motion' {
  import * as React from 'react';
  
  export interface MotionProps {
    initial?: any;
    animate?: any;
    transition?: any;
    className?: string;
    key?: React.Key;
    [key: string]: any;
  }
  
  export const motion: {
    div: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLDivElement>>;
    [key: string]: any;
  };
}

declare module 'lucide-react' {
  import * as React from 'react';
  
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    stroke?: string | number;
  }
  
  export type Icon = React.FC<IconProps>;
  
  export const Globe: Icon;
  export const User: Icon;
  export const Building: Icon;
  export const FileText: Icon;
  export const Mail: Icon;
  export const Phone: Icon;
  export const Plus: Icon;
  export const Trash2: Icon;
  export const Wallet: Icon;
  export const AtSign: Icon;
  export const Hash: Icon;
  export const AlertCircle: Icon;
  export const Info: Icon;
  export const Palette: Icon;
  export const BarChart: Icon;
  export const ChevronDown: Icon;
} 