import { supabase } from './supabase'
import { createServerSupabaseClient } from './supabase'
import type { ResumeData, Template, StyleOptions } from './types'

export class DatabaseService {
  private static async getSupabaseClient(serverSide = false) {
    return serverSide ? await createServerSupabaseClient() : supabase
  }

  // User operations
  static async createUser(email: string, name: string, serverSide = false) {
    const client = await this.getSupabaseClient(serverSide)
    const { data, error } = await client
      .from('users')
      .insert([{ email, name }])
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async getUserByEmail(email: string, serverSide = false) {
    const client = await this.getSupabaseClient(serverSide)
    const { data, error } = await client
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  // Resume operations
  static async saveResume(
    userId: string,
    title: string,
    data: ResumeData,
    template: Template,
    styleOptions: StyleOptions,
    serverSide = false
  ) {
    const client = await this.getSupabaseClient(serverSide)
    const { data: resume, error } = await client
      .from('resumes')
      .insert([{
        user_id: userId,
        title,
        data,
        template,
        style_options: styleOptions
      }])
      .select()
      .single()

    if (error) throw error
    return resume
  }

  static async updateResume(
    resumeId: string,
    updates: Partial<{
      title: string
      data: ResumeData
      template: Template
      style_options: StyleOptions
    }>
  ) {
    const { data, error } = await supabase
      .from('resumes')
      .update(updates)
      .eq('id', resumeId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async getUserResumes(userId: string) {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data
  }

  static async getResumeById(resumeId: string) {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .single()

    if (error) throw error
    return data
  }

  static async deleteResume(resumeId: string) {
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', resumeId)

    if (error) throw error
  }

  // Authentication helpers
  static async signUp(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    })

    if (error) throw error
    return data
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  }
}
