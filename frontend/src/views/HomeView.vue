<template>
  <!-- Custom Home Content: Full Page Mode -->
  <div v-if="homeContent" class="min-h-screen">
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      class="h-screen w-full border-0"
      allowfullscreen
    ></iframe>
    <!-- SECURITY: homeContent is an admin-only setting. -->
    <div v-else v-html="homeContent"></div>
  </div>

  <!-- Default Home Page -->
  <div v-else class="commercial-home min-h-screen bg-slate-50 text-slate-950 dark:bg-[#030914] dark:text-white">
    <header class="commercial-header">
      <nav class="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <router-link to="/home" class="brand-link">
          <span class="brand-logo">
            <img :src="siteLogo || '/logo.png'" alt="Logo" class="h-full w-full object-contain" />
          </span>
          <span class="min-w-0">
            <strong class="block truncate text-sm font-bold text-slate-950 dark:text-white">{{ siteName }}</strong>
            <small class="mt-0.5 hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-cyan-100/55 sm:block">
              {{ t('home.brandTagline') }}
            </small>
          </span>
        </router-link>

        <div class="hidden items-center gap-8 lg:flex">
          <a href="#api-platform" class="nav-link">{{ t('home.nav.apiPlatform') }}</a>
          <a href="#capabilities" class="nav-link">{{ t('home.nav.capabilities') }}</a>
          <a href="#purchase-flow" class="nav-link">{{ t('home.nav.purchaseFlow') }}</a>
          <a href="#providers" class="nav-link">{{ t('home.nav.providers') }}</a>
        </div>

        <div class="flex items-center gap-2">
          <LocaleSwitcher />

          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="icon-button"
            :title="t('home.viewDocs')"
          >
            <Icon name="book" size="md" />
          </a>

          <button
            type="button"
            @click="toggleTheme"
            class="icon-button"
            :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
          >
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>

          <router-link :to="platformPath" class="header-platform-button">
            {{ isAuthenticated ? t('home.dashboard') : t('home.login') }}
          </router-link>
        </div>
      </nav>
    </header>

    <main>
      <section class="hero-section">
        <div class="hero-grid" aria-hidden="true"></div>
        <div class="code-ghost" aria-hidden="true">
          <span>import DreamPool from 'dreampool'</span>
          <span>const client = new DreamPool({ apiKey })</span>
          <span>baseURL: 'https://api.dreampool.cn'</span>
          <span>await client.chat.completions.create()</span>
        </div>

        <div class="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-8 lg:py-20">
          <div class="hero-copy">
            <div class="hero-badge">
              <Icon name="terminal" size="sm" />
              <span>{{ t('home.commercialBadge') }}</span>
            </div>

            <h1 class="mt-6 text-4xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              {{ t('home.salesHero.titleLine1') }}
              <span class="text-primary-500 dark:text-[#2ee575]">AI</span>
              <br />
              {{ t('home.salesHero.titleLine2') }}
            </h1>
            <p class="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              {{ t('home.salesHero.description') }}
            </p>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ siteSubtitle }}</p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <router-link :to="primaryActionPath" class="primary-cta">
                <span>{{ primaryActionText }}</span>
                <Icon name="arrowRight" size="sm" :stroke-width="2.2" />
              </router-link>
              <router-link to="/key-usage" class="secondary-cta">
                <span>{{ t('home.viewUsage') }}</span>
                <Icon name="externalLink" size="sm" :stroke-width="2" />
              </router-link>
            </div>

            <div class="api-endpoint">
              <Icon name="terminal" size="md" />
              <span>{{ t('home.apiEndpoint') }}</span>
            </div>

            <div class="proof-row">
              <span><Icon name="checkCircle" size="sm" />{{ t('home.proof.stable') }}</span>
              <span><Icon name="checkCircle" size="sm" />{{ t('home.proof.billing') }}</span>
              <span><Icon name="checkCircle" size="sm" />{{ t('home.proof.integration') }}</span>
            </div>
          </div>

          <div class="api-window hero-window">
            <div class="window-topbar">
              <div class="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="window-title">
                <span class="mini-logo">DP</span>
                {{ t('home.preview.console') }}
              </div>
              <span class="window-status">{{ t('home.preview.healthy') }}</span>
            </div>

            <div class="dashboard-preview">
              <aside class="preview-sidebar">
                <span
                  v-for="tab in previewTabs"
                  :key="tab.key"
                  :class="{ active: tab.active }"
                >
                  <Icon :name="tab.icon" size="sm" />
                  {{ t(`home.preview.${tab.labelKey}`) }}
                </span>
              </aside>

              <div class="preview-main">
                <div class="metric-grid">
                  <div v-for="item in previewStats" :key="item.label" class="metric-card">
                    <span>{{ item.label }}</span>
                    <strong>{{ item.value }}</strong>
                    <em>{{ item.status }}</em>
                  </div>
                </div>

                <div class="preview-panels">
                  <div class="chart-panel">
                    <div class="panel-title">{{ t('home.preview.trend') }}</div>
                    <svg viewBox="0 0 360 160" role="img" :aria-label="t('home.preview.trend')">
                      <path class="grid-line" d="M20 35H340M20 75H340M20 115H340" />
                      <path class="area" d="M24 120 L70 98 L115 78 L160 58 L205 55 L250 74 L295 55 L336 34 L336 140 L24 140 Z" />
                      <path class="line" d="M24 120 L70 98 L115 78 L160 58 L205 55 L250 74 L295 55 L336 34" />
                      <g class="dots">
                        <circle cx="24" cy="120" r="4" />
                        <circle cx="70" cy="98" r="4" />
                        <circle cx="115" cy="78" r="4" />
                        <circle cx="160" cy="58" r="4" />
                        <circle cx="205" cy="55" r="4" />
                        <circle cx="250" cy="74" r="4" />
                        <circle cx="295" cy="55" r="4" />
                        <circle cx="336" cy="34" r="4" />
                      </g>
                    </svg>
                  </div>

                  <div class="feed-panel">
                    <div class="panel-title">{{ t('home.preview.recentCalls') }}</div>
                    <div v-for="item in recentRoutes" :key="item.text" class="feed-row">
                      <span>{{ item.method }}</span>
                      <code>{{ item.text }}</code>
                      <b>{{ item.status }}</b>
                    </div>
                    <router-link :to="platformPath">{{ t('home.preview.viewAll') }}</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" class="capabilities-strip">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2>{{ t('home.capabilities.stripTitle') }}</h2>
          <div class="capability-grid">
            <article class="capability-item">
              <Icon name="swap" size="xl" />
              <div>
                <h3>{{ t('home.features.unifiedGateway') }}</h3>
                <p>{{ t('home.features.unifiedGatewayDesc') }}</p>
              </div>
            </article>
            <article class="capability-item">
              <Icon name="creditCard" size="xl" />
              <div>
                <h3>{{ t('home.features.rechargeBilling') }}</h3>
                <p>{{ t('home.features.rechargeBillingDesc') }}</p>
              </div>
            </article>
            <article class="capability-item">
              <Icon name="shield" size="xl" />
              <div>
                <h3>{{ t('home.features.stableAccess') }}</h3>
                <p>{{ t('home.features.stableAccessDesc') }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="api-platform" class="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:px-8">
        <div>
          <p class="section-kicker">{{ t('home.apiPlatform.kicker') }}</p>
          <h2 class="section-title">{{ t('home.apiPlatform.title') }}</h2>
          <p class="section-copy">{{ t('home.apiPlatform.description') }}</p>

          <ul class="feature-list">
            <li><Icon name="checkCircle" size="sm" />{{ t('home.apiPlatform.points.models') }}</li>
            <li><Icon name="checkCircle" size="sm" />{{ t('home.apiPlatform.points.recharge') }}</li>
            <li><Icon name="checkCircle" size="sm" />{{ t('home.apiPlatform.points.usage') }}</li>
            <li><Icon name="checkCircle" size="sm" />{{ t('home.apiPlatform.points.integration') }}</li>
          </ul>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <router-link :to="primaryActionPath" class="primary-cta">
              <span>{{ primaryActionText }}</span>
              <Icon name="arrowRight" size="sm" :stroke-width="2.2" />
            </router-link>
            <a v-if="docUrl" :href="docUrl" target="_blank" rel="noopener noreferrer" class="secondary-cta">
              <span>{{ t('home.docs') }}</span>
              <Icon name="book" size="sm" />
            </a>
          </div>
        </div>

        <div class="language-window integration-window">
          <div class="language-topbar">
            <div class="language-brand">
              <Icon name="terminal" size="md" />
              <span>{{ t('home.codeExamples.endpoint') }}</span>
            </div>
            <div class="language-tabs" role="tablist" :aria-label="t('home.codeExamples.tabsLabel')">
              <button
                v-for="example in codeExamples"
                :key="example.key"
                type="button"
                role="tab"
                :aria-selected="selectedExample === example.key"
                :class="{ active: selectedExample === example.key }"
                @click="selectedExample = example.key"
              >
                {{ example.label }}
              </button>
            </div>
          </div>

          <div class="language-code-panel">
            <button
              type="button"
              class="copy-code-button"
              :title="copySuccess ? t('home.codeExamples.copied') : t('home.codeExamples.copy')"
              :aria-label="copySuccess ? t('home.codeExamples.copied') : t('home.codeExamples.copy')"
              @click="copyActiveExample"
            >
              <Icon :name="copySuccess ? 'check' : 'copy'" size="md" />
            </button>
            <pre><code>{{ activeCodeExample.code }}</code></pre>
          </div>
        </div>
      </section>

      <section id="purchase-flow" class="flow-section">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-3xl text-center">
            <p class="section-kicker">{{ t('home.purchaseFlow.kicker') }}</p>
            <h2 class="section-title">{{ t('home.purchaseFlow.title') }}</h2>
            <p class="section-copy">{{ t('home.purchaseFlow.description') }}</p>
          </div>

          <div class="mt-10 grid gap-4 md:grid-cols-4">
            <article v-for="step in purchaseSteps" :key="step.key" class="flow-card">
              <span>{{ step.num }}</span>
              <div class="flow-icon">
                <Icon :name="step.icon" size="lg" />
              </div>
              <h3>{{ t(`home.purchaseFlow.steps.${step.key}.title`) }}</h3>
              <p>{{ t(`home.purchaseFlow.steps.${step.key}.desc`) }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="providers" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p class="section-kicker">{{ t('home.providers.kicker') }}</p>
            <h2 class="section-title">{{ t('home.providers.title') }}</h2>
            <p class="section-copy">{{ t('home.providers.description') }}</p>
          </div>

          <div class="provider-grid">
            <div class="provider-tile">
              <span class="provider-mark bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">C</span>
              <span>{{ t('home.providers.claude') }}</span>
              <strong>{{ t('home.providers.supported') }}</strong>
            </div>
            <div class="provider-tile">
              <span class="provider-mark bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">G</span>
              <span>GPT</span>
              <strong>{{ t('home.providers.supported') }}</strong>
            </div>
            <div class="provider-tile">
              <span class="provider-mark bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">G</span>
              <span>{{ t('home.providers.gemini') }}</span>
              <strong>{{ t('home.providers.supported') }}</strong>
            </div>
            <div class="provider-tile">
              <span class="provider-mark bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">A</span>
              <span>{{ t('home.providers.antigravity') }}</span>
              <strong>{{ t('home.providers.supported') }}</strong>
            </div>
          </div>
        </div>
      </section>

    </main>

    <footer class="border-t border-slate-200/80 px-4 py-8 dark:border-cyan-100/10 sm:px-6 lg:px-8">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {{ currentYear }} {{ siteName }}. {{ t('home.footer.allRightsReserved') }}</p>
        <div class="flex items-center gap-5">
          <router-link :to="platformPath" class="transition-colors duration-200 hover:text-slate-900 dark:hover:text-white">
            {{ t('home.dashboard') }}
          </router-link>
          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors duration-200 hover:text-slate-900 dark:hover:text-white"
          >
            {{ t('home.docs') }}
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore, useAppStore } from '@/stores'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import Icon from '@/components/icons/Icon.vue'

const { t } = useI18n()

const authStore = useAuthStore()
const appStore = useAppStore()

const siteName = computed(() => appStore.cachedPublicSettings?.site_name || appStore.siteName || 'DreamPool API')
const siteLogo = computed(() => appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '')
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || t('home.salesHero.subtitle'))
const docUrl = computed(() => appStore.cachedPublicSettings?.doc_url || appStore.docUrl || '')
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')

