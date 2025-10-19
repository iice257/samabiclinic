// Minimal Supabase table types used across the app.
// This file intentionally provides a lightweight `Tables` generic
// to avoid pulling a full generated types file into the repo.

export type BlogPost = {
	id: number
	slug: string
	title: string
	excerpt?: string | null
	content: string
	author: string
	category?: string | null
	tags?: string[] | null
	image?: string | null
	created_at: string
	status?: string | null
}

export type Tables<Name extends string> = Name extends "blog_posts"
	? BlogPost
	: any

export {}
