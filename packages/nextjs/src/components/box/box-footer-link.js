import Link from 'next/link';

export default function BoxFooterLink ({ href, children }) {
    return (
        <Link href={href} className="text-primary">
            {children}
        </Link>
    );
}
