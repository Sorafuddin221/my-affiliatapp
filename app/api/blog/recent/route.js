import connectDB from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();

  try {
    const recentPosts = await BlogPost.find().sort({ date: -1 }).limit(3);
    return NextResponse.json(recentPosts);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}