export function formatTime(date: Date): string {
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

export function formatFlightTime(isoDate: string, durationMin: number): string {
    const departure = new Date(isoDate)
    const arrival = new Date(departure.getTime() + durationMin * 60000)

    return `${formatTime(departure)} – ${formatTime(arrival)}`
}

export function formatDuration(durationMin: number): string {
    const hours = Math.floor(durationMin / 60)
    const minutes = durationMin % 60
    return `${hours}год ${minutes}хв`
}
