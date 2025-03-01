declare module 'react' {
  export = React;
  export as namespace React;
  namespace React {
    type ReactNode = any;
    type ElementType = any;
    interface SVGProps<T> {
      [key: string]: any;
    }
    interface HTMLAttributes<T> {
      [key: string]: any;
    }
    interface FC<P = {}> {
      (props: P): ReactNode;
    }
    interface ForwardRefExoticComponent<P = {}> {
      (props: P): ReactNode;
    }
    interface ChangeEvent<T> {
      target: T;
    }
    interface Key {}
  }
}

declare module 'framer-motion' {
  export const motion: any;
}

declare module 'lucide-react' {
  const Globe: any;
  const User: any;
  const Building: any;
  const FileText: any;
  const Mail: any;
  const Phone: any;
  const Plus: any;
  const Trash2: any;
  const Wallet: any;
  const AtSign: any;
  const Hash: any;
  const AlertCircle: any;
  const Info: any;
  const Palette: any;
  const BarChart: any;
  const ChevronDown: any;
  export {
    Globe,
    User,
    Building,
    FileText,
    Mail,
    Phone,
    Plus,
    Trash2,
    Wallet,
    AtSign,
    Hash,
    AlertCircle,
    Info,
    Palette,
    BarChart,
    ChevronDown
  };
} 