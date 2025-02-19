export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            {children}

            {/* Newsletter Section */}
            <section className="bg-blue-600 dark:bg-blue-700 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Subscribe to My Newsletter
                        </h2>
                        <p className="text-blue-100 mb-8">
                            Get the latest articles, tutorials, and updates
                            delivered straight to your inbox.
                        </p>
                        <form className="flex gap-2 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}
