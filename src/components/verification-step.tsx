
'use client';

import { useState } from 'react';
import type { ResumeData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, Edit, X } from 'lucide-react';

interface VerificationStepProps {
  parsedData: ResumeData;
  onComplete: (data: ResumeData) => void;
  onCancel: () => void;
  fileName: string | null;
}

export function VerificationStep({ parsedData, onComplete, onCancel, fileName }: VerificationStepProps) {
  const [editableData, setEditableData] = useState<ResumeData>(parsedData);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const handleInputChange = (section: keyof ResumeData, value: any, index?: number) => {
    if (index !== undefined && Array.isArray(editableData[section])) {
      const sectionArray = [...(editableData[section] as any[])];
      sectionArray[index] = { ...sectionArray[index], ...value };
      setEditableData({ ...editableData, [section]: sectionArray });
    } else if (section === 'skills') {
        setEditableData({ ...editableData, skills: value.split(',').map((s: string) => ({ name: s.trim() })) });
    }
     else {
      setEditableData({ ...editableData, [section]: value });
    }
  };
  
  const renderField = (label: string, value: string, onSave: () => void, children: React.ReactNode) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-semibold text-muted-foreground">{label}</h4>
        {isEditing === label.toLowerCase() ? (
          <Button variant="ghost" size="icon" onClick={onSave}><Check className="h-4 w-4 text-green-500" /></Button>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(label.toLowerCase())}><Edit className="h-4 w-4" /></Button>
        )}
      </div>
      {isEditing === label.toLowerCase() ? children : <p className="text-sm p-2 rounded-md bg-muted/30">{value || 'Not found'}</p>}
    </div>
  );
  
  return (
    <div className="container mx-auto py-12 px-4 animate-fade-in-up">
      <Card className="max-w-4xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Verify Your Information</CardTitle>
          <CardDescription>
            We've parsed your resume, "{fileName}". Please review the information below and make any necessary corrections before we build your resume.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Personal Details */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 border-b pb-2">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField("Name", editableData.name, () => setIsEditing(null), 
                <Input value={editableData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
              )}
              {renderField("Email", editableData.email, () => setIsEditing(null), 
                <Input value={editableData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
              )}
              {renderField("Phone", editableData.phone, () => setIsEditing(null), 
                <Input value={editableData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
              )}
            </div>
          </div>
          
          {/* Summary */}
           <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 border-b pb-2">Summary</h3>
             {renderField("Summary", editableData.summary, () => setIsEditing(null), 
                <Textarea value={editableData.summary} onChange={(e) => handleInputChange('summary', e.target.value)} rows={5}/>
              )}
          </div>
          
          {/* Experience */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 border-b pb-2">Experience</h3>
            {editableData.experience.map((exp, index) => (
              <div key={index} className="p-4 border rounded-lg mb-4 bg-muted/20">
                 {renderField(`Job ${index + 1}: Title`, exp.title, () => setIsEditing(null), 
                    <Input value={exp.title} onChange={(e) => handleInputChange('experience', { title: e.target.value }, index)} />
                  )}
                 {renderField(`Job ${index + 1}: Company`, exp.company, () => setIsEditing(null), 
                    <Input value={exp.company} onChange={(e) => handleInputChange('experience', { company: e.target.value }, index)} />
                  )}
                 {renderField(`Job ${index + 1}: Dates`, exp.dates, () => setIsEditing(null), 
                    <Input value={exp.dates} onChange={(e) => handleInputChange('experience', { dates: e.target.value }, index)} />
                  )}
                 {renderField(`Job ${index + 1}: Description`, exp.description, () => setIsEditing(null), 
                    <Textarea value={exp.description} onChange={(e) => handleInputChange('experience', { description: e.target.value }, index)} rows={4}/>
                  )}
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 border-b pb-2">Education</h3>
            {editableData.education?.map((edu, index) => (
              <div key={index} className="p-4 border rounded-lg mb-4 bg-muted/20">
                 {renderField(`Education ${index + 1}: Institution`, edu.institution, () => setIsEditing(null), 
                    <Input value={edu.institution} onChange={(e) => handleInputChange('education', { institution: e.target.value }, index)} />
                  )}
                 {renderField(`Education ${index + 1}: Degree`, edu.degree, () => setIsEditing(null), 
                    <Input value={edu.degree} onChange={(e) => handleInputChange('education', { degree: e.target.value }, index)} />
                  )}
                 {renderField(`Education ${index + 1}: Dates`, edu.dates, () => setIsEditing(null), 
                    <Input value={edu.dates} onChange={(e) => handleInputChange('education', { dates: e.target.value }, index)} />
                  )}
                 {renderField(`Education ${index + 1}: Description`, edu.description || '', () => setIsEditing(null), 
                    <Input value={edu.description} onChange={(e) => handleInputChange('education', { description: e.target.value }, index)} />
                  )}
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 border-b pb-2">Skills</h3>
             {renderField("Skills", editableData.skills.map(s => s.name).join(', '), () => setIsEditing(null), 
                <Input value={editableData.skills.map(s => s.name).join(', ')} onChange={(e) => handleInputChange('skills', e.target.value)} />
              )}
          </div>
          
          <div className="flex justify-end gap-4 mt-8">
            <Button variant="outline" onClick={onCancel}>
                <X className="mr-2" />
                Cancel & Start Over
            </Button>
            <Button size="lg" onClick={() => onComplete(editableData)}>
                <Check className="mr-2" />
                Confirm & Build Resume
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
