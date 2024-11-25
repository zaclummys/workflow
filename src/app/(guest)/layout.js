export default function Layout ({ children }) {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-6">
            {children}

            <div className="flex flex-col items-center gap-2 text-sm text-on-background">
                <div className="flex flex-row gap-1">
                    <span>
                        Created by
                    </span>

                    <a
                        className="font-medium"
                        target="_blank"
                        href="https://www.linkedin.com/in/isaac-luiz-vieira-ferreira/">
                        Isaac Luiz Vieira Ferreira
                    </a>
                </div>

                <a
                    className="font-medium"
                    target="_blank"
                    href="https://www.uff.br">
                    Universidade Federal Fluminense
                </a>
            </div>
        </div>
    );
}