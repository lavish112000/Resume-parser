

'use client';
/**
 * ResumeForm
 * ----------
 * The primary data entry surface for building and editing a resume.
 *
 * Responsibilities:
 * - Provide a single form state using React Hook Form to keep inputs performant and
 *   validation-friendly.
 * - Break the resume into logical sub-forms (skills, experience, education, links,
 *   custom sections) and use `useFieldArray` for all repeatable groups.
 * - Expose fine-grained AI assist buttons (ImproveButton) for content improvement
 *   at the field/section level.
 *
 * Contract / Expectations:
 * - The component expects the parent to initialize the form context and submit
 *   the final value. It focuses on providing fields and local helpers only.
 * - Keep side-effects (network, file I/O) out of this component; use callbacks
 *   from the parent instead.
 */
import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import type { ResumeData } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusCircle, Trash2, Eye, User, FileText, Building, GraduationCap, Trophy, BrainCircuit, Link, ArrowRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ImproveButton } from '@/components/improve-button';

/**
 * Subform for managing skill categories and skills.
 * Uses useFieldArray for dynamic skill category fields.
 */
function SkillsForm() {
  const { control } = useFormContext<ResumeData>();
  const { fields: skillCategoryFields, append: appendSkillCategory, remove: removeSkillCategory } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <div className="space-y-6">
      {skillCategoryFields.map((categoryField, categoryIndex) => (
        <Card key={categoryField.id} className="card-vibrant border-2 border-green-100 hover-lift transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
            <FormField
              control={control}
              name={`skills.${categoryIndex}.category`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Skill Category (e.g., Programming Languages, Design Tools)" 
                      className="text-lg font-semibold border-none focus:ring-0 p-0 bg-transparent placeholder:text-green-400" 
                    />
                  </FormControl>
                  <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeSkillCategory(categoryIndex)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-smooth"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <SkillInputs categoryIndex={categoryIndex} />
                    </CardContent>
                </Card>
            ))}
            <Button 
                type="button" 
                variant="outline" 
                onClick={() => appendSkillCategory({ category: '', skills: [{ name: '' }] })}
                className="w-full h-14 border-2 border-dashed border-green-300 hover:border-green-500 hover:bg-green-50 text-green-600 transition-smooth rounded-xl"
            >
                <PlusCircle className="mr-2 h-5 w-5" /> 
                Add Skill Category
            </Button>
        </div>
    );
}

function SkillInputs({ categoryIndex }: { categoryIndex: number }) {
    const { control, register } = useFormContext<ResumeData>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `skills.${categoryIndex}.skills`,
    });

    return (
        <div className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {fields.map((field, skillIndex) => (
                    <div key={field.id} className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-3 rounded-xl hover:shadow-md transition-smooth">
                        <FormField
                            control={control}
                            name={`skills.${categoryIndex}.skills.${skillIndex}.name`}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                <FormControl>
                                    <Input 
                                        {...field} 
                                        placeholder="Enter skill" 
                                        className="h-10 border-0 bg-transparent focus:ring-0 focus:border-0 placeholder:text-green-400" 
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => remove(skillIndex)} 
                            className="h-8 w-8 shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50 transition-smooth"
                        >
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                ))}
            </div>
            <Button 
                type="button" 
                size="sm" 
                variant="outline" 
                onClick={() => append({ name: '' })}
                className="h-10 px-4 border-2 border-green-300 hover:border-green-500 hover:bg-green-50 text-green-600 transition-smooth rounded-lg"
            >
                <PlusCircle className="mr-2 h-4 w-4" /> 
                Add Skill
            </Button>
        </div>
    );
}


