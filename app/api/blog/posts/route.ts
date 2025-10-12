import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../../lib/generated/prisma'; // Adjust path as needed
import { z } from 'zod';

const prisma = new PrismaClient();

// Zod schema for creating a new blog post
const createBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  authorId: z.string().min(1, 'Author ID is required'),
  categoryId: z.string().min(1, 'Category ID is required'),
  published: z.boolean().optional().default(false),
});

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ message: 'Error fetching blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createBlogPostSchema.parse(body);

    const newPost = await prisma.blogPost.create({
      data: validatedData,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
    }
    console.error('Error creating blog post:', error);
    return NextResponse.json({ message: 'Error creating blog post' }, { status: 500 });
  }
}
