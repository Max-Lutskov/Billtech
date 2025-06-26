export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/image'],
  css: ['@/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/variables.scss" as *;`
        }
      }
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'uk'
      },
      title: 'Дешеві авіаквитки WAW → LAX – Порівняй ціни, час у дорозі та пересадки',
      meta: [
        {
          name: 'description',
          content: 'Порівняйте авіаквитки з Варшави до Лос-Анджелеса: ціни, час перельоту, кількість пересадок та авіакомпанії. Найдешевші та найшвидші рейси від Wizz Air та інших.'
        },
        {
          name: 'keywords',
          content: 'авіаквитки, Варшава Лос-Анджелес, рейси WAW LAX, дешеві квитки, Wizz Air, без пересадок, авіаперельоти'
        },
        {
          name: 'robots',
          content: 'index, follow'
        },
        {
          property: 'og:title',
          content: 'Авіаквитки WAW → LAX – Знайди найкращі пропозиції'
        },
        {
          property: 'og:description',
          content: 'Порівняння квитків з Варшави до Лос-Анджелеса. Обери оптимальний рейс по ціні та тривалості.'
        },
        {
          property: 'og:type',
          content: 'website'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap'
        }
      ]
    }
  }
})