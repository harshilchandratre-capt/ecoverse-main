# Supabase Backend Setup Guide for Ecoverse

This guide will walk you through setting up a complete Supabase backend for your Ecoverse application.

## 📋 Prerequisites

- A Supabase account (free tier available)
- Your Ecoverse project running locally

## 🚀 Step-by-Step Setup

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in the details:
   - **Name**: `ecoverse-backend`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click **"Create new project"**
5. Wait 2-3 minutes for setup

### 2. Get Your Credentials

1. Go to **Settings → API**
2. Copy these values:
   - **Project URL** (e.g., `https://xyz.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)
   - **Service Role Key** (keep secret!)

### 3. Configure Environment Variables

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Database Migrations

1. Go to **Supabase Dashboard → SQL Editor**
2. Copy and paste the content from `supabase/migrations/001_initial_setup.sql`
3. Click **"Run"**
4. Repeat for `supabase/migrations/002_storage_setup.sql`

### 5. Create Admin User

1. Go to **Authentication → Users**
2. Click **"Add user"**
3. Enter:
   - **Email**: `admin@ecoverse.com` (or your email)
   - **Password**: Create a strong password
   - **Auto Confirm User**: ✅ Check this
4. Click **"Create user"**

### 6. Test Your Setup

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:5174/admin`
3. Login with your admin credentials
4. Try adding a product with an image

## 🗄️ Database Structure

### Tables Created:

1. **products** - Stores product information
2. **categories** - Product categories
3. **landing_content** - Website content management
4. **admin_users** - Admin user management

### Storage Buckets:

1. **product-images** - Public bucket for product images
2. **documents** - Private bucket for documents
3. **category-images** - Public bucket for category images

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Public read access** for products and categories
- **Authenticated users only** for admin operations
- **Secure file uploads** with proper permissions

## 📁 File Structure

```
src/
├── lib/
│   ├── supabase.ts      # Supabase client configuration
│   ├── database.ts      # Database operations
│   └── storage.ts       # File upload utilities
├── data/
│   └── mockProducts.ts  # Mock data (can be removed)
└── supabase/
    └── migrations/
        ├── 001_initial_setup.sql
        └── 002_storage_setup.sql
```

## 🛠️ Available Features

### Authentication
- ✅ Admin login/logout
- ✅ Session management
- ✅ Protected admin routes

### Product Management
- ✅ Add/Edit/Delete products
- ✅ Image uploads
- ✅ Category management
- ✅ Search and filtering

### Content Management
- ✅ Landing page content editing
- ✅ Dynamic content updates

### File Storage
- ✅ Product image uploads
- ✅ Document storage
- ✅ Automatic URL generation

## 🔧 Troubleshooting

### Common Issues:

1. **Environment variables not loading**
   - Ensure `.env` file is in project root
   - Restart development server after adding env vars

2. **Authentication errors**
   - Check Supabase URL and keys
   - Verify admin user exists in Supabase

3. **File upload failures**
   - Check storage bucket permissions
   - Verify file size limits

4. **Database connection issues**
   - Verify Supabase project is active
   - Check network connectivity

### Getting Help:

- Check Supabase logs in Dashboard → Logs
- Review browser console for errors
- Verify RLS policies are correctly set

## 🚀 Next Steps

1. **Customize the branding** in landing content
2. **Add more product categories** as needed
3. **Set up email notifications** for admin actions
4. **Implement user registration** if needed
5. **Add product reviews and ratings**

## 📞 Support

If you encounter any issues:
1. Check the Supabase documentation
2. Review the error logs in your browser console
3. Verify all environment variables are set correctly

Your Supabase backend is now ready to power your Ecoverse application! 🎉
