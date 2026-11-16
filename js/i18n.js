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
    '非官方声明': 'Not an official site',
    '选专业时间': 'When to choose',
    '纠错与反馈': 'Corrections',
    '隐私声明': 'Privacy',
    '声明': 'Statements',
    '看 微积分 + 线代': 'Calculus + linear algebra',
    '看 微积分': 'Calculus only',
    '无分数门槛': 'No mark threshold',
    '★ 收藏': '★ Saved',
    '太仓校区': 'Taicang campus',
    '苏州校区': 'Suzhou campus',
    'XJTLU Entrepreneur College (Taicang) · 产教融合，唯一不在苏州工业园区校区的学院群':
      'XJTLU Entrepreneur College (Taicang) · industry-integrated, the only school outside the Suzhou Industrial Park campus',

    '+ 再加一个': '+ Add another',
    '再加一个': 'Add another',
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
    '倒推期末需要考到多少分才够线。': 'Work backwards from the mark you still need.',
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
    "学校 2025-26 学年实际公布的录取分（按大一上成绩排定）。明年会变，仍然只能参考。": "The mark the university actually published for 2025-26 (ranked by Semester 1 results). It will change next year — still a reference only.",
    "学校不公布这个专业的录取分，网上流传的版本互相矛盾。想知道难度，看先修要求和你目标专业的容量，或者直接问教务。这里不给数字，是不想编一个。": "The university does not publish a mark for this programme, and circulating versions contradict each other. To judge difficulty, look at the prerequisites and the programme’s capacity — or ask the registry. No number is given here rather than inventing one.",
    "不看大一成绩，满足上面的先修课程就能报；报名超出容量时按志愿顺序录取。": "Year-1 marks are not considered; meeting the prerequisites above is enough to apply. If demand exceeds capacity, places go by preference order.",
    "近三年": "Last three years",
    "还没有出分": "No marks yet",
    "占比": "Weighting",
    "合计": "Total",
    "同学院还有：": "Also in this school: ",
    "社区经验估算，官方从不公布；只用来比较专业冷热，不能当承诺。": "Community estimates; the university never publishes these. Use them to compare programmes, not as a promise.",
    "年薪是国内一线／新一线城市、本科毕业 3–5 年的常见区间，税前，用来判断量级，不是 offer 承诺。": "Salary ranges are typical pre-tax figures for graduates 3–5 years out, in tier-1 or new tier-1 cities — a rough sense of scale, not an offer.",
    "开始上专业核心课——电路、信号与系统、数据结构这类，同时进实验室看师兄师姐怎么做。": "Core courses start: circuits, signals and systems, data structures. You also spend time in the lab seeing how seniors work.",
    "选方向课，做课程项目；这时候要找实习或者暑研，简历上得有东西。": "Electives and course projects. This is when you look for internships or summer research — your CV needs something on it.",
    "毕业设计占掉大半年，同时准备申研（英国一年制硕士通常提前一年递交）。": "The final-year project takes most of the year, alongside master’s applications (UK one-year programmes open about a year ahead).",
    "studio 是主课：做方案、被评图、改方案，一个学期两三个项目。": "Studio is the main course: design, get reviewed, redo. Two or three projects a semester.",
    "项目变复杂，开始接触真实场地；软件出图和模型要跟上。": "Projects get more complex and start using real sites; drawings and models have to keep up.",
    "毕业设计，建筑和规划方向还要整理作品集，申研基本都要 portfolio。": "Final project. Architecture and planning students also build a portfolio — most master’s applications require one.",
    "课程转向理论、文本分析和研究方法，阅读量明显变大。": "Courses shift to theory, textual analysis and research methods; the reading load grows noticeably.",
    "写长论文、做独立研究；有条件的话申请 exchange 或实习。": "Long essays and independent research; apply for exchange or internships if you can.",
    "毕业论文是重头，申研看均分和 writing sample。": "The dissertation dominates. Master’s applications look at your average and a writing sample.",
    "会计、金融、市场、管理各自的核心课开始分岔，专业感从这里出来。": "Accounting, finance, marketing and management each split into their own core courses — this is where the specialism appears.",
    "实习季：四大、券商、外企的暑期实习大多在这时候投。": "Internship season: summer placements at the Big Four, brokerages and multinationals are mostly applied for now.",
    "毕业论文 + 秋招/申研并行，节奏很紧。": "Dissertation plus autumn recruitment or master’s applications, running in parallel. Tight.",
    "实分析、概率、微分方程这类硬课，是全院公认最难的一年。": "Real analysis, probability, differential equations — widely agreed to be the hardest year in the school.",
    "选方向（纯数 / 应数 / 统计 / 金融数学），开始跟老师做项目。": "Pick a track (pure maths, applied maths, statistics, financial maths) and start projects with staff.",
    "毕业论文；这个学院读研的比例很高，很多人从大三就在准备。": "Dissertation. A high share of this school goes on to postgraduate study, and many start preparing in year 3.",
    "专业核心课加实验课，报告写得比想象中多。": "Core courses plus lab classes; you write far more reports than you expect.",
    "进课题组做小课题，开始想清楚是读研还是就业。": "Join a research group for a small project and start deciding between postgraduate study and work.",
    "毕业论文大多就是实验室里那个课题。": "The dissertation is usually that same lab project, extended.",
    "大量实践作业：短片、动画、交互作品，边做边学。": "Lots of production work: short films, animation, interactive pieces. You learn by making.",
    "组队做完整作品，找剧组或公司实习。": "Team up to make complete works, and intern with a production crew or company.",
    "毕业作品 + 作品集，这一行的敲门砖就是作品。": "Graduation work plus a portfolio — in this field the work itself is the entry ticket.",
    "专业课 + 企业项目式课程（PBL），很多作业是真实企业给的题。": "Courses plus project-based learning with companies; many assignments are real briefs from industry.",
    "进企业实习、做真实项目，一部分课直接在产业环境里上。": "Internships and real projects; some classes happen directly in an industry setting.",
    "毕业设计常和企业课题结合，找工作的时间点也更早。": "Final projects are often tied to company problems, and recruiting starts earlier.",
    '大一上需修': 'Semester 1 requires',
    '大一下需修': 'Semester 2 requires',
    '录取看什么': 'Admission looks at',
    '分数口径': 'Mark basis',
    '录取分 · 未公布': 'Admission mark · not published',
    '学校不公布': '—',
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
    '苏州校区': 'Suzhou campus',
    '/ 100 参考': '/ 100 est.',
    '常见去向：': 'Common destinations: ',
    '劝退点：': 'Reality check: ',
    '微积分': 'Calculus',
    '线性代数': 'Linear Algebra',
    '多元微积分': 'Multivariable Calculus',
    '物理': 'Physics',
    '微积分 + 线性代数': 'Calculus + Linear Algebra',
    '物理 + 多元微积分': 'Physics + Multivariable Calculus',
    '无先修要求': 'None',
    '无': 'None',
    '看微积分': 'Calculus only',
    '看微积分 + 线代': 'Calculus + Linear Algebra',
    '已填': 'filled',
    '未填': 'blank',
  };

  /* 含内联标签的整段 */
  const HTML = {
    warn: 'Entries marked <b>“official”</b> use the school’s published 2025-26 marks; the rest are community estimates. Both are <b>for reference only</b> — they change every year, so always go by the notice the school publishes in late December.',
    y1: 'The curriculum is the same for everyone: <b>Calculus + Linear Algebra</b> as the base, plus EAP English and electives. The one thing that matters this year is doing well in those two maths modules — they decide which programme you can get into.',
    'basis-cl': 'The average of <b>Calculus</b> and <b>Linear Algebra</b> in Semester 1',
    'basis-c': 'Your <b>Calculus</b> mark in Semester 1',
    'basis-n': '<b>No mark threshold</b> — admitted by preference order and capacity',
    'basis-lang': 'Requires <b>two stages of a second foreign language</b>',
    'decl1': 'This site is a student side project — <b>not an official XJTLU platform</b>, and not affiliated with the admissions office or the registry. Except for the 18 programmes marked “official”, every mark is a community estimate; assessment weights, demand and salary ranges are estimates too. Use it to judge scale and competition only — <b>never as grounds for admission</b>. Always defer to the school’s own notice.',
    'decl2': 'For this cohort, programme choice happens in <b>late December</b> — not in March as in earlier years. Check the registry email and e-Bridge for the exact date, and re-check a week before you submit.',
    'decl3': 'Spotted a wrong mark, a new programme or an outdated figure? Open an issue on <a href="https://github.com/linziao989-lgtm/xjtlu-major/issues" target="_blank" rel="noopener">GitHub Issues</a> with the programme, the correct figure and its source, or contact the author directly. Changes are checked against the school’s own material — unsourced corrections are not accepted.',
    'decl4': 'This is a static site: <b>no backend, no personal data collected or uploaded</b>. The marks you type stay in your browser and are used only for the calculation — refreshing clears them. Favourites, compare picks and language choice live in localStorage and can be cleared at any time. No analytics or ad scripts are loaded. Photos come from Pexels; the site is hosted on GitHub Pages, whose servers log visitor IPs as normal hosting practice.',
    'caveat1': 'The 16 programmes marked <b>official</b> use the school\'s published 2025-26 admission mark; the rest are community estimates. Both only help you compare how competitive a programme is — the real cut-off moves with capacity and applications every year.',
    'caveat2': 'The official catalogue lists credits and learning outcomes, not the coursework / midterm / final split. The default is <b>15 / 20 / 65</b> — <b>check your module outline for the real ratio</b>; you can edit it per module.',
    'caveat3': 'Admission looks at Semester-1 Calculus (plus Linear Algebra for some programmes). EAP and Year-1 electives only affect your degree classification, which is why they are marked "not counted" here.'
  };

  function absorbMajorNames() {
    const db = window.XJTLU;
    if (!db || !db.majors) return;
    db.majors.forEach(m => { if (m.name && m.en) DICT[m.name] = m.en; });
  }

  const PATTERNS = [
    [/^(\d+) 个$/, '$1'],
    [/^(\d+) 月底$/, 'late December'],
    [/^(\d+) 月$/, 'March'],
    [/^(B[A-Za-z]*) · 4 年$/, '$1 · 4 yrs'],

    [/^目标 ([\d.]+)$/, 'Target $1'],
    [/^([\d.]+) 学分 · 占录取 (\d+)%$/, '$1 credits · $2% of admission'],
    [/^([\d.]+) 学分，只影响学位等级$/, '$1 credits — degree classification only'],

    [/^参考年薪 (\d+)–(\d+) 万$/, (m, a, b) => '≈ CNY ' + a + '0–' + b + '0k / yr'],
    [/^剩余考 (\d+)$/, 'If you score $1'],

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

  const BAD_TR = /MYMEMORY|WARNING|Sorry|https?:\/\//i;

  function applyText(node) {
    const raw = node.nodeValue;
    const base = origin.get(node) || raw;
    const key = base.trim();
    if (!key) return;
    let out = DICT[key];
    if (!out && window.EN_MAP) {
      const cand = window.EN_MAP[key];
      if (cand && !BAD_TR.test(cand)) out = cand;
    }
    if (!out && /[0-9]/.test(key)) {
      for (const [re, rep] of PATTERNS) if (re.test(key)) { out = key.replace(re, rep); break; }
    }
    if (!out) return;
    if (!origin.has(node)) origin.set(node, raw);
    node.nodeValue = base.match(/^\s*/)[0] + out + base.match(/\s*$/)[0];
  }

  let done = new WeakSet();
  const doneRef = { clear() { done = new WeakSet(); } };

  function walkRoot(root) {
    if (!root) return;
    walkHtml(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => {
        if (!n.parentElement) return NodeFilter.FILTER_REJECT;
        if (SKIP.has(n.parentElement.tagName)) return NodeFilter.FILTER_REJECT;
        if (done.has(n)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const list = [];
    while (w.nextNode()) list.push(w.currentNode);
    for (let i = 0; i < list.length; i++) { done.add(list[i]); applyText(list[i]); }
    root.querySelectorAll('input[placeholder]').forEach(el => {
      const key = el.placeholder.trim();
      if (DICT[key]) { if (!el.dataset.zhPh) el.dataset.zhPh = el.placeholder; el.placeholder = DICT[key]; }
    });
  }

  /* 只翻导航 + 当前显示的视图，隐藏的视图等切过去再翻 */
  function walk(root) {
    const nav = document.querySelector('.nav');
    if (nav) walkRoot(nav);
    if (root === document.body) {
      document.querySelectorAll('.view').forEach(v => {
        if (!v.classList.contains('is-hidden')) walkRoot(v);
      });
      return;
    }
    walkRoot(root);
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
    doneRef.clear();
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

  window.__setLang = (l) => setLang(l);
  window.i18nRefresh = () => { if (current === 'en') walk(document.body); };
  window.__walkRoot = (n) => { doneRef.clear(); walkRoot(n); };

  function setLang(lang) {
    if (lang === current) { paint(); return; }
    current = lang;
    document.documentElement.classList.add('lang-busy');
    requestAnimationFrame(() => {
      doneRef.clear();
      const t0 = performance.now();
      if (lang === 'en') walk(document.body); else restore(document.body);
      window.__langMs = +(performance.now() - t0).toFixed(1);
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('lang-busy');
        if (typeof rerenderView === 'function') rerenderView();
      });
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    try { localStorage.setItem('xjtlumajor.lang', lang); } catch (e) {}
    paint();
    if (typeof window.__rerender === 'function' && current === 'en') { try { window.__rerender(); } catch (e) {} }
  }

  function paint() {
    const btn = document.getElementById('langBtn');
    if (btn) btn.textContent = current === 'en' ? '中文' : 'EN';
  }


  /* ---------- 渲染期翻译（英文模式下拦截 innerHTML） ---------- */
  let i18nBusy = false;
  let i18nDepth = 0;

  function translateHtml(html) {
    if (typeof html !== 'string' || !html) return html;
    if (i18nDepth > 0) return html;
    i18nDepth++;
    i18nBusy = true;
    let out = html;
    try {
      const box = document.createElement('div');
      box.innerHTML = html;
      walkRoot(box);
      out = box.innerHTML;
    } catch (e) {
      out = html;
    } finally {
      i18nBusy = false;
      i18nDepth--;
    }
    return out;
  }

  (function installInnerHtmlHook() {
    const desc = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
    if (!desc || !desc.set) return;
    Object.defineProperty(Element.prototype, 'innerHTML', {
      configurable: true,
      get() { return desc.get.call(this); },
      set(v) { desc.set.call(this, current === 'en' && !i18nBusy ? translateHtml(v) : v); }
    });
  })();

  function rerenderView() {
    try { window.dispatchEvent(new HashChangeEvent('hashchange')); } catch (e) {}
  }

  function lookup(str) {
    const k = String(str).trim();
    if (!k) return str;
    let out = DICT[k];
    if (!out && typeof window !== 'undefined' && window.EN_MAP) {
      const cand = window.EN_MAP[k];
      if (cand && !BAD_TR.test(cand)) out = cand;
    }
    if (!out) {
      for (const [re, rep] of PATTERNS) {
        if (re.test(k)) { out = k.replace(re, rep); break; }
      }
    }
    return out || str;
  }

  window.tr = function (str) { return current === 'en' ? lookup(String(str)) : String(str); };
  window.setLang = setLang;
  window.getLang = () => current;

  absorbMajorNames();

  window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('langBtn');
    if (btn) btn.addEventListener('click', () => setLang(current === 'en' ? 'zh' : 'en'));

    const pending = new Set();
    new MutationObserver(records => {
      if (current !== 'en') return;
      records.forEach(r => {
        if (r.type === 'characterData') {
          const t = r.target;
          if (t && t.nodeType === 3) pending.add(t.parentElement || t);
          return;
        }
        r.addedNodes.forEach(n => {
          if (n.nodeType === 1) pending.add(n);
          else if (n.nodeType === 3 && n.parentElement) pending.add(n.parentElement);
        });
      });
      if (!pending.size) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        pending.forEach(n => { if (n.isConnected) walkRoot(n); });
        pending.clear();
      }, 50);
    }).observe(mainEl(), { childList: true, subtree: true, characterData: true });

    let saved = 'zh';
    try { saved = localStorage.getItem('xjtlumajor.lang') || 'zh'; } catch (e) {}
    paint();
    if (saved === 'en') setTimeout(() => setLang('en'), 80);
  });
})();
