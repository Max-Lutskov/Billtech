<script setup lang="ts">
import {useTicketsStore} from '@/store/tickets'
import {useTicketsLoader} from '@/composables/useTickets'
import type {Ticket} from '~/store/tickets'
import type { SortOption } from '~/store/tickets'

const store = useTicketsStore()
const makeTicketKey = (ticket: Ticket) =>
    `${ticket.carrier}-${ticket.price}-${ticket.segments[0].origin}-${ticket.segments[0].destination}-${ticket.segments[1].origin}-${ticket.segments[1].destination}`

const loadMore = () => store.loadMoreTickets(5)
const isInitialized = ref(false);

function onSortChange(option: SortOption) {
  console.log('Selected sort option:', option)
  store.setSortOption(option)
}
onMounted(() => {
  useTicketsLoader()
  isInitialized.value = true;
})
</script>

<template>
  <main class="main">
    <div class="main__logo">
      <img src="/icons/Logo.svg" alt="Logo">
    </div>
    <div class="container">
      <div class="main__sidebar">
        <div class="main__filter">
          <FilterPanel/>
        </div>
        <div class="main__tickets">
          <SortTabs @change="onSortChange" class="main__tickets_tabs" />
          <TransitionGroup name="ticket-fade" tag="div">
            <TicketCard
                class="main__tickets_card"
                v-for="(ticket, index) in store.visibleTickets"
                :key="index"
                :ticket="ticket"
            />


            <div v-if="store.loading && !store.visibleTickets.length">
              <p>Завантаження...</p>
            </div>
            <div v-if="isInitialized && !store.visibleTickets.length && !store.loading">
              <p>Квитків не знайдено</p>
            </div>

          </TransitionGroup>
          <button
              v-if="store.visibleTickets.length"
              @click="loadMore"
              class="main__load-more"
          >
            Завантажити ще 5 квитків
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.ticket-fade-enter-active {
  transition: all 0.3s ease;
}

.ticket-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.ticket-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.main {
  &__sidebar {
    display: flex;
    @media (max-width: 680px) {
      flex-direction: column;
    }
  }

  &__logo {
    display: flex;
    justify-content: center;
    padding: 50px 0;

    @media (max-width: 680px) {
      padding: 15px 0;
    }
  }

  &__filter {
    margin-right: 20px;

    @media (max-width: 680px) {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

  &__tickets {
    flex: 2;
    display: flex;
    flex-direction: column;

    &_card {
      margin-bottom: 20px;
    }

    &_tabs {
      margin-bottom: 20px;
    }
  }

  &__load-more {
    width: 100%;
    padding: 15px 20px;
    background-color: $primary;
    text-transform: uppercase;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    line-height: 1.66;
    color: $white;
    transition: 0.3s;
    margin-bottom: 40px;

    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>