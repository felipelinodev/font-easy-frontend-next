import { Check, ScanSearch, Search, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

type activeToolType = 'search' | 'search Image' | null;

type DropDownContextMenuProps = {
    setIsOpen: (isOpen: boolean) => void;
    setActiveTool: (activeTool: activeToolType) => void
    activeTool: activeToolType;
}


export function DropDownContextMenu({ setIsOpen, setActiveTool, activeTool }: DropDownContextMenuProps) {

    const router = useRouter()

    const handleSearchImage = () => {
        setIsOpen(false)
        //router.push('/search-image')
    }

    const handleSearch = () => {
        if (activeTool === 'search') {
            setActiveTool(null)
        } else {
            setActiveTool('search')
        }

        setIsOpen(false)
    }

    return (
        <div className="absolute  bottom-10 left-0 z-20 w-full min-w-60 rounded-2xl bg-gray-surface border-2 shadow-xl border-white p-2">
            <p className="py-3 ml-4 text-sm flex text-black-default border-t-rounded-2xl border-b border-b-gray-escure">
                Ferramentas
            </p>
            <button
                onClick={handleSearch}
                className="flex items-center justify-between rounded-sm  w-full px-4 py-2 text-sm text-black-default hover:bg-gray-muted-primary/75 cursor-pointer transition-colors"
            >
                <div className="flex gap-2 items-center">
                    <Search size={18} /> Search
                </div>
                {activeTool === 'search' ? <Check size={18} /> : ''}
            </button>
            <button
                onClick={handleSearchImage}
                className="flex rounded-sm items-center gap-2 w-full px-4 py-2 hover:bg-gray-muted-primary/75 text-sm text-black-default cursor-pointer transition-colors"
            >
                <ScanSearch size={18} />
                <span className="flex items-center gap-2">
                    Search Image
                    <span className="rounded-full bg-gray-escure text-xs px-2 py-0.5 whitespace-nowrap">
                        Em Breve
                    </span>
                </span>
            </button>
        </div>
    );
}
