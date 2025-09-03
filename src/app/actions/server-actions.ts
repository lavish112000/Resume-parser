'use server'

import { DatabaseService } from '@/lib/database'
import { revalidatePath } from 'next/cache'
import type { ResumeData, Template, StyleOptions } from '@/lib/types'

// Server actions for resume management
export async function saveResumeToDatabase(
  userId: string,
  title: string,
  data: ResumeData,
  template: Template,
  styleOptions: StyleOptions
) {
  try {
    const resume = await DatabaseService.saveResume(userId, title, data, template, styleOptions, true)
    revalidatePath('/dashboard')
    revalidatePath('/database-dashboard')
    return { success: true, resume }
  } catch (error) {
    console.error('Error saving resume:', error)
    return { success: false, error: 'Failed to save resume' }
  }
}

export async function updateResumeInDatabase(
  resumeId: string,
  updates: Partial<{
    title: string
    data: ResumeData
    template: Template
    style_options: StyleOptions
  }>
) {
  try {
    const resume = await DatabaseService.updateResume(resumeId, updates)
    revalidatePath('/dashboard')
    return { success: true, resume }
  } catch (error) {
    console.error('Error updating resume:', error)
    return { success: false, error: 'Failed to update resume' }
  }
}

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
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Error deleting resume:', error)
    return { success: false, error: 'Failed to delete resume' }
  }
}

// User management server actions
export async function createUserInDatabase(email: string, name: string) {
  try {
    const user = await DatabaseService.createUser(email, name)
    return { success: true, user }
  } catch (error) {
    console.error('Error creating user:', error)
    return { success: false, error: 'Failed to create user' }
  }
}
