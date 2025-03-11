import { LetterText, LucideTabletSmartphone, ShoppingCartIcon } from "lucide-react";
import { Link, useResolvedPath } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";
import {useProductStore} from "../store/useProductStore";
function Navbar() {
    const {pathname} = useResolvedPath();
    const isHomePage = pathname === "/";
    const {products} = useProductStore();


    return (
            <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-conten/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto">
                    <div className="navbar px-4 min-h-[4rem] justify-between">
                        {/* Logo */}
                        <div className="flex-1 lg:flex-none">
                            <div className="flex items-stretch">
                                <Link to="/" className="hover:opacity-80 transition-opacity">
                                    <div className="flex items-center space-x-2">
                                        <LucideTabletSmartphone className="size-9 text-primary" />
                                        <span className="font-semibold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                            PERODSTORE
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        {/* right section */}
                        <div className="flex items-center gap-4">
                            <ThemeSelector />
                            {isHomePage && (
                                <div className="indicator">
                                    <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                                        <ShoppingCartIcon className="size-5" />
                                        <span className="badge badge-sm badge-primary indicator-item">
                                            {products.length}
                                        </span>

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            );
};

export default Navbar;