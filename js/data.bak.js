/* =========================================================
   西浦大一选专业 · 数据
   - 专业清单：XJTLU 官网本科专业页（52 个），2025-26
   - 大一课程结构 / 各专业先修要求：XJTLU《2025-26 Annual Registration Guide for Year 1 Students》
   - 参考分数：社区经验估算值，官方从不公布分数线，仅供比较，不可当作承诺
   ========================================================= */
window.XJTLU = {
  disclaimer: '参考分为社区经验估算值，XJTLU 官方从不公布专业分流分数线；实际录取按当年容量与报名情况浮动，请务必以学校 3 月发布的正式通知为准。',

  schools: {
  "sat": {
    "cn": "人工智能与先进技术学院",
    "en": "School of AI and Advanced Technology",
    "color": "#3D4CE0",
    "soft": "#EEF0FE"
  },
  "design": {
    "cn": "设计学院",
    "en": "Design School",
    "color": "#E0573D",
    "soft": "#FCF0EE"
  },
  "hss": {
    "cn": "人文社科学院",
    "en": "School of Humanities and Social Sciences",
    "color": "#8B5CF6",
    "soft": "#F4EFFE"
  },
  "ibss": {
    "cn": "西浦国际商学院",
    "en": "International Business School Suzhou",
    "color": "#0FA47A",
    "soft": "#E8F7F2"
  },
  "smp": {
    "cn": "数学物理学院",
    "en": "School of Mathematics and Physics",
    "color": "#2F6BFF",
    "soft": "#EAF1FE"
  },
  "sci": {
    "cn": "生命与自然科学学院",
    "en": "School of Science",
    "color": "#0E9F6E",
    "soft": "#E7F7F0"
  },
  "afct": {
    "cn": "影视与创意科技学院",
    "en": "Academy of Film and Creative Technology",
    "color": "#E23D6A",
    "soft": "#FDECF1"
  },
  "tc": {
    "cn": "太仓创业家学院",
    "en": "XJTLU Entrepreneur College (Taicang)",
    "color": "#C08A2E",
    "soft": "#FCF3E2"
  }
},

  modules: [
  {
    "id": "calc",
    "name": "微积分",
    "code": "MTH013 / MTH026 等",
    "cred": 5,
    "counted": true,
    "parts": [
      { "k": "cw", "label": "平时", "w": 20 },
      { "k": "mid", "label": "期中", "w": 20 },
      { "k": "final", "label": "期末", "w": 60 }
    ]
  },
  {
    "id": "linalg",
    "name": "线性代数",
    "code": "MTH007 / MTH028 等",
    "cred": 5,
    "counted": true,
    "parts": [
      { "k": "cw", "label": "平时", "w": 20 },
      { "k": "mid", "label": "期中", "w": 20 },
      { "k": "final", "label": "期末", "w": 60 }
    ]
  },
  {
    "id": "eap",
    "name": "EAP 学术英语",
    "code": "全年 20",
    "cred": 20,
    "counted": false
  },
  {
    "id": "opt",
    "name": "大一上选修",
    "code": "10 学分",
    "cred": 10,
    "counted": false
  }
],

  majors: [
  {
    "id": "cs",
    "name": "计算机科学与技术",
    "en": "Computer Science and Technology",
    "degree": "BEng",
    "school": "sat",
    "score": 89,
    "hist": [
      80,
      83,
      89
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "物理 + 多元微积分",
    "tagline": "用代码把想法变成能跑的系统",
    "goals": "系统学习编程、数据结构与算法、计算机组成、操作系统与软件工程，从底层原理到工程方法打通，训练独立设计和实现复杂软件系统的能力。",
    "careers": [
      "软件 / 算法工程师",
      "数据与后端开发",
      "读研深造",
      "产品与创业"
    ],
    "masters": "常见去向：UCL、帝国理工、爱丁堡、KCL、曼大等英国院校的 CS / AI / Data Science 硕士，也有新加坡国立、港大。多数项目要求本科均分 65+（2:1），G5 方向通常要 70+ 并看重项目经历。"
  },
  {
    "id": "ee",
    "name": "电气工程及其自动化",
    "en": "Electrical Engineering",
    "degree": "BEng",
    "school": "sat",
    "score": 80,
    "hist": [
      73,
      78,
      80
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "物理 + 多元微积分",
    "tagline": "从电路到电网，让能量可控",
    "goals": "学习电路、电磁场、电力电子、电机与自动控制，掌握电气系统与智能电网的分析、设计与调试。",
    "careers": [
      "电力系统 / 电网",
      "新能源与储能",
      "自动化与嵌入式",
      "读研"
    ],
    "masters": "常见去向：帝国理工、曼大、爱丁堡的 Electrical Power Systems / Control 硕士，港大与新加坡国立也常见。"
  },
  {
    "id": "est",
    "name": "电子科学与技术",
    "en": "Electronic Science and Technology",
    "degree": "BEng",
    "school": "sat",
    "score": 78,
    "hist": [
      71,
      75,
      78
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "物理 + 多元微积分",
    "tagline": "芯片、电路与信号的世界",
    "goals": "围绕电子器件、集成电路、信号与通信电子展开，从半导体物理一路学到电路设计，理解硬件是怎么被造出来的。",
    "careers": [
      "芯片设计与验证",
      "硬件 / 嵌入式",
      "射频与通信设备",
      "读研"
    ],
    "masters": "常见去向：帝国理工、UCL、南安普顿的微电子 / 集成电路硕士，港科大与新加坡国立也受欢迎。"
  },
  {
    "id": "dmt",
    "name": "数字媒体技术",
    "en": "Digital Media Technology",
    "degree": "BEng",
    "school": "sat",
    "score": 75,
    "hist": [
      68,
      73,
      75
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "物理 + 多元微积分",
    "tagline": "既懂技术，也懂内容",
    "goals": "结合计算机技术与数字内容创作，学习图形图像、交互设计、游戏与虚拟现实开发，做出既好看又好用的数字产品。",
    "careers": [
      "游戏 / 引擎开发",
      "交互与前端开发",
      "影视后期与特效",
      "读研"
    ],
    "masters": "常见去向：UCL、爱丁堡、KCL 的 HCI / 游戏 / 数字媒体方向；也有去皇艺、伦艺读交互设计的。"
  },
  {
    "id": "ics",
    "name": "信息与计算科学",
    "en": "Information and Computing Science",
    "degree": "BSc",
    "school": "sat",
    "score": 74,
    "hist": [
      67,
      72,
      74
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "多元微积分",
    "tagline": "数学打底，计算为器",
    "goals": "以数学为基础、计算机为工具，学习数值计算、优化、数据分析与建模，解决工程和金融里的实际问题。",
    "careers": [
      "数据分析 / 算法",
      "量化与金融科技",
      "软件研发",
      "读研"
    ],
    "masters": "常见去向：LSE、UCL、爱丁堡的 Data Science / Applied Mathematics；偏金融数学的会申 IC、KCL。"
  },
  {
    "id": "mrs",
    "name": "机械电子工程",
    "en": "Mechatronics and Robotic Systems",
    "degree": "BEng",
    "school": "sat",
    "score": 73,
    "hist": [
      66,
      71,
      73
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "物理 + 多元微积分",
    "tagline": "让机器自己动起来",
    "goals": "融合机械、电子与控制，学习机器人机构、传感器、嵌入式与自动控制，能独立搭建并调试机电系统。",
    "careers": [
      "机器人 / 自动化",
      "智能制造",
      "汽车电子",
      "读研"
    ],
    "masters": "常见去向：帝国理工、曼大、谢菲的 Robotics / Mechatronics 硕士；德国亚琛、慕工大也很受欢迎。"
  },
  {
    "id": "te",
    "name": "通信工程",
    "en": "Telecommunications Engineering",
    "degree": "BEng",
    "school": "sat",
    "score": 72,
    "hist": [
      65,
      69,
      72
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "物理 + 多元微积分",
    "tagline": "把信息送得更远、更稳",
    "goals": "学习信号与系统、通信原理、无线与光通信、网络协议，理解并设计现代通信系统。",
    "careers": [
      "通信设备与运营商",
      "网络与协议开发",
      "芯片与射频",
      "读研"
    ],
    "masters": "常见去向：帝国理工、UCL、南安普顿的 Communications / Wireless 硕士。"
  },
  {
    "id": "arch",
    "name": "建筑学",
    "en": "Architecture",
    "degree": "BEng",
    "school": "design",
    "score": 84,
    "hist": [
      78,
      82,
      84
    ],
    "basis": "c",
    "pre1": "微积分 + 建筑/设计类选修（ARC001 / DES002 / DES003 / DES004 任一门）",
    "pre2": "多元微积分 + DES002 / DES004",
    "tagline": "在图纸与模型之间造空间",
    "goals": "学习建筑设计、建筑历史与理论、结构与材料、制图与建模。设计课（studio）是核心，反复做方案、被评图、再改，训练真实的方案能力。",
    "careers": [
      "建筑设计院",
      "城市与景观设计",
      "室内与展陈",
      "读研"
    ],
    "masters": "常见去向：UCL Bartlett、AA、爱丁堡、谢菲的建筑设计硕士。申请必须交作品集，一般要求 2:1 及以上。"
  },
  {
    "id": "id",
    "name": "工业设计",
    "en": "Industrial Design",
    "degree": "BEng",
    "school": "design",
    "score": 76,
    "hist": [
      69,
      74,
      76
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "物理 + 多元微积分",
    "tagline": "好用、好看、还造得出来",
    "goals": "从用户需求出发，学习产品造型、人机工程、材料工艺与设计表达，兼顾美学与可制造性。",
    "careers": [
      "产品 / 工业设计",
      "用户体验设计",
      "设计咨询",
      "读研"
    ],
    "masters": "常见去向：皇艺、伦艺、米兰理工、代尔夫特的产品设计硕士，需作品集。"
  },
  {
    "id": "civil",
    "name": "土木工程",
    "en": "Civil Engineering",
    "degree": "BEng",
    "school": "design",
    "score": 66,
    "hist": [
      59,
      64,
      66
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "多元微积分",
    "tagline": "让结构站得住，让城市转得动",
    "goals": "学习结构力学、材料、岩土与工程施工，掌握建筑与基础设施的分析、设计与建造管理。",
    "careers": [
      "设计院 / 施工企业",
      "工程咨询与造价",
      "市政与轨道交通",
      "读研"
    ],
    "masters": "常见去向：帝国理工、UCL、剑桥（MPhil）、曼大的 Civil / Structural 硕士。"
  },
  {
    "id": "upd",
    "name": "城乡规划",
    "en": "Urban Planning and Design",
    "degree": "BA",
    "school": "design",
    "score": 63,
    "hist": [
      56,
      60,
      63
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "看懂城市，再改变城市",
    "goals": "学习城市空间、土地利用、交通与规划政策，用规划和设计工具分析并改善真实的城市问题。",
    "careers": [
      "规划院 / 政府部门",
      "地产与城市更新",
      "咨询",
      "读研"
    ],
    "masters": "常见去向：UCL、剑桥、谢菲的 Urban Planning / Design 硕士。"
  },
  {
    "id": "mcs",
    "name": "传播学",
    "en": "Media and Communication Studies",
    "degree": "BA",
    "school": "hss",
    "score": 68,
    "hist": [
      61,
      66,
      68
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "会讲故事，也懂传播规律",
    "goals": "学习新闻传播理论、媒介研究、数字内容生产与公关策略，能独立完成从策划到发布的全流程。",
    "careers": [
      "新媒体运营",
      "品牌公关",
      "内容制作",
      "读研"
    ],
    "masters": "常见去向：LSE、KCL、华威、威敏的 Media & Communication 硕士。"
  },
  {
    "id": "ebs",
    "name": "英语（金融商务英语）",
    "en": "English and Business",
    "degree": "BA",
    "school": "hss",
    "score": 71,
    "hist": [
      64,
      68,
      71
    ],
    "basis": "c",
    "pre1": "微积分",
    "pre2": "无",
    "tagline": "语言能力 + 商业嗅觉",
    "goals": "同时学习英语语言文学与商科基础，能在跨文化商务环境里沟通、写作并做基本的商业分析。",
    "careers": [
      "外贸 / 跨境电商",
      "国际商务",
      "公关与市场",
      "读研"
    ],
    "masters": "常见去向：华威、曼大、KCL 的 Business / International Management 硕士。"
  },
  {
    "id": "ti",
    "name": "翻译",
    "en": "Translation and Interpreting",
    "degree": "BA",
    "school": "hss",
    "score": 66,
    "hist": [
      59,
      64,
      66
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "在两种语言之间精确搬运意义",
    "goals": "训练笔译、口译与本地化能力，学习翻译理论与 CAT 工具，目标是达到专业级的双语转换水平。",
    "careers": [
      "笔译 / 口译",
      "本地化与字幕",
      "国际组织",
      "读研"
    ],
    "masters": "常见去向：巴斯、纽卡、利兹的口译 / 翻译硕士，通常要笔试和面试。"
  },
  {
    "id": "ir",
    "name": "国际事务与国际关系",
    "en": "International Relations",
    "degree": "BA",
    "school": "hss",
    "score": 65,
    "hist": [
      58,
      63,
      65
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "看懂世界为什么这样运转",
    "goals": "学习国际政治理论、外交与全球治理，训练政策分析与论证写作的能力。",
    "careers": [
      "外交与外事",
      "国际组织 / NGO",
      "政策研究",
      "读研"
    ],
    "masters": "常见去向：LSE、SOAS、爱丁堡、KCL 的 IR / Public Policy 硕士。"
  },
  {
    "id": "eal",
    "name": "英语（应用语言学）",
    "en": "Applied Linguistics",
    "degree": "BA",
    "school": "hss",
    "score": 64,
    "hist": [
      57,
      61,
      64
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "把语言拆开看，也教别人用",
    "goals": "系统学习语言学理论、二语习得与英语教学法，具备语言分析与教学实践能力。",
    "careers": [
      "英语教学",
      "教材与出版",
      "语言测评",
      "读研"
    ],
    "masters": "常见去向：UCL IOE、爱丁堡、华威的 Applied Linguistics / TESOL 硕士。"
  },
  {
    "id": "ecs",
    "name": "英语（传媒英语）",
    "en": "English and Communication Studies",
    "degree": "BA",
    "school": "hss",
    "score": 63,
    "hist": [
      56,
      60,
      63
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "语言 + 媒介，两条腿走路",
    "goals": "结合英语语言能力与传播学训练，学习跨文化沟通、媒体写作与话语分析。",
    "careers": [
      "国际传播",
      "翻译与本地化",
      "公关",
      "读研"
    ],
    "masters": "常见去向：LSE、KCL、利兹的 Communication / Media 硕士。"
  },
  {
    "id": "esgc",
    "name": "英语（全球语境下的英语研究）",
    "en": "English Studies in Global Context",
    "degree": "BA",
    "school": "hss",
    "score": 61,
    "hist": [
      55,
      59,
      61
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "在全球化语境里用英语思考",
    "goals": "以英语文学与文化研究为主，训练细读、批判性写作与跨文化理解能力。",
    "careers": [
      "出版与编辑",
      "教育",
      "文化机构",
      "读研"
    ],
    "masters": "常见去向：爱丁堡、KCL、华威的 English Literature / Cultural Studies 硕士。"
  },
  {
    "id": "cns",
    "name": "汉学与中国学",
    "en": "China Studies",
    "degree": "BA",
    "school": "hss",
    "score": 59,
    "hist": [
      52,
      57,
      59
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "用世界的眼光看中国",
    "goals": "从历史、社会、政治与经济多学科视角理解当代中国，训练研究与跨文化表达。",
    "careers": [
      "公共事务 / 政策研究",
      "媒体与文化机构",
      "国际组织",
      "读研"
    ],
    "masters": "常见去向：LSE、SOAS、爱丁堡的中国研究 / 国际关系硕士。"
  },
  {
    "id": "econ",
    "name": "经济学",
    "en": "Economics",
    "degree": "BSc",
    "school": "ibss",
    "score": 82,
    "hist": [
      75,
      80,
      82
    ],
    "basis": "c",
    "pre1": "微积分",
    "pre2": "无",
    "tagline": "用模型解释选择与市场",
    "goals": "学习微观与宏观经济学、计量与数理方法，能用数据和模型分析现实中的经济问题。",
    "careers": [
      "经济研究 / 政策",
      "咨询",
      "金融分析",
      "读研"
    ],
    "masters": "常见去向：LSE、UCL、华威、爱丁堡的 Economics 硕士，一般要求 2:1，且很看数学类课程成绩。"
  },
  {
    "id": "ef",
    "name": "经济与金融",
    "en": "Economics and Finance",
    "degree": "BSc",
    "school": "ibss",
    "score": 81,
    "hist": [
      74,
      79,
      81
    ],
    "basis": "c",
    "pre1": "微积分",
    "pre2": "无",
    "tagline": "经济学的脑子，金融的手",
    "goals": "结合经济学理论与金融市场实务，学习资产定价、公司金融与计量分析。",
    "careers": [
      "投行 / 券商",
      "基金与资管",
      "风险管理",
      "读研"
    ],
    "masters": "常见去向：LSE、帝国理工、UCL 的 Finance / Economics and Finance 硕士，属于申请最卷的方向之一。"
  },
  {
    "id": "acc",
    "name": "会计学",
    "en": "Accounting",
    "degree": "BA",
    "school": "ibss",
    "score": 80,
    "hist": [
      73,
      78,
      80
    ],
    "basis": "c",
    "pre1": "微积分",
    "pre2": "无",
    "tagline": "数字背后的商业语言",
    "goals": "学习财务会计、管理会计、审计与税法，建立能读懂并编制财务报表的硬技能。",
    "careers": [
      "四大 / 会计师事务所",
      "企业财务",
      "投行与券商",
      "读研"
    ],
    "masters": "常见去向：LSE、帝国理工、华威、曼大的 Accounting & Finance 硕士，通常要求 2:1 并看数理背景。"
  },
  {
    "id": "imis",
    "name": "信息管理与信息系统",
    "en": "Information Management and Information Systems",
    "degree": "BSc",
    "school": "ibss",
    "score": 75,
    "hist": [
      68,
      73,
      75
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "无",
    "tagline": "在业务与技术之间搭桥",
    "goals": "学习信息系统设计、数据库、数据分析与项目管理，把业务需求翻译成可以落地的系统方案。",
    "careers": [
      "IT 咨询",
      "产品经理",
      "数据分析",
      "读研"
    ],
    "masters": "常见去向：UCL、LSE、华威的 Information Systems / Business Analytics 硕士。"
  },
  {
    "id": "ibl",
    "name": "国际商务",
    "en": "International Business with a Language",
    "degree": "BA",
    "school": "ibss",
    "score": 68,
    "hist": [
      61,
      66,
      68
    ],
    "basis": "lang",
    "pre1": "需修满第二外语两个阶段",
    "pre2": "无",
    "tagline": "一门专业，加一门外语",
    "goals": "在国际商务核心课程之外，系统学习第二外语并达到两个阶段，为跨国环境工作做准备。",
    "careers": [
      "跨国企业",
      "国际贸易",
      "海外市场",
      "读研"
    ],
    "masters": "常见去向：华威、曼大、ESCP 等 International Business 硕士。"
  },
  {
    "id": "ba",
    "name": "工商管理",
    "en": "Business Administration",
    "degree": "BA",
    "school": "ibss",
    "score": 66,
    "hist": [
      59,
      64,
      66
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "学会把一群人组织起来做事",
    "goals": "覆盖战略、组织、运营、市场与财务，训练综合管理视角和团队协作能力。",
    "careers": [
      "管理培训生",
      "咨询",
      "运营 / 项目",
      "读研"
    ],
    "masters": "常见去向：华威、曼大、KCL 的 Management 硕士，部分项目需要 GMAT。"
  },
  {
    "id": "mkt",
    "name": "市场营销",
    "en": "Digital and Intelligent Marketing",
    "degree": "BA",
    "school": "ibss",
    "score": 65,
    "hist": [
      58,
      63,
      65
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "理解人，然后说服人",
    "goals": "学习消费者行为、品牌管理、数字营销与市场研究，能策划并评估一次完整的营销活动。",
    "careers": [
      "品牌 / 市场",
      "数字营销",
      "消费者研究",
      "读研"
    ],
    "masters": "常见去向：LSE、华威、曼大的 Marketing 硕士。"
  },
  {
    "id": "hrm",
    "name": "人力资源管理",
    "en": "Human Resource Management and People Analytics",
    "degree": "BA",
    "school": "ibss",
    "score": 63,
    "hist": [
      56,
      60,
      63
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "用数据管人，而不只是凭感觉",
    "goals": "学习组织行为、招聘培训、薪酬绩效，并引入数据分析方法支持人力决策。",
    "careers": [
      "HR / HRBP",
      "组织发展",
      "人力咨询",
      "读研"
    ],
    "masters": "常见去向：LSE、华威、曼大的 HRM / Organisational Behaviour 硕士。"
  },
  {
    "id": "fm",
    "name": "金融数学",
    "en": "Financial Mathematics",
    "degree": "BSc",
    "school": "smp",
    "score": 87,
    "hist": [
      80,
      84,
      87
    ],
    "basis": "cl",
    "pre1": "微积分（MTH029 / MTH023）+ 线性代数（MTH017）",
    "pre2": "多元微积分",
    "tagline": "数学、金融与编程的交叉点",
    "goals": "用随机分析、数值方法与编程解决衍生品定价、风险度量等金融问题，数学要求是全校最高的方向之一。",
    "careers": [
      "量化交易",
      "风险管理",
      "金融科技",
      "读研"
    ],
    "masters": "常见去向：帝国理工、LSE、UCL 的 Financial Mathematics / Mathematical Finance 硕士。"
  },
  {
    "id": "act",
    "name": "精算学",
    "en": "Actuarial Science",
    "degree": "BSc",
    "school": "smp",
    "score": 83,
    "hist": [
      76,
      81,
      83
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "多元微积分",
    "tagline": "给风险定价",
    "goals": "学习概率统计、精算模型、寿险与非寿险数学，课程内容对接精算师资格考试。",
    "careers": [
      "精算师",
      "保险与再保险",
      "风险管理",
      "读研"
    ],
    "masters": "常见去向：LSE、贝叶斯商学院、赫瑞瓦特的 Actuarial Science 硕士，部分可豁免考试科目。"
  },
  {
    "id": "am",
    "name": "应用数学",
    "en": "Applied Mathematics",
    "degree": "BSc",
    "school": "smp",
    "score": 78,
    "hist": [
      71,
      75,
      78
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "物理 + 多元微积分",
    "tagline": "把抽象数学用到真实世界",
    "goals": "学习数学分析、代数、微分方程与数值方法，训练用数学建模解决工程与科学问题的能力。",
    "careers": [
      "数据科学",
      "量化研究",
      "算法工程",
      "读研"
    ],
    "masters": "常见去向：剑桥 Part III、帝国理工、UCL、爱丁堡的 Applied Mathematics / Data Science 硕士。"
  },
  {
    "id": "bioinf",
    "name": "生物信息学",
    "en": "Bioinformatics",
    "degree": "BSc",
    "school": "sci",
    "score": 71,
    "hist": [
      64,
      68,
      71
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "多元微积分",
    "tagline": "用代码读懂生命",
    "goals": "结合生物学与计算科学，学习基因组学、序列分析与统计建模，处理海量生物数据。",
    "careers": [
      "生物信息分析",
      "医药研发",
      "科研院所",
      "读研"
    ],
    "masters": "常见去向：UCL、爱丁堡、帝国理工的 Bioinformatics / Computational Biology 硕士。"
  },
  {
    "id": "bms",
    "name": "生物医学科学",
    "en": "Biomedical Sciences",
    "degree": "BSc",
    "school": "sci",
    "score": 69,
    "hist": [
      63,
      67,
      69
    ],
    "basis": "c",
    "pre1": "微积分",
    "pre2": "无",
    "tagline": "面向疾病的生物学",
    "goals": "聚焦人体生理、病理、免疫与药理学，为医学与生物医药研究打基础。",
    "careers": [
      "医药研发",
      "临床研究 / CRA",
      "继续攻读医学",
      "读研"
    ],
    "masters": "常见去向：UCL、帝国理工、KCL 的 Biomedical Sciences 硕士；也有学生转申医学方向。"
  },
  {
    "id": "bio",
    "name": "生物科学",
    "en": "Biological Sciences",
    "degree": "BSc",
    "school": "sci",
    "score": 66,
    "hist": [
      59,
      64,
      66
    ],
    "basis": "c",
    "pre1": "微积分",
    "pre2": "无",
    "tagline": "从细胞到生态系统",
    "goals": "系统学习分子生物学、遗传学、生理与生态，配合大量实验训练科研基本功。",
    "careers": [
      "科研 / 高校",
      "生物医药",
      "检测与临床",
      "读研"
    ],
    "masters": "常见去向：UCL、帝国理工、爱丁堡的 Biomedical / Molecular Biology 硕士。"
  },
  {
    "id": "env",
    "name": "环境科学",
    "en": "Environmental Science",
    "degree": "BSc",
    "school": "sci",
    "score": 64,
    "hist": [
      57,
      61,
      64
    ],
    "basis": "c",
    "pre1": "微积分",
    "pre2": "无",
    "tagline": "理解地球，然后保护它",
    "goals": "学习生态、大气与水环境、环境监测与政策，具备环境问题的调查与评估能力。",
    "careers": [
      "环境咨询",
      "环保部门",
      "ESG / 可持续发展",
      "读研"
    ],
    "masters": "常见去向：帝国理工、UCL、爱丁堡的 Environmental Science / Management 硕士。"
  },
  {
    "id": "chem",
    "name": "应用化学",
    "en": "Applied Chemistry",
    "degree": "BSc",
    "school": "sci",
    "score": 61,
    "hist": [
      55,
      59,
      61
    ],
    "basis": "c",
    "pre1": "微积分",
    "pre2": "无",
    "tagline": "从分子层面改造材料",
    "goals": "学习有机、无机、分析与物理化学，配合大量实验技能训练，能独立设计并完成合成与分析。",
    "careers": [
      "化工 / 材料研发",
      "医药与检测",
      "质量控制",
      "读研"
    ],
    "masters": "常见去向：帝国理工、UCL、曼大的 Chemistry / Materials 硕士。"
  },
  {
    "id": "mse",
    "name": "材料科学与工程",
    "en": "Materials Science and Engineering",
    "degree": "BEng",
    "school": "sci",
    "score": 60,
    "hist": [
      53,
      58,
      60
    ],
    "basis": "c",
    "pre1": "微积分",
    "pre2": "无",
    "tagline": "新材料的发现者",
    "goals": "学习材料的结构、性能与制备工艺，理解金属、陶瓷、高分子与复合材料的设计逻辑。",
    "careers": [
      "材料研发",
      "新能源 / 半导体",
      "质量与工艺",
      "读研"
    ],
    "masters": "常见去向：帝国理工、曼大、谢菲的 Materials Science 硕士。"
  },
  {
    "id": "dma",
    "name": "数字媒体艺术",
    "en": "Digital Media Arts",
    "degree": "BA",
    "school": "afct",
    "score": 58,
    "hist": [
      51,
      56,
      58
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "技术就是画笔",
    "goals": "学习数字影像、交互装置、动效与虚拟制作，用技术手段完成艺术表达。",
    "careers": [
      "交互艺术",
      "动效 / 视觉设计",
      "游戏美术",
      "读研"
    ],
    "masters": "常见去向：皇艺、伦艺、金史密斯的 Digital Media / Computational Arts 硕士。"
  },
  {
    "id": "film",
    "name": "影视摄影与制作",
    "en": "Filmmaking",
    "degree": "BA",
    "school": "afct",
    "score": 57,
    "hist": [
      50,
      55,
      57
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "从剧本到成片",
    "goals": "学习编剧、导演、摄影、剪辑与制片全流程，在实践中完成自己的短片作品。",
    "careers": [
      "导演 / 摄影",
      "剪辑 / 后期",
      "影视制片",
      "自由创作"
    ],
    "masters": "常见去向：NFTS、伦艺、哥大、NYU 的电影制作硕士，全部需要作品集。"
  },
  {
    "id": "tv",
    "name": "广播电视学",
    "en": "TV Production",
    "degree": "BA",
    "school": "afct",
    "score": 56,
    "hist": [
      49,
      53,
      56
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "为屏幕生产内容",
    "goals": "学习电视节目策划、演播室制作、直播与流媒体内容运营。",
    "careers": [
      "节目编导",
      "直播 / 短视频",
      "内容运营",
      "读研"
    ],
    "masters": "常见去向：威敏、伦艺、金史密斯的 TV / Media Production 硕士。"
  },
  {
    "id": "pharm",
    "name": "药学",
    "en": "Pharmaceutical Sciences",
    "degree": "BSc",
    "school": "sci",
    "score": 74,
    "hist": [
      67,
      72,
      74
    ],
    "basis": "c",
    "pre1": "微积分",
    "pre2": "多元微积分",
    "tagline": "从分子到药品",
    "goals": "学习药物化学、药剂学、药理学与药物分析，理解药物从设计、试验到上市的完整路径。",
    "careers": [
      "药物研发",
      "药企注册 / QA",
      "临床药学",
      "读研"
    ],
    "masters": "常见去向：UCL、帝国理工、诺丁汉的药学 / 药物研发硕士。"
  },
  {
    "id": "bpharm",
    "name": "生物制药",
    "en": "Biopharmaceuticals",
    "degree": "BSc",
    "school": "sci",
    "score": 72,
    "hist": [
      65,
      69,
      72
    ],
    "basis": "c",
    "pre1": "微积分",
    "pre2": "多元微积分",
    "tagline": "用生物体系造药",
    "goals": "聚焦生物技术制药，学习基因工程、细胞培养、纯化工艺与质量管理。",
    "careers": [
      "生物药工艺",
      "研发 / QC",
      "CRO / CDMO",
      "读研"
    ],
    "masters": "常见去向：UCL、爱丁堡、曼大的 Biopharmaceuticals / Biotechnology 硕士。"
  },
  {
    "id": "bmstat",
    "name": "应用统计学",
    "en": "Biomedical Statistics",
    "degree": "BSc",
    "school": "sci",
    "score": 69,
    "hist": [
      63,
      67,
      69
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "多元微积分",
    "tagline": "用统计证明药物有效",
    "goals": "学习统计推断、临床试验设计与生物信息分析，为医学研究提供数据支撑。",
    "careers": [
      "生物统计师",
      "临床数据管理",
      "医药数据分析",
      "读研"
    ],
    "masters": "常见去向：UCL、伦敦卫生与热带医学院、爱丁堡的 Medical Statistics / Biostatistics 硕士。"
  },
  {
    "id": "aiia",
    "name": "人工智能",
    "en": "Artificial Intelligence",
    "degree": "BEng",
    "school": "tc",
    "campus": "taicang",
    "score": 78,
    "hist": [
      71,
      75,
      78
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "多元微积分",
    "tagline": "苏州园区与太仓都开设",
    "goals": "聚焦产业场景中的计算机视觉、工业机器人与智能决策，课程与西浦太仓的产业伙伴深度绑定，大量真实项目。",
    "careers": [
      "工业 AI 工程",
      "视觉算法",
      "智能制造",
      "读研"
    ],
    "masters": "常见去向：帝国理工、UCL、爱丁堡的 AI / Robotics 硕士。"
  },
  {
    "id": "ds",
    "name": "数据科学与大数据技术",
    "en": "Data Science and Big Data Technology",
    "degree": "BEng",
    "school": "tc",
    "campus": "taicang",
    "score": 75,
    "hist": [
      68,
      73,
      75
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "多元微积分",
    "tagline": "从数据到决策",
    "goals": "学习数据采集、存储、建模与可视化，结合产业项目解决真实的数据问题。",
    "careers": [
      "数据分析 / 挖掘",
      "大数据开发",
      "产业数字化",
      "读研"
    ],
    "masters": "常见去向：UCL、爱丁堡、曼大的 Data Science 硕士。"
  },
  {
    "id": "mse-tc",
    "name": "微电子科学与工程",
    "en": "Microelectronic Science and Engineering",
    "degree": "BEng",
    "school": "tc",
    "campus": "taicang",
    "score": 73,
    "hist": [
      66,
      71,
      73
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "多元微积分",
    "tagline": "从晶圆到芯片",
    "goals": "学习半导体器件、集成电路设计与制造工艺，对接芯片产业的实际需求。",
    "careers": [
      "芯片设计 / 制造",
      "封装测试",
      "半导体设备",
      "读研"
    ],
    "masters": "常见去向：帝国理工、UCL、南安普顿的 Microelectronics 硕士。"
  },
  {
    "id": "ire",
    "name": "机器人工程",
    "en": "Intelligent Robotics Engineering",
    "degree": "BEng",
    "school": "tc",
    "campus": "taicang",
    "score": 71,
    "hist": [
      64,
      68,
      71
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "多元微积分",
    "tagline": "造会干活的机器人",
    "goals": "学习机器人运动学、感知、控制与系统集成，与产业伙伴共同开发机器人应用。",
    "careers": [
      "机器人研发",
      "自动化集成",
      "算法工程",
      "读研"
    ],
    "masters": "常见去向：帝国理工、曼大、谢菲的 Robotics 硕士。"
  },
  {
    "id": "ime",
    "name": "智能制造工程",
    "en": "Intelligent Manufacturing Engineering",
    "degree": "BEng",
    "school": "tc",
    "campus": "taicang",
    "score": 68,
    "hist": [
      61,
      66,
      68
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "多元微积分",
    "tagline": "让产线自己优化",
    "goals": "学习数字化制造、工业互联网与生产系统优化，在真实产线中做改进项目。",
    "careers": [
      "智能制造工程",
      "工艺 / 产线优化",
      "工业软件",
      "读研"
    ],
    "masters": "常见去向：曼大、谢菲、帝国理工的 Advanced Manufacturing 硕士。"
  },
  {
    "id": "iot",
    "name": "物联网工程",
    "en": "Internet of Things Engineering",
    "degree": "BEng",
    "school": "tc",
    "campus": "taicang",
    "score": 66,
    "hist": [
      59,
      64,
      66
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "多元微积分",
    "tagline": "让万物联网",
    "goals": "学习传感、嵌入式、无线通信与云平台，能端到端搭建一套物联网系统。",
    "careers": [
      "嵌入式开发",
      "IoT 方案",
      "智能硬件",
      "读研"
    ],
    "masters": "常见去向：UCL、南安普顿、曼大的 IoT / Embedded Systems 硕士。"
  },
  {
    "id": "isc",
    "name": "供应链管理",
    "en": "Intelligent Supply Chain with Contemporary Entrepreneurialism",
    "degree": "BSc",
    "school": "tc",
    "campus": "taicang",
    "score": 65,
    "hist": [
      58,
      63,
      65
    ],
    "basis": "c",
    "pre1": "微积分",
    "pre2": "多元微积分",
    "tagline": "让货流得更聪明",
    "goals": "学习供应链设计、运营优化与数字化技术，用数据提升从采购到交付的效率。",
    "careers": [
      "供应链管理",
      "物流与采购",
      "运营分析",
      "读研"
    ],
    "masters": "常见去向：华威、曼大、克兰菲尔德的 Supply Chain 硕士。"
  },
  {
    "id": "ate",
    "name": "艺术与科技",
    "en": "Arts, Technology and Entertainment",
    "degree": "BA",
    "school": "tc",
    "campus": "taicang",
    "score": 59,
    "hist": [
      52,
      57,
      59
    ],
    "basis": "n",
    "pre1": "无先修要求",
    "pre2": "无",
    "tagline": "艺术与产业在这里相遇",
    "goals": "结合数字艺术与创业实践，学习沉浸式内容、交互体验与文化产业运营。",
    "careers": [
      "数字内容创作",
      "文化科技",
      "策展 / 运营",
      "读研"
    ],
    "masters": "常见去向：皇艺、伦艺、金史密斯的 Computational Arts 硕士。"
  },
  {
    "id": "psych",
    "name": "心理学",
    "en": "Psychology",
    "degree": "BSc",
    "school": "sci",
    "score": 65,
    "hist": [
      58,
      63,
      65
    ],
    "basis": "c",
    "pre1": "微积分（MTH013）",
    "pre2": "多元微积分（MTH008）",
    "tagline": "理解人为什么会这样想",
    "goals": "学习认知、发展、社会与脑神经科学，做实验、设计问卷、用统计解释人的行为。",
    "careers": [
      "用户研究",
      "人力资源",
      "心理咨询",
      "教育科研"
    ],
    "masters": "常见去向：UCL、KCL、爱丁堡、曼彻斯特的心理学或组织行为学硕士，多数要求 2:1。"
  },
  {
    "id": "apph",
    "name": "应用物理学",
    "en": "Applied Physics",
    "degree": "BSc",
    "school": "smp",
    "score": 64,
    "hist": [
      57,
      61,
      64
    ],
    "basis": "cl",
    "pre1": "微积分 + 线性代数",
    "pre2": "多元微积分（MTH008）",
    "tagline": "把物理定律算成技术",
    "goals": "在经典物理之上学量子、统计与计算物理，用数学建模解释真实世界，再落到器件与材料。",
    "careers": [
      "半导体研发",
      "光学工程",
      "数据分析",
      "继续读博"
    ],
    "masters": "常见去向：帝国理工、UCL、爱丁堡、代尔夫特的物理或材料方向硕士，一般要求 2:1 且看重数学课。"
  }
]
};
