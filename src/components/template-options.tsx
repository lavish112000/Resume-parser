'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Template, StyleOptions } from '@/lib/types';
import { Input } from './ui/input';

type TemplateOptionsProps = {
  template: Template;
  setTemplate: (template: Template) => void;
  styleOptions: StyleOptions;
  setStyleOptions: (options: StyleOptions) => void;
};

const colors = [
  { name: 'Blue', value: '#5DADE2' },
  { name: 'Green', value: '#48C9B0' },
  { name: 'Gray', value: '#839192' },
  { name: 'Purple', value: '#A569BD' },
  { name: 'Orange', value: '#E59866' },
];

const fonts = ['Inter', 'Roboto', 'Lato', 'Merriweather', 'Georgia'];
const fontSizes = ['10pt', '10.5pt', '11pt', '11.5pt', '12pt'];
const margins = ['1.25cm', '1.5cm', '1.75cm', '2cm', '2.25cm'];

export function TemplateOptions({
  template,
  setTemplate,
  styleOptions,
  setStyleOptions,
}: TemplateOptionsProps) {
  const handleStyleChange = (key: keyof StyleOptions, value: string) => {
    setStyleOptions({ ...styleOptions, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Design Options</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label>Template</Label>
          <Select value={template} onValueChange={(value: Template) => setTemplate(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="ats">ATS Friendly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Color</Label>
           <div className="flex items-center gap-2">
             <div className="flex-grow">
                <Select value={styleOptions.color} onValueChange={(v) => handleStyleChange('color', v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                        {colors.map(c => <SelectItem key={c.value} value={c.value}>{c.name}</SelectItem>)}
                    </SelectContent>
                </Select>
             </div>
             <Input type="color" value={styleOptions.color} onChange={(e) => handleStyleChange('color', e.target.value)} className="w-10 h-10 p-1" />
           </div>
        </div>
        <div className="space-y-2">
          <Label>Font Family</Label>
          <Select value={styleOptions.fontFamily} onValueChange={(v) => handleStyleChange('fontFamily', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Font Size</Label>
          <Select value={styleOptions.fontSize} onValueChange={(v) => handleStyleChange('fontSize', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Margins</Label>
          <Select value={styleOptions.margin} onValueChange={(v) => handleStyleChange('margin', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select margin" />
            </SelectTrigger>
            <SelectContent>
              {margins.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
