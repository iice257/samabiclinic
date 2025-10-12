import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../../../lib/generated/prisma'; // Adjust path as needed
import { z } from 'zod';

const prisma = new PrismaClient();

// Zod schema for updating a blog post
const updateBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  slug: z.string().min(1, 'Slug is required').optional(),
  content: z.string().min(1, 'Content is required').optional(),
  authorId: z.string().min(1, 'Author ID is required').optional(),
  categoryId: z.string().min(1, 'Category ID is required').optional(),
  published: z.boolean().optional(),
});

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const post = await prisma.blogPost.findUnique({
      where: { slug },
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

    if (!post) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ message: 'Error fetching blog post' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const body = await request.json();
    const validatedData = updateBlogPostSchema.parse(body);

    const updatedPost = await prisma.blogPost.update({
      where: { slug },
      data: validatedData,
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
    }
    console.error('Error updating blog post:', error);
    return NextResponse.json({ message: 'Error updating blog post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    await prisma.blogPost.delete({
      where: { slug },
    });

    return NextResponse.json({ message: 'Blog post deleted successfully' }, { status: 204 });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ message: 'Error deleting blog post' }, { status: 500 });
  }
}
