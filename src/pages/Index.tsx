import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from '@/components/ui/alert-dialog';

const INITIAL_PASSWORD = '92938832984';
const END_PASSWORD = 'NULLEND12';

export default function Index() {
  const [stage, setStage] = useState<'login' | 'console' | 'protocol'>('login');
  const [inputValue, setInputValue] = useState('');
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [showTracking, setShowTracking] = useState(false);
  const [userName] = useState(`USER_${Math.floor(Math.random() * 9999)}`);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (stage === 'console') {
      const timer = setTimeout(() => {
        setShowTracking(true);
      }, 60000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleLogin = useCallback(() => {
    if (inputValue === INITIAL_PASSWORD) {
      setConsoleLines([
        '> ACCESS GRANTED',
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'OBJECT 12 - MONITORING DASHBOARD',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        'STATUS: IN PROGRESS',
        'END DATE: 01.01.26',
        'REASON: [REDACTED]',
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        'Type END to terminate session...',
      ]);
      setStage('console');
      setInputValue('');
    } else {
      setConsoleLines(['> ACCESS DENIED', '> INVALID PASSWORD']);
      setTimeout(() => setConsoleLines([]), 2000);
    }
  }, [inputValue]);

  const handleConsoleCommand = useCallback(() => {
    if (inputValue.toUpperCase() === 'END') {
      setConsoleLines(prev => [
        ...prev,
        `> ${inputValue}`,
        '',
        '> TERMINATION PROTOCOL INITIATED',
        '> ENTER AUTHORIZATION CODE:',
      ]);
      setStage('protocol');
      setInputValue('');
    } else {
      setConsoleLines(prev => [
        ...prev,
        `> ${inputValue}`,
        '> UNKNOWN COMMAND',
      ]);
      setInputValue('');
    }
  }, [inputValue]);

  const handleProtocol = useCallback(() => {
    if (inputValue === END_PASSWORD) {
      setConsoleLines(prev => [
        ...prev,
        `> ${inputValue}`,
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '⚠️  INTRUDER DETECTED',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        'APPLYING SECURITY PROTOCOL...',
        'LOCKDOWN INITIATED',
        'ALERT SENT TO SECURITY TEAM',
        '',
        'CONNECTION TERMINATED',
      ]);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else {
      setConsoleLines(prev => [
        ...prev,
        `> ${inputValue}`,
        '> INVALID CODE',
        '> ACCESS DENIED',
      ]);
      setInputValue('');
    }
  }, [inputValue]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (stage === 'login') {
      handleLogin();
    } else if (stage === 'console') {
      handleConsoleCommand();
    } else if (stage === 'protocol') {
      handleProtocol();
    }
  }, [stage, handleLogin, handleConsoleCommand, handleProtocol]);

  if (stage === 'login') {
    return (
      <div className="min-h-screen bg-black text-[#00FF00] flex items-center justify-center p-4 font-mono">
        <Card className="w-full max-w-md bg-black border-[#00FF00] p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-xs opacity-70">{currentTime}</div>
              <h1 className="text-2xl font-bold tracking-wider">SECURE ACCESS TERMINAL</h1>
              <div className="h-px bg-[#00FF00] my-4" />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm tracking-wide">ENTER PASSWORD:</label>
                <Input
                  type="password"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="bg-black border-[#00FF00] text-[#00FF00] font-mono focus:ring-[#00FF00]"
                  autoFocus
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-[#00FF00] text-black hover:bg-[#00DD00] font-bold tracking-wider"
              >
                AUTHENTICATE
              </Button>
            </form>

            {consoleLines.length > 0 && (
              <div className="mt-4 space-y-1 animate-pulse">
                {consoleLines.map((line, i) => (
                  <div key={i} className="text-sm text-red-500">{line}</div>
                ))}
              </div>
            )}

            <div className="text-xs opacity-50 text-center pt-4">
              <span className="inline-block w-2 h-4 bg-[#00FF00] animate-blink" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-black text-[#00FF00] p-8 font-mono">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 flex justify-between items-center text-xs opacity-70">
            <span>TERMINAL v2.4.1</span>
            <span>{currentTime}</span>
          </div>

          <div className="space-y-1 mb-8">
            {consoleLines.map((line, i) => (
              <div key={i} className={`text-sm ${line.includes('━') ? 'text-[#00FF00]' : line.includes('⚠️') ? 'text-red-500 font-bold' : ''}`}>
                {line}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-[#00FF00]">&gt;</span>
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-black border-none text-[#00FF00] font-mono focus:ring-0 focus:outline-none p-0"
              autoFocus
              autoComplete="off"
            />
            <span className="inline-block w-2 h-5 bg-[#00FF00] animate-blink" />
          </form>
        </div>
      </div>

      <AlertDialog open={showTracking} onOpenChange={setShowTracking}>
        <AlertDialogContent className="bg-black border-[#00FF00] text-[#00FF00] font-mono">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl tracking-wider">⚠️ TRACKING ALERT</AlertDialogTitle>
            <AlertDialogDescription className="text-[#00FF00] space-y-2">
              <div className="text-sm">━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
              <div className="text-base font-bold">{userName} IS BEING MONITORED</div>
              <div className="text-sm">━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
              <div className="text-xs opacity-70 pt-2">All activities are being logged and analyzed.</div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-[#00FF00] text-black hover:bg-[#00DD00] font-bold">
            DISMISS
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
