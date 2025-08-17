'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { improveResumeContent } from '@/ai/flows/improve-resume-content';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DiffEditor } from '@monaco-editor/react';
import type { ResumeData } from '@/lib/types';
import { Badge } from './ui/badge';

type FieldName = keyof ResumeData | `experience.${number}.description`;

type ImproveButtonProps = {
  fieldName: FieldName;
};

export function ImproveButton({ fieldName }: ImproveButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [improvedContent, setImprovedContent] = useState('');
  const { getValues, setValue } = useFormContext<ResumeData>();
  const originalContent = getValues(fieldName) as string;
  const { toast } = useToast();

  const handleImprove = async () => {
    setIsLoading(true);
    try {
      const result = await improveResumeContent({ resumeContent: originalContent });
      setImprovedContent(result.improvedContent);
    } catch (error) {
      console.error('Failed to improve content:', error);
      toast({
        variant: 'destructive',
        title: 'AI Assistant Error',
        description: 'Could not improve the content. Please try again.',
      });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    setValue(fieldName, improvedContent, { shouldDirty: true, shouldValidate: true });
    setIsOpen(false);
  };

  const handleOpen = () => {
    if (!originalContent) {
        toast({
            variant: 'destructive',
            title: 'Content is empty',
            description: 'Please write some content before using the AI assistant.',
        });
        return;
    }
    setIsOpen(true);
    handleImprove();
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute bottom-2 right-2 h-7 w-7 text-accent"
        onClick={handleOpen}
        title="Improve with AI"
      >
        <Sparkles className="h-4 w-4" />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Improve Content with AI</DialogTitle>
            <DialogDescription>
              Review the suggestions below. You can edit the improved content before accepting.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <div className="flex-grow flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
             <div className="flex-grow flex flex-col">
                <Badge variant="secondary" className="mb-2 w-fit">Suggested Changes</Badge>
                <DiffEditor
                    original={originalContent}
                    modified={improvedContent}
                    language="markdown"
                    theme="vs-dark"
                    options={{
                        readOnly: false,
                        renderSideBySide: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                    }}
                    onMount={(editor) => {
                        editor.onDidUpdateDiff(() => {
                            setImprovedContent(editor.getModel()?.modified.getValue() || '');
                        });
                    }}
                />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleAccept} disabled={isLoading}>Accept Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
