
'use client';

// ImproveButton provides an AI-powered button for improving resume field content.
// Opens a dialog, calls the AI service, and updates the field with improved text.
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { improveResumeContent } from '@/ai/flows/improve-resume-content';
import { Wand2, Loader2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

// Supported field names for improvement.
type FieldName = 'name' | 'email' | 'phone' | 'summary' | `experience.${number}.title` | `experience.${number}.company` | `experience.${number}.description` | `customSections.${number}.description`;

// Props for ImproveButton component.
type ImproveButtonProps = {
  fieldName: FieldName;
};

/**
 * Button for AI-powered improvement of resume field content.
 * Opens dialog, calls AI, and updates field value.
 */
export function ImproveButton({ fieldName }: ImproveButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [improvedText, setImprovedText] = useState('');
  const [originalText, setOriginalText] = useState('');
  
  const { setValue, getValues } = useFormContext();

  // Calls AI service to improve the field content.
  const handleImprove = async () => {
    setIsLoading(true);
    try {
      const currentValue = getValues(fieldName) || '';
      setOriginalText(currentValue);
      
      // Call AI service to improve the text
      const improved = await improveResumeContent({ 
        resumeContent: currentValue
      });
      
      setImprovedText(improved.improvedContent);
    } catch (error) {
      console.error('Error improving content:', error);
      setImprovedText('Error: Could not improve content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const applyImprovement = () => {
    setValue(fieldName, improvedText);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 p-1 h-8 w-8"
          onClick={() => {
            setIsOpen(true);
            handleImprove();
          }}
        >
          <Wand2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>AI Content Improvement</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Improving content...</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Original</h3>
                <Textarea
                  value={originalText}
                  readOnly
                  className="min-h-[200px] resize-none"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Improved</h3>
                <Textarea
                  value={improvedText}
                  onChange={(e) => setImprovedText(e.target.value)}
                  className="min-h-[200px]"
                />
              </CardContent>
            </Card>
          </div>
        )}
        
        {!isLoading && improvedText && (
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={applyImprovement}>
              Apply Improvement
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
