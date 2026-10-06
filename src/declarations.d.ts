declare module 'lucide-react' {
  import React from 'react';

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }

  export type LucideIcon = React.FC<LucideProps>;

  export const Search: LucideIcon;
  export const ShoppingCart: LucideIcon;
  export const MapPin: LucideIcon;
  export const User: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Sparkle: LucideIcon;
  export const Package: LucideIcon;
  export const PackageSearch: LucideIcon;
  export const X: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Menu: LucideIcon;
  export const Zap: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const Clock: LucideIcon;
  export const Eye: LucideIcon;
  export const Filter: LucideIcon;
  export const Check: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Heart: LucideIcon;
  export const Layers: LucideIcon;
  export const Truck: LucideIcon;
  export const LayoutGrid: LucideIcon;
  export const List: LucideIcon;
  export const SlidersHorizontal: LucideIcon;
  export const Sliders: LucideIcon;
  export const Star: LucideIcon;
  export const Lock: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const UserCheck: LucideIcon;
  export const ThumbsUp: LucideIcon;
  export const ThumbsDown: LucideIcon;
  export const Trash2: LucideIcon;
  export const Plus: LucideIcon;
  export const Minus: LucideIcon;
  export const CreditCard: LucideIcon;
  export const ShoppingBag: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Ban: LucideIcon;
  export const Globe: LucideIcon;
  export const DollarSign: LucideIcon;
  export const Share2: LucideIcon;
  export const Tag: LucideIcon;
  export const Headphones: LucideIcon;
  export const Laptop: LucideIcon;
  export const Gamepad2: LucideIcon;
  export const Home: LucideIcon;
  export const Flame: LucideIcon;
  export const Command: LucideIcon;
  export const Activity: LucideIcon;
  export const Sun: LucideIcon;
  export const Moon: LucideIcon;
  export const Volume2: LucideIcon;
  export const VolumeX: LucideIcon;
  export const BarChart2: LucideIcon;
}
