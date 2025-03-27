import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { toast } from "sonner";
import { VapiService } from '@/utils/vapiService';

interface VapiButtonProps {
  apiKey: string;
  assistantId: string;
  buttonText?: string;
  className?: string;
}

const VapiButton = ({
  apiKey,
  assistantId,
  buttonText = "Talk to sales team",
  className = ""
}: VapiButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const vapiService = VapiService.getInstance();
    
    vapiService.initializeVapi({
      apiKey,
      assistant: assistantId,
      config: {}
    }).then(() => {
      setIsInitialized(true);
    }).catch(error => {
      console.error('Failed to initialize Vapi:', error);
      toast.error('Failed to initialize voice assistant');
    });
  }, [apiKey, assistantId]);

  const toggleCall = () => {
    if (!isInitialized) {
      toast.error('Voice assistant is still initializing. Please try again in a moment.');
      return;
    }

    const vapiService = VapiService.getInstance();
    
    if (isActive) {
      vapiService.endCall();
      setIsActive(false);
      toast.info('Call ended');
    } else {
      vapiService.startCall();
      setIsActive(true);
      toast.success('Connected to sales team');
    }
  };

  return null; // Removed the button element
};

export default VapiButton;
