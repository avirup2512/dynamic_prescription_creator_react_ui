const Footer: React.FC = () => (
    <div className="flex items-center justify-between border-t border-slate-100 px-1 pt-4 pb-1">
        <span className="text-sm text-slate-400">Auto-saved 8s ago</span>
        <div className="flex items-center gap-2">
            <img
                src="https://i.pravatar.cc/64?img=12"
                alt="Dr. Khan avatar"
                className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-slate-700">Dr. Khan</span>
        </div>
    </div>
);
export default Footer;