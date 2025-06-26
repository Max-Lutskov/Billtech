import { useTicketsStore } from '@/store/tickets'

export interface StopItem {
    value: number | 'all';
    label: string;
    checked?: boolean;
}

export function useStopsFilter() {
    const store = useTicketsStore()

    const stopsRaw = ref<StopItem[]>([
        { value: 0, label: 'Без пересадок' },
        { value: 1, label: '1 пересадка' },
        { value: 2, label: '2 пересадки' },
        { value: 3, label: '3 пересадки' }
    ])

    const checkedStops = ref<number[]>(stopsRaw.value.map(s => s.value as number))

    const stops = computed<StopItem[]>(() => {
        const allChecked = checkedStops.value.length === stopsRaw.value.length

        return [
            { value: 'all', label: 'Всі', checked: allChecked },
            ...stopsRaw.value.map(stop => ({
                ...stop,
                checked: checkedStops.value.includes(stop.value as number)
            }))
        ]
    })

    function onCheckChange(value: number | 'all', checked: boolean) {
        if (value === 'all') {
            checkedStops.value = checked ? stopsRaw.value.map(s => s.value as number) : []
        } else {
            if (checked) {
                checkedStops.value = [...checkedStops.value, value]
            } else {
                checkedStops.value = checkedStops.value.filter(v => v !== value)
            }
        }

        store.setTransferFilter([...checkedStops.value])
    }

    return {
        stops,
        onCheckChange
    }
}
