'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import type { ResumeData } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ImproveButton } from '@/components/improve-button';

export function ResumeForm() {
  const { control, register, getValues } = useFormContext<ResumeData>();

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: 'experience',
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'education',
  });
  
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
      control,
      name: "skills"
  });

  const {
    fields: customSectionFields,
    append: appendCustomSection,
    remove: removeCustomSection,
  } = useFieldArray({
    control,
    name: 'customSections',
  });


  return (
    <form className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="123-456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Textarea placeholder="A brief summary..." {...field} rows={5} />
                    <ImproveButton fieldName="summary" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Accordion type="multiple" defaultValue={['experience', 'education', 'skills']} className="w-full">
        <AccordionItem value="experience">
          <AccordionTrigger>
            <h3 className="text-xl font-semibold">Work Experience</h3>
          </AccordionTrigger>
          <AccordionContent className="pl-2 space-y-4">
            {experienceFields.map((field, index) => (
              <Card key={field.id} className="bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between py-3">
                  <CardTitle className="text-lg">
                    {getValues(`experience.${index}.title`) || `Job ${index + 1}`}
                  </CardTitle>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeExperience(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                   <FormField
                      control={control}
                      name={`experience.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl><Input {...field} placeholder="Software Engineer" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`experience.${index}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl><Input {...field} placeholder="Tech Corp" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={control}
                      name={`experience.${index}.dates`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dates</FormLabel>
                          <FormControl><Input {...field} placeholder="Jan 2020 - Present" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                        control={control}
                        name={`experience.${index}.description`}
                        render={({ field: textAreaField }) => (
                            <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Textarea {...textAreaField} placeholder="Describe your responsibilities..." rows={4} />
                                    <ImproveButton fieldName={`experience.${index}.description`} />
                                </div>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </CardContent>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={() => appendExperience({ title: '', company: '', dates: '', description: '' })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger>
            <h3 className="text-xl font-semibold">Education</h3>
          </AccordionTrigger>
          <AccordionContent className="pl-2 space-y-4">
             {educationFields.map((field, index) => (
              <Card key={field.id} className="bg-muted/30">
                 <CardHeader className="flex flex-row items-center justify-between py-3">
                  <CardTitle className="text-lg">
                    {getValues(`education.${index}.institution`) || `School ${index + 1}`}
                  </CardTitle>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeEducation(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={control}
                    name={`education.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl><Input {...field} placeholder="State University" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`education.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl><Input {...field} placeholder="B.S. in Computer Science" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                      control={control}
                      name={`education.${index}.dates`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dates</FormLabel>
                          <FormControl><Input {...field} placeholder="Aug 2016 - May 2020" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  <FormField
                      control={control}
                      name={`education.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl><Input {...field} placeholder="e.g., GPA, Honors" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </CardContent>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={() => appendEducation({ institution: '', degree: '', dates: '', description: '' })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="skills">
            <AccordionTrigger>
                <h3 className="text-xl font-semibold">Skills</h3>
            </AccordionTrigger>
            <AccordionContent className="pl-2 space-y-4">
                <div className="flex flex-wrap gap-2">
                    {skillFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2 bg-muted/40 p-2 rounded-md">
                        <Input
                        {...register(`skills.${index}.name`)}
                        placeholder={`Skill`}
                        className="h-8"
                        />
                        <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSkill(index)}
                        className="h-8 w-8"
                        >
                        <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    ))}
                </div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendSkill({ name: '' })}
                    className="mt-2"
                >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
                </Button>
            </AccordionContent>
        </AccordionItem>
        {customSectionFields.map((field, index) => (
          <AccordionItem key={field.id} value={`custom-${index}`}>
            <AccordionTrigger>
              <div className="flex justify-between w-full items-center">
                <FormField
                  control={control}
                  name={`customSections.${index}.title`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Custom Section Title"
                          className="text-xl font-semibold border-none focus:ring-0 p-0"
                          onClick={(e) => e.stopPropagation()}
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
                  onClick={() => removeCustomSection(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-2 space-y-4">
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <FormField
                    control={control}
                    name={`customSections.${index}.description`}
                    render={({ field: textAreaField }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Textarea
                              {...textAreaField}
                              placeholder="Describe your custom section content..."
                              rows={4}
                            />
                            <ImproveButton fieldName={`customSections.${index}.description`} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}

      </Accordion>
      <div className="mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => appendCustomSection({ title: 'New Section', description: '' })}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Section
        </Button>
      </div>
    </form>
  );
}