const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

const isDark = ref(document.documentElement.classList.contains('dark'))

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => isAdmin.value ? '/admin/dashboard' : '/dashboard')
const platformPath = computed(() => isAuthenticated.value ? dashboardPath.value : '/login')
const primaryActionPath = computed(() => isAuthenticated.value ? '/purchase' : '/login')
const primaryActionText = computed(() => isAuthenticated.value ? t('home.rechargeNow') : t('home.getStarted'))

const currentYear = computed(() => new Date().getFullYear())

const previewTabs: Array<{
  key: string
  labelKey: string
  icon: 'grid' | 'key' | 'creditCard' | 'chart'
  active?: boolean
}> = [
  { key: 'overview', labelKey: 'overview', icon: 'grid', active: true },
  { key: 'keys', labelKey: 'keys', icon: 'key' },
  { key: 'recharge', labelKey: 'recharge', icon: 'creditCard' },
  { key: 'usage', labelKey: 'usage', icon: 'chart' }
]

const previewStats = computed(() => [
  { label: t('home.preview.todayCalls'), value: '32,784 次', status: t('home.preview.available') },
  { label: t('home.preview.successRate'), value: '99.92%', status: t('home.preview.normal') },
  { label: t('home.preview.latency'), value: '320 ms', status: t('home.preview.good') },
  { label: t('home.preview.tokens'), value: '1.24M', status: t('home.preview.available') }
])

