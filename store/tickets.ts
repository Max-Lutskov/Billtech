import { v4 as uuidv4 } from 'uuid';
export interface Ticket {
    price: number
    uuid: string
    carrier: string
    segments: {
        uuid: string
        origin: string
        destination: string
        date: string
        stops: string[]
        duration: number
    }[]
}

export type SortOption = 'cheapest' | 'fastest' | 'optimal'

export const useTicketsStore = defineStore('tickets', () => {
    const visibleTickets = ref<Ticket[]>([])
    const loading = ref(false)
    const error = ref(false)
    const stop = ref(false)
    const sortOption = ref<SortOption>('cheapest')

    const transferFilter = ref<Set<number>>(new Set([0, 1, 2, 3]))
    const TICKETS_LOAD_COUNT = 5
    let ticketBuffer: Ticket[] = []

    function setTransferFilter(values: number[]) {
        transferFilter.value = new Set(values)
        resetVisibleTickets()
    }

    function setSortOption(option: SortOption) {
        sortOption.value = option
        resetVisibleTickets()
    }

    function getFilteredTickets(): Ticket[] {
        const filtered = ticketBuffer.filter(ticket =>
            ticket.segments.every(seg =>
                transferFilter.value.has(seg.stops.length)
            )
        )

        return sortTickets(filtered)
    }

    function sortTickets(tickets: Ticket[]): Ticket[] {
        switch (sortOption.value) {
            case 'cheapest':
                return tickets.sort((a, b) => a.price - b.price)
            case 'fastest':
                return tickets.sort((a, b) =>
                    totalDuration(a) - totalDuration(b)
                )
            case 'optimal':
                return tickets.sort((a, b) =>
                    (a.price + totalDuration(a) / 10) - (b.price + totalDuration(b) / 10)
                )
            default:
                return tickets
        }
    }

    function totalDuration(ticket: Ticket): number {
        return ticket.segments.reduce((sum, seg) => sum + seg.duration, 0)
    }

    function loadMoreTickets(count: number) {
        const all = getFilteredTickets()
        const start = visibleTickets.value.length
        const end = start + count
        visibleTickets.value.push(...all.slice(start, end))
    }

    function resetVisibleTickets() {
        visibleTickets.value = []
        loadMoreTickets(TICKETS_LOAD_COUNT)
    }

    function addTickets(newTickets: Omit<Ticket, 'uuid'>[]) {
        const withUUIDSegments = newTickets.map(ticket => ({
            ...ticket,
            uuid: uuidv4(),
            segments: ticket.segments.map(segment => ({
                ...segment,
                uuid: uuidv4()
            }))
        }))
        ticketBuffer.push(...withUUIDSegments)
    }

    watch(stop, (newVal) => {
        if (newVal) {
            resetVisibleTickets()
        }
    })

    return {
        visibleTickets,
        loading,
        error,
        stop,
        sortOption,
        transferFilter,

        addTickets,
        loadMoreTickets,
        resetVisibleTickets,

        setTransferFilter,
        setSortOption,

        setLoading: (val: boolean) => loading.value = val,
        setError: (val: boolean) => error.value = val,
        setStop: (val: boolean) => stop.value = val
    }
})
