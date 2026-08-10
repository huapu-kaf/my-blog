import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './public' }))
app.use(renderer)

// ---------------------------------------------------------------------------
// 数据
// ---------------------------------------------------------------------------

const tracks = [
  {
    id: 'kaiduan',
    title: '开端',
    cover: '/static/images/cover_kaiduan.jpg',
    audio: '/static/audio/kaiduan.mp3',
    duration: '2:02',
  },
  {
    id: 'chun',
    title: '春',
    cover: '/static/images/cover_chun.png',
    audio: '/static/audio/chun.mp3',
    duration: '1:22',
  },
  {
    id: 'xia',
    title: '夏',
    cover: '/static/images/cover_xia.jpg',
    video: '/static/video/xia.mp4',
    audio: '/static/audio/xia.mp3',
    duration: '2:18',
  },
  {
    id: 'qiu',
    title: '秋',
    cover: '/static/images/cover_qiu.jpg',
    video: '/static/video/qiu.mp4',
    audio: '/static/audio/qiu.mp3',
    duration: '2:48',
  },
  {
    id: 'dong',
    title: '冬',
    cover: '/static/images/cover_dong.png',
    audio: '/static/audio/dong.mp3',
    duration: '2:18',
  },
]

const competitions = [
  {
    period: '2024.07 - 2025.07',
    title: 'RoboMaster 机甲大师赛',
    subtitle: '哨兵机器人导航与决策系统开发',
    role: '哨兵组组长 · 算法设计与开发',
    points: [
      '多传感器融合定位：集成部署 FAST-LIVO2，针对动态与弱纹理场景调优，提升全局定位精度与鲁棒性',
      '端到端导航与决策：开发 NeuPAN 算法的 Nav2 控制器插件；设计行为树决策框架实现自适应避障与多任务调度',
      '底盘运动学解算：负责全向轮底盘运动学建模与逆解算',
    ],
    result: '2025年A类学科竞赛 国家级一等奖 ×1 · 二等奖 ×2 · 三等奖 ×3',
  },
  {
    period: '2026.01 - 2026.07',
    title: '全国大学生机械创新设计大赛',
    subtitle: '葱明绝净 —— 大葱洁净化处理包装一体机',
    role: '视觉负责人 · 视觉算法与上位机开发',
    points: [
      '智能视觉感知与去杂算法：独立设计部署 YOLO26 目标检测算法，实现复杂背景下大葱杂叶的精准识别定位',
      '工业化 Web 远程控制系统：独立架构开发完整 Web 端控制系统，实现运行状态可视化监控与远程启停控制',
    ],
    result: '全国一等奖 ×1 · 发明专利 ×2 · 实用新型专利 ×2 · 国家级创新创业训练项目良好结题',
  },
]

const awardList = [
  { year: '2026', name: '第十二届全国大学生机械创新设计大赛', level: '国家级一等奖' },
  { year: '2025', name: 'RoboMaster 机甲大师高校联盟赛 3V3 对抗赛', level: '国家级一等奖' },
  { year: '2025', name: '全国大学生机器人大赛 RoboMaster 高校联盟赛 3V3（哨兵机器人组）', level: '国家级二等奖' },
  { year: '2025', name: '全国大学生机器人大赛 RoboMaster 超级对抗赛 - 区域赛', level: '国家级二等奖' },
  { year: '2025', name: '全国大学生机器人大赛 RoboMaster 超级对抗赛 - 全国赛', level: '国家级三等奖' },
  { year: '2025', name: '全国大学生机器人大赛 RoboMaster 超级对抗赛（哨兵机器人组）', level: '国家级三等奖' },
  { year: '2025', name: '全国大学生机器人大赛 RoboMaster 超级对抗赛（步兵机器人组）', level: '国家级三等奖' },
]

