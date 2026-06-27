const Footer: React.FC = () => (
    <div className="mt-3 flex items-center justify-between border-t border-slate-100 px-1 pb-0.5 pt-2.5">
        <span className="text-[11px] text-slate-400">Auto-saved 8s ago</span>
        <div className="flex items-center gap-1.5">
            <img
                src="https://i.pravatar.cc/64?img=12"
                alt="Dr. Khan avatar"
                className="h-5 w-5 rounded-full object-cover"
            />
            <span className="text-[11px] font-medium text-slate-700">Dr. Khan</span>
        </div>
    </div>
);
export default Footer;
