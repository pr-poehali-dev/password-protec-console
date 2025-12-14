import { useState, useEffect, useCallback, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from '@/components/ui/alert-dialog';

const INITIAL_PASSWORD = '92938832984';
const END_PASSWORD = 'NULLEND12';

export default function Index() {
  const [stage, setStage] = useState<'login' | 'console' | 'protocol' | 'off'>('login');
  const [inputValue, setInputValue] = useState('');
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [showTracking, setShowTracking] = useState(false);
  const [userName] = useState(`USER_${Math.floor(Math.random() * 9999)}`);
  const [currentTime, setCurrentTime] = useState('');
  const consoleEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLines]);

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
        'Type HELP for more information...',
        '',
      ]);
      setStage('console');
      setInputValue('');
    } else {
      setConsoleLines(['> ACCESS DENIED', '> INVALID PASSWORD']);
      setTimeout(() => setConsoleLines([]), 2000);
    }
  }, [inputValue]);

  const handleConsoleCommand = useCallback(() => {
    const command = inputValue.toUpperCase().trim();
    setCommandHistory(prev => [...prev, inputValue]);

    if (command === 'END') {
      setConsoleLines(prev => [
        ...prev,
        `> ${inputValue}`,
        '',
        '> TERMINATION PROTOCOL INITIATED',
        '> ENTER AUTHORIZATION CODE:',
      ]);
      setStage('protocol');
      setInputValue('');
      return;
    }

    if (command === 'HELP') {
      setConsoleLines(prev => [
        ...prev,
        `> ${inputValue}`,
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'AVAILABLE COMMANDS:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        'HELP     - Display this help message',
        'INFO     - Show object detailed information',
        'KILL     - Terminate object [RESTRICTED]',
        'LOG      - Display command history',
        'NULL     - No operation',
        'OFF      - Power down console',
        'END      - Terminate session',
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
      ]);
      setInputValue('');
      return;
    }

    if (command === 'INFO') {
      setConsoleLines(prev => [
        ...prev,
        `> ${inputValue}`,
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'OBJECT 12 - DETAILED INFORMATION',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        'START DATE: 2022',
        'PARENT COMPANY: NULLDATE (subsidiary)',
        'LOCATION: ~RUSSIA (approximate)',
        'PRIMARY OBJECTIVE: ELIMINATE',
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
      ]);
      setInputValue('');
      return;
    }

    if (command === 'KILL') {
      setConsoleLines(prev => [
        ...prev,
        `> ${inputValue}`,
        '',
        '⚠️  ACCESS DENIED',
        '⚠️  YOU DO NOT HAVE PERMISSION',
        '',
        'Required clearance level: ALPHA-9',
        'Your clearance level: BETA-3',
        '',
      ]);
      setInputValue('');
      return;
    }

    if (command === 'LOG') {
      setConsoleLines(prev => [
        ...prev,
        `> ${inputValue}`,
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'COMMAND HISTORY:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        ...commandHistory.map((cmd, i) => `${i + 1}. ${cmd}`),
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
      ]);
      setInputValue('');
      return;
    }

    if (command === 'NULL') {
      setConsoleLines(prev => [
        ...prev,
        `> ${inputValue}`,
        '',
      ]);
      setInputValue('');
      return;
    }

    if (command === 'OFF') {
      setConsoleLines(prev => [
        ...prev,
        `> ${inputValue}`,
        '',
        'POWERING DOWN CONSOLE...',
        'DISCONNECTING FROM MAINFRAME...',
        'SESSION TERMINATED',
        '',
      ]);
      setInputValue('');
      setTimeout(() => {
        setStage('off');
      }, 2000);
      return;
    }

    setConsoleLines(prev => [
      ...prev,
      `> ${inputValue}`,
      '> UNKNOWN COMMAND',
      '> Type HELP for available commands',
      '',
    ]);
    setInputValue('');
  }, [inputValue, commandHistory]);

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

  if (stage === 'off') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-[#00FF00] text-center opacity-20 font-mono">
          <div className="text-4xl mb-4">█</div>
          <div className="text-sm">SYSTEM OFFLINE</div>
        </div>
      </div>
    );
  }

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
      <div className="min-h-screen bg-black text-[#00FF00] p-4 md:p-8 font-mono overflow-auto">
        <div className="max-w-4xl mx-auto pb-20">
          <div className="mb-4 flex justify-between items-center text-xs opacity-70 sticky top-0 bg-black z-10 py-2">
            <span>TERMINAL v2.4.1</span>
            <span>{currentTime}</span>
          </div>

          <div className="space-y-1 mb-8">
            {consoleLines.map((line, i) => (
              <div key={i} className={`text-xs md:text-sm ${line.includes('━') ? 'text-[#00FF00]' : line.includes('⚠️') ? 'text-red-500 font-bold' : ''} break-words`}>
                {line}
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 sticky bottom-4 bg-black py-2">
            <span className="text-[#00FF00]">&gt;</span>
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-black border-none text-[#00FF00] font-mono focus:ring-0 focus:outline-none p-0 text-xs md:text-sm"
              autoFocus
              autoComplete="off"
            />
            <span className="inline-block w-2 h-5 bg-[#00FF00] animate-blink" />
          </form>
        </div>
      </div>

      <AlertDialog open={showTracking} onOpenChange={setShowTracking}>
        <AlertDialogContent className="bg-black border-[#00FF00] text-[#00FF00] font-mono max-w-sm md:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg md:text-xl tracking-wider">⚠️ TRACKING ALERT</AlertDialogTitle>
            <AlertDialogDescription className="text-[#00FF00] space-y-2">
              <div className="text-xs md:text-sm">━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
              <div className="text-sm md:text-base font-bold">{userName} IS BEING MONITORED</div>
              <div className="text-xs md:text-sm">━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
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
