import {
    Inter, 
} from "next/font/google";

import "~/globals.css";

const inter = Inter({
    subsets: ["latin"], 
});

export const metadata = {
    title: "Easy Flow - Create algorithms without code",
    description: "Create headless workflows without touch any code.",
};

export default function Layout ({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