const recentRoutes = [
  { method: 'POST', text: '/v1/chat/completions', status: '200' },
  { method: 'POST', text: '/v1/embeddings', status: '200' },
  { method: 'POST', text: '/v1/image/generations', status: '200' },
  { method: 'POST', text: '/v1/tts/speech', status: '200' }
]

const purchaseSteps = [
  { key: 'signup', num: '01', icon: 'userPlus' as const },
  { key: 'recharge', num: '02', icon: 'creditCard' as const },
  { key: 'key', num: '03', icon: 'key' as const },
  { key: 'call', num: '04', icon: 'terminal' as const }
]

const selectedExample = ref('python')
const copySuccess = ref(false)

const codeExamples = [
  {
    key: 'csharp',
    label: 'CSHARP',
    code: `using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
client.BaseAddress = new Uri("https://api.dreampool.cn/v1/");
client.DefaultRequestHeaders.Authorization =
    new AuthenticationHeaderValue("Bearer", "your-api-key");

var body = """
{
  "model": "gpt-5.1",
  "messages": [
    { "role": "user", "content": "Hello!" }
  ]
}
""";

var response = await client.PostAsync(
    "chat/completions",
    new StringContent(body, Encoding.UTF8, "application/json")
);`
  },
  {
    key: 'javascript',
    label: 'JAVASCRIPT',
    code: `import OpenAI from "openai"

const client = new OpenAI({
  baseURL: "https://api.dreampool.cn/v1",
  apiKey: process.env.DREAMPOOL_API_KEY
})

const response = await client.chat.completions.create({
  model: "gpt-5.1",
  messages: [
    { role: "user", content: "Hello!" }
  ]
})`
  },
  {
    key: 'python',
    label: 'PYTHON',
    code: `from openai import OpenAI

client = OpenAI(
    base_url="https://api.dreampool.cn/v1",
    api_key="your-api-key"
)

response = client.chat.completions.create(
    model="gpt-5.1",
    messages=[{"role": "user", "content": "Hello!"}]
)`
  },
  {
    key: 'go',
    label: 'GO',
    code: `package main

import (
  "context"
  "os"

  "github.com/openai/openai-go"
  "github.com/openai/openai-go/option"
)

func main() {
  client := openai.NewClient(
    option.WithBaseURL("https://api.dreampool.cn/v1"),
    option.WithAPIKey(os.Getenv("DREAMPOOL_API_KEY")),
  )

  _, _ = client.Chat.Completions.New(context.TODO(),
    openai.ChatCompletionNewParams{
      Model: "gpt-5.1",
      Messages: []openai.ChatCompletionMessageParamUnion{
        openai.UserMessage("Hello!"),
      },
    },
  )
}`
  }
]

