// Static learning content — 36 units across 6 scenes × 3 levels × 2 units
// Run scripts/generate-content.mjs to regenerate with AI when API is available
import type { LearningUnit } from '@ds/types'

export const DAILY_UNITS: LearningUnit[] = [
  // ─── 日常生活 · beginner ──────────────────────────────────────────────────
  {
    id: 'daily-b1',
    level: 'beginner',
    scene: '日常生活',
    title: '超市结账',
    audioUrl: '',
    dialogueText: `A: Hi, did you find everything okay?
B: Yes, thanks. Can I pay by card?
A: Of course. Just tap here.
B: Great. Do I need a bag?
A: They're five cents each.
B: No thanks, I'm good.`,
    chunks: [
      { id: 'daily-b1-c1', text: 'Did you find everything okay?', audioUrl: '', scene: '收银员常用开场白' },
      { id: 'daily-b1-c2', text: 'Can I pay by card?', audioUrl: '', scene: '结账时询问付款方式' },
      { id: 'daily-b1-c3', text: 'Just tap here.', audioUrl: '', scene: '指引刷卡时说' },
      { id: 'daily-b1-c4', text: "I'm good, thanks.", audioUrl: '', scene: '礼貌拒绝时用' },
    ],
  },
  {
    id: 'daily-b2',
    level: 'beginner',
    scene: '日常生活',
    title: '和邻居打招呼',
    audioUrl: '',
    dialogueText: `A: Morning! Nice weather today, huh?
B: Yeah, finally! Been raining all week.
A: Are you heading out?
B: Just a quick walk. You?
A: Same. See you around!
B: Take care!`,
    chunks: [
      { id: 'daily-b2-c1', text: 'Nice weather today, huh?', audioUrl: '', scene: '和邻居搭话的万能开场' },
      { id: 'daily-b2-c2', text: 'Finally!', audioUrl: '', scene: '表达终于等到时用' },
      { id: 'daily-b2-c3', text: 'Are you heading out?', audioUrl: '', scene: '询问对方要出门时' },
      { id: 'daily-b2-c4', text: 'See you around!', audioUrl: '', scene: '随意道别时说' },
    ],
  },

  // ─── 日常生活 · intermediate ──────────────────────────────────────────────
  {
    id: 'daily-i1',
    level: 'intermediate',
    scene: '日常生活',
    title: '价格有误退款',
    audioUrl: '',
    dialogueText: `A: Excuse me, this rang up wrong. It should be on sale.
B: Let me check that for you. Do you have your receipt?
A: I have it on my phone.
B: Perfect. The discount didn't apply. I'll fix that right away.
A: Thanks, I appreciate it.
B: No problem. Sorry for the hassle.`,
    chunks: [
      { id: 'daily-i1-c1', text: 'This rang up wrong.', audioUrl: '', scene: '结账价格有误时说' },
      { id: 'daily-i1-c2', text: "I'll fix that right away.", audioUrl: '', scene: '承诺立刻处理问题' },
      { id: 'daily-i1-c3', text: 'I appreciate it.', audioUrl: '', scene: '表达感谢，比 thank you 更有温度' },
      { id: 'daily-i1-c4', text: 'Sorry for the hassle.', audioUrl: '', scene: '道歉给对方添麻烦时' },
    ],
  },
  {
    id: 'daily-i2',
    level: 'intermediate',
    scene: '日常生活',
    title: '和新邻居聊天',
    audioUrl: '',
    dialogueText: `A: Hey, I haven't seen you in ages! How've you been?
B: Pretty busy, honestly. We just moved in last month.
A: Oh wow, welcome to the neighborhood!
B: Thanks! Everyone's been really friendly.
A: Let me know if you need anything.
B: That's so kind of you.`,
    chunks: [
      { id: 'daily-i2-c1', text: "I haven't seen you in ages!", audioUrl: '', scene: '久未见面时的感叹' },
      { id: 'daily-i2-c2', text: 'Welcome to the neighborhood!', audioUrl: '', scene: '欢迎新邻居时说' },
      { id: 'daily-i2-c3', text: 'Let me know if you need anything.', audioUrl: '', scene: '表达愿意帮忙的万能句' },
      { id: 'daily-i2-c4', text: "That's so kind of you.", audioUrl: '', scene: '对方好意时表示感谢' },
    ],
  },

  // ─── 日常生活 · advanced ──────────────────────────────────────────────────
  {
    id: 'daily-a1',
    level: 'advanced',
    scene: '日常生活',
    title: '砍价谈折扣',
    audioUrl: '',
    dialogueText: `A: I noticed this has a small scratch. Any chance you could knock something off the price?
B: Hmm, I can do ten percent off. That's the best I can do.
A: What about fifteen? It's pretty noticeable.
B: Tell you what — I'll throw in free delivery.
A: Deal. That works for me.
B: Great, let me write that up.`,
    chunks: [
      { id: 'daily-a1-c1', text: 'Any chance you could knock something off?', audioUrl: '', scene: '委婉要求降价时' },
      { id: 'daily-a1-c2', text: "That's the best I can do.", audioUrl: '', scene: '表示已是最低价' },
      { id: 'daily-a1-c3', text: 'Tell you what —', audioUrl: '', scene: '提出折中方案前的过渡语' },
      { id: 'daily-a1-c4', text: 'Deal. That works for me.', audioUrl: '', scene: '达成协议时说' },
    ],
  },
  {
    id: 'daily-a2',
    level: 'advanced',
    scene: '日常生活',
    title: '聊社区新鲜事',
    audioUrl: '',
    dialogueText: `A: Did you hear about the new coffee shop opening on Fifth?
B: Yeah, I walked by the other day. Looks pretty upscale.
A: I heard they're doing a soft opening this weekend.
B: Might be worth checking out.
A: We should go together sometime.
B: Absolutely, I'm always up for that.`,
    chunks: [
      { id: 'daily-a2-c1', text: 'Did you hear about...?', audioUrl: '', scene: '分享消息时的开场句式' },
      { id: 'daily-a2-c2', text: 'Might be worth checking out.', audioUrl: '', scene: '表示某事值得一试' },
      { id: 'daily-a2-c3', text: 'We should go together sometime.', audioUrl: '', scene: '随意约人一起时' },
      { id: 'daily-a2-c4', text: "I'm always up for that.", audioUrl: '', scene: '表示随时都愿意' },
    ],
  },

  // ─── 职场英语 · beginner ──────────────────────────────────────────────────
  {
    id: 'work-b1',
    level: 'beginner',
    scene: '职场英语',
    title: '汇报项目进度',
    audioUrl: '',
    dialogueText: `A: Can you give us a quick update on the project?
B: Sure. We're on track. The main tasks are done.
A: Any blockers?
B: Not right now. We finish Friday.
A: Good. Let me know if anything comes up.
B: Will do.`,
    chunks: [
      { id: 'work-b1-c1', text: "We're on track.", audioUrl: '', scene: '汇报进度正常时说' },
      { id: 'work-b1-c2', text: 'Any blockers?', audioUrl: '', scene: '询问是否有阻碍' },
      { id: 'work-b1-c3', text: 'Let me know if anything comes up.', audioUrl: '', scene: '叮嘱有问题随时告知' },
      { id: 'work-b1-c4', text: 'Will do.', audioUrl: '', scene: '简洁答应对方的请求' },
    ],
  },
  {
    id: 'work-b2',
    level: 'beginner',
    scene: '职场英语',
    title: '讨论解决方案',
    audioUrl: '',
    dialogueText: `A: We have a problem with the login page.
B: What's wrong?
A: Users can't log in on mobile.
B: I see. Can we fix it today?
A: I think so. I need two hours.
B: Okay, keep me posted.`,
    chunks: [
      { id: 'work-b2-c1', text: 'We have a problem with...', audioUrl: '', scene: '汇报问题时的开场句' },
      { id: 'work-b2-c2', text: 'Can we fix it today?', audioUrl: '', scene: '询问能否当天解决' },
      { id: 'work-b2-c3', text: 'I need two hours.', audioUrl: '', scene: '告知需要的时间' },
      { id: 'work-b2-c4', text: 'Keep me posted.', audioUrl: '', scene: '要求对方随时更新进展' },
    ],
  },

  // ─── 职场英语 · intermediate ──────────────────────────────────────────────
  {
    id: 'work-i1',
    level: 'intermediate',
    scene: '职场英语',
    title: '会议进度汇报',
    audioUrl: '',
    dialogueText: `A: So where are we with the Q3 launch?
B: We're about eighty percent done. Core features are ready, but we're still testing the payment flow.
A: What's the timeline looking like?
B: We should be good to go by the fifteenth, assuming no major issues.
A: And if there are issues?
B: We have a buffer built in, so we can push to the eighteenth at the latest.`,
    chunks: [
      { id: 'work-i1-c1', text: "We're about eighty percent done.", audioUrl: '', scene: '汇报完成度时' },
      { id: 'work-i1-c2', text: "What's the timeline looking like?", audioUrl: '', scene: '询问时间节点' },
      { id: 'work-i1-c3', text: 'We should be good to go by...', audioUrl: '', scene: '预计完成时间的表达' },
      { id: 'work-i1-c4', text: 'We have a buffer built in.', audioUrl: '', scene: '说明有预留缓冲时间' },
    ],
  },
  {
    id: 'work-i2',
    level: 'intermediate',
    scene: '职场英语',
    title: '头脑风暴',
    audioUrl: '',
    dialogueText: `A: We need to cut costs without losing quality. Any ideas?
B: What if we moved some tasks offshore?
A: That's worth exploring. What about the communication overhead?
B: We could set up daily standups to stay aligned.
A: I like that. Let's put together a proposal.
B: I can have a draft ready by Thursday.`,
    chunks: [
      { id: 'work-i2-c1', text: "That's worth exploring.", audioUrl: '', scene: '表示某个想法值得研究' },
      { id: 'work-i2-c2', text: 'What about the... overhead?', audioUrl: '', scene: '提出潜在问题时' },
      { id: 'work-i2-c3', text: "Let's put together a proposal.", audioUrl: '', scene: '推进下一步行动' },
      { id: 'work-i2-c4', text: 'I can have a draft ready by...', audioUrl: '', scene: '承诺交付时间' },
    ],
  },

  // ─── 职场英语 · advanced ──────────────────────────────────────────────────
  {
    id: 'work-a1',
    level: 'advanced',
    scene: '职场英语',
    title: '主导会议',
    audioUrl: '',
    dialogueText: `A: Before we dive in, let's align on the goal for today's session.
B: I'd like us to walk away with a clear decision on the rollout strategy.
A: That works. I want to flag one thing upfront — we're constrained by the budget freeze.
B: Right, so we need to prioritize ruthlessly.
A: Exactly. Let's table the nice-to-haves and focus on what moves the needle.
B: I can get behind that.`,
    chunks: [
      { id: 'work-a1-c1', text: "Let's align on the goal.", audioUrl: '', scene: '会议开始时统一目标' },
      { id: 'work-a1-c2', text: 'I want to flag one thing upfront.', audioUrl: '', scene: '提前说明重要限制条件' },
      { id: 'work-a1-c3', text: "Let's table the nice-to-haves.", audioUrl: '', scene: '搁置非必要项，聚焦核心' },
      { id: 'work-a1-c4', text: 'I can get behind that.', audioUrl: '', scene: '表示支持某个方向' },
    ],
  },
  {
    id: 'work-a2',
    level: 'advanced',
    scene: '职场英语',
    title: '委婉表达异议',
    audioUrl: '',
    dialogueText: `A: I hear what you're saying, but I have some reservations about the timeline.
B: What's your concern specifically?
A: We're underestimating the integration work. It's more complex than it looks on paper.
B: Fair point. What would you suggest?
A: I'd advocate for a phased rollout. It reduces risk significantly.
B: That's a reasonable ask. Let me take it back to the team.`,
    chunks: [
      { id: 'work-a2-c1', text: 'I have some reservations about...', audioUrl: '', scene: '委婉表达顾虑' },
      { id: 'work-a2-c2', text: "We're underestimating...", audioUrl: '', scene: '指出低估某事的风险' },
      { id: 'work-a2-c3', text: "I'd advocate for...", audioUrl: '', scene: '正式场合表达立场' },
      { id: 'work-a2-c4', text: "Let me take it back to the team.", audioUrl: '', scene: '需要内部讨论后再回复' },
    ],
  },

  // ─── 旅行出行 · beginner ──────────────────────────────────────────────────
  {
    id: 'travel-b1',
    level: 'beginner',
    scene: '旅行出行',
    title: '机场值机',
    audioUrl: '',
    dialogueText: `A: Hi, can I see your passport and booking?
B: Sure, here you go.
A: Are you checking any bags?
B: Just this one.
A: Window or aisle?
B: Aisle, please.`,
    chunks: [
      { id: 'travel-b1-c1', text: 'Here you go.', audioUrl: '', scene: '递交证件或物品时' },
      { id: 'travel-b1-c2', text: 'Are you checking any bags?', audioUrl: '', scene: '询问是否托运行李' },
      { id: 'travel-b1-c3', text: 'Just this one.', audioUrl: '', scene: '只有一件时简洁回答' },
      { id: 'travel-b1-c4', text: 'Aisle, please.', audioUrl: '', scene: '选座位时说' },
    ],
  },
  {
    id: 'travel-b2',
    level: 'beginner',
    scene: '旅行出行',
    title: '酒店入住',
    audioUrl: '',
    dialogueText: `A: Hi, I have a reservation. My name is Li Wei.
B: Let me pull that up. Yes, one double room for two nights.
A: That's right.
B: Can I have your ID?
A: Of course.
B: Here's your key card. Room 305.`,
    chunks: [
      { id: 'travel-b2-c1', text: 'I have a reservation.', audioUrl: '', scene: '酒店前台办理入住时' },
      { id: 'travel-b2-c2', text: 'Let me pull that up.', audioUrl: '', scene: '查询预订信息时说' },
      { id: 'travel-b2-c3', text: 'Can I have your ID?', audioUrl: '', scene: '要求出示证件' },
      { id: 'travel-b2-c4', text: "Here's your key card.", audioUrl: '', scene: '交给房卡时说' },
    ],
  },

  // ─── 旅行出行 · intermediate ──────────────────────────────────────────────
  {
    id: 'travel-i1',
    level: 'intermediate',
    scene: '旅行出行',
    title: '处理行李问题',
    audioUrl: '',
    dialogueText: `A: Excuse me, my bag didn't come out on the carousel.
B: I'm sorry about that. Can I get your baggage claim tag?
A: Here it is. Flight CA832 from Beijing.
B: Let me check the system. It looks like it was offloaded in Shanghai.
A: What? How long will it take to get here?
B: We'll have it delivered to your hotel by tomorrow morning.`,
    chunks: [
      { id: 'travel-i1-c1', text: "My bag didn't come out.", audioUrl: '', scene: '行李没出来时投诉' },
      { id: 'travel-i1-c2', text: 'Can I get your baggage claim tag?', audioUrl: '', scene: '要求行李牌时' },
      { id: 'travel-i1-c3', text: 'It was offloaded in...', audioUrl: '', scene: '说明行李被留在某地' },
      { id: 'travel-i1-c4', text: "We'll have it delivered to your hotel.", audioUrl: '', scene: '承诺送达时说' },
    ],
  },
  {
    id: 'travel-i2',
    level: 'intermediate',
    scene: '旅行出行',
    title: '酒店升级房间',
    audioUrl: '',
    dialogueText: `A: I was wondering if there's any chance of an upgrade?
B: Let me check availability. You're in luck — we have a suite available.
A: Oh great! Is there an extra charge?
B: Since you're a loyalty member, we can do it complimentary.
A: That's wonderful, thank you so much.
B: Enjoy your stay!`,
    chunks: [
      { id: 'travel-i2-c1', text: "Is there any chance of an upgrade?", audioUrl: '', scene: '礼貌询问能否升级' },
      { id: 'travel-i2-c2', text: "You're in luck.", audioUrl: '', scene: '告知对方运气好时' },
      { id: 'travel-i2-c3', text: 'Is there an extra charge?', audioUrl: '', scene: '询问是否需要额外付费' },
      { id: 'travel-i2-c4', text: 'We can do it complimentary.', audioUrl: '', scene: '告知免费提供时' },
    ],
  },

  // ─── 旅行出行 · advanced ──────────────────────────────────────────────────
  {
    id: 'travel-a1',
    level: 'advanced',
    scene: '旅行出行',
    title: '航班延误交涉',
    audioUrl: '',
    dialogueText: `A: My flight's been delayed six hours. What are my options?
B: We can rebook you on the next available flight, or offer a full refund.
A: When's the next flight?
B: Tomorrow at 7 AM, but I can put you on standby for the 9 PM tonight.
A: I'll take the standby. And what about accommodation in the meantime?
B: We'll provide a hotel voucher and meal allowance.`,
    chunks: [
      { id: 'travel-a1-c1', text: "What are my options?", audioUrl: '', scene: '遇到问题时询问解决方案' },
      { id: 'travel-a1-c2', text: "I can put you on standby.", audioUrl: '', scene: '提供候补机位时' },
      { id: 'travel-a1-c3', text: 'What about accommodation in the meantime?', audioUrl: '', scene: '追问等待期间的安排' },
      { id: 'travel-a1-c4', text: "We'll provide a hotel voucher.", audioUrl: '', scene: '提供住宿券时说' },
    ],
  },
  {
    id: 'travel-a2',
    level: 'advanced',
    scene: '旅行出行',
    title: '租车谈判',
    audioUrl: '',
    dialogueText: `A: I booked a compact, but I see you're out of stock. What can you do for me?
B: I can upgrade you to a midsize at no extra charge.
A: I'd actually prefer an SUV. We're driving mountain roads.
B: That would be an additional thirty a day.
A: If I take it for the full week, can you do better?
B: For a week, I can knock it down to twenty extra per day.`,
    chunks: [
      { id: 'travel-a2-c1', text: "What can you do for me?", audioUrl: '', scene: '要求对方提供解决方案' },
      { id: 'travel-a2-c2', text: 'At no extra charge.', audioUrl: '', scene: '说明不额外收费' },
      { id: 'travel-a2-c3', text: 'Can you do better?', audioUrl: '', scene: '谈判时要求更好的条件' },
      { id: 'travel-a2-c4', text: "I can knock it down to...", audioUrl: '', scene: '降价时的表达方式' },
    ],
  },

  // ─── 社交闲聊 · beginner ──────────────────────────────────────────────────
  {
    id: 'social-b1',
    level: 'beginner',
    scene: '社交闲聊',
    title: '派对认识新朋友',
    audioUrl: '',
    dialogueText: `A: Hi! I don't think we've met. I'm Sarah.
B: Hey Sarah, I'm Tom. How do you know the host?
A: We work together. You?
B: We went to college together.
A: Oh cool! What do you do?
B: I'm a teacher. What about you?`,
    chunks: [
      { id: 'social-b1-c1', text: "I don't think we've met.", audioUrl: '', scene: '主动介绍自己时的开场' },
      { id: 'social-b1-c2', text: 'How do you know the host?', audioUrl: '', scene: '派对上找共同话题' },
      { id: 'social-b1-c3', text: 'We went to college together.', audioUrl: '', scene: '说明认识方式' },
      { id: 'social-b1-c4', text: 'What about you?', audioUrl: '', scene: '反问对方同样问题' },
    ],
  },
  {
    id: 'social-b2',
    level: 'beginner',
    scene: '社交闲聊',
    title: '聊周末计划',
    audioUrl: '',
    dialogueText: `A: Any plans for the weekend?
B: Not really. Maybe watch a movie. You?
A: I'm going hiking with some friends.
B: Oh nice! Where?
A: Zhangjiajie. Have you been?
B: Not yet, but I want to go!`,
    chunks: [
      { id: 'social-b2-c1', text: 'Any plans for the weekend?', audioUrl: '', scene: '周末闲聊的万能开场' },
      { id: 'social-b2-c2', text: 'Not really.', audioUrl: '', scene: '没有特别计划时的回答' },
      { id: 'social-b2-c3', text: 'Have you been?', audioUrl: '', scene: '询问对方是否去过某地' },
      { id: 'social-b2-c4', text: 'Not yet, but I want to go!', audioUrl: '', scene: '表示还没去过但想去' },
    ],
  },

  // ─── 社交闲聊 · intermediate ──────────────────────────────────────────────
  {
    id: 'social-i1',
    level: 'intermediate',
    scene: '社交闲聊',
    title: '聊工作和生活',
    audioUrl: '',
    dialogueText: `A: So what do you do for work?
B: I'm in marketing. Mostly digital stuff. What about you?
A: I'm a software engineer. Been doing it for about five years.
B: Oh interesting! Do you work remotely?
A: Mostly, yeah. I go into the office maybe twice a week.
B: That sounds like a good balance.`,
    chunks: [
      { id: 'social-i1-c1', text: 'Mostly digital stuff.', audioUrl: '', scene: '简单描述工作内容' },
      { id: 'social-i1-c2', text: "Been doing it for about five years.", audioUrl: '', scene: '说明从事某事多久了' },
      { id: 'social-i1-c3', text: 'Do you work remotely?', audioUrl: '', scene: '询问是否远程工作' },
      { id: 'social-i1-c4', text: 'That sounds like a good balance.', audioUrl: '', scene: '对对方的生活方式表示认可' },
    ],
  },
  {
    id: 'social-i2',
    level: 'intermediate',
    scene: '社交闲聊',
    title: '聊兴趣爱好',
    audioUrl: '',
    dialogueText: `A: Do you have any hobbies outside of work?
B: I've been getting into photography lately. Still a total beginner though.
A: That's cool! What kind of stuff do you shoot?
B: Mostly street photography. I love capturing candid moments.
A: I'd love to see your work sometime.
B: Sure, I'll send you my Instagram.`,
    chunks: [
      { id: 'social-i2-c1', text: "I've been getting into photography.", audioUrl: '', scene: '说最近开始喜欢某事' },
      { id: 'social-i2-c2', text: 'Still a total beginner though.', audioUrl: '', scene: '谦虚说自己还是新手' },
      { id: 'social-i2-c3', text: 'What kind of stuff do you shoot?', audioUrl: '', scene: '深入了解对方爱好' },
      { id: 'social-i2-c4', text: "I'd love to see your work sometime.", audioUrl: '', scene: '表达想了解对方作品的兴趣' },
    ],
  },

  // ─── 社交闲聊 · advanced ──────────────────────────────────────────────────
  {
    id: 'social-a1',
    level: 'advanced',
    scene: '社交闲聊',
    title: '深度聊天',
    audioUrl: '',
    dialogueText: `A: What made you decide to move to Shanghai?
B: Honestly, I was at a crossroads career-wise and wanted a fresh start somewhere new.
A: That takes guts. Was it hard to adjust?
B: The first few months were rough, but once you find your people, it gets easier.
A: I can imagine. Do you see yourself staying long-term?
B: I'm keeping my options open, but I'm really happy here right now.`,
    chunks: [
      { id: 'social-a1-c1', text: 'I was at a crossroads.', audioUrl: '', scene: '描述人生转折点时' },
      { id: 'social-a1-c2', text: 'That takes guts.', audioUrl: '', scene: '称赞对方勇气' },
      { id: 'social-a1-c3', text: 'Once you find your people, it gets easier.', audioUrl: '', scene: '分享适应新环境的经验' },
      { id: 'social-a1-c4', text: "I'm keeping my options open.", audioUrl: '', scene: '表示还没做最终决定' },
    ],
  },
  {
    id: 'social-a2',
    level: 'advanced',
    scene: '社交闲聊',
    title: '聊时事观点',
    audioUrl: '',
    dialogueText: `A: What's your take on remote work becoming the norm?
B: I think it's a net positive, but it depends heavily on the role and the person.
A: Fair point. I find I'm more productive at home, but I miss the spontaneous conversations.
B: Exactly — you lose that serendipity. The hallway chats that spark ideas.
A: So maybe a hybrid model is the sweet spot?
B: That's where I land too. Best of both worlds.`,
    chunks: [
      { id: 'social-a2-c1', text: "What's your take on...?", audioUrl: '', scene: '询问对方对某事的看法' },
      { id: 'social-a2-c2', text: "It's a net positive.", audioUrl: '', scene: '表示总体上是好事' },
      { id: 'social-a2-c3', text: 'You lose that serendipity.', audioUrl: '', scene: '描述失去某种偶然性' },
      { id: 'social-a2-c4', text: "That's where I land too.", audioUrl: '', scene: '表示和对方得出相同结论' },
    ],
  },

  // ─── 餐厅用餐 · beginner ──────────────────────────────────────────────────
  {
    id: 'dining-b1',
    level: 'beginner',
    scene: '餐厅用餐',
    title: '点餐',
    audioUrl: '',
    dialogueText: `A: Are you ready to order?
B: Yes. I'll have the pasta, please.
A: What sauce would you like?
B: Tomato, please.
A: And to drink?
B: Just water, thanks.`,
    chunks: [
      { id: 'dining-b1-c1', text: 'Are you ready to order?', audioUrl: '', scene: '服务员询问是否可以点餐' },
      { id: 'dining-b1-c2', text: "I'll have the pasta.", audioUrl: '', scene: '点餐时的标准句式' },
      { id: 'dining-b1-c3', text: 'What sauce would you like?', audioUrl: '', scene: '询问酱料选择' },
      { id: 'dining-b1-c4', text: 'Just water, thanks.', audioUrl: '', scene: '只要水时简洁回答' },
    ],
  },
  {
    id: 'dining-b2',
    level: 'beginner',
    scene: '餐厅用餐',
    title: '结账',
    audioUrl: '',
    dialogueText: `A: Can I get the check, please?
B: Of course. Together or separate?
A: Together, please.
B: That'll be forty-two dollars.
A: Here's fifty.
B: And here's your change. Have a great evening!`,
    chunks: [
      { id: 'dining-b2-c1', text: 'Can I get the check, please?', audioUrl: '', scene: '要账单时说' },
      { id: 'dining-b2-c2', text: 'Together or separate?', audioUrl: '', scene: '询问是否分开结账' },
      { id: 'dining-b2-c3', text: "That'll be forty-two dollars.", audioUrl: '', scene: '告知金额时' },
      { id: 'dining-b2-c4', text: "Here's your change.", audioUrl: '', scene: '找零时说' },
    ],
  },

  // ─── 餐厅用餐 · intermediate ──────────────────────────────────────────────
  {
    id: 'dining-i1',
    level: 'intermediate',
    scene: '餐厅用餐',
    title: '询问推荐菜',
    audioUrl: '',
    dialogueText: `A: What do you recommend? It's our first time here.
B: The grilled salmon is really popular. And if you like spicy food, the Thai curry is amazing.
A: Does the curry come with rice?
B: It does, and you can choose jasmine or brown rice.
A: We'll go with the salmon and the curry then.
B: Great choices! Any dietary restrictions I should know about?`,
    chunks: [
      { id: 'dining-i1-c1', text: 'What do you recommend?', audioUrl: '', scene: '询问服务员推荐时' },
      { id: 'dining-i1-c2', text: 'Does it come with rice?', audioUrl: '', scene: '询问是否附带配菜' },
      { id: 'dining-i1-c3', text: "We'll go with...", audioUrl: '', scene: '做出选择时说' },
      { id: 'dining-i1-c4', text: 'Any dietary restrictions?', audioUrl: '', scene: '询问饮食禁忌' },
    ],
  },
  {
    id: 'dining-i2',
    level: 'intermediate',
    scene: '餐厅用餐',
    title: '处理上错菜',
    audioUrl: '',
    dialogueText: `A: Excuse me, I think there's been a mix-up. I ordered the steak, not the chicken.
B: Oh, I'm so sorry about that. Let me get that fixed for you right away.
A: No worries, but could you also check on my friend's soup? It hasn't come out yet.
B: Of course. I'll put a rush on both. Can I get you anything while you wait?
A: Some more bread would be great.
B: Absolutely, coming right up.`,
    chunks: [
      { id: 'dining-i2-c1', text: "I think there's been a mix-up.", audioUrl: '', scene: '委婉指出上错菜时' },
      { id: 'dining-i2-c2', text: "Let me get that fixed right away.", audioUrl: '', scene: '承诺立刻处理错误' },
      { id: 'dining-i2-c3', text: "Could you check on...?", audioUrl: '', scene: '追问另一件事的进展' },
      { id: 'dining-i2-c4', text: 'Coming right up.', audioUrl: '', scene: '马上去拿时说' },
    ],
  },

  // ─── 餐厅用餐 · advanced ──────────────────────────────────────────────────
  {
    id: 'dining-a1',
    level: 'advanced',
    scene: '餐厅用餐',
    title: '商务宴请',
    audioUrl: '',
    dialogueText: `A: I took the liberty of ordering a bottle of the Burgundy — I hope that's alright.
B: Perfect choice. I've been here before and the wine list is excellent.
A: Shall we get the formalities out of the way before the food arrives?
B: Good idea. I wanted to talk through the partnership proposal.
A: Absolutely. I think there's a lot of potential here for both sides.
B: I agree. Let's dig in.`,
    chunks: [
      { id: 'dining-a1-c1', text: 'I took the liberty of...', audioUrl: '', scene: '代替对方做了某事时说' },
      { id: 'dining-a1-c2', text: "Shall we get the formalities out of the way?", audioUrl: '', scene: '建议先处理正事' },
      { id: 'dining-a1-c3', text: "There's a lot of potential here.", audioUrl: '', scene: '表达合作前景看好' },
      { id: 'dining-a1-c4', text: "Let's dig in.", audioUrl: '', scene: '开始讨论或开始吃饭时说' },
    ],
  },
  {
    id: 'dining-a2',
    level: 'advanced',
    scene: '餐厅用餐',
    title: '品酒点菜',
    audioUrl: '',
    dialogueText: `A: We're celebrating tonight, so we'd like something special. What pairs well with the tasting menu?
B: For the full tasting menu, I'd suggest the wine pairing — it's curated to complement each course.
A: That sounds wonderful. Is it possible to do a half-pour pairing? We're driving.
B: Absolutely, we can accommodate that. It's a bit more per person but well worth it.
A: Let's do it. And could we start with the oysters while we decide on the rest?
B: Of course. Congratulations on your celebration!`,
    chunks: [
      { id: 'dining-a2-c1', text: 'What pairs well with...?', audioUrl: '', scene: '询问搭配建议时' },
      { id: 'dining-a2-c2', text: "We can accommodate that.", audioUrl: '', scene: '表示可以满足特殊要求' },
      { id: 'dining-a2-c3', text: 'Well worth it.', audioUrl: '', scene: '表示某事物超值' },
      { id: 'dining-a2-c4', text: 'Could we start with...?', audioUrl: '', scene: '先点某道菜时说' },
    ],
  },

  // ─── 紧急情况 · beginner ──────────────────────────────────────────────────
  {
    id: 'emergency-b1',
    level: 'beginner',
    scene: '紧急情况',
    title: '在医院描述症状',
    audioUrl: '',
    dialogueText: `A: What seems to be the problem?
B: I have a bad headache and a fever.
A: How long have you had these symptoms?
B: Since yesterday morning.
A: Any other symptoms? Cough or sore throat?
B: A little sore throat, yes.`,
    chunks: [
      { id: 'emergency-b1-c1', text: 'I have a bad headache.', audioUrl: '', scene: '描述头痛症状' },
      { id: 'emergency-b1-c2', text: 'How long have you had these symptoms?', audioUrl: '', scene: '询问症状持续时间' },
      { id: 'emergency-b1-c3', text: 'Since yesterday morning.', audioUrl: '', scene: '说明症状开始时间' },
      { id: 'emergency-b1-c4', text: 'Any other symptoms?', audioUrl: '', scene: '询问是否有其他症状' },
    ],
  },
  {
    id: 'emergency-b2',
    level: 'beginner',
    scene: '紧急情况',
    title: '向路人求助',
    audioUrl: '',
    dialogueText: `A: Excuse me, can you help me?
B: Sure, what's wrong?
A: I'm lost. I need to find the train station.
B: Oh, it's not far. Go straight, then turn left.
A: How many minutes?
B: About ten minutes on foot.`,
    chunks: [
      { id: 'emergency-b2-c1', text: 'Can you help me?', audioUrl: '', scene: '向陌生人求助时' },
      { id: 'emergency-b2-c2', text: "I'm lost.", audioUrl: '', scene: '说明自己迷路了' },
      { id: 'emergency-b2-c3', text: 'Go straight, then turn left.', audioUrl: '', scene: '给方向指引时' },
      { id: 'emergency-b2-c4', text: 'About ten minutes on foot.', audioUrl: '', scene: '说明步行时间' },
    ],
  },

  // ─── 紧急情况 · intermediate ──────────────────────────────────────────────
  {
    id: 'emergency-i1',
    level: 'intermediate',
    scene: '紧急情况',
    title: '急诊就医',
    audioUrl: '',
    dialogueText: `A: I need to see a doctor urgently. I'm having chest pains.
B: Please take a seat. Can you describe the pain? Is it sharp or dull?
A: It's more of a tightness. It started about an hour ago.
B: Does it radiate to your arm or jaw?
A: A little to my left arm, yes.
B: We're going to take you in right away. Do you have any allergies?`,
    chunks: [
      { id: 'emergency-i1-c1', text: "I'm having chest pains.", audioUrl: '', scene: '描述胸痛症状' },
      { id: 'emergency-i1-c2', text: "It's more of a tightness.", audioUrl: '', scene: '描述压迫感而非刺痛' },
      { id: 'emergency-i1-c3', text: 'Does it radiate to your arm?', audioUrl: '', scene: '询问疼痛是否扩散' },
      { id: 'emergency-i1-c4', text: "We're going to take you in right away.", audioUrl: '', scene: '告知立刻处理' },
    ],
  },
  {
    id: 'emergency-i2',
    level: 'intermediate',
    scene: '紧急情况',
    title: '报告事故',
    audioUrl: '',
    dialogueText: `A: 911, what's your emergency?
B: There's been a car accident on Highway 5, near exit 23.
A: Are there any injuries?
B: One person is unconscious. Two others are shaken but okay.
A: Stay on the line. Help is on the way. Don't move the injured person.
B: Okay, I understand. Please hurry.`,
    chunks: [
      { id: 'emergency-i2-c1', text: "There's been a car accident.", audioUrl: '', scene: '报告交通事故时' },
      { id: 'emergency-i2-c2', text: 'One person is unconscious.', audioUrl: '', scene: '描述伤亡情况' },
      { id: 'emergency-i2-c3', text: 'Stay on the line.', audioUrl: '', scene: '要求对方不要挂电话' },
      { id: 'emergency-i2-c4', text: "Don't move the injured person.", audioUrl: '', scene: '叮嘱不要移动伤者' },
    ],
  },

  // ─── 紧急情况 · advanced ──────────────────────────────────────────────────
  {
    id: 'emergency-a1',
    level: 'advanced',
    scene: '紧急情况',
    title: '处理医疗纠纷',
    audioUrl: '',
    dialogueText: `A: I've been waiting for three hours. I was told it would be forty-five minutes.
B: I sincerely apologize for the wait. We had a critical emergency come in.
A: I understand, but my condition is getting worse. Is there anything you can do?
B: Let me speak to the attending physician and see if we can expedite your case.
A: I'd really appreciate that. I'm in quite a bit of pain.
B: I'll be back in five minutes. I'm going to make this a priority.`,
    chunks: [
      { id: 'emergency-a1-c1', text: 'My condition is getting worse.', audioUrl: '', scene: '说明病情在恶化' },
      { id: 'emergency-a1-c2', text: 'Is there anything you can do?', audioUrl: '', scene: '请求对方采取行动' },
      { id: 'emergency-a1-c3', text: 'See if we can expedite your case.', audioUrl: '', scene: '承诺尝试加快处理' },
      { id: 'emergency-a1-c4', text: "I'm going to make this a priority.", audioUrl: '', scene: '承诺优先处理' },
    ],
  },
  {
    id: 'emergency-a2',
    level: 'advanced',
    scene: '紧急情况',
    title: '处理护照丢失',
    audioUrl: '',
    dialogueText: `A: I need to report a lost passport. I'm flying home tomorrow.
B: I'm sorry to hear that. When did you last have it?
A: This morning at the hotel. I think it may have been stolen.
B: You'll need to file a police report first, then come back here with that and two passport photos.
A: Can you issue an emergency travel document in time for tomorrow's flight?
B: If you get here by 3 PM with everything, we can process an emergency certificate.`,
    chunks: [
      { id: 'emergency-a2-c1', text: 'I need to report a lost passport.', audioUrl: '', scene: '护照丢失时向大使馆说' },
      { id: 'emergency-a2-c2', text: 'It may have been stolen.', audioUrl: '', scene: '怀疑被盗时的表达' },
      { id: 'emergency-a2-c3', text: 'Can you issue an emergency travel document?', audioUrl: '', scene: '申请紧急旅行证件' },
      { id: 'emergency-a2-c4', text: 'We can process an emergency certificate.', audioUrl: '', scene: '告知可以办理紧急证件' },
    ],
  },
]
