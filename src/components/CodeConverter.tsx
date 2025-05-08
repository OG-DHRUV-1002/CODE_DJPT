"use client";

import { useState, useEffect } from 'react';
import { convertCode, type ConvertCodeInput } from '@/ai/flows/code-conversion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { programmingLanguages, type LanguageOption } from '@/lib/languages';
import { ArrowRightLeft, Copy, Loader2, Shuffle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CodeConverter() {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [convertedCode, setConvertedCode] = useState<string>('');
  const [sourceLanguage, setSourceLanguage] = useState<string>(programmingLanguages[0].value);
  const [targetLanguage, setTargetLanguage] = useState<string>(programmingLanguages[1].value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleConvert = async () => {
    if (!sourceCode.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter some code to convert.',
        variant: 'destructive',
      });
      return;
    }
    if (sourceLanguage === targetLanguage) {
      toast({
        title: 'Invalid Selection',
        description: 'Source and target languages must be different.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setConvertedCode(''); // Clear previous output

    try {
      const input: ConvertCodeInput = {
        sourceCode,
        sourceLanguage: programmingLanguages.find(lang => lang.value === sourceLanguage)?.label || sourceLanguage,
        targetLanguage: programmingLanguages.find(lang => lang.value === targetLanguage)?.label || targetLanguage,
      };
      const result = await convertCode(input);
      setConvertedCode(result.convertedCode);
      toast({
        title: 'Conversion Successful',
        description: `Code converted from ${input.sourceLanguage} to ${input.targetLanguage}.`,
      });
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: 'Conversion Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred during conversion.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!convertedCode) return;
    navigator.clipboard.writeText(convertedCode)
      .then(() => {
        toast({ title: 'Copied to clipboard!' });
      })
      .catch(err => {
        toast({ title: 'Failed to copy', description: err.message, variant: 'destructive' });
      });
  };
  
  const handleSwapLanguages = () => {
    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);

    if (sourceCode && convertedCode) {
        const tempCode = sourceCode;
        setSourceCode(convertedCode);
        setConvertedCode(tempCode);
    } else if (convertedCode) { // If only converted code exists, move it to source
        setSourceCode(convertedCode);
        setConvertedCode('');
    }
  };

  // Ensure default languages are valid on mount
  useEffect(() => {
    if (!programmingLanguages.find(lang => lang.value === sourceLanguage)) {
      setSourceLanguage(programmingLanguages[0].value);
    }
    if (!programmingLanguages.find(lang => lang.value === targetLanguage) || targetLanguage === sourceLanguage) {
      setTargetLanguage(programmingLanguages.find(lang => lang.value !== sourceLanguage)?.value || programmingLanguages[1].value);
    }
  }, []);


  return (
    <div className="space-y-6 py-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-primary-foreground">Select your Programming Language For Conversion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-4 p-4 rounded-lg">
            <div className="flex-1 w-full sm:w-auto">
              <Label htmlFor="source-language" className="mb-2 block text-sm font-medium">From</Label>
              <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                <SelectTrigger id="source-language" className="w-full">
                  <SelectValue placeholder="Source Language" />
                </SelectTrigger>
                <SelectContent>
                  {programmingLanguages.map((lang) => (
                    <SelectItem key={`source-${lang.value}`} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col items-center gap-2 mt-4 sm:mt-0 px-4">
              <Button
                onClick={handleConvert}
                disabled={isLoading}
                className="w-full sm:w-auto transition-all duration-150 ease-in-out transform hover:scale-105"
                aria-label="Convert code"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRightLeft className="mr-2 h-5 w-5" />
                )}
                Convert
              </Button>
               <Button
                variant="outline"
                size="icon"
                onClick={handleSwapLanguages}
                disabled={isLoading}
                className="transition-all duration-150 ease-in-out transform hover:scale-105 hover:bg-accent/20"
                aria-label="Swap languages"
              >
                <Shuffle className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 w-full sm:w-auto">
              <Label htmlFor="target-language" className="mb-2 block text-sm font-medium">To</Label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger id="target-language" className="w-full">
                  <SelectValue placeholder="Target Language" />
                </SelectTrigger>
                <SelectContent>
                  {programmingLanguages.map((lang) => (
                    <SelectItem key={`target-${lang.value}`} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-xl flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl text-primary-foreground">Source Code</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <Textarea
              id="source-code"
              placeholder={`Enter ${programmingLanguages.find(l => l.value === sourceLanguage)?.label || 'source'} code here...`}
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              className="min-h-[350px] md:min-h-[400px] flex-grow bg-input text-foreground rounded-md shadow-inner focus:ring-accent focus:border-accent text-sm font-mono"
              disabled={isLoading}
              aria-label="Source code input area"
            />
          </CardContent>
        </Card>

        <Card className="shadow-xl flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-primary-foreground">Converted Code</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              disabled={!convertedCode || isLoading}
              className="text-accent-foreground hover:text-accent transition-colors"
              aria-label="Copy converted code"
            >
              <Copy className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <Textarea
              id="converted-code"
              placeholder={`${programmingLanguages.find(l => l.value === targetLanguage)?.label || 'Converted'} code will appear here...`}
              value={convertedCode}
              readOnly
              className="min-h-[350px] md:min-h-[400px] flex-grow bg-input text-foreground rounded-md shadow-inner focus:ring-accent focus:border-accent text-sm font-mono"
              disabled={isLoading}
              aria-label="Converted code output area"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

