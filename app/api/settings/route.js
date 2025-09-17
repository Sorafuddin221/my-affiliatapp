import connectDB from '@/lib/db';
import Setting from '@/lib/models/Setting';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();

  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({}); // Create a default settings document if none exists
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  await connectDB();
  const { productsPageHero, blogPageHero, contactPageHero } = await request.json();

  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({
        productsPageHero,
        blogPageHero,
        contactPageHero,
      });
    } else {
      settings.productsPageHero = productsPageHero || settings.productsPageHero;
      settings.blogPageHero = blogPageHero || settings.blogPageHero;
      settings.contactPageHero = contactPageHero || settings.contactPageHero;
      await settings.save();
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}