import { useNavigate } from "react-router-dom";

import ParentWrapperContent from "./ParentWrapperContent";

const MainInputDialogContainer = function () {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    };

    return (
        <div className="fixed inset-0 z-[400] overflow-y-auto bg-slate-950/55 p-3 backdrop-blur-[2px]">
            <div className="flex min-h-full items-center justify-center">
                <div className="w-full max-w-[1180px] overflow-hidden rounded-lg border border-white/20 bg-background shadow-2xl ring-1 ring-black/10">
                    <ParentWrapperContent onClose={handleClose} />
                </div>
            </div>
        </div>
    )
}

export default MainInputDialogContainer;
