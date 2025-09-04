'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { getUserResumesFromDatabase, deleteResumeFromDatabase } from '@/app/actions/database-actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, FileText, Trash2, Edit, Download } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

interface Resume {
  id: string
  title: string
  template: string
  created_at: string
  updated_at: string
}

export default function DatabaseDashboard() {
  const { user } = useAuth()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const loadResumes = async () => {
    if (!user) return

    const result = await getUserResumesFromDatabase(user.id)
    if (result.success) {
      setResumes(result.resumes || [])
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      loadResumes()
    }
  }, [user])

  const handleDeleteResume = async (resumeId: string) => {
    const result = await deleteResumeFromDatabase(resumeId)
    if (result.success) {
      setResumes(resumes.filter(r => r.id !== resumeId))
      toast({
        title: 'Success',
        description: 'Resume deleted successfully'
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Saved Resumes</h1>
          <p className="text-muted-foreground">Manage your database-stored resumes</p>
        </div>
        <Link href="/">
          <Button>Create New Resume</Button>
        </Link>
      </div>

      {resumes.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No saved resumes yet</h3>
            <p className="text-muted-foreground mb-4">
              Create and save your first resume to see it here
            </p>
            <Link href="/">
              <Button>Get Started</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{resume.title}</CardTitle>
                    <CardDescription>
                      Created {new Date(resume.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{resume.template}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteResume(resume.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
