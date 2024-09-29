import Link from 'next/link';

import { ArrowLeftIcon } from "lucide-react";

export default function GoBack ({ url }) {
    return (
        <Link
            title="Go back"
            href={url}
        >
            <ArrowLeftIcon className="w-6 h-6" />
        </Link>
    );
}