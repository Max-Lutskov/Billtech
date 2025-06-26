export function getStopsText(count: number): string {
    const lastDigit = count % 10
    const lastTwoDigits = count % 100

    let word: string

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        word = 'пересадок'
    } else if (lastDigit === 1) {
        word = 'пересадка'
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        word = 'пересадки'
    } else {
        word = 'пересадок'
    }

    return `${count} ${word}`
}
