/* 中英切换：只做「文本节点精确匹配替换」，不改渲染逻辑；用 MutationObserver 跟随重渲染 */
(function () {
  const DICT = {
    /* 导航 / 页头 */
    '专业查询': 'Majors',
    '分数测算': 'Calculator',
    '对比': 'Compare',
    '怎么用': 'How to use',
    '西浦大一专业分流参考': 'Year-1 programme guide · XJTLU',
    '53 个本科专业的修读内容、录取依据、录取分数与分数测算。': 'What 53 programmes teach, how admission works, what the marks were, and a calculator for your own score.',
    '按参考分从高到低排列，太仓校区单列于末。': 'Sorted by admission mark, with Taicang programmes listed separately at the end.',
    '个专业': 'programmes',
    '个学院': 'schools',
    '个校区': 'campuses',
    '志愿填报': 'programme choice',
    '排序': 'Sort',
    '分数从高到低': 'Mark: high to low',
    '热门程度': 'Popularity',
    '专业名称': 'Name',
    '太仓校区': 'Taicang campus',
    '没有匹配的专业，换个关键词试试。': 'No programme matched. Try another keyword.',
    '返回列表': 'Back to list',
    '全部': 'All',
    '搜索专业名 / 英文名 / 缩写，例如 CS、金融数学、Architecture': 'Search by name, English name or abbreviation — e.g. CS, architecture',
    '收藏': 'Saved',
    '看微积分': 'Calculus only',
    '看微积分 + 线代': 'Calculus + linear algebra',
    '看微积分与线代': 'Calculus + linear algebra',
    '跟着考试走': 'Exam-based',
    '录取分 · 大一上': 'Admission mark · Semester 1',
    '2025-26 录取分 · 大一上': '2025-26 admission mark · Semester 1',
    '分数口径': 'Mark basis',

    /* 分数与热度 */
    '参考分': 'est.',
    '官方': 'official',
    '未公布': 'Not published',
    '无门槛': 'Open access',
    '极热门': 'Very popular',
    '热门': 'Popular',
    '较热': 'Fairly popular',
    '一般': 'Average',
    '偏冷': 'Less popular',
    '热度': 'Interest',

    /* 测算页 */
    '期末分数测算': 'Score calculator',
    '选定目标专业，填入已出的作业分与期中分，': 'Pick a target programme, enter the marks you already have, and see what the final exam needs to be.',
    '倒推期末需要考到多少分才够线。': '',
    '按专业算期末': 'Target → mark',
    '按分数找专业': 'Mark → programmes',
    '选目标专业': 'Choose a programme',
    '按参考分从高到低，可输入缩写筛选': 'Sorted by mark; abbreviations work too',
    '填已出分的部分': 'Marks so far',
    '还没考的留空即可，比如期末没考就只填作业和期中': 'Leave anything you have not sat blank',
    '目标参考分': 'Target mark',
    '默认是该专业的经验参考值，可改成你查到的实际通知分数': 'Defaults to the published mark; change it if you know better',
    '填你的预估分': 'Your estimated marks',
    '按满分 100 算。估不准就填保守一点，反正下面会分档告诉你': 'Out of 100. Be conservative — the groups below tell you where you stand.',
    '只按分数看：学校没公布分数的专业会被单独放到最后一组——它们不是进不去，而是没数可算。': 'By marks only. Programmes without a published mark go into the last group — not because you cannot get in, but because there is no number to compare.',
    '作业': 'Coursework',
    '期中': 'Midterm',
    '期末': 'Final',
    '占比': 'Weights',
    '平均每部分需要': 'Average needed per part',
    '期末考试至少要考': 'Final exam needed',
    '剩余部分平均需要': 'Needed on the rest',
    '已填部分均分': 'Average so far',
    '目标': 'Target',
    '已填均分': 'Average so far',
    '难度很高': 'Very demanding',
    '需要认真准备': 'Needs real work',
    '压力不大': 'Manageable',
    '达到目标，可以冲': 'On track',
    '目标已不可能': 'Out of reach',
    '这个专业怎么录取': 'How admission works',
    '这几部分都需': 'All of these need',
    '稳了': 'Safe',
    '能冲': 'A stretch',
    '够呛': 'Unlikely',
    '学校没公布分数': 'No published mark',

    /* 详情页 */
    '这个专业到底学什么': 'What you actually study',
    '会修哪些课': 'Core modules',
    '课程名是代表性的模块，具体以你入学那年的培养方案为准。': 'Representative modules — your cohort’s programme may differ.',
    '适合什么样的人': 'Who it suits',
    '以后能做什么': 'Where it leads',
    '四年大概会怎么过': 'How the four years go',
    '同学院还有': 'Also in this school:',
    '进入这个专业': 'Getting in',
    '大一上需修': 'Semester 1 requires',
    '大一下需修': 'Semester 2 requires',
    '录取看什么': 'Admission looks at',
    '分数口径': 'Mark basis',
    '录取分 · 未公布': 'Admission mark · not published',
    '学校不公布': 'Not published',
    '把鼠标移到上面的标签，看这一行具体在做什么。': 'Hover a tag above to see what that job involves.',
    '用这个专业算分数': 'Calculate for this programme',
    '回到专业列表': 'Back to list',
    '大一': 'Year 1',
    '大二': 'Year 2',
    '大三': 'Year 3',
    '大四': 'Year 4',

    /* 对比页 */
    '专业对比': 'Compare programmes',
    '最多选三个专业，把分数、先修、课程和出路并排放在一张表里。': 'Pick up to three programmes and compare marks, prerequisites, modules and outcomes.',
    '再加一个': '+ Add',
    '2025-26 录取分': '2025-26 mark',
    '火爆程度': 'Popularity',
    '学什么': 'What it is',
    '核心课程': 'Core modules',
    '典型出路': 'Typical roles',
    '参考年薪': 'Approx. salary',
    '看详情': 'Details',

    /* 怎么用 */
    '怎么用这个站': 'How to use this site',
    '三步走完：先看清楚，再算明白，最后排志愿。': 'Three steps: understand, calculate, then rank your choices.',
    '下面也写清楚了每个数字是怎么来的、哪些只是估算。': 'Every number is explained below — including which ones are estimates.',
    '按分数和学院筛出候选': 'Shortlist by mark and school',
    '建议先收藏 5 个左右，因为志愿要填一串，不是一个。': 'Save about five — you will be ranking a list, not picking one.',
    '点开详情，看它到底学什么': 'Open a programme and see what it really is',
    '「大一上需修」这一栏最重要：修错了课，分数再高也进不去。': '“Semester 1 requires” matters most: take the wrong module and no mark will get you in.',
    '算出期末还要考多少': 'Work out the final exam mark',
    '目标分默认是该专业的参考分，可以手动改成你查到的实际通知分数。': 'The target defaults to the published mark; edit it if you have a better number.',
    '三个前提，别忽略': 'Three caveats',
    '分数分两种口径': 'Two kinds of mark',
    '考核占比是估算的': 'Assessment weights are estimates',
    '请以课程大纲上的真实比例为准': 'Check your syllabus for the real weights',
    'EAP 和选修不算录取分': 'EAP and electives do not count',
    '专业分流只看大一上的微积分（部分专业加线代）。EAP 英语和大一选修只影响学位等级，所以站里把它们标成「不计入录取」。': 'Programme allocation looks only at Semester 1 calculus (plus linear algebra for some). EAP and electives affect degree classification, so they are marked “not counted”.',
    '常见问题': 'FAQ',
    '为什么有的专业显示「无门槛」？': 'Why do some programmes show “open access”?',
    '传播、翻译、设计、影视这类专业不按分数卡人，报名人数超过容量时按志愿顺序和材料综合判断。没有分数线，但热门年份一样会满，别当保底。': 'Media, translation, design and film do not select on marks; when demand exceeds places they use preference order and portfolio. No cut-off — but they can still fill up.',
    '算出来超过 100 分是什么意思？': 'What does “over 100” mean?',
    '意思是按目前已经出分的成绩，剩下的部分即使考满分也够不到目标分。这时要么把目标降到更现实的分数，要么把重心换到别的专业。': 'Even a perfect score on what is left will not reach the target. Aim lower or shift programme.',
    '为什么同一门课，我算出来的权重和别人的不一样？': 'Why does the same module weigh differently for my friend?',
    '因为权重跟着专业走。计算机这类要看微积分加线代（各 50%），会计、经济这类只看微积分（100%），所以同一门课在不同专业里的分量不同。': 'Because weighting follows the programme: CS averages calculus and linear algebra (50/50); accounting and economics use calculus only (100%).',
    '收藏会丢吗？': 'Will saved programmes disappear?',
    '收藏存在你浏览器本地，刷新、关掉再打开都还在；换浏览器或用无痕模式就没了。': 'They live in your browser’s local storage, so they survive reloads — but not a different browser or private mode.',
    '数据多久更新一次？': 'How often is the data updated?',
    '专业清单与先修要求依据 2025-26 学年的官方注册指南；参考分与热度是近三年的社区估算。学校正式通知出来后，以通知为准。': 'Programme lists and prerequisites follow the 2025-26 registration guide; marks and popularity are community estimates. Official notices always win.',
    '数据来源与口径': 'Sources and caveats',
    '内容': 'Item',
    '来源': 'Source',
    '口径与限制': 'Caveats',
    '更新': 'Updated',
    '专业清单、中英文名、学位': 'Programme list, names, degrees',
    '大一课程结构、先修要求': 'Year-1 structure and prerequisites',
    '录取分（18 个专业）': 'Admission marks (18 programmes)',
    '近三年分数（15 个专业）': 'Last three years (15 programmes)',
    '作业 / 期中 / 期末占比': 'Assessment weights',
    '无官方来源': 'No official source',
    '核心课程': 'Core modules',
    '年薪区间': 'Salary ranges',
    '详情页照片': 'Programme photos',
    '最后核对：2025 年 11 月。分数、占比、年薪三类都不是学校官方数据，只用于判断量级与冷热。': 'Last checked: November 2025. Marks, weights and salaries are not official — they indicate scale only.',

    /* 学院 */
    '人工智能与先进技术学院': 'School of AI & Advanced Technology',
    '设计学院': 'Design School',
    '人文社科学院': 'School of Humanities & Social Sciences',
    '西浦国际商学院': 'International Business School Suzhou',
    '数学物理学院': 'School of Mathematics & Physics',
    '生命与自然科学学院': 'School of Science',
    '影视与创意科技学院': 'Academy of Film & Creative Technology',
    '太仓创业家学院': 'Entrepreneur College (Taicang)',
    '苏州校区': 'Suzhou campus'
  };

  /* 含内联标签的整段 */
  const HTML = {
    warn: 'Entries marked <b>“official”</b> use the school’s published 2025-26 marks; the rest are community estimates. Both are <b>for reference only</b> — they change every year, so always go by the notice the school publishes in March.'
  };

  function absorbMajorNames() {
    const db = window.XJTLU;
    if (!db || !db.majors) return;
    db.majors.forEach(m => { if (m.name && m.en) DICT[m.name] = m.en; });
  }

  const PATTERNS = [
    [/^(\d+) 个$/, '$1'],
    [/^(\d+) 月$/, 'March'],
    [/^★ 收藏 (\d+)$/, '★ Saved $1'],
    [/^收藏 (\d+)$/, 'Saved $1'],
    [/^★\s*收藏 (\d+)$/, '★ Saved $1'],
    [/^参考区间 (\d+)–(\d+)$/, 'Est. $1–$2'],
    [/^近三年$/, 'Last 3 years'],
    [/^剩余考 (\d+)$/, 'Score $1'],
    [/^(\d+)·(\d+) 万$/, '¥$1–$2k/mo']
  ];

  const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA']);
  let current = 'zh';
  const origin = new WeakMap();
  const htmlOrigin = new WeakMap();

  function applyText(node) {
    const raw = node.nodeValue;
    const key = raw.trim();
    if (!key || origin.has(node)) return;
    let out = DICT[key];
    if (!out && /[0-9]/.test(key)) {
      for (const [re, rep] of PATTERNS) if (re.test(key)) { out = key.replace(re, rep); break; }
    }
    if (!out) return;
    if (!origin.has(node)) origin.set(node, raw);
    node.nodeValue = raw.match(/^\s*/)[0] + out + raw.match(/\s*$/)[0];
  }

  function walk(root) {
    walkHtml(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (n.parentElement && SKIP.has(n.parentElement.tagName))
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const list = [];
    while (w.nextNode()) list.push(w.currentNode);
    list.forEach(applyText);
    root.querySelectorAll('input[placeholder]').forEach(el => {
      const key = el.placeholder.trim();
      if (DICT[key]) { if (!el.dataset.zhPh) el.dataset.zhPh = el.placeholder; el.placeholder = DICT[key]; }
    });
  }

  function walkHtml(root) {
    if (!root.querySelectorAll) return;
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (!HTML[key]) return;
      if (!htmlOrigin.has(el)) htmlOrigin.set(el, el.innerHTML);
      el.innerHTML = HTML[key];
    });
  }

  function restore(root) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    while (w.nextNode()) {
      const n = w.currentNode;
      if (origin.has(n)) n.nodeValue = origin.get(n);
    }
    if (root.querySelectorAll) {
      root.querySelectorAll('[data-i18n]').forEach(el => {
        if (htmlOrigin.has(el)) el.innerHTML = htmlOrigin.get(el);
      });
      root.querySelectorAll('input[placeholder]').forEach(el => {
        if (el.dataset.zhPh) el.placeholder = el.dataset.zhPh;
      });
    }
  }

  let timer = null;
  const mainEl = () => document.body;

  function setLang(lang) {
    current = lang;
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    try { localStorage.setItem('xjtlumajor.lang', lang); } catch (e) {}
    if (lang === 'en') walk(mainEl()); else restore(mainEl());
    paint();
  }

  function paint() {
    const btn = document.getElementById('langBtn');
    if (btn) btn.textContent = current === 'en' ? '中文' : 'EN';
  }

  window.setLang = setLang;
  window.getLang = () => current;

  window.addEventListener('DOMContentLoaded', () => {
    absorbMajorNames();
    const btn = document.getElementById('langBtn');
    if (btn) btn.addEventListener('click', () => setLang(current === 'en' ? 'zh' : 'en'));

    new MutationObserver(() => {
      if (current !== 'en') return;
      clearTimeout(timer);
      timer = setTimeout(() => walk(mainEl()), 40);
    }).observe(mainEl(), { childList: true, subtree: true });

    let saved = 'zh';
    try { saved = localStorage.getItem('xjtlumajor.lang') || 'zh'; } catch (e) {}
    paint();
    if (saved === 'en') setTimeout(() => setLang('en'), 80);
  });
})();
