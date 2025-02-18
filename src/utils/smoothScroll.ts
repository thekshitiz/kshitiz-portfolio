export const smoothScroll = (target: string, duration = 500) => {
    const element = document.querySelector(target)
    if (!element) return

    const targetPosition = element.getBoundingClientRect().top + window.scrollY
    const startPosition = window.scrollY
    const distance = targetPosition - startPosition
    let startTime: number | null = null

    const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)

        // Easing function
        const easeInOutCubic = (t: number) =>
            t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress))

        if (timeElapsed < duration) {
            requestAnimationFrame(animation)
        }
    }

    requestAnimationFrame(animation)
}
