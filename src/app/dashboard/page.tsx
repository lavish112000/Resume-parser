
// DashboardPage is the main entry point for the user dashboard route.
// It renders the UserDashboard component, which provides resume management, analytics, and template selection features.
import { UserDashboard } from '@/components/user-dashboard';

// The default export is a Next.js page component.
export default function DashboardPage() {
  // Render the user dashboard UI.
  return <UserDashboard />;
}
