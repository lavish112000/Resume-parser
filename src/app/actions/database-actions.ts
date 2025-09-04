import { DatabaseService } from '@/lib/database'
import type { ResumeData, Template, StyleOptions } from '@/lib/types'

// Client-safe database functions (no server-side dependencies)
export async function getUserResumesFromDatabase(userId: string) {
  try {
    const resumes = await DatabaseService.getUserResumes(userId)
    return { success: true, resumes }
  } catch (error) {
    console.error('Error fetching resumes:', error)
    return { success: false, error: 'Failed to fetch resumes' }
  }
}

export async function deleteResumeFromDatabase(resumeId: string) {
  try {
    await DatabaseService.deleteResume(resumeId)
    return { success: true }
  } catch (error) {
    console.error('Error deleting resume:', error)
    return { success: false, error: 'Failed to delete resume' }
  }
}

// Re-export server actions for backward compatibility
export { saveResumeToDatabase, updateResumeInDatabase, createUserInDatabase } from './server-actions'
