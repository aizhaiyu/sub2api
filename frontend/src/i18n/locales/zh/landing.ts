export default {
  batchImageGuide: {
    title: '图片批量生成',
    description: '一次提交多条提示词，任务完成后可统一下载图片结果'
  },
  home: {
    viewOnGithub: '在 GitHub 上查看',
    viewDocs: '查看文档',
    docs: '文档',
    switchToLight: '切换到浅色模式',
    switchToDark: '切换到深色模式',
    dashboard: '控制台',
    login: '登录',
    getStarted: '立即开始',
    goToDashboard: '进入控制台',
    heroSubtitle: '一个密钥，畅用多个 AI 模型',
    heroDescription: '通过统一 API 入口使用 Claude、GPT、Gemini 等主流 AI 能力，支持 API Key 管理、用量查询与调用统计。',
    tags: {
      subscriptionToApi: '订阅转 API',
      stickySession: '会话保持',
      realtimeBilling: '按量计费'
    },
    painPoints: {
      title: '你是否也遇到这些问题？',
      items: {
        expensive: {
          title: '订阅费用高',
          desc: '每个 AI 服务都要单独订阅，每月支出越来越多'
        },
        complex: {
          title: '多账号难管理',
          desc: '不同平台的账号、密钥分散各处，管理起来很麻烦'
        },
        unstable: {
          title: '服务不稳定',
          desc: '单一账号容易触发限制，影响正常使用'
        },
        noControl: {
          title: '用量无法控制',
          desc: '不知道钱花在哪了，也无法限制团队成员的使用'
        }
      }
    },
    solutions: {
      title: '我们帮你解决',
      subtitle: '简单三步，开始省心使用 AI'
    },
    features: {
      unifiedGateway: '统一 API 调用',
      unifiedGatewayDesc: '一个 API Key 接入多种模型，兼容常见接口格式，减少业务接入成本。',
      multiAccount: '稳定可靠',
      multiAccountDesc: '按模型和通道状态智能调度，降低单一通道波动对业务的影响。',
      balanceQuota: '用多少付多少',
      balanceQuotaDesc: '按实际使用量计费，支持余额查询和 API Key 用量明细。',
      rechargeBilling: '充值与余额管理',
      rechargeBillingDesc: '在线购买额度，余额、订单、消耗记录清晰可查，适合个人与团队使用。',
      stableAccess: '稳定分发与路由',
      stableAccessDesc: '平台侧处理上游可用性与路由策略，帮助你的业务减少调用失败。'
    },
    comparison: {
      title: '为什么选择我们？',
      headers: {
        feature: '对比项',
        official: '官方订阅',
        us: '本平台'
      },
      items: {
        pricing: {
          feature: '付费方式',
          official: '固定月费，用不完也付',
          us: '按量付费，用多少付多少'
        },
        models: {
          feature: '模型选择',
          official: '单一服务商',
          us: '多模型随意切换'
        },
        management: {
          feature: '账号管理',
          official: '每个服务单独管理',
          us: '统一密钥，一站管理'
        },
        stability: {
          feature: '服务稳定性',
          official: '单账号易触发限制',
          us: '多账号池，自动切换'
        },
        control: {
          feature: '用量控制',
          official: '无法限制',
          us: '可设配额、查明细'
        }
      }
    },
    providers: {
      title: '多种 AI 模型统一购买与调用',
      description: '覆盖文本、代码、图像、语音等常见场景。具体可用模型与价格以平台展示为准。',
      supported: '已支持',
      soon: '即将推出',
      claude: 'Claude',
      gemini: 'Gemini',
      antigravity: 'Antigravity',
      more: '更多',
      kicker: '模型生态'
    },
    cta: {
      title: '充值额度，接入你的 AI 编程工具',
      description: '支持 Codex、Claude Code、Gemini CLI、OpenAI SDK 等常用客户端。进入平台购买额度，创建 API Key，然后复制到工具中即可开始调用。',
      button: '进入 API 平台',
      kicker: '开始使用',
      toolsLabel: '支持的工具与客户端',
      panelTitle: '快速接入',
      steps: {
        recharge: '购买或充值额度',
        createKey: '创建专属 API Key',
        connectTools: '配置到 Codex / Claude Code'
      }
    },
    footer: {
      allRightsReserved: '保留所有权利。'
    },
    rechargeNow: '立即充值',
    viewUsage: '查询用量',
    brandTagline: 'DREAMPOOL API',
    apiEndpoint: 'api.dreampool.cn',
    commercialBadge: '面向产品团队的 AI API 接入与调用平台',
    nav: {
      apiPlatform: 'API 平台',
      capabilities: '产品能力',
      purchaseFlow: '购买流程',
      providers: '模型支持'
    },
    salesHero: {
      titleLine1: '统一接入与调用',
      titleLine2: '把 AI 能力接进产品',
      subtitle: '稳定易用的 AI API 分发平台',
      description: '为开发者、团队与 AI 产品提供统一的模型调用、密钥管理、用量追踪和网关分发能力。一个 API 入口，快速接入 Claude、GPT、Gemini 等主流模型。'
    },
    proof: {
      stable: '稳定可靠',
      billing: '灵活计费',
      integration: '快速集成',
      uptime: '面向高可用网关场景',
      providers: '主流上游统一接入',
      unifiedAccess: '统一密钥与权限管理'
    },
    preview: {
      console: 'DreamPool API 控制台',
      overview: '概览',
      keys: '密钥管理',
      recharge: '充值中心',
      usage: '用量统计',
      trend: '调用趋势（近 7 天）',
      recentCalls: '最近调用',
      viewAll: '查看全部',
      todayCalls: '今日调用',
      successRate: '成功率',
      latency: '平均延迟',
      tokens: 'Token 消耗',
      available: '可用',
      normal: '正常',
      good: '良好',
      routingTitle: 'API 调用状态',
      routingSubtitle: '按模型、额度与稳定性智能处理请求',
      healthy: '运行正常',
      todaySpend: '今日消耗',
      withQuota: '已启用余额与配额保护',
      keyHealth: '账号池健康度',
      autoFailover: '异常账号自动降权与切换'
    },
    capabilities: {
      stripTitle: '我们为 AI API 用户提供稳定、透明、好集成的调用体验',
      kicker: '产品能力',
      title: '购买额度后即可开始调用',
      description: '无需自建复杂网关，也不需要维护多个供应商账号。平台提供充值、密钥、调用、账单和用量统计。'
    },
    apiPlatform: {
      kicker: 'DreamPool API',
      title: '用熟悉的语言快速接入 AI API',
      description: '兼容 OpenAI 风格接口，Codex、Claude Code、Cursor、脚本服务和业务后端都可以用同一个 Base URL 与 API Key 接入。',
      points: {
        models: '多模型聚合，按需选择',
        recharge: '余额充值，灵活购买',
        usage: '调用明细与消耗透明',
        integration: '标准 API，快速集成'
      }
    },
    requestDemo: {
      title: '接口调试 / 创建请求',
      send: '发送',
      request: '请求体',
      response: '返回结果',
      calls: '今日调用',
      successRate: '成功率',
      latency: '平均延迟',
      tokens: 'Tokens 消耗'
    },
    purchaseFlow: {
      kicker: '使用流程',
      title: '四步开始使用 AI API',
      description: '注册账号、完成充值、创建 API Key，然后在你的产品或脚本中直接调用。',
      steps: {
        signup: {
          title: '注册/登录账号',
          desc: '进入 API 平台，创建你的用户账号。'
        },
        recharge: {
          title: '购买或充值额度',
          desc: '按需充值余额，适合测试、开发和生产使用。'
        },
        key: {
          title: '创建 API Key',
          desc: '为项目生成独立密钥，便于管理和查询。'
        },
        call: {
          title: '接入业务调用',
          desc: '复制接口地址和 Key，快速接入你的应用。'
        }
      }
    },
    workflow: {
      kicker: '上线流程',
      title: '从账号接入到团队分发，路径更短',
      description: '管理员维护上游资源，用户只需要拿到自己的 API Key。平台负责路由、风控、计量和账单。',
      steps: {
        connect: {
          title: '接入上游账号',
          desc: '集中管理 OAuth、API Key 与代理配置，按平台和模型建立资源池。'
        },
        route: {
          title: '自动选择最优通道',
          desc: '结合账号状态、会话保持、限速策略和负载情况分发请求。'
        },
        control: {
          title: '精细化运营控制',
          desc: '为用户、分组和 Key 设置余额、配额、倍率、订阅与用量统计。'
        }
      }
    },
    codeExamples: {
      kicker: '开发者接入',
      title: '各种语言都可以直接调用',
      description: '兼容 OpenAI 风格接口，Codex、Claude Code、Cursor、脚本服务和业务后端都可以用同一个 Base URL 与 API Key 接入。',
      endpoint: 'api.dreampool.cn/v1',
      tabsLabel: '选择编程语言',
      copy: '复制代码',
      copied: '已复制'
    }
  },
  keyUsage: {
    title: 'API Key 用量查询',
    subtitle: '输入您的 API Key 以查看实时消费金额与使用状态',
    placeholder: 'sk-ant-mirror-xxxxxxxxxxxx',
    query: '查询',
    querying: '查询中...',
    privacyNote: '您的 Key 仅在浏览器本地处理，不会被存储',
    dateRange: '统计范围:',
    dateRangeToday: '今日',
    dateRange7d: '7 天',
    dateRange30d: '30 天',
    dateRange90d: '90 天',
    dateRangeCustom: '自定义',
    apply: '应用',
    used: '已使用',
    detailInfo: '详细信息',
    tokenStats: 'Token 统计',
    dailyDetail: '按日明细',
    modelStats: '模型用量统计',
    date: '日期',
    model: '模型',
    requests: '请求数',
    inputTokens: '输入 Tokens',
    outputTokens: '输出 Tokens',
    cacheCreationTokens: '缓存创建',
    cacheReadTokens: '缓存读取',
    cacheWriteTokens: '缓存写入',
    totalTokens: '总 Tokens',
    cost: '费用',
    quotaMode: 'Key 限额模式',
    walletBalance: '钱包余额',
    totalQuota: '总额度',
    limit5h: '5 小时限额',
    limitDaily: '日限额',
    limit7d: '7 天限额',
    limitWeekly: '周限额',
    limitMonthly: '月限额',
    remainingQuota: '剩余额度',
    expiresAt: '过期时间',
    todayExpires: '(今日到期)',
    daysLeft: '({days} 天)',
    usedQuota: '已用额度',
    resetNow: '即将重置',
    subscriptionType: '订阅类型',
    subscriptionExpires: '订阅到期',
    todayRequests: '今日请求',
    todayInputTokens: '今日输入',
    todayOutputTokens: '今日输出',
    todayTokens: '今日 Tokens',
    todayCacheCreation: '今日缓存创建',
    todayCacheRead: '今日缓存读取',
    todayCost: '今日费用',
    rpmTpm: 'RPM / TPM',
    totalRequests: '累计请求',
    totalInputTokens: '累计输入',
    totalOutputTokens: '累计输出',
    totalTokensLabel: '累计 Tokens',
    totalCacheCreation: '累计缓存创建',
    totalCacheRead: '累计缓存读取',
    totalCost: '累计费用',
    avgDuration: '平均耗时',
    enterApiKey: '请输入 API Key',
    querySuccess: '查询成功',
    queryFailed: '查询失败',
    queryFailedRetry: '查询失败，请稍后重试',
    noDailyUsage: '暂无按日用量数据'
  },
  setup: {
    title: 'Sub2API 安装向导',
    description: '配置您的 Sub2API 实例',
    database: {
      title: '数据库配置',
      description: '连接到您的 PostgreSQL 数据库',
      host: '主机',
      port: '端口',
      username: '用户名',
      password: '密码',
      databaseName: '数据库名称',
      sslMode: 'SSL 模式',
      passwordPlaceholder: '密码',
      ssl: {
        disable: '禁用',
        require: '要求',
        verifyCa: '验证 CA',
        verifyFull: '完全验证'
      }
    },
    redis: {
      title: 'Redis 配置',
      description: '连接到您的 Redis 服务器',
      host: '主机',
      port: '端口',
      password: '密码（可选）',
      database: '数据库',
      passwordPlaceholder: '密码',
      enableTls: '启用 TLS',
      enableTlsHint: '连接 Redis 时使用 TLS（公共 CA 证书）'
    },
    admin: {
      title: '管理员账户',
      description: '创建您的管理员账户',
      email: '邮箱',
      password: '密码',
      confirmPassword: '确认密码',
      passwordPlaceholder: '至少 8 个字符',
      confirmPasswordPlaceholder: '确认密码',
      passwordMismatch: '密码不匹配'
    },
    ready: {
      title: '准备安装',
      description: '检查您的配置并完成安装',
      database: '数据库',
      redis: 'Redis',
      adminEmail: '管理员邮箱'
    },
    status: {
      testing: '测试中...',
      success: '连接成功',
      testConnection: '测试连接',
      installing: '安装中...',
      completeInstallation: '完成安装',
      completed: '安装完成！',
      redirecting: '正在跳转到登录页面...',
      restarting: '服务正在重启，请稍候...',
      timeout: '服务重启时间超出预期，请手动刷新页面。'
    }
  }
}
