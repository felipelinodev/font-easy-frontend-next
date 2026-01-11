
type ModalProps = {
    action: () => void;
    title: string;
    message: string;
}


export function Modal({ action, title, message }: ModalProps) {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-xs">
            <div className="rounded-2xl bg-gray-surface border-2 shadow-xl border-white">
                <h1>{title}</h1>
                <p>{message}</p>
            </div>
        </div>
    )
}