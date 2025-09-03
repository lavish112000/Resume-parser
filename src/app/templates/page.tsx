
// TemplatesPage is the main entry point for the resume templates route.
// It renders the TemplateGallery component, which displays all available resume templates for selection.
import { TemplateGallery } from '@/components/template-gallery';

// The default export is a Next.js page component.
export default function TemplatesPage() {
  // Render the template gallery UI.
  return <TemplateGallery />;
}
