import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
function Footer()
{
    const navigate = useNavigate();
    return (
    <footer className="sticky bottom-0 z-10 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center px-6 py-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
    </footer>
    )
}
export default Footer;