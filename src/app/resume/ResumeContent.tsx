'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowDownIcon } from '@heroicons/react/24/outline'

// Resume data structure
const resumeData = {
    experience: [
        {
            title: 'Software Development Intern',
            company: 'Tech Innovators Inc.',
            period: 'May 2023 - Aug 2023',
            description:
                'Contributed to the development of enterprise-level web applications using modern technologies.',
            achievements: [
                "Developed and implemented new features for the company's main product using React and Node.js",
                'Reduced application load time by 35% through code optimization and implementing lazy loading',
                'Collaborated with senior developers in an Agile environment using JIRA and Git',
                'Participated in code reviews and daily stand-ups with the development team',
            ],
        },
        {
            title: 'Web Development Teaching Assistant',
            company: 'University Computer Science Department',
            period: 'Jan 2023 - Apr 2023',
            description:
                'Assisted professors in teaching web development fundamentals to undergraduate students.',
            achievements: [
                'Mentored 30+ students in HTML, CSS, JavaScript, and basic React concepts',
                'Created supplementary learning materials and coding exercises',
                'Held weekly office hours to help students with assignments and projects',
                'Received 4.8/5 average student satisfaction rating',
            ],
        },
        {
            title: 'Freelance Web Developer',
            company: 'Self-Employed',
            period: 'Jun 2022 - Present',
            description:
                'Designed and developed websites for small businesses and individuals.',
            achievements: [
                'Successfully delivered 5+ websites for local businesses using Next.js and Tailwind CSS',
                'Implemented responsive designs and SEO best practices',
                'Managed client relationships and project timelines effectively',
                'Maintained ongoing support and updates for clients',
            ],
        },
    ],
    education: [
        {
            degree: 'Bachelor of Science in Computer Science',
            school: 'Tribhuvan University',
            period: '2019 - 2023',
            gpa: '3.8/4.0',
            achievements: [
                'Graduated with High Honors (Magna Cum Laude)',
                "Dean's List for 6 consecutive semesters",
                'Vice President of the Computer Science Society',
                'Led team of 4 in developing a machine learning-based crop disease detection system for final year project',
                'Published research paper on "Efficient Resource Allocation in Cloud Computing" in University Journal',
            ],
            relevantCourses: [
                'Data Structures and Algorithms',
                'Web Development',
                'Database Management Systems',
                'Software Engineering',
                'Artificial Intelligence',
                'Cloud Computing',
                'Mobile App Development',
                'Computer Networks',
            ],
        },
    ],
    skills: {
        technical: [
            'JavaScript/TypeScript',
            'React/Next.js',
            'Node.js/Express',
            'Python',
            'Java',
            'HTML5/CSS3',
            'Tailwind CSS',
            'MongoDB',
            'PostgreSQL',
            'Git/GitHub',
            'AWS (Basic)',
            'Docker',
            'REST APIs',
            'Redux',
            'Jest/React Testing Library',
        ],
        soft: [
            'Problem Solving',
            'Team Collaboration',
            'Communication',
            'Time Management',
            'Project Management',
            'Adaptability',
            'Critical Thinking',
            'Attention to Detail',
        ],
    },
    certifications: [
        {
            name: 'AWS Certified Cloud Practitioner',
            issuer: 'Amazon Web Services',
            date: '2023',
            credentialId: 'AWS-CCP-123456',
        },
        {
            name: 'Meta Frontend Developer Professional Certificate',
            issuer: 'Meta (formerly Facebook)',
            date: '2023',
            credentialId: 'META-FE-789012',
        },
        {
            name: 'MongoDB Database Administrator Associate',
            issuer: 'MongoDB University',
            date: '2023',
            credentialId: 'MDB-DBA-345678',
        },
    ],
    projects: [
        {
            name: 'AI-Powered Crop Disease Detection System',
            description:
                'Final year project that uses machine learning to identify crop diseases from images',
            technologies: ['Python', 'TensorFlow', 'Flask', 'React', 'MongoDB'],
            highlights: [
                'Achieved 94% accuracy in disease detection',
                'Implemented real-time image processing',
                'Developed mobile-responsive web interface',
                'Integrated with cloud storage for image management',
            ],
            link: 'https://github.com/yourusername/crop-disease-detection',
        },
        {
            name: 'E-commerce Platform',
            description: 'Full-stack e-commerce website with advanced features',
            technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
            highlights: [
                'Implemented secure payment processing',
                'Built responsive admin dashboard',
                'Integrated real-time inventory management',
                'Added search and filtering functionality',
            ],
            link: 'https://github.com/yourusername/ecommerce-platform',
        },
    ],
    languages: [
        {
            name: 'English',
            proficiency: 'Professional Working Proficiency',
        },
        {
            name: 'Nepali',
            proficiency: 'Native',
        },
        {
            name: 'Hindi',
            proficiency: 'Professional Working Proficiency',
        },
    ],
    achievements: [
        'Won First Place in University Hackathon 2023',
        'Published paper in undergraduate research journal',
        'Recipient of Merit-based Academic Scholarship',
        'Organized and led workshops on web development basics for 50+ students',
    ],
}

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

