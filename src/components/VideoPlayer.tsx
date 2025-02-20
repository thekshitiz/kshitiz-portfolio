export default function VideoPlayer({ src }: { src: string }) {
    return (
        <video
            className="w-full h-full object-cover"
            autoPlay
            controls
            src={src}
            preload="metadata"
        />
    )
}
