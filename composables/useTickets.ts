import {useTicketsStore} from "~/store/tickets";
import type {Ticket} from "~/store/tickets";

export async function useTicketsLoader() {
    const store = useTicketsStore();

    store.setLoading(true);
    store.setError(false);

    try {
        const {searchId} = await $fetch<{ searchId: string }>("https://avs-backend.vercel.app/search");

        let stop = false;
        let retries = 0;
        const MAX_RETRIES = 5;

        while (!stop && retries < MAX_RETRIES) {
            try {
                const res = await $fetch<{ tickets: Ticket[]; stop: boolean }>(
                    "https://avs-backend.vercel.app/tickets",
                    {params: {searchId}}
                );

                if (res.tickets?.length) {
                    store.addTickets(res.tickets);

                    if (store.visibleTickets.length === 0) {
                        store.loadMoreTickets(5);
                    }
                }

                stop = res.stop;
                if (stop) store.setStop(true);
            } catch (err) {
                retries++;
                if (retries >= MAX_RETRIES) {
                    store.setError(true);
                    break;
                }
            }
        }
    } catch (err) {
        store.setError(true);
    } finally {
        store.setLoading(false);
    }
}