export default function ResumeContent() {
    return (
        <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        Kshitiz Raj Lohani
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600 dark:text-gray-300 mb-6"
                    >
                        Full Stack Developer | Computer Science Graduate
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center space-x-4"
                    >
                        <Link
                            href="/resume.pdf"
                            className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                            download
                        >
                            <ArrowDownIcon className="w-5 h-5 mr-2" />
                            Download Resume
                        </Link>
                        <Link
                            href="mailto:your.email@example.com"
                            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            Contact Me
                        </Link>
                    </motion.div>
                </div>

                {/* Experience Section */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Experience
                    </h2>
                    <div className="space-y-8">
                        {resumeData.experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {exp.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {exp.company} • {exp.period}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    {exp.description}
                                </p>
                                <ul className="list-disc list-inside space-y-2">
                                    {exp.achievements.map((achievement, i) => (
                                        <li
                                            key={i}
                                            className="text-gray-600 dark:text-gray-400"
                                        >
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Skills Section */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Skills
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div variants={itemVariants}>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Technical Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {resumeData.skills.technical.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Soft Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {resumeData.skills.soft.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Education Section */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Education
                    </h2>
                    {resumeData.education.map((edu, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                        >
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {edu.degree}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {edu.school} • {edu.period}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                GPA: {edu.gpa}
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                {edu.achievements.map((achievement, i) => (
                                    <li
                                        key={i}
                                        className="text-gray-600 dark:text-gray-400"
                                    >
                                        {achievement}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.section>

                {/* Certifications Section */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Certifications
                    </h2>
                    <div className="grid gap-6">
                        {resumeData.certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {cert.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {cert.issuer} • {cert.date}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Credential ID: {cert.credentialId}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* New Projects Section */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Projects
                    </h2>
                    <div className="space-y-6">
                        {resumeData.projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {project.name}
                                    </h3>
                                    <Link
                                        href={project.link}
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                        target="_blank"
                                    >
                                        View Project
                                    </Link>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <ul className="list-disc list-inside space-y-2">
                                    {project.highlights.map((highlight, i) => (
                                        <li
                                            key={i}
                                            className="text-gray-600 dark:text-gray-400"
                                        >
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Languages Section */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Languages
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {resumeData.languages.map((language, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                            >
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {language.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {language.proficiency}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Achievements Section */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Additional Achievements
                    </h2>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                        <ul className="space-y-3">
                            {resumeData.achievements.map(
                                (achievement, index) => (
                                    <motion.li
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-start"
                                    >
                                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
                                        <span className="text-gray-700 dark:text-gray-300">
                                            {achievement}
                                        </span>
                                    </motion.li>
                                )
                            )}
                        </ul>
                    </div>
                </motion.section>
            </div>
        </div>
    )
}