export function ResumeForm({ onShowPreview }: { onShowPreview: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { title: 'Personal Details', icon: '👤' },
    { title: 'Professional Summary', icon: '📝' },
    { title: 'Work Experience', icon: '💼' },
    { title: 'Education', icon: '🎓' },
    { title: 'Skills', icon: '⚡' },
    { title: 'Custom Sections', icon: '✨' },
    { title: 'Links', icon: '🔗' },
  ];

  // Field arrays
  const { control, getValues } = useFormContext<ResumeData>();
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({ control, name: 'experience' });
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({ control, name: 'education' });
  const { fields: customSectionFields, append: appendCustomSection, remove: removeCustomSection } = useFieldArray({ control, name: 'customSections' });
  const { fields: linkFields, append: appendLink, remove: removeLink } = useFieldArray({ control, name: 'links' });

  const nextStep = () => setStep((s: number) => Math.min(steps.length - 1, s + 1));
  const prevStep = () => setStep((s: number) => Math.max(0, s - 1));

  // Step content
  function renderStepContent() {
    switch (step) {
      case 0:
        return (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 card-modern animate-fade-in-up">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
                👤
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Personal Details
              </CardTitle>
              <p className="text-muted-foreground">Let's start with your basic information</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField control={control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      {...field} 
                      className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-smooth rounded-xl" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="john.doe@email.com" 
                        {...field} 
                        className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-smooth rounded-xl" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123-456-7890" 
                        {...field} 
                        className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-smooth rounded-xl" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </CardContent>
          </Card>
        );
      case 1:
        return (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 card-modern animate-fade-in-up">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
                📝
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Professional Summary
              </CardTitle>
              <p className="text-muted-foreground">Showcase your expertise and career highlights</p>
            </CardHeader>
            <CardContent>
              <FormField control={control} name="summary" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Textarea 
                        placeholder="Write a compelling professional summary that highlights your key achievements, skills, and career objectives..." 
                        {...field} 
                        rows={6} 
                        className="border-2 border-gray-200 focus:border-emerald-500 transition-smooth rounded-xl resize-none" 
                      />
                      <ImproveButton fieldName="summary" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 card-modern animate-fade-in-up">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
                💼
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Work Experience
              </CardTitle>
              <p className="text-muted-foreground">Detail your professional journey and achievements</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {experienceFields.map((field, index) => (
                <Card key={field.id} className="card-vibrant border-2 border-blue-100 hover-lift transition-smooth">
                  <CardHeader className="flex flex-row items-center justify-between py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
                    <CardTitle className="text-lg font-semibold text-blue-900">
                      {getValues(`experience.${index}.title`) || `Position ${index + 1}`}
                    </CardTitle>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-smooth"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={control} name={`experience.${index}.title`} render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Job Title</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Software Engineer" 
                              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-smooth rounded-xl" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={control} name={`experience.${index}.company`} render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Company</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Tech Corp" 
                              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-smooth rounded-xl" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={control} name={`experience.${index}.dates`} render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Employment Period</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Jan 2020 - Present" 
                            className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-smooth rounded-xl" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={control} name={`experience.${index}.description`} render={({ field: textAreaField }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Key Responsibilities & Achievements</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Textarea 
                              {...textAreaField} 
                              placeholder="• Led development of key features that increased user engagement by 25%&#10;• Collaborated with cross-functional teams to deliver projects on time&#10;• Mentored junior developers and improved team productivity" 
                              rows={5} 
                              className="border-2 border-gray-200 focus:border-blue-500 transition-smooth rounded-xl resize-none" 
                            />
                            <ImproveButton fieldName={`experience.${index}.description`} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </CardContent>
                </Card>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => appendExperience({ title: '', company: '', dates: '', description: '' })}
                className="w-full h-14 border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50 text-blue-600 transition-smooth rounded-xl"
              >
                <PlusCircle className="mr-2 h-5 w-5" /> 
                Add Work Experience
              </Button>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 card-modern animate-fade-in-up">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
                🎓
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Education
              </CardTitle>
              <p className="text-muted-foreground">Highlight your academic achievements and qualifications</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {educationFields.map((field, index) => (
                <Card key={field.id} className="card-vibrant border-2 border-amber-100 hover-lift transition-smooth">
                  <CardHeader className="flex flex-row items-center justify-between py-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-xl">
                    <CardTitle className="text-lg font-semibold text-amber-900">
                      {getValues(`education.${index}.institution`) || `Institution ${index + 1}`}
                    </CardTitle>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-smooth"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={control} name={`education.${index}.institution`} render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Institution</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="University of Technology" 
                              className="h-12 border-2 border-gray-200 focus:border-amber-500 transition-smooth rounded-xl" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={control} name={`education.${index}.degree`} render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Degree</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Bachelor of Science in Computer Science" 
                              className="h-12 border-2 border-gray-200 focus:border-amber-500 transition-smooth rounded-xl" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={control} name={`education.${index}.dates`} render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Graduation Date</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="May 2022" 
                              className="h-12 border-2 border-gray-200 focus:border-amber-500 transition-smooth rounded-xl" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={control} name={`education.${index}.description`} render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Additional Details (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="GPA, Honors, Relevant Coursework" 
                              className="h-12 border-2 border-gray-200 focus:border-amber-500 transition-smooth rounded-xl" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => appendEducation({ institution: '', degree: '', dates: '', description: '' })}
                className="w-full h-14 border-2 border-dashed border-amber-300 hover:border-amber-500 hover:bg-amber-50 text-amber-600 transition-smooth rounded-xl"
              >
                <PlusCircle className="mr-2 h-5 w-5" /> 
                Add Education
              </Button>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 card-modern animate-fade-in-up">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
                ⚡
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Skills & Expertise
              </CardTitle>
              <p className="text-muted-foreground">Showcase your technical and professional capabilities</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <SkillsForm />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 card-modern animate-fade-in-up">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
                ✨
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Custom Sections
              </CardTitle>
              <p className="text-muted-foreground">Add unique sections to make your resume stand out</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {customSectionFields.map((field, index) => (
                <Card key={field.id} className="card-vibrant border-2 border-rose-100 hover-lift transition-smooth">
                  <CardHeader className="flex flex-row items-center justify-between py-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-t-xl">
                    <FormField control={control} name={`customSections.${index}.title`} render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Section Title (e.g., Projects, Certifications)" 
                            className="text-lg font-semibold border-none focus:ring-0 p-0 bg-transparent placeholder:text-rose-400" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeCustomSection(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-smooth"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <FormField control={control} name={`customSections.${index}.description`} render={({ field: textAreaField }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Content</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Textarea 
                              {...textAreaField} 
                              placeholder="Describe your achievements, projects, certifications, or any other relevant information..." 
                              rows={5} 
                              className="border-2 border-gray-200 focus:border-rose-500 transition-smooth rounded-xl resize-none" 
                            />
                            <ImproveButton fieldName={`customSections.${index}.description`} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </CardContent>
                </Card>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => appendCustomSection({ title: '', description: '' })}
                className="w-full h-14 border-2 border-dashed border-rose-300 hover:border-rose-500 hover:bg-rose-50 text-rose-600 transition-smooth rounded-xl"
              >
                <PlusCircle className="mr-2 h-5 w-5" /> 
                Add Custom Section
              </Button>
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 card-modern animate-fade-in-up">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
                🔗
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Professional Links
              </CardTitle>
              <p className="text-muted-foreground">Connect recruiters to your online presence</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {linkFields.map((field, index) => (
                <Card key={field.id} className="card-vibrant border-2 border-cyan-100 hover-lift transition-smooth p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={control} name={`links.${index}.label`} render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Label</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Portfolio, LinkedIn, GitHub" 
                              className="h-12 border-2 border-gray-200 focus:border-cyan-500 transition-smooth rounded-xl" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={control} name={`links.${index}.url`} render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">URL</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="https://your-website.com" 
                              className="h-12 border-2 border-gray-200 focus:border-cyan-500 transition-smooth rounded-xl" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeLink(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-smooth"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => appendLink({ label: '', url: '' })}
                className="w-full h-14 border-2 border-dashed border-cyan-300 hover:border-cyan-500 hover:bg-cyan-50 text-cyan-600 transition-smooth rounded-xl"
              >
                <PlusCircle className="mr-2 h-5 w-5" /> 
                Add Professional Link
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <form className="space-y-8 p-6 max-w-4xl mx-auto">
        {/* Step Navigation */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-slide-in-from-top">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Resume Builder
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="font-semibold">Step {step + 1}</span>
              <span>of</span>
              <span className="font-semibold">{steps.length}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-8">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {steps.map((stepInfo, idx) => (
              <Button
                key={stepInfo.title}
                variant={step === idx ? 'default' : 'outline'}
                size="sm"
                type="button"
                onClick={() => setStep(idx)}
                className={`
                  h-11 px-4 rounded-xl transition-all duration-300 flex items-center space-x-2
                  ${step === idx 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl transform scale-105' 
                    : 'border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }
                `}
              >
                <span className="text-lg">{stepInfo.icon}</span>
                <span className="hidden sm:inline font-medium">{stepInfo.title}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="animate-fade-in-up">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-slide-in-from-top">
          <div className="flex justify-between items-center">
            <Button 
              type="button" 
              variant="outline" 
              disabled={step === 0} 
              onClick={prevStep}
              className="h-12 px-8 rounded-xl border-2 border-gray-200 hover:border-gray-400 disabled:opacity-50 transition-smooth"
            >
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Previous
            </Button>

            {step < steps.length - 1 ? (
              <Button 
                type="button" 
                onClick={nextStep}
                className="h-12 px-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-smooth"
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={onShowPreview} 
                className="h-12 px-8 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-smooth"
              >
                <Eye className="mr-2 h-4 w-4" /> 
                Preview Resume
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