const activeCodeExample = computed(() => {
  return codeExamples.find((example) => example.key === selectedExample.value) || codeExamples[0]
})

async function copyActiveExample() {
  try {
    await navigator.clipboard.writeText(activeCodeExample.value.code)
    copySuccess.value = true
    window.setTimeout(() => {
      copySuccess.value = false
    }, 1600)
  } catch {
    copySuccess.value = false
  }
}

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
}

onMounted(() => {
  initTheme()
  authStore.checkAuth()

  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }
})
</script>

<style scoped>
.commercial-home {
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.045) 1px, transparent 1px);
  background-size: 32px 32px;
}

:deep(.dark) .commercial-home,
.commercial-home:where(.dark *) {
  background-image:
    linear-gradient(rgba(91, 135, 173, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(91, 135, 173, 0.08) 1px, transparent 1px);
}

.commercial-header {
  @apply sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-cyan-100/10 dark:bg-dark-950/90;
}

.brand-link {
  @apply flex min-w-0 items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500;
}

.brand-logo {
  @apply flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-cyan-100/20 dark:bg-cyan-100/5;
}

.nav-link {
  @apply text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-primary-700 dark:text-slate-300 dark:hover:text-emerald-400;
}

.icon-button {
  @apply inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white;
}

.header-platform-button {
  @apply inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:border-primary-500 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-white/55 dark:bg-transparent dark:text-white dark:hover:border-emerald-400 dark:hover:text-emerald-400;
}

.hero-section {
  @apply relative overflow-hidden border-b border-slate-200/80 dark:border-cyan-100/10;
}

.hero-grid {
  @apply pointer-events-none absolute inset-0;
  mask-image: linear-gradient(to bottom, black 0%, transparent 82%);
}

.code-ghost {
  @apply pointer-events-none absolute -left-20 top-28 hidden w-[500px] select-none font-mono text-xs leading-7 text-slate-300/40 dark:text-cyan-200/15 lg:grid xl:-left-10;
  mask-image: linear-gradient(to right, black 0%, black 48%, transparent 88%);
}

.code-ghost span:nth-child(odd) {
  @apply text-primary-500/35 dark:text-emerald-400/20;
}

.hero-copy {
  @apply relative z-10;
}

.hero-badge {
  @apply inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-sm font-semibold text-primary-800 dark:border-primary-300/40 dark:bg-primary-400/10 dark:text-primary-100;
}

.primary-cta {
  @apply inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400;
}

.secondary-cta {
  @apply inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-bold text-slate-900 transition-colors duration-200 hover:border-primary-500 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-white/55 dark:bg-dark-900/70 dark:text-white dark:hover:border-emerald-400 dark:hover:text-emerald-400;
}

.api-endpoint {
  @apply mt-7 inline-flex items-center gap-2 font-mono text-base font-bold text-primary-600 dark:text-emerald-400;
}

.proof-row {
  @apply mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-slate-600 dark:text-slate-300;
}

.proof-row span {
  @apply inline-flex items-center gap-2;
}

.proof-row svg {
  @apply text-primary-500 dark:text-emerald-200;
}

.api-window {
  @apply overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card dark:border-cyan-100/25 dark:bg-dark-900/95 dark:shadow-[0_24px_80px_rgba(0,0,0,0.42)];
}

.hero-window {
  @apply relative z-10;
}

.window-topbar {
  @apply flex h-12 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 dark:border-cyan-100/10 dark:bg-white/[0.03];
}

.window-dots {
  @apply flex items-center gap-2;
}

.window-dots span {
  @apply h-2.5 w-2.5 rounded-full;
}

.window-dots span:nth-child(1) {
  @apply bg-red-400;
}

.window-dots span:nth-child(2) {
  @apply bg-amber-400;
}

.window-dots span:nth-child(3) {
  @apply bg-emerald-400;
}

.window-title {
  @apply flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-200;
}

.mini-logo {
  @apply rounded bg-primary-50 px-1.5 py-1 font-mono text-[10px] text-primary-700 dark:bg-emerald-400/10 dark:text-emerald-400;
}

.window-status {
  @apply rounded bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200;
}

.dashboard-preview {
  @apply grid min-h-[430px] md:grid-cols-[142px_1fr] xl:min-h-[450px] xl:grid-cols-[148px_1fr];
}

.preview-sidebar {
  @apply hidden border-r border-slate-200 bg-slate-50/70 p-3 dark:border-cyan-100/10 dark:bg-dark-950/50 md:block;
}

.preview-sidebar span {
  @apply mb-2 flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400;
}

.preview-sidebar span.active {
  @apply bg-primary-50 text-primary-800 dark:bg-emerald-400/10 dark:text-emerald-200;
}

.preview-main {
  @apply min-w-0 p-4;
}

.metric-grid {
  @apply grid gap-3 sm:grid-cols-2 xl:grid-cols-4;
}

.metric-card {
  @apply min-w-0 rounded-lg border border-slate-200 bg-white p-4 dark:border-cyan-100/10 dark:bg-white/[0.03];
}

.metric-card span,
.metric-card em {
  @apply block text-xs not-italic text-slate-500 dark:text-slate-400;
}

.metric-card strong {
  @apply mt-3 block whitespace-nowrap text-lg font-black leading-tight text-slate-950 dark:text-white;
}

.metric-card em {
  @apply mt-1 text-emerald-600 dark:text-emerald-200;
}

.preview-panels {
  @apply mt-4 grid gap-3 xl:grid-cols-[1.25fr_0.75fr];
}

.chart-panel,
.feed-panel {
  @apply rounded-lg border border-slate-200 bg-white p-4 dark:border-cyan-100/10 dark:bg-dark-950/40;
}

.panel-title {
  @apply mb-3 text-xs font-bold text-slate-500 dark:text-slate-300;
}

.chart-panel svg {
  @apply h-44 w-full;
}

.grid-line {
  stroke: currentColor;
  @apply text-slate-200 dark:text-cyan-100/10;
}

.area {
  fill: rgba(14, 165, 233, 0.14);
}

.line {
  fill: none;
  stroke: #38bdf8;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 4;
}

.dots circle {
  fill: #22c55e;
  stroke: #fff;
  stroke-width: 2;
}

.feed-row {
  @apply grid grid-cols-[44px_1fr_34px] items-center gap-2 border-b border-slate-100 py-2 text-xs last:border-0 dark:border-cyan-100/10;
}

.feed-row span {
  @apply font-mono font-bold text-primary-700 dark:text-emerald-200;
}

.feed-row code {
  @apply truncate font-mono text-slate-600 dark:text-slate-300;
}

.feed-row b {
  @apply text-right font-mono text-emerald-600 dark:text-emerald-200;
}

.feed-panel a {
  @apply mt-3 inline-flex text-xs font-bold text-primary-700 hover:text-primary-800 dark:text-emerald-400;
}

.capabilities-strip {
  @apply border-b border-slate-200/80 bg-white/80 py-8 dark:border-cyan-100/10 dark:bg-dark-900/80;
}

.capabilities-strip h2 {
  @apply mb-5 text-center text-xl font-black text-slate-950 dark:text-white;
}

.capability-grid {
  @apply grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-cyan-100/20 dark:bg-dark-900/80 md:grid-cols-3;
}

.capability-item {
  @apply flex gap-4 border-b border-slate-200 p-6 last:border-b-0 dark:border-cyan-100/10 md:border-b-0 md:border-r md:last:border-r-0;
}

.capability-item svg {
  @apply shrink-0 text-primary-500 dark:text-cyan-300;
}

.capability-item h3 {
  @apply text-base font-black text-slate-950 dark:text-white;
}

.capability-item p {
  @apply mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400;
}

.section-kicker {
  @apply text-sm font-bold text-primary-700 dark:text-emerald-400;
}

.section-title {
  @apply mt-3 text-3xl font-black text-slate-950 dark:text-white sm:text-4xl;
}

.section-copy {
  @apply mt-4 text-base leading-7 text-slate-600 dark:text-slate-300;
}

.feature-list {
  @apply mt-6 grid gap-3 text-sm font-medium text-slate-600 dark:text-slate-300;
}

.feature-list li {
  @apply flex items-center gap-2;
}

.feature-list svg {
  @apply text-primary-500 dark:text-emerald-200;
}

.flow-section {
  @apply border-y border-slate-200/80 bg-white/80 dark:border-cyan-100/10 dark:bg-dark-900/70;
}

.flow-card {
  @apply relative rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-cyan-100/15 dark:bg-dark-900/90;
}

.flow-card > span {
  @apply font-mono text-sm font-black text-primary-600 dark:text-emerald-400;
}

.flow-icon {
  @apply mt-5 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-cyan-200;
}

.flow-card h3 {
  @apply mt-5 text-base font-black text-slate-950 dark:text-white;
}

.flow-card p {
  @apply mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400;
}

.provider-grid {
  @apply grid gap-3 sm:grid-cols-2;
}

.provider-tile {
  @apply flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold text-slate-800 shadow-sm dark:border-cyan-100/15 dark:bg-dark-900/90 dark:text-slate-100;
}

.provider-tile strong {
  @apply ml-auto rounded bg-primary-50 px-2 py-1 text-xs font-bold text-primary-700 dark:bg-emerald-400/10 dark:text-emerald-200;
}

.provider-mark {
  @apply flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-black;
}

.language-window {
  @apply overflow-hidden rounded-lg border border-slate-900 bg-[#111511] text-slate-100 shadow-[0_28px_90px_rgba(15,23,42,0.24)] dark:border-emerald-300/15 dark:bg-[#101410] dark:shadow-[0_28px_90px_rgba(0,0,0,0.52)];
}

.integration-window {
  @apply min-w-0;
}

.language-topbar {
  @apply flex min-h-[58px] items-center justify-between gap-3 border-b border-white/10 bg-[#1a1e1a] px-4;
}

.language-brand {
  @apply flex min-w-0 items-center gap-2 font-mono text-base font-black text-slate-100 sm:text-lg;
}

.language-brand svg {
  @apply shrink-0 text-emerald-300;
}

.language-brand span {
  @apply truncate;
}

.language-tabs {
  @apply flex shrink items-center gap-2 overflow-x-auto;
  scrollbar-width: none;
}

.language-tabs::-webkit-scrollbar {
  display: none;
}

.language-tabs button {
  @apply h-9 shrink-0 cursor-pointer rounded-lg px-3 text-xs font-black uppercase text-slate-400 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:px-4 sm:text-sm;
}

.language-tabs button.active {
  @apply bg-emerald-300 text-slate-950 hover:text-slate-950;
}

.language-code-panel {
  @apply relative min-h-[360px] bg-[#0f140f] p-5;
}

.language-code-panel pre {
  @apply max-h-[420px] max-w-full overflow-auto pr-10 font-mono text-sm leading-7 text-slate-200 sm:text-base sm:leading-8;
}

.language-code-panel code {
  @apply block min-w-max whitespace-pre;
}

.copy-code-button {
  @apply absolute right-4 top-4 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition-colors duration-200 hover:border-emerald-300/50 hover:text-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300;
}

@media (max-width: 640px) {
  .language-topbar {
    @apply min-h-0 flex-col items-stretch px-4 py-4;
  }

  .language-tabs {
    @apply -mx-1;
  }

  .language-code-panel {
    @apply min-h-[340px] p-4;
  }

  .language-code-panel pre {
    @apply text-sm leading-7;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
}
</style>