const internships = [
  {
    period: '2025.09 - 2026.01',
    company: '广西云篆智能科技有限公司',
    role: '具身智能算法工程师',
    points: [
      '改进 Fast-LIVO2 算法，融合全向感知与回环检测机制，提升动态场景定位精度与鲁棒性',
      '基于 Nav2 框架适配部署 Neupan 端到端路径控制算法，优化机器人运动平滑度',
      '基于 ros-mcp-service 架构轻量化部署 VLA 模型，实现语音指令到自主作业的闭环',
    ],
  },
  {
    period: '2026.04 - 2026.08',
    company: '深圳市吉源盛科技有限公司',
    role: '智能机器人导航算法研发实习生',
    points: [
      '独立设计智能轮式机器人导航系统，融合多传感器数据实现室内外稳定定位与自主导航',
      '引入视觉目标识别算法，将草坪等特征稀疏区域动态规划为虚拟障碍物',
      '集成 NeuPAN 与 MPPI 算法，完成两款不同机器人底盘控制协议适配',
    ],
  },
]

// ---------------------------------------------------------------------------
// 页面
// ---------------------------------------------------------------------------

app.get('/', (c) => {
  return c.render(
    <>
      <div class="site-bg"></div>
      <div class="site-bg-mask"></div>

      {/* 导航栏 */}
      <header id="site-header" class="site-header">
        <nav class="nav-inner">
          <a href="#" class="brand" data-nav="home">
            <img src="/static/images/avatar.png" alt="真夜" class="brand-avatar" />
            <span class="brand-name">真夜</span>
          </a>
          <ul class="nav-links">
            <li><a href="#" data-nav="home" class="nav-link active">首页</a></li>
            <li><a href="#" data-nav="music" class="nav-link">音乐</a></li>
            <li><a href="#" data-nav="resume" class="nav-link">简历</a></li>
          </ul>
          <button id="nav-toggle" class="nav-toggle" aria-label="打开菜单">
            <i class="fa-solid fa-bars"></i>
          </button>
        </nav>
      </header>

      <main id="app-main">
        {/* ============================ 首页板块 ============================ */}
        <section id="view-home" class="view-page active">
          <div class="page-section intro-section">
            <div class="card intro-card">
              <img src="/static/images/avatar.png" alt="真夜" class="intro-avatar" />
              <h1 class="intro-name">真夜</h1>
              <p class="intro-desc">广西大学 · 机械电子工程专业</p>
              <p class="intro-desc-sub">动漫 / J-pop / 机器人算法</p>
            </div>
          </div>
        </section>

        {/* ============================ 音乐板块 ============================ */}
        <section id="view-music" class="view-page">
          <div class="page-section">
            <div class="card">
              <h2 class="card-title"><i class="fa-solid fa-music"></i> 音乐作品</h2>
              <p class="card-subtitle">原创歌曲，共 5 首</p>

              <div class="playlist-grid">
                {tracks.map((t, i) => (
                  <button class="track-card" data-index={i}>
                    <div class="track-cover-wrap">
                      <img src={t.cover} alt={t.title} class="track-cover" />
                      {t.video && (
                        <span class="track-video-badge"><i class="fa-solid fa-video"></i></span>
                      )}
                      <span class="track-play-overlay"><i class="fa-solid fa-play"></i></span>
                    </div>
                    <div class="track-meta">
                      <p class="track-title">{t.title}</p>
                      <p class="track-duration">{t.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================ 简历板块（教育/技能/竞赛/获奖/实习 整合） ============================ */}
        <section id="view-resume" class="view-page">
          <div class="page-section">
            <div class="card">
              <h2 class="card-title"><i class="fa-solid fa-user"></i> 教育背景</h2>
              <p class="about-line"><strong>广西大学</strong>（"211"工程建设高校 · 双一流建设高校）</p>
              <p class="about-line">机械工程学院 · 机械电子工程专业　|　2023.09 - 2027.06</p>
              <p class="about-line">英语能力：CET-6</p>
              <div class="tag-cloud">
                {['单片机原理及应用 91分', '电路原理 88分', '微机原理与接口技术', '计算机控制系统分析与设计', '控制理论与技术', '传感与检测技术', '机电传动控制', '机电系统设计与控制'].map((s) => (
                  <span class="tag-chip">{s}</span>
                ))}
              </div>
            </div>

            <div class="card">
              <h2 class="card-title"><i class="fa-solid fa-microchip"></i> 技能</h2>
              <ul class="plain-list">
                <li>机械结构设计与控制理论基础</li>
                <li>C++ / Python 编程</li>
                <li>ROS / ROS2、Nav2 导航框架、路径规划与底盘运动学控制</li>
                <li>YOLO 目标检测与多传感器融合感知</li>
                <li>Web 全栈与微信小程序开发（机器人上位机交互界面）</li>
              </ul>
            </div>

            <div class="card">
              <h2 class="card-title"><i class="fa-solid fa-trophy"></i> 竞赛项目</h2>
              {competitions.map((p) => (
                <div class="sub-block">
                  <p class="sub-period">{p.period}</p>
                  <h3 class="sub-title">{p.title}</h3>
                  <p class="sub-subtitle">{p.subtitle}</p>
                  <p class="sub-role">{p.role}</p>
                  <ul class="plain-list">
                    {p.points.map((pt) => <li>{pt}</li>)}
                  </ul>
                  <p class="sub-result">{p.result}</p>
                </div>
              ))}
            </div>

            <div class="card">
              <h2 class="card-title"><i class="fa-solid fa-medal"></i> 获奖列表</h2>
              <p class="card-subtitle">成员排名均靠前，另有十余项省级奖项未列出</p>
              <div class="awards-list">
                {awardList.map((a) => (
                  <div class="award-row">
                    <span class="award-year">{a.year}</span>
                    <span class="award-name">{a.name}</span>
                    <span class="award-level">{a.level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div class="card">
              <h2 class="card-title"><i class="fa-solid fa-briefcase"></i> 实习经历</h2>
              {internships.map((job) => (
                <div class="sub-block">
                  <p class="sub-period">{job.period}</p>
                  <h3 class="sub-title">{job.company}</h3>
                  <p class="sub-subtitle">{job.role}</p>
                  <ul class="plain-list">
                    {job.points.map((pt) => <li>{pt}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer class="site-footer">
        <p>© 2026 真夜</p>
      </footer>

      {/* ============================ 悬浮播放器（左下角） ============================ */}
      <div id="mini-player" class="mini-player">
        <button id="mini-toggle" class="mini-toggle" aria-label="展开/收起播放器">
          <img id="mini-cover" src={tracks[0].cover} alt="cover" class="mini-cover-icon" />
        </button>

        <div id="mini-panel" class="mini-panel">
          <div class="mini-panel-top">
            <img id="player-cover" src={tracks[0].cover} alt="封面" class="mini-cover" />
            <div class="mini-info">
              <p id="player-title" class="mini-title">{tracks[0].title}</p>
              <p class="mini-artist">真夜</p>
            </div>
            <button id="mini-close" class="mini-close" aria-label="收起"><i class="fa-solid fa-chevron-down"></i></button>
          </div>

          <div class="mini-progress-row">
            <span id="time-current" class="mini-time">0:00</span>
            <input id="progress-bar" type="range" min="0" max="100" value="0" class="mini-progress" />
            <span id="time-duration" class="mini-time">0:00</span>
          </div>

          <div class="mini-controls">
            <button id="btn-prev" class="mini-ctrl" aria-label="上一首"><i class="fa-solid fa-backward-step"></i></button>
            <button id="btn-play" class="mini-ctrl mini-ctrl-main" aria-label="播放/暂停"><i class="fa-solid fa-play" id="play-icon"></i></button>
            <button id="btn-next" class="mini-ctrl" aria-label="下一首"><i class="fa-solid fa-forward-step"></i></button>
            <button id="btn-mv" class="mini-ctrl mini-ctrl-mv" style="display:none" aria-label="播放MV"><i class="fa-solid fa-clapperboard"></i></button>
            <div class="mini-volume-wrap">
              <i class="fa-solid fa-volume-high"></i>
              <input id="volume-bar" type="range" min="0" max="100" value="80" class="mini-volume" />
            </div>
          </div>
        </div>
      </div>

      {/* 秋 MV 弹窗 */}
      <div id="mv-modal" class="mv-modal">
        <div class="mv-modal-inner">
          <button id="mv-close" class="mv-close" aria-label="关闭"><i class="fa-solid fa-xmark"></i></button>
          <video id="mv-video" playsinline controls></video>
        </div>
      </div>
    </>
  )
})

export default app
