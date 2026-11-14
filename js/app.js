/* =========================================================
   西浦选专业 · 交互逻辑
   ========================================================= */
(function () {
  'use strict';

  const DB = window.XJTLU;
  const META = window.XJTLU_META || {};
  const { schools, modules, majors, disclaimer } = DB;

  function tr(x) { return window.tr ? window.tr(x) : x; }

  /* ---------- 工具 ---------- */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const byId = Object.fromEntries(majors.map(m => [m.id, m]));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const num = v => (Number.isInteger(v) ? String(v) : v.toFixed(1));
  const f1  = v => Number(v).toFixed(1);

  /* 把补充文案并进主数据 */
  majors.forEach(m => {
    const x = META[m.id] || {};
    m.abbr = x.abbr || m.id.toUpperCase();
    m.heat = x.heat || 3;
    m.intro = x.intro || m.goals;
    m.fit = x.fit || '';
    m.photo = x.photo || m.photo || '';                       /* 真·实拍图（可选） */
    m.cover = m.photo || ('assets/covers/' + m.id + '.svg');  /* 生成式封面（默认） */
  });

  const suzhou  = majors.filter(m => m.campus !== 'taicang').sort((a, b) => b.score - a.score);
  const taicang = majors.filter(m => m.campus === 'taicang')
    .sort((a, b) => (b.heat - a.heat) || (b.score - a.score));

  const basisText = {
    cl:   '大一第一学期 <b>微积分</b> 与 <b>线性代数</b> 的算术平均分',
    c:    '大一第一学期 <b>微积分</b> 的单科成绩',
    n:    '<b>无分数门槛</b>，按志愿顺序与专业容量录取',
    lang: '需<b>修满第二外语两个阶段</b>，达到语言要求即可'
  };

  const HEAT = { 5: '极热门', 4: '热门', 3: '较热', 2: '一般', 1: '偏冷' };

  /* ---------- 收藏 ---------- */
  const FAV_KEY = 'xjtlumajor.favorites';
  let favs = new Set();
  try { favs = new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); } catch (e) { favs = new Set(); }
  const saveFavs = () => {
    try { localStorage.setItem(FAV_KEY, JSON.stringify([...favs])); } catch (e) {}
  };

  const state = {
    query: '',
    school: 'all',
    favOnly: false,
    calcMajor: suzhou[0].id,
    sort: 'score',      // score | heat | name
    marks: {},          // { modId: { cw, mid, final } }
    weights: {},        // { modId: [cw, mid, final] }
    target: suzhou[0].score,
    mode: 'calc',       // calc | find
    find: { calc: '', lin: '' },
    compare: ['cs', 'arch']
  };

  /* =========================================================
     专业查询
     ========================================================= */
  function heatHTML(h) {
    let bars = '';
    for (let i = 1; i <= 5; i++) bars += `<i class="hb${i <= h ? ' on' : ''}"></i>`;
    return `<span class="heat h${h}" title="火爆程度 ${h}/5">${bars}<em>${HEAT[h]}</em></span>`;
  }

  function cardHTML(m, i) {
    const s = schools[m.school];
    const hasScore = m.basis !== 'n';
    const on = favs.has(m.id);
    return `
      <article class="card" data-id="${m.id}" style="--c:${s.color};--cs:${s.soft};--i:${Math.min(i, 12)}">
        <a class="card-link" href="#/m/${m.id}" aria-label="查看 ${m.name} 详情"></a>
        <div class="card-top">
          <span class="rank">${String(i + 1).padStart(2, '0')}</span>
          <span class="abbr">${m.abbr}</span>
          <button class="fav${on ? ' on' : ''}" data-fav="${m.id}" aria-pressed="${on}" title="收藏">★</button>
        </div>
        <div class="school-line"><i style="background:${s.color}"></i>${s.cn}</div>
        <h3>${m.name}</h3>
        <p class="card-en">${esc(m.en)}</p>
        <p class="card-tag">${m.tagline}</p>
        <div class="card-foot">
          ${hasScore
            ? (m.official
              ? `<span class="score-pill is-official"><b>${num(m.score)}</b><em>官方</em></span>`
              : `<span class="score-pill na"><b>未公布</b></span>`)
            : `<span class="score-pill na"><b>无门槛</b></span>`}
          ${heatHTML(m.heat)}
          <span class="go">→</span>
        </div>
      </article>`;
  }

  const PY = () => window.MAJOR_PY || {};
  function pyFlat(id) { return (PY()[id] || '').replace(/\s+/g, ''); }
  function pyInitials(id) { return (PY()[id] || '').split(/\s+/).map(x => x[0] || '').join(''); }

  function bySort(x, y) {
    if (state.sort === 'heat') return (y.heat - x.heat) || (y.score - x.score);
    if (state.sort === 'name') return x.name.localeCompare(y.name, 'zh-Hans-CN');
    return (Number(!!y.official) - Number(!!x.official)) || (y.score - x.score) || (y.heat - x.heat);
  }

  function renderList(anim) {
    const q = state.query.trim().toLowerCase();
    const match = m =>
      (state.school === 'all' || m.school === state.school) &&
      (!state.favOnly || favs.has(m.id)) &&
      (!q || m.name.toLowerCase().includes(q) || m.en.toLowerCase().includes(q) ||
       m.abbr.toLowerCase().includes(q) || m.tagline.toLowerCase().includes(q) ||
       pyFlat(m.id).includes(q.replace(/\s+/g, '')) || pyInitials(m.id).includes(q.replace(/\s+/g, '')));

    const a = suzhou.filter(match).sort(bySort);
    const b = taicang.filter(match).sort(bySort);

    $('#majorGrid').innerHTML = a.map(cardHTML).join('');
    $('#tcGrid').innerHTML = b.map(cardHTML).join('');
    $('#majorGrid').classList.toggle('anim', !!anim);
    $('#tcGrid').classList.toggle('anim', !!anim);

    $('#tcDivider').classList.toggle('is-hidden', b.length === 0);
    $('#emptyState').classList.toggle('is-hidden', a.length + b.length > 0);
    $('#emptyState').innerHTML = state.favOnly && !favs.size
      ? '还没有收藏任何专业。点卡片右上角的 ★ 就能存下来。'
      : '没有匹配的专业，换个关键词试试。';
    $('#statCount').textContent = majors.length;
    renderChips();
  }

  function renderChips() {
    const used = [...new Set(majors.map(m => m.school))];
    const favChip = `<button class="chip fav-chip${state.favOnly ? ' is-on' : ''}" data-favfilter="1">
        ★ 收藏 <b>${favs.size}</b>
      </button>`;
    const items = [['all', '全部']].concat(used.map(k => [k, schools[k].cn]));
    $('#schoolChips').innerHTML = favChip + items.map(([k, label]) => {
      const s = schools[k];
      const dot = k === 'all' ? '' : `<i style="background:${s.color}"></i>`;
      return `<button class="chip${state.school === k && !state.favOnly ? ' is-on' : ''}" data-school="${k}">${dot}${label}</button>`;
    }).join('');
  }

  function toggleFav(id, btn) {
    if (favs.has(id)) favs.delete(id); else favs.add(id);
    saveFavs();
    if (btn) {
      btn.classList.toggle('on', favs.has(id));
      btn.setAttribute('aria-pressed', String(favs.has(id)));
      btn.classList.remove('pop');
      void btn.offsetWidth;
      btn.classList.add('pop');
    }
    $$(`.fav[data-fav="${id}"]`).forEach(b => {
      b.classList.toggle('on', favs.has(id));
      b.setAttribute('aria-pressed', String(favs.has(id)));
    });
    renderChips();
    if (state.favOnly) renderList();
  }

  /* =========================================================
     专业详情
     ========================================================= */
  /* 出路名 -> 白话解释；复合词（A / B）拼起来说 */
  function careerText(term) {
    const D = window.CAREER_DICT || {};
    if (D[term]) return D[term];
    const parts = term.split(' / ').map(t => t.trim()).filter(Boolean);
    const found = parts.map(t => D[t]).filter(Boolean);
    return found.length ? found.join(' ') : '暂无说明，这个名字在这个行业里通常指相近的一类岗位。';
  }

  function salaryOf(term) {
    const S = window.CAREER_SALARY || {};
    if (S[term]) return S[term];
    const parts = term.split(' / ').map(t => t.trim()).filter(Boolean);
    for (const t of parts) if (S[t]) return S[t];
    return '';
  }

  function bindCareerHover() {
    const note = $('#careerNote');
    const chips = $$('.career-chip');
    if (!note || !chips.length) return;
    const show = chip => {
      chips.forEach(c => c.classList.toggle('is-on', c === chip));
      note.classList.remove('is-empty');
      note.querySelector('.cn-term').textContent = tr(chip.dataset.term);
      note.querySelector('.cn-body').textContent = tr(careerText(chip.dataset.term));
      const pay = note.querySelector('.cn-pay');
      const s = salaryOf(chip.dataset.term);
      if (pay) {
        pay.textContent = s ? tr(`参考年薪 ${s} 万`) : '';
        pay.classList.toggle('is-hidden', !s);
      }
    };
    chips.forEach(chip => {
      chip.addEventListener('mouseenter', () => show(chip));
      chip.addEventListener('focus', () => show(chip));
      chip.addEventListener('click', () => show(chip));
      chip.setAttribute('tabindex', '0');
    });
    show(chips[0]);
  }

  function renderDetail(id) {
    const m = byId[id];
    if (!m) { location.hash = '#/'; return; }
    const s = schools[m.school];
    const view = $('#view-detail');
    view.style.setProperty('--c', s.color);
    view.style.setProperty('--cs', s.soft);
    $('#dhGhost').textContent = m.en;
    $('#dhAbbr').textContent = m.abbr;
    $('#dhName').textContent = m.name;
    $('#dhEn').textContent = m.en;

    const on = favs.has(m.id);
    $('#dhFav').className = 'fav big' + (on ? ' on' : '');
    $('#dhFav').dataset.fav = m.id;
    $('#dhFav').setAttribute('aria-pressed', String(on));

    $('#dhChips').innerHTML = `
      <span class="dh-chip">${s.cn}</span>
      <span class="dh-chip plain">${m.campus === 'taicang' ? '太仓校区' : '苏州校区'}</span>
      <span class="dh-chip plain">${m.degree} · 4 年</span>
      <span class="dh-chip plain">${m.basis === 'n' ? '无分数门槛' : '看 ' + (m.basis === 'cl' ? '微积分 + 线代' : '微积分')}</span>
      ${heatHTML(m.heat)}`;

    const hasScore = m.basis !== 'n';

    const photo = m.photo
      ? `<div class="dh-photo" style="background-image:url('${m.photo}')"></div>` : '';

    const EX = window.XJTLU_EXTRA || { timeline: {}, hard: {} };
    const hard = (EX.hard && EX.hard[m.id]) || '';
    const tl = (EX.timeline && EX.timeline[m.school]) || [];
    const sibs = majors.filter(x => x.school === m.school && x.id !== m.id);
    const trend = m.past
      ? [['23–24', m.past[0]], ['24–25', m.past[1]], ['25–26', m.score]].filter(x => x[1] != null)
      : [];

    $('#detailBody').innerHTML = `
      <div class="score-hero" style="--c:${s.color};--cs:${s.soft}">
        <div class="sh-num ${hasScore && m.official ? '' : 'na'}">
          <b>${!hasScore ? '无门槛' : (m.official ? num(m.score) : '未公布')}</b>
          ${!hasScore ? '<span>按志愿与容量录取</span>' : (m.official ? '<span>/ 100 参考</span>' : '<span>学校不公布</span>')}
        </div>
        <div class="sh-txt">
          <h4>${!hasScore ? '录取方式' : (m.official ? '2025-26 录取分 · 大一上' : '录取分 · 未公布')}</h4>
          <p>${!hasScore
            ? '不看大一成绩，满足上面的先修课程就能报；报名超出容量时按志愿顺序录取。'
            : (m.official
              ? '学校 2025-26 学年实际公布的录取分（按大一上成绩排定）。明年会变，仍然只能参考。'
              : '学校不公布这个专业的录取分，网上流传的版本互相矛盾。想知道难度，看先修要求和你目标专业的容量，或者直接问教务。这里不给数字，是不想编一个。')}</p>
          ${trend.length > 1 ? `<div class="sh-trend">
            <span>近三年</span>
            ${trend.map(([y, v], i) => `<em${i === trend.length - 1 ? ' class="now"' : ''}><u>${y}</u><b>${num(v)}</b></em>`).join('')}
          </div>` : ''}
        </div>
        ${hasScore && m.official
          ? `<div class="sh-range is-off"><span>2025-26</span><b>官方</b></div>`
          : ''}
      </div>

      <div class="sec">
        <div class="sec-label">这个专业到底学什么</div>
        <p class="body body-lg">${m.intro}</p>
      </div>

      ${(function () {
        const list = (window.MAJOR_COURSES || {})[m.id];
        if (!list) return '';
        return `<div class="sec">
        <div class="sec-label">会修哪些课</div>
        <div class="course-chips">${list.map(c => '<span>' + c + '</span>').join('')}</div>
        <p class="course-note">课程名是代表性的模块，具体以你入学那年的培养方案为准。</p>
      </div>`;
      })()}

      ${m.fit ? `<div class="sec">
        <div class="sec-label">适合什么样的人</div>
        <div class="fit-box">${m.fit}</div>
        ${hard ? `<p class="body body-dim" style="margin-top:14px"><b>劝退点：</b>${hard}</p>` : ''}
      </div>` : ''}

      <div class="sec">
        <div class="sec-label">以后能做什么</div>
        <div class="career-chips">
          ${m.careers.map(c => `<span class="career-chip" data-term="${c}">${c}</span>`).join('')}
        </div>
        <div class="career-note" id="careerNote">
          <span class="cn-term"></span>
          <span class="cn-body">把鼠标移到上面的标签，看这一行具体在做什么。</span>
          <span class="cn-pay is-hidden"></span>
        </div>
        <p class="body body-dim" style="margin-top:18px">${m.masters}</p>
        <p class="body-dim pay-note">年薪是国内一线／新一线城市、本科毕业 3–5 年的常见区间，税前，用来判断量级，不是 offer 承诺。</p>
      </div>

      <div class="sec">
        <div class="sec-label">四年大概会怎么过</div>
        <div class="tl">
          <div class="tl-item">
            <div class="tl-year">大一</div>
            <div class="tl-text" data-i18n="y1">全校课程基本一致：<b>微积分 + 线性代数</b>打底，配上 EAP 英语和选修。这一年唯一要紧的事，是把两门数学考好，因为它们决定你能不能进想去的专业。</div>
          </div>
          ${tl.map(([y, t]) => `<div class="tl-item"><div class="tl-year">${y}</div><div class="tl-text">${t}</div></div>`).join('')}
        </div>
      </div>

      ${sibs.length ? `<p class="sib-line">同学院还有：${sibs.map(x => `<a href="#/m/${x.id}">${x.name}</a>`).join('、')}</p>` : ''}

      <div class="sec">
        <div class="sec-label">进入这个专业</div>
        <div class="req-grid">
          <div class="req-item"><div class="req-k">大一上需修</div><div class="req-v">${m.pre1}</div></div>
          <div class="req-item"><div class="req-k">大一下需修</div><div class="req-v">${m.pre2}</div></div>
          <div class="req-item"><div class="req-k">录取看什么</div><div class="req-v">${basisPlain(m)}</div></div>
          <div class="req-item"><div class="req-k">分数口径</div><div class="req-v">${hasScore
            ? '社区经验估算，官方从不公布；只用来比较专业冷热，不能当承诺。'
            : '无分数门槛，满足先修课程即可报名。'}</div></div>
        </div>
        <div class="cta-row" style="margin-top:22px">
          <a class="btn-primary" href="#/calc" data-calc="${m.id}">用这个专业算分数</a>
          <button class="btn-ghost" id="detailBack">回到专业列表</button>
        </div>
      </div>

      <p class="foot-note">${disclaimer}</p>`;

    bindCareerHover();
    $('#detailBack')?.addEventListener('click', () => { location.hash = '#/'; });
    $('[data-calc]')?.addEventListener('click', () => {
      state.calcMajor = m.id;
      state.target = m.official ? m.score : 70;
      state.marks = {};
    });
    const hero = $('#detailHero');
    hero.classList.toggle('has-photo', !!m.photo);
    hero.classList.toggle('has-cover', !m.photo);
    const ph = $('#dhPhoto');
    if (ph) {
      ph.style.backgroundImage = `url('${m.cover}')`;
      ph.classList.remove('is-hidden');
      ph.classList.toggle('is-photo', !!m.photo);
      ph.classList.toggle('is-cover', !m.photo);
    }
  }

  /* =========================================================
     分数计算
     ========================================================= */
  function countedIds(basis) {
    if (basis === 'cl') return ['calc', 'linalg'];
    if (basis === 'c') return ['calc'];
    return [];
  }

  function weightsOf(mod) {
    return state.weights[mod.id] || mod.parts.map(p => p.w);
  }

  function buildCalcSelect() {
    const opt = m => `<option value="${m.id}">${m.abbr} · ${tr(m.basis === 'n' ? '无门槛' : (m.official ? String(num(m.score)) : '未公布'))} · ${tr(m.name)}</option>`;
    $('#calcMajor').innerHTML =
      `<optgroup label="${tr('苏州校区')}">${suzhou.map(opt).join('')}</optgroup>` +
      `<optgroup label="${tr('太仓校区')}">${taicang.map(opt).join('')}</optgroup>`;
  }

  function currentMajor() { return byId[state.calcMajor]; }

  function renderCalc() {
    const m = currentMajor();
    const counted = countedIds(m.basis);
    const sumCred = modules.filter(x => counted.includes(x.id)).reduce((a, x) => a + x.cred, 0);

    $('#calcMajor').value = m.id;
    $('#targetScore').value = state.target;
    $('#targetRange').value = state.target;
    syncRangeFill();

    const EN = !!(window.getLang && window.getLang() === 'en');
    const basisEN = {
      cl: 'the average of <b>Calculus</b> and <b>Linear Algebra</b> in Semester 1',
      c: '<b>Calculus</b> in Semester 1',
      n: '<b>no mark threshold</b> — offers follow application order and capacity',
      lang: 'completing <b>two stages of a second foreign language</b>'
    };
    $('#ruleCard').innerHTML = `
      <div class="rl-title">${EN ? 'How admission works' : '这个专业怎么录取'}</div>
      ${EN ? basisEN[m.basis] + (m.basis === 'n' ? '.' : ' — reach this line and you have a chance.') : basisText[m.basis] + (m.basis === 'n' ? '。' : '，达到这条线就有机会被录取。')}<br>
      <span class="rule-dim">${EN ? 'Semester 1: ' + tr(m.pre1) + '　·　Semester 2: ' + tr(m.pre2) : '大一上需修：' + m.pre1 + '　·　大一下需修：' + m.pre2}</span>
      ${(m.basis !== 'n' && !m.official) ? (EN
        ? '<div class="rule-warn">This programme does not publish its admission mark. The target below is a placeholder (70) — replace it with a figure you have actually heard.</div>'
        : '<div class="rule-warn">这个专业没有公布录取分，下面的目标分是占位值 70，请改成你从学长学姐那里问到的实际分数。</div>') : ''}`;

    $('#moduleList').innerHTML = modules.map(mod => {
      const isCounted = counted.includes(mod.id);
      const share = isCounted && sumCred ? Math.round(mod.cred / sumCred * 100) : 0;

      if (!isCounted || !mod.parts) {
        return `
          <div class="mod-row is-plain" data-mod="${mod.id}">
            <div class="mod-head">
              <div class="mod-name">${mod.name}<span class="mod-code">${mod.code}</span></div>
              <div class="mod-sub"><span class="badge-no">不计入录取</span> ${mod.cred} 学分，只影响学位等级</div>
            </div>
          </div>`;
      }

      const ws = weightsOf(mod);
      const marks = state.marks[mod.id] || {};
      const partsHTML = mod.parts.map((p, i) => `
        <label class="part">
          <span class="part-k">${p.label}<em>${ws[i]}%</em></span>
          <input class="part-in" data-mod="${mod.id}" data-part="${p.k}" type="number"
                 min="0" max="100" step="1" inputmode="numeric" placeholder="—"
                 value="${Number.isFinite(marks[p.k]) ? marks[p.k] : ''}">
        </label>`).join('');

      return `
        <div class="mod-row is-counted" data-mod="${mod.id}">
          <div class="mod-head">
            <div class="mod-name">${mod.name}<span class="mod-code">${mod.code}</span></div>
            <div class="mod-sub">${mod.cred} 学分 · 占录取 ${share}%</div>
            <button class="w-toggle" data-wtoggle="${mod.id}" title="调整占比">占比</button>
          </div>
          <div class="part-row">${partsHTML}</div>
          <div class="w-edit" data-wedit="${mod.id}">
            ${mod.parts.map((p, i) => `
              <label class="w-item">${p.label}
                <input type="number" min="0" max="100" step="5" data-wmod="${mod.id}" data-widx="${i}" value="${ws[i]}">
              </label>`).join('')}
            <span class="w-sum" data-wsum="${mod.id}">合计 ${ws.reduce((a, b) => a + b, 0)}%</span>
          </div>
          <div class="mod-need" data-need="${mod.id}"></div>
        </div>`;
    }).join('');

    updateResult();
  }

  function syncRangeFill() {
    const r = $('#targetRange');
    if (!r) return;
    const p = (r.value - r.min) / (r.max - r.min) * 100;
    r.style.setProperty('--p', p + '%');
  }

  function compute() {
    const m = currentMajor();
    const counted = countedIds(m.basis);
    if (!counted.length) return { mode: 'none' };

    const mods = modules.filter(x => counted.includes(x.id));
    const sumCred = mods.reduce((a, x) => a + x.cred, 0);
    const W = Object.fromEntries(mods.map(x => [x.id, x.cred / sumCred]));

    let have = 0, unknownW = 0, knownShare = 0;
    const unknown = [];
    const rows = [];

    mods.forEach(mod => {
      const ws = weightsOf(mod);
      const marks = state.marks[mod.id] || {};
      let score = 0, done = 0;
      mod.parts.forEach((p, i) => {
        const w = ws[i] / 100 * W[mod.id];
        const v = marks[p.k];
        if (Number.isFinite(v)) { score += v * w; done += w; }
        else { unknownW += w; unknown.push({ mod, part: p, label: `${mod.name}${p.label}` }); }
      });
      have += score;
      knownShare += done;
      rows.push({ mod, score, done, weight: W[mod.id], ws });
    });

    const T = state.target;
    const need = unknownW > 0 ? (T - have) / unknownW : null;

    return {
      mode: 'calc', m, mods, rows, have, unknown, unknownW, knownShare,
      need, T, done: unknownW === 0,
      filledAvg: knownShare > 0 ? have / knownShare : null
    };
  }

  function updateResult() {
    const r = compute();
    const panel = $('#resultPanel');
    $$('.need-tag').forEach(el => { el.textContent = ''; });
    $$('.mod-need').forEach(el => { el.textContent = ''; });

    if (r.mode === 'none') {
      const m = currentMajor();
      panel.innerHTML = `
        <div class="result-card">
          <div class="rc-label">这个专业</div>
          <div class="rc-big text"><b>无门槛</b></div>
          <p class="rc-desc">${m.basis === 'lang'
            ? '这个专业不设分数门槛，但需要修满第二外语的两个阶段。语言没修完，分数再高也进不去。'
            : '这个专业不看大一成绩，报名超出容量时按志愿与综合材料录取。不用算分，但也别把它当保底——热门年份一样会满。'}</p>
          <div class="rc-divider"></div>
          <p class="rc-note">如果你想估算学位等级，可以切到有分数门槛的专业看看计算方式。</p>
        </div>`;
      return;
    }

    const { need, unknown, unknownW, done, have, T, filledAvg } = r;

    /* 把「缺哪些」说人话：按科目聚合，别把六个部分名堆在一起 */
    const groups = [];
    r.mods.forEach(mod => {
      const parts = mod.parts.filter(p => unknown.some(u => u.mod.id === mod.id && u.part.k === p.k));
      if (!parts.length) return;
      groups.push(parts.length === mod.parts.length
        ? mod.name
        : `${mod.name}${parts.map(p => p.label).join('、')}`);
    });
    const allBlank = r.mods.every(mod =>
      mod.parts.every(p => unknown.some(u => u.mod.id === mod.id && u.part.k === p.k)));
    const groupsText = groups.join('、');

    let big, unit, desc, status, cls, label;

    if (done) {
      const ok = have >= T;
      big = f1(have); unit = '分'; label = '最终加权分';
      desc = `你把这 ${r.mods.length} 门课已考核的部分都填完了，按现有成绩折算的录取分为 <b>${f1(have)}</b>，目标 <b>${T}</b>。`;
      status = ok ? '达到目标' : `还差 ${f1(T - have)} 分`;
      cls = ok ? 'ok' : 'bad';
    } else if (need > 100) {
      big = '—'; unit = ''; label = '剩余部分需要';
      desc = `按现在的分数，剩下的部分<b>要超过 100 分</b>才够，也就是数学上已经达不到 <b>${T}</b> 了。要么降低目标，要么把重心放到别的专业。`;
      status = '目标已不可能'; cls = 'bad';
    } else if (need <= 0) {
      big = '0'; unit = '分'; label = '剩余部分需要';
      desc = `已出分的部分已经够了，剩下的 <b>${groupsText}</b> <b>只要及格</b>就能达到 <b>${T}</b>。`;
      status = '已经很稳了'; cls = 'ok';
    } else if (allBlank) {
      const EN = !!(window.getLang && window.getLang() === 'en');
      big = f1(need); unit = EN ? 'pts' : '分'; label = EN ? 'Average needed per part' : '平均每部分需要';
      desc = EN
        ? `Nothing entered yet. Against a target of <b>${T}</b>, every part has to average <b>${f1(need)}</b>, so each module needs to land around ${f1(need)} overall.`
        : `还什么都没填。按 <b>${T}</b> 的目标，每个部分平均要考到 <b>${f1(need)}</b> 分，也就是每门课的总分都要在 ${f1(need)} 上下。`;
      status = EN
        ? (need <= 70 ? 'Comfortable' : need <= 85 ? 'Serious prep' : 'Very demanding')
        : (need <= 70 ? '压力不大' : need <= 85 ? '需要认真准备' : '难度很高');
      cls = need <= 70 ? 'ok' : need <= 85 ? 'mid' : 'bad';
    } else {
      big = f1(need); unit = '分';
      label = unknown.every(u => u.part.k === 'final') ? '期末考试至少要考' : '剩余部分平均需要';
      desc = `剩下的 <b>${groupsText}</b> 需要平均考到 <b>${f1(need)}</b> 分，才能达到 <b>${T}</b> 的目标。`;
      status = need <= 70 ? '压力不大' : need <= 85 ? '需要认真准备' : '难度很高';
      cls = need <= 70 ? 'ok' : need <= 85 ? 'mid' : 'bad';
    }

    /* 写在输入框旁边的缺口提示 */
    if (!done && need <= 100) {
      r.mods.forEach(mod => {
        const blanks = mod.parts.filter(p => unknown.some(u => u.mod.id === mod.id && u.part.k === p.k));
        const box = $(`[data-need="${mod.id}"]`);
        if (!box || !blanks.length) return;
        box.innerHTML = blanks.length === 1
          ? `${blanks[0].label}需 <b>${f1(Math.max(0, need))}</b>`
          : `这几部分都需 <b>${f1(Math.max(0, need))}</b>`;
      });
    }

    const barVal = filledAvg !== null ? Math.min(100, Math.max(0, filledAvg)) : 0;
    const tick = Math.min(100, T);

    const scenarios = !done
      ? [70, 80, 90].map(x => {
          const f = have + x * unknownW;
          const gap = f - T;
          return `<div class="sc-item${gap >= 0 ? ' hit' : ''}"><span>剩余考 ${x}</span><b>${f1(f)}</b></div>`;
        }).join('')
      : '';

    const modRows = r.rows.map(row => `
      <div class="rc-row">
        <span>${row.mod.name}</span>
        <b>${row.done > 0.001 ? f1(row.score / row.done).concat(' 分') : '未填'}</b>
      </div>`).join('');

    panel.innerHTML = `
      <div class="result-card">
        <div class="rc-label">${label}</div>
        <div class="rc-big"><b>${big}</b>${unit ? `<span>${unit}</span>` : ''}</div>
        <p class="rc-desc">${desc}</p>

        <div class="rc-bar">
          <div class="rc-bar-head"><span>已填部分均分 <b>${filledAvg !== null ? f1(filledAvg) : '—'}</b></span><span>目标 ${T}</span></div>
          <div class="rc-track">
            <div class="rc-fill" style="width:${barVal}%"></div>
            <div class="rc-target-tick" style="left:${tick}%"></div>
          </div>
        </div>

        <div class="rc-status ${cls}"><i></i>${status}</div>

        ${scenarios ? `<div class="scenario">${scenarios}</div>` : ''}
        ${modRows}

        <div class="rc-divider"></div>
        <p class="rc-note">
          计算口径：<b>${r.mods.map(x => x.name).join(' + ')}</b> 按学分权重折算，再按各科「作业 / 期中 / 期末」占比合成。<br>
          占比为常见结构，可在左侧逐门调整；分数并非官方发布，当参考就好。
        </p>
      </div>`;
  }

  /* =========================================================
     对比 & 反向测算
     ========================================================= */

  const cmpKey = 'xjtlumajor.compare';
  try {
    const raw = localStorage.getItem(cmpKey);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) state.compare = arr.filter(x => byId[x]).slice(0, 3);
    }
  } catch (e) {}
  function saveCompare() {
    try { localStorage.setItem(cmpKey, JSON.stringify(state.compare)); } catch (e) {}
  }

  function scoreText(m) {
    if (m.basis === 'n') return '无门槛';
    return m.official ? num(m.score) : '未公布';
  }

  function basisPlain(m) {
    const EN = !!(window.getLang && window.getLang() === 'en');
    if (!EN) return basisText[m.basis];
    if (m.basis === 'cl') return 'the average of Calculus and Linear Algebra in Semester 1';
    if (m.basis === 'c') return 'your Calculus mark in Semester 1';
    if (m.basis === 'n') return 'no mark threshold — preference order and capacity';
    return 'two stages of a second foreign language';
  }

  function renderCompare() {
    const slots = $('#cmpSlots');
    const opts = sel => '<option value="">— 选一个专业 —</option>' +
      suzhou.map(m => `<option value="${m.id}"${sel === m.id ? ' selected' : ''}>${m.abbr} · ${tr(m.name)}</option>`).join('') +
      taicang.map(m => `<option value="${m.id}"${sel === m.id ? ' selected' : ''}>${m.abbr} · ${tr(m.name)}${tr('（太仓）')}</option>`).join('');

    slots.innerHTML = state.compare.map((id, i) => `
      <div class="cmp-slot">
        <span class="cmp-idx">${i + 1}</span>
        <select class="select cmp-select" data-slot="${i}">${opts(id)}</select>
        <button class="cmp-del" data-del="${i}" title="移除">×</button>
      </div>`).join('') +
      (state.compare.length < 3
        ? '<button class="cmp-add" id="cmpAdd">+ 再加一个</button>' : '');

    const picked = state.compare.map(id => byId[id]).filter(Boolean);
    const table = $('#cmpTable');
    if (picked.length < 1) {
      table.innerHTML = '<p class="cmp-empty">先在上面选两个专业（最多三个），下面会并排出对比表。</p>';
      return;
    }

    const row = (label, fn) => `<tr><th>${label}</th>${picked.map(m => `<td>${fn(m)}</td>`).join('')}</tr>`;

    table.innerHTML = `
      <table class="cmp-table">
        <thead>
          <tr><th></th>${picked.map(m => `<td class="cmp-head">
            <span class="cmp-abbr" style="--c:${schools[m.school].color}">${m.abbr}</span>
            <b>${m.name}</b>
            <em>${schools[m.school].cn}</em>
          </td>`).join('')}</tr>
        </thead>
        <tbody>
          ${row('2025-26 录取分', m => `<b class="cmp-num">${scoreText(m)}</b>`)}
          ${row('录取看什么', m => basisPlain(m))}
          ${row('大一上需修', m => m.pre1)}
          ${row('大一下需修', m => m.pre2)}
          ${row('火爆程度', m => heatHTML(m.heat))}
          ${row('学什么', m => `<span class="cmp-txt">${m.tagline}</span>`)}
          ${row('核心课程', m => ((window.MAJOR_COURSES || {})[m.id] || []).slice(0, 4).map(c => `<span class="cmp-chip">${c}</span>`).join(''))}
          ${row('典型出路', m => `<span class="cmp-txt">${m.careers.slice(0, 3).join('、')}</span>`)}
          ${row('参考年薪', m => {
            const s = salaryOf(m.careers[0]);
            return s ? `<span class="cmp-pay">${s}</span>` : '<span class="cmp-txt">—</span>';
          })}
          ${row('', m => `<a class="cmp-go" href="#/m/${m.id}">看详情 →</a>`)}
        </tbody>
      </table>`;
  }

  $('#cmpSlots').length;   /* 事件在初始化段绑定 */

  /* ---------- 反向：按分数找专业 ---------- */
  function renderFind() {
    const box = $('#findResult');
    const c = parseFloat(state.find.calc);
    const l = parseFloat(state.find.lin);
    const hasC = !Number.isNaN(c), hasL = !Number.isNaN(l);

    if (!hasC && !hasL) {
      box.innerHTML = '<p class="cmp-empty">在上面填一个或两个分数，这里会按「稳了 / 能冲 / 够呛」分组列出专业。</p>';
      return;
    }

    const mine = m => {
      if (m.basis === 'cl') return (hasC && hasL) ? (c + l) / 2 : null;
      if (m.basis === 'c') return hasC ? c : null;
      return null;
    };

    const rows = majors.map(m => {
      const v = mine(m);
      if (v == null) return null;
      const target = m.official ? m.score : null;
      return { m, v, gap: target == null ? null : v - target };
    }).filter(Boolean);

    const known = rows.filter(r => r.gap != null);
    const unknown = rows.filter(r => r.gap == null);

    const sec = (title, cls, list, note) => list.length ? `
      <div class="find-group ${cls}">
        <div class="fg-head"><b>${title}</b><span>${list.length} 个</span></div>
        <div class="fg-list">
          ${list.map(r => `<a class="fg-item" href="#/m/${r.m.id}">
            <i>${r.m.abbr}</i><span>${r.m.name}</span>
            ${r.gap != null ? `<em>${r.gap >= 0 ? '+' : ''}${r.gap.toFixed(1)}</em>` : '<em class="na">未公布</em>'}
          </a>`).join('')}
        </div>
        ${note ? `<p class="fg-note">${note}</p>` : ''}
      </div>` : '';

    box.innerHTML =
      sec('稳了', 'ok', known.filter(r => r.gap >= 2).sort((x, y) => y.m.score - x.m.score), '你的分比 2025-26 录取线高 2 分以上，正常发挥就进得去。') +
      sec('能冲', 'mid', known.filter(r => r.gap < 2 && r.gap >= -2).sort((x, y) => y.m.score - x.m.score), '在录取线上下 2 分，属于看当年容量和运气的区间。') +
      sec('够呛', 'bad', known.filter(r => r.gap < -2).sort((x, y) => y.m.score - x.m.score), '按 2025-26 的线，你的分不够；如果想进，得把这两门考更高。') +
      sec('学校没公布分数', 'na', unknown.sort((x, y) => y.m.heat - x.m.heat), '这些专业没有官方分数线，能不能进要看先修课和当年容量，不是分数不够。');
  }

  /* ---------- 测算页模式切换 ---------- */
  function setMode(mode) {
    state.mode = mode;
    $$('.mode-btn').forEach(b => b.classList.toggle('is-active', b.dataset.mode === mode));
    $('#calcLayout') && $('#calcLayout').classList.toggle('is-hidden', mode !== 'calc');
    document.querySelector('.calc-layout').classList.toggle('is-hidden', mode !== 'calc');
    $('#findLayout').classList.toggle('is-hidden', mode !== 'find');
    if (mode === 'find') renderFind();
  }

  /* =========================================================
     路由与事件
     ========================================================= */
  function show(view) {
    ['list', 'calc', 'detail', 'guide', 'compare'].forEach(v =>
      $('#view-' + v).classList.toggle('is-hidden', v !== view));
    $$('.tab').forEach(t =>
      t.classList.toggle('is-active', t.dataset.view === (view === 'detail' ? '' : view)));
    const cur = $('#view-' + view);
    cur.classList.remove('fade-in');
    void cur.offsetWidth;
    cur.classList.add('fade-in');
  }

  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    if (h.startsWith('m/')) {
      show('detail');
      renderDetail(h.slice(2));
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (h === 'calc') {
      show('calc');
      renderCalc();
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (h === 'compare') {
      show('compare');
      renderCompare();
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (h === 'guide') {
      show('guide');
      $('#guideFootnote').textContent = disclaimer;
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      show('list');
      renderList(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  /* 初始化 */
  renderChips();
  $('#disclaimer').textContent = disclaimer;

  $('#search').addEventListener('input', e => {
    state.query = e.target.value;
    renderList();
  });

  $('#schoolChips').addEventListener('click', e => {
    const favBtn = e.target.closest('[data-favfilter]');
    if (favBtn) {
      state.favOnly = !state.favOnly;
      renderList();
      return;
    }
    const btn = e.target.closest('.chip');
    if (!btn) return;
    state.school = btn.dataset.school;
    state.favOnly = false;
    renderList();
  });

  /* 测算页模式 */
  $$('.mode-btn').forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));

  ['findCalc', 'findLin'].forEach(id => {
    const el = $('#' + id);
    if (el) el.addEventListener('input', e => {
      state.find[id === 'findCalc' ? 'calc' : 'lin'] = e.target.value;
      renderFind();
    });
  });

  /* 对比页 */
  $('#cmpSlots').addEventListener('change', e => {
    const sel = e.target.closest('[data-slot]');
    if (!sel) return;
    const i = Number(sel.dataset.slot);
    if (sel.value) state.compare[i] = sel.value;
    else state.compare.splice(i, 1);
    saveCompare();
    renderCompare();
  });
  $('#cmpSlots').addEventListener('click', e => {
    const del = e.target.closest('[data-del]');
    if (del) {
      state.compare.splice(Number(del.dataset.del), 1);
      saveCompare();
      renderCompare();
      return;
    }
    if (e.target.closest('#cmpAdd')) {
      if (state.compare.length < 3) {
        const used = new Set(state.compare);
        const next = majors.find(m => !used.has(m.id));
        if (next) state.compare.push(next.id);
        saveCompare();
        renderCompare();
      }
    }
  });

  $$('.sort-btn').forEach(btn => btn.addEventListener('click', () => {
    state.sort = btn.dataset.sort;
    $$('.sort-btn').forEach(b => b.classList.toggle('is-active', b === btn));
    renderList(true);
  }));

  /* 卡片点击 / 收藏点击 */
  document.addEventListener('click', e => {
    const fav = e.target.closest('.fav');
    if (fav) {
      e.preventDefault();
      e.stopPropagation();
      toggleFav(fav.dataset.fav, fav);
    }
  });

  $$('.tab').forEach(t => t.addEventListener('click', () => {
    const v = t.dataset.view;
    location.hash = v === 'calc' ? '#/calc'
      : v === 'guide' ? '#/guide'
      : v === 'compare' ? '#/compare' : '#/';
  }));

  /* 详情页左上角的「返回」 */
  $('#backBtn')?.addEventListener('click', () => {
    if (history.length > 1) history.back();
    else location.hash = '#/';
  });

  /* 计算器事件 */
  buildCalcSelect();

  $('#calcMajor').addEventListener('change', e => {
    state.calcMajor = e.target.value;
    state.marks = {};
    state.weights = {};
    const sel0 = byId[state.calcMajor];
    state.target = sel0.official ? sel0.score : 70;
    renderCalc();
  });

  $('#moduleList').addEventListener('input', e => {
    const inp = e.target.closest('.part-in');
    if (inp) {
      const { mod, part } = inp.dataset;
      const v = parseFloat(inp.value);
      state.marks[mod] = state.marks[mod] || {};
      if (inp.value === '' || Number.isNaN(v)) delete state.marks[mod][part];
      else state.marks[mod][part] = Math.max(0, Math.min(100, v));
      updateResult();
      return;
    }
    const w = e.target.closest('[data-wmod]');
    if (w) {
      const { wmod, widx } = w.dataset;
      const mod = modules.find(x => x.id === wmod);
      const arr = weightsOf(mod).slice();
      const v = parseFloat(w.value);
      arr[Number(widx)] = Number.isFinite(v) ? Math.max(0, Math.min(100, v)) : 0;
      state.weights[wmod] = arr;
      const sum = arr.reduce((a, b) => a + b, 0);
      const sumEl = $(`[data-wsum="${wmod}"]`);
      if (sumEl) {
        sumEl.textContent = `合计 ${sum}%`;
        sumEl.classList.toggle('bad', sum !== 100);
      }
      updateResult();
    }
  });

  $('#moduleList').addEventListener('click', e => {
    const btn = e.target.closest('[data-wtoggle]');
    if (!btn) return;
    const row = btn.closest('.mod-row');
    row.classList.toggle('is-editing');
  });

  function setTarget(v) {
    v = Math.max(0, Math.min(100, Number(v) || 0));
    state.target = v;
    $('#targetScore').value = v;
    $('#targetRange').value = v;
    syncRangeFill();
    updateResult();
  }
  $('#targetScore').addEventListener('input', e => setTarget(e.target.value));
  $('#targetRange').addEventListener('input', e => setTarget(e.target.value));

  window.addEventListener('hashchange', route);
  route();
  window.__rerender = function () {
    try {
      renderList(true);
      if (location.hash.indexOf('calc') > -1) { buildCalcSelect(); renderCalc(); }
      else if (location.hash.indexOf('/m/') > -1) { }
    } catch (e) {}
  };
})();
