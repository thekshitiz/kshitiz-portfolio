# Portfolio Website Documentation

## Overview

This is a modern portfolio website built with Next.js 13+, React, and TailwindCSS. It features a clean design with dark mode support, animations, and a responsive layout.

## Project Structure

```
src/
├── app/                    # Main application pages
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
└── styles/               # Global styles and CSS
```

## Key Features

- 🌓 Dark/Light Mode
- 📱 Responsive Design
- ✨ Smooth Animations
- 🎨 Modern UI Components
- 🔍 Project Search
- 📊 Admin Dashboard

## Component Documentation

### Layout Components

#### ClientLayout.tsx

```typescript
'use client'

import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// This component wraps the entire application and provides the basic structure
// - Header at the top
// - Main content in the middle
// - Footer at the bottom

interface ClientLayoutProps {
    children: ReactNode  // This accepts any valid React content
}

export function ClientLayout({ children }: ClientLayoutProps) {
    return (
        <>
            <Header />
            {/* pt-16 adds padding to prevent content from hiding under the header */}
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
        </>
    )
}
```

### Projects Page

The projects page (`src/app/projects/page.tsx`) showcases your work with:

- A search bar to filter projects
- A grid of project cards
- Pagination for multiple pages
- Smooth animations when filtering

### Theme Support

The website uses a theme provider to support dark and light modes:

- Users can toggle between modes
- The preference is saved in local storage
- System preference is respected by default

## How Things Work Together

1. When a user visits the site:

    - The layout loads with Header and Footer
    - The theme provider checks for saved preferences
    - Animations play as components mount

2. When viewing projects:

    - Projects are loaded from the data file
    - Users can search and filter projects
    - Clicking a project shows more details

3. Dark Mode Toggle:
    - Located in the header
    - Switches between light and dark themes
    - Animates smoothly during transition

## Common Tasks

### Adding a New Project

To add a new project, edit `src/lib/projects.ts`:

```typescript
export const projects = [
    {
        id: 4, // Increment the ID
        title: 'Your New Project',
        description: 'Project description here',
        image: '/projects/your-image.jpg',
        tags: ['React', 'Next.js'],
        link: 'https://project-url.com',
        github: 'https://github.com/username/project',
    },
    // ... existing projects
]
```

### Updating the Header

The header component (`src/components/Header.tsx`) contains:

- Navigation links
- Dark mode toggle
- Mobile menu
- Logo

### Customizing Styles

Global styles are in `src/styles/globals.css`
Component-specific styles use Tailwind classes
