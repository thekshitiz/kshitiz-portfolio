'use client'

import { useEffect, useRef, useState } from 'react'

export default function ThreeBackgroundCanvas() {
    const containerRef = useRef<HTMLDivElement>(null)
    const mousePosition = useRef({ x: 0, y: 0 })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!containerRef.current) return

        let cleanup: () => void = () => {}

        const initThree = async () => {
            try {
                const THREE = await import('three')

                // Scene setup with fog for depth
                const scene = new THREE.Scene()
                scene.fog = new THREE.FogExp2('#000000', 0.001)

                const camera = new THREE.PerspectiveCamera(
                    75,
                    window.innerWidth / window.innerHeight,
                    0.1,
                    2000
                )

                const renderer = new THREE.WebGLRenderer({
                    alpha: true,
                    antialias: true,
                })
                renderer.setPixelRatio(window.devicePixelRatio)
                renderer.setSize(window.innerWidth, window.innerHeight)
                renderer.setClearColor('#000000', 0.1)
                containerRef.current.appendChild(renderer.domElement)

                // Create particles with different sizes and colors
                const particlesCount = 15000
                const positions = new Float32Array(particlesCount * 3)
                const colors = new Float32Array(particlesCount * 3)
                const sizes = new Float32Array(particlesCount)

                const color = new THREE.Color()
                const colorPalette = ['#ff3366', '#00ff99', '#6600ff']

                for (let i = 0; i < particlesCount; i++) {
                    // Position
                    positions[i * 3] = (Math.random() - 0.5) * 20
                    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
                    positions[i * 3 + 2] = (Math.random() - 0.5) * 20

                    // Color
                    const randomColor =
                        colorPalette[
                            Math.floor(Math.random() * colorPalette.length)
                        ]
                    color.set(randomColor)
                    colors[i * 3] = color.r
                    colors[i * 3 + 1] = color.g
                    colors[i * 3 + 2] = color.b

                    // Size
                    sizes[i] = Math.random() * 2
                }

                const geometry = new THREE.BufferGeometry()
                geometry.setAttribute(
                    'position',
                    new THREE.BufferAttribute(positions, 3)
                )
                geometry.setAttribute(
                    'color',
                    new THREE.BufferAttribute(colors, 3)
                )
                geometry.setAttribute(
                    'size',
                    new THREE.BufferAttribute(sizes, 1)
                )

                // Custom shader material for better particle rendering
                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        time: { value: 0 },
                        pointTexture: {
                            value: new THREE.TextureLoader().load(
                                '/particle.png'
                            ),
                        },
                    },
                    vertexShader: `
                        attribute float size;
                        attribute vec3 color;
                        varying vec3 vColor;
                        uniform float time;
                        
                        void main() {
                            vColor = color;
                            vec3 pos = position;
                            pos.y += sin(time * 0.2 + position.x) * 0.1;
                            pos.x += cos(time * 0.2 + position.y) * 0.1;
                            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                            gl_PointSize = size * (300.0 / -mvPosition.z);
                            gl_Position = projectionMatrix * mvPosition;
                        }
                    `,
                    fragmentShader: `
                        varying vec3 vColor;
                        uniform sampler2D pointTexture;
                        
                        void main() {
                            gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
                        }
                    `,
                    blending: THREE.AdditiveBlending,
                    depthTest: false,
                    transparent: true,
                })

                const particles = new THREE.Points(geometry, material)
                scene.add(particles)

                camera.position.z = 10

                // Mouse movement handler with smoother interaction
                const handleMouseMove = (event: MouseEvent) => {
                    mousePosition.current = {
                        x: (event.clientX - window.innerWidth / 2) * 0.001,
                        y: (event.clientY - window.innerHeight / 2) * 0.001,
                    }
                }

                window.addEventListener('mousemove', handleMouseMove)

                // Animation
                let time = 0
                const animate = () => {
                    requestAnimationFrame(animate)
                    time += 0.05

                    material.uniforms.time.value = time
                    particles.rotation.y += 0.001
                    particles.rotation.x += mousePosition.current.y * 0.3
                    particles.rotation.y += mousePosition.current.x * 0.3

                    renderer.render(scene, camera)
                }

                animate()

                // Handle resize
                const handleResize = () => {
                    camera.aspect = window.innerWidth / window.innerHeight
                    camera.updateProjectionMatrix()
                    renderer.setSize(window.innerWidth, window.innerHeight)
                }

                window.addEventListener('resize', handleResize)

                setIsLoading(false)
                cleanup = () => {
                    window.removeEventListener('mousemove', handleMouseMove)
                    window.removeEventListener('resize', handleResize)
                    containerRef.current?.removeChild(renderer.domElement)
                }
            } catch (error) {
                console.error('Failed to initialize Three.js:', error)
                setIsLoading(false)
            }
        }

        initThree()
        return () => cleanup()
    }, [])

    if (isLoading) {
        return (
            <div className="w-full h-full bg-black/90 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full animate-ping" />
            </div>
        )
    }

    return <div ref={containerRef} className="w-full h-full" />
}
