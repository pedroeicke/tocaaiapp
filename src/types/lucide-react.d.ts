declare module 'lucide-react' {
    import * as React from 'react';

    export interface LucideProps extends React.SVGProps<SVGSVGElement> {
        color?: string;
        size?: string | number;
        strokeWidth?: string | number;
        absoluteStrokeWidth?: boolean;
    }

    export type LucideIcon = React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >;

    export const Instagram: LucideIcon;
    export const Phone: LucideIcon;
    export const Music2: LucideIcon;
    export const Zap: LucideIcon;
    export const UserCircle2: LucideIcon;
    export const Radio: LucideIcon;
    export const Heart: LucideIcon;
    export const Menu: LucideIcon;
    export const X: LucideIcon;
    export const Search: LucideIcon;
    export const LogIn: LucideIcon;
    export const User: LucideIcon;
    export const Plus: LucideIcon;
    export const Upload: LucideIcon;
    export const Building2: LucideIcon;
    export const DollarSign: LucideIcon;
    export const Settings: LucideIcon;
    export const ShieldCheck: LucideIcon;
    export const CheckCircle2: LucideIcon;
    export const XCircle: LucideIcon;
    export const Users: LucideIcon;
}

