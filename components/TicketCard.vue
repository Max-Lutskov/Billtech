<script setup lang="ts">
import BaseCard from "@/components/baseComponents/BaseCard.vue";
import { formatFlightTime, formatDuration } from '@/composables/utils/flightTimeUtils'
import { getStopsText } from "@/composables/utils/stopsTextUtils";

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
});

const formattedPrice = computed(() =>
    new Intl.NumberFormat('uk-UA').format(props.ticket.price)
)
</script>
<template>
  <BaseCard class="ticket">
      <div class="ticket__header">
        <h2 class="ticket__price">
          {{ formattedPrice }} ₴
        </h2>
        <div class="ticket__carrier">
          <img
              :src="`https://pics.avs.io/99/36/${ticket.carrier}.png`"
              :alt="`${ticket.carrier} logo`"
              width="70"
              height="32"
          />
        </div>
      </div>
      <div class="ticket__body">
        <div class="ticket__segments" v-for="segment in ticket.segments" :key="segment.uuid">
          <div class="ticket__segments_time">
            <h3 class="ticket__segments_title">{{ segment.origin }} - {{ segment.destination }}</h3>
            <h3 class="ticket__segments_value">{{ formatFlightTime(segment.date, segment.duration) }}</h3>
          </div>
          <div class="ticket__segments_duration">
            <h3 class="ticket__segments_title">Тривалість</h3>
            <h3 class="ticket__segments_value">{{ formatDuration(segment.duration) }}</h3>
          </div>
          <div class="ticket__segments_connection">
            <h3 class="ticket__segments_title"> {{ getStopsText(segment.stops.length) }}</h3>
            <h3 class="ticket__segments_value">{{ segment.stops.join(', ') }}</h3>
          </div>
        </div>
      </div>
  </BaseCard>
</template>

<style lang="scss" scoped>
.ticket {
  padding: 23px 20px 20px 20px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 21px;
  }

  &__price {
    font-size: 24px;
    font-weight: 600;
    line-height: 1;
    color: $primary;
  }

  &__segments {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &_title {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: $secondary;

      @media (max-width: 410px) {
        font-size: 11px;
      }
    }

    &_value {
      font-size: 14px;
      font-weight: 600;

      @media (max-width: 410px) {
        font-size: 12px;
      }
    }
  }
}
</style>