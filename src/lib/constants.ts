export const siteConfig = {
    name: 'Kshitiz Portfolio',
    description: 'Full-stack developer and creative coder',
    url: 'https://kshitiz.com',
    ogImage: 'https://kshitiz.com/og.jpg',
    links: {
        github: 'https://github.com/kshitiz',
        twitter: 'https://twitter.com/kshitiz',
        linkedin: 'https://linkedin.com/in/kshitiz',
    },
}

export const gradients = {
    primary: 'from-blue-600 via-violet-600 to-purple-600',
    secondary: 'from-purple-600 via-pink-600 to-red-600',
    accent: 'from-red-600 via-orange-600 to-yellow-600',
    primaryDark: 'dark:from-blue-400 dark:via-violet-400 dark:to-purple-400',
    secondaryDark: 'dark:from-purple-400 dark:via-pink-400 dark:to-red-400',
    accentDark: 'dark:from-red-400 dark:via-orange-400 dark:to-yellow-400',
}

export const animations = {
    fadeIn: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' },
    },
    slideIn: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6, ease: 'easeOut' },
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6, ease: 'easeOut' },
    },
}
