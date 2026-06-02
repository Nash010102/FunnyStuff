'use strict';
// ════════════════════════════════════════════════════════════════
//  MOCHI SIMULATOR — game.js
// ════════════════════════════════════════════════════════════════

// ── Persistence ─────────────────────────────────────────────────
const SAVE_KEY = 'mochi_endings_v1';
function getSaved() {
  try { return new Set(JSON.parse(localStorage.getItem(SAVE_KEY) || '[]')); } catch { return new Set(); }
}
function saveEnding(id) {
  const s = getSaved(); s.add(id);
  localStorage.setItem(SAVE_KEY, JSON.stringify([...s]));
}

// ── Endings catalogue ────────────────────────────────────────────
const ALL_ENDINGS = [
  // SLEEP (route key: 'sleep')
  { id:'sleep_1', route:'sleep', level:1, emoji:'😴', title:'Professional Napper',
    desc:'You have elevated napping to an art form. Corporations study your sleep schedule. Scientists weep. You are okay with this.' },
  { id:'sleep_2', route:'sleep', level:2, emoji:'🛌', title:'Bed CEO',
    desc:'You run a multinational corporation entirely from under your blanket. Nobody knows what you look like standing up. The board meetings are dreams.' },
  { id:'sleep_3', route:'sleep', level:3, emoji:'🌯', title:'Human Burrito',
    desc:'Scientists estimate you have been wrapped in blankets long enough to begin photosynthesis. You are content about this.' },
  { id:'sleep_4', route:'sleep', level:4, emoji:'🏔️', title:'Legendary Hibernator',
    desc:'You woke up briefly in 2031. You did not enjoy it. You went back to sleep. You are still there. Historians argue about the exact date you went under.' },
  // RACCOON
  { id:'raccoon_1', route:'raccoon', level:1, emoji:'🤝', title:'Raccoon Adjacent',
    desc:'Not quite raccoon. Not quite human. The raccoons respect you. This is more than most people get, honestly.' },
  { id:'raccoon_2', route:'raccoon', level:2, emoji:'👑', title:'Trash King',
    desc:'You rule the dumpsters behind three Whole Foods locations. The other raccoons call you boss. Life, by any metric, is going well.' },
  { id:'raccoon_3', route:'raccoon', level:3, emoji:'🦝', title:'Raccoon President',
    desc:"You ran on a platform of 'More Trash, Less Taxes.' You won by a landslide. Nobody knows who voted. You prefer not to ask." },
  { id:'raccoon_4', route:'raccoon', level:4, emoji:'🌍', title:'Supreme Garbage Overlord',
    desc:'You are wanted in 12 countries. The UN has issued a statement. The raccoons are extremely proud. Your trash empire spans six time zones.' },
  // FOOD
  { id:'food_1', route:'food', level:1, emoji:'🍿', title:'Professional Snacker',
    desc:'Your relationship with food has evolved beyond hunger. You eat out of curiosity, boredom, and occasionally spite. Mostly spite.' },
  { id:'food_2', route:'food', level:2, emoji:'🔍', title:'Fridge Explorer',
    desc:'You have mapped every inch of your refrigerator. You have named the shelves. The leftovers recognize your face. The carrot remains.' },
  { id:'food_3', route:'food', level:3, emoji:'🍜', title:'Local Buffet Menace',
    desc:'You are banned from seven all-you-can-eat establishments. You consider this an achievement. You are correct.' },
  { id:'food_4', route:'food', level:4, emoji:'📉', title:'Consumed The Economy',
    desc:'Economists cannot explain what happened. The grocery industry collapsed. Historians point to one person. You ate 47 things today. Completely normal.' },
  // VILLAIN
  { id:'villain_1', route:'villain', level:1, emoji:'😏', title:'Minor Nuisance',
    desc:'You have committed several suspicious acts. Nothing technically illegal. Just concerning. Your neighbours lock their mailboxes now.' },
  { id:'villain_2', route:'villain', level:2, emoji:'🎩', title:'Cartoon Villain',
    desc:'You have a spinning chair. You monologue to yourself. You do not actually do anything evil yet. But the aesthetic? Immaculate.' },
  { id:'villain_3', route:'villain', level:3, emoji:'🌋', title:'Evil Billionaire',
    desc:"You own a volcano. You have a monocle. You once made the stock market cry. It was a Tuesday. You had scheduled it." },
  { id:'villain_4', route:'villain', level:4, emoji:'🌑', title:'Destroyed The Sun',
    desc:'This was not on the agenda. The moon tax was going fine. Then one thing led to another. The sun is gone. Congratulations, I suppose.' },
  // CAT
  { id:'cat_1', route:'cat', level:1, emoji:'🐱', title:'Cat Employee',
    desc:'You work for a cat. The salary is biscuits and the occasional slow blink of approval. You have accepted this arrangement fully.' },
  { id:'cat_2', route:'cat', level:2, emoji:'🏠', title:'Cat Landlord',
    desc:'You rent your home to a cat. You sleep on the floor. The cat has strong opinions about the thermostat. You comply.' },
  { id:'cat_3', route:'cat', level:3, emoji:'✨', title:'Cat Cult Leader',
    desc:'The cats have chosen you. You do not fully understand the responsibilities. The meetings are at 3am. Attendance is mandatory. The agenda is unclear.' },
  { id:'cat_4', route:'cat', level:4, emoji:'🐈', title:'Actually A Cat',
    desc:'At some point, something went irreversibly right, or wrong. You are a cat now. A very good one, actually. The others are impressed.' },
  // CELEBRITY
  { id:'celeb_1', route:'celebrity', level:1, emoji:'🌟', title:'Local Legend',
    desc:'Three people in your neighbourhood know who you are. You have a signature wave. Strangers feel genuinely blessed when you deploy it.' },
  { id:'celeb_2', route:'celebrity', level:2, emoji:'👸', title:'Meme Queen',
    desc:'A photo of you eating cereal at 3am went viral. You did not consent. You now have 2 million followers who only want cereal content.' },
  { id:'celeb_3', route:'celebrity', level:3, emoji:'📸', title:'Accidentally Famous',
    desc:'You were simply living your life. The cameras found you. You are on a billboard now eating chips. Nobody can explain the billboard.' },
  { id:'celeb_4', route:'celebrity', level:4, emoji:'🕊️', title:'Worshipped By Pigeons',
    desc:'Human fame was not enough. The pigeons have also recognised you. They follow you everywhere. The pigeons have merch. The pigeons have a newsletter.' },
  // DINOBOY
  { id:'dino_1', route:'dinoboy', level:1, emoji:'🦕', title:'Dino Intern',
    desc:"DinoBoy gave you an unpaid internship. Your job is to fetch snacks. The snacks are concerning. You are doing great, apparently." },
  { id:'dino_2', route:'dinoboy', level:2, emoji:'⚡', title:'Dino Sidekick',
    desc:"You and DinoBoy fight crime together. Mostly you watch. DinoBoy doesn't need help. DinoBoy is enormous. DinoBoy is fond of you anyway." },
  { id:'dino_3', route:'dinoboy', level:3, emoji:'😬', title:'Dino Food',
    desc:"DinoBoy tried to warn you. Multiple times. You did not listen. It is surprisingly warm in here. You are fine about it." },
  { id:'dino_4', route:'dinoboy', level:4, emoji:'👑', title:'Dino Emperor',
    desc:'DinoBoy has sworn fealty to you. You ride DinoBoy into battle. Every battle. Including the grocery store. Especially the grocery store.' },
];

// ── Achievements catalogue ───────────────────────────────────────
const ACHIEVEMENTS = {
  touch_grass:        { name:'Touch Grass',             hint:'Actually went outside' },
  fridge_archaeo:     { name:'Fridge Archaeologist',    hint:'Conducted a full excavation' },
  professional_yapper:{ name:'Professional Yapper',     hint:'Posted everything, consequences pending' },
  local_menace:       { name:'Local Menace',            hint:'Invited raccoon inside for tea' },
  too_many_cats:      { name:'Too Many Cats',           hint:'There are too many cats now' },
  suspiciously_power: { name:'Suspiciously Powerful',   hint:'Acquired a volcano' },
  coma_champion:      { name:'Coma Champion',           hint:'Achieved peak horizontal' },
  buffet_menace:      { name:'Local Buffet Menace',     hint:'Banned from three establishments' },
  wanted_12:          { name:'Wanted In 12 Countries',  hint:'Diplomatic incident (raccoon-related)' },
  accid_famous:       { name:'Accidentally Famous',     hint:'The cameras found you' },
  tax_evasion:        { name:'Tax Evasion Any%',        hint:'Chose chaos over compliance' },
  why:                { name:'Why?',                    hint:'You know what you did' },
  bed_ceo:            { name:'Bed CEO',                 hint:'Running things from horizontal' },
  legendary_hiber:    { name:'Legendary Hibernator',    hint:'Napped before the apocalypse' },
  dino_diplomat:      { name:'Dino Diplomat',           hint:'First contact with DinoBoy' },
};

// ── Narrator stages ──────────────────────────────────────────────
const NARRATOR = [
  ["Good morning, Mochi.", "I see.", "Interesting.", "Moving on.", "A cat has appeared.", "Noted."],
  ["I am beginning to notice patterns.", "This is... a choice.", "Hmm.", "I am simply observing.", "Okay. That happened.", "We continue."],
  ["I did not anticipate this development.", "Why.", "I have reviewed your decisions.", "The raccoons did not help.", "This is fine. I am fine.", "Please."],
  ["I have accepted what you are.", "At this point I am simply documenting.", "Why do you own seventeen raccoons?", "I have reviewed your life choices.", "I am disappointed.", "Not surprised. Just disappointed."],
  ["Please stop clicking random things.", "This was not in my contract.", "I would like to speak to a manager.", "I no longer understand what is happening.", "Every day is a new experience.", "Statistically, this should not be possible."],
  ["We are near the end.", "I have made peace with this.", "You did this your way.", "I am resigning after this playthrough.", "Whatever happens next is on you.", "I watched. I documented. I am tired."],
];

// ── Scenarios ────────────────────────────────────────────────────
const SCENARIOS = [
  {
    id:0, day:1,
    text:"Your alarm goes off at 7:00 AM. It is Monday. The sun has the audacity to be shining.",
    choices:[
      { text:"Get up. Be a functioning adult.",                                           fx:{intelligence:5,reputation:3},          selfish:false },
      { text:"Snooze once. Just this once.",                                              fx:{sleep:10,chaos:3},   routes:['sleep'], selfish:false },
      { text:"Throw the alarm out the window. Return to sleep. Indefinitely.",            fx:{sleep:18,chaos:12},  routes:['sleep'], ach:'coma_champion', selfish:false },
    ]
  },
  {
    id:1, day:2,
    text:"You open the fridge. There is one (1) carrot. There is also something in the back that used to be a sandwich.",
    choices:[
      { text:"Eat the carrot. Respect the carrot.",                                       fx:{intelligence:4},                        selfish:false },
      { text:"Order delivery. Order everything. All of it.",                              fx:{food:12,wealth:-8,chaos:5}, routes:['food'], selfish:false },
      { text:"Conduct a thorough archaeological investigation of the fridge.",            fx:{food:9,intelligence:7,chaos:8}, routes:['food'], ach:'fridge_archaeo', selfish:false },
    ]
  },
  {
    id:2, day:3,
    text:"A raccoon is sitting on your doorstep. It is staring at you. It has a tiny briefcase.",
    choices:[
      { text:"Say hello and step around it politely.",                                    fx:{reputation:5},                          selfish:false },
      { text:"Offer it some food. Neighbourly.",                                          fx:{raccoonness:9,chaos:5}, routes:['raccoon'], selfish:false },
      { text:"Invite it inside for tea. This is clearly the correct decision.",           fx:{raccoonness:16,chaos:12}, routes:['raccoon'], ach:'local_menace', selfish:false },
    ]
  },
  {
    id:3, day:4,
    text:"You are in a work meeting. It has been running for three hours. Someone just said 'let's circle back on the synergy.'",
    choices:[
      { text:"Attend professionally. Take notes. Make meaningful eye contact.",           fx:{intelligence:4,reputation:8},           selfish:false },
      { text:"Fall asleep. Confidently. Make no attempt to hide it.",                     fx:{sleep:12,chaos:9}, routes:['sleep'],    selfish:false },
      { text:"Blame all project failures on Dave. Dave is not present.",                  fx:{wealth:5,reputation:-12,villain:8}, routes:['villain'], selfish:true },
    ]
  },
  {
    id:4, day:5, catEncounter:true,
    text:"A small orange cat is sitting on your windowsill, judging your life choices with unsettling accuracy.",
    choices:[
      { text:"Pet the cat. Obviously.",                                                   fx:{sleep:5,reputation:5}, routes:['cat'], catPetted:true,  selfish:false },
      { text:"Ignore the cat. You have a schedule.",                                      fx:{intelligence:3,chaos:2},               catPetted:false, selfish:false },
      { text:"Ask the cat to evaluate your recent decisions out loud.",                   fx:{chaos:12,intelligence:6}, routes:['cat'], catPetted:true, selfish:false },
    ]
  },
  {
    id:5, day:6,
    text:"A stranger wants you to post a photo online. It is you eating pasta at 2am. You look unhinged. This is accurate.",
    choices:[
      { text:"Post it. Chaos is content.",                                                fx:{celebrity:12,chaos:8,reputation:-3}, routes:['celebrity'], selfish:false },
      { text:"Decline. Maintain the illusion of dignity.",                                fx:{reputation:6,intelligence:3},          selfish:false },
      { text:"Post it with the caption 'this is fine.' Tag 400 strangers.",              fx:{celebrity:20,chaos:16}, routes:['celebrity'], ach:'professional_yapper', selfish:false },
    ]
  },
  {
    id:6, day:7, raccoonRecruitment:true,
    text:"The raccoon from Day 3 is back with friends. There are seven of them. One is wearing a small hat. They present you with a formal invitation to join the raccoon collective.",
    choices:[
      { text:"Decline politely. You are flattered, but this is not your path.",           fx:{reputation:5,intelligence:5}, raccoonRefused:true,  selfish:false },
      { text:"Request a full briefing on the benefits package first.",                    fx:{raccoonness:11,chaos:7,intelligence:3}, raccoonRefused:false, selfish:false },
      { text:"Accept without reading the terms and conditions.",                          fx:{raccoonness:22,chaos:16}, routes:['raccoon'], raccoonRefused:false, ach:'why', selfish:false },
    ]
  },
  {
    id:7, day:8,
    text:"There is an 'All You Can Eat' buffet nearby. The sign feels like a personal challenge.",
    choices:[
      { text:"Get something reasonable. One plate.",                                      fx:{intelligence:4},                        selfish:false },
      { text:"Scientifically test the limits of 'All You Can Eat.'",                     fx:{food:16,chaos:10,wealth:-6}, routes:['food'], ach:'buffet_menace', selfish:false },
      { text:"Take everything. Leave nothing. They set the rules.",                       fx:{food:22,chaos:18,wealth:-6}, routes:['food'], selfish:true },
    ]
  },
  {
    id:8, day:9,
    text:"DinoBoy has appeared. He is quite large. He seems friendly. You are not entirely sure what DinoBoy is, but he is definitely looking at you.",
    choices:[
      { text:"Wave. Establish peaceful first contact.",                                   fx:{intelligence:5,reputation:4},           selfish:false },
      { text:"Approach DinoBoy. You have a very good feeling about this.",                fx:{dinoboy:13,chaos:8,reputation:5}, routes:['dinoboy'], ach:'dino_diplomat', selfish:false },
      { text:"Offer DinoBoy the leftover buffet as a diplomatic peace offering.",         fx:{dinoboy:18,food:-8,reputation:10}, routes:['dinoboy'], selfish:false },
    ]
  },
  {
    id:9, day:10,
    text:"It is 3pm. The couch exists. You had a large lunch. Physics strongly suggests you should be horizontal.",
    choices:[
      { text:"Resist. You are stronger than the couch.",                                  fx:{intelligence:6,reputation:4},           selfish:false },
      { text:"A brief 20-minute nap. That is definitely all.",                            fx:{sleep:13,chaos:4}, routes:['sleep'],    selfish:false },
      { text:"Surrender completely to the couch. The couch wins today.",                  fx:{sleep:22,chaos:9}, routes:['sleep'], ach:'bed_ceo', selfish:false },
    ]
  },
  {
    id:10, day:11, catEncounter:true,
    text:"The same orange cat has returned. It is now sitting in the exact centre of your floor. It has not asked permission. It is licking its paw with the confidence of a property owner.",
    choices:[
      { text:"Pet the cat. Still the correct choice.",                                    fx:{sleep:5,celebrity:5}, routes:['cat'], catPetted:true, selfish:false },
      { text:"Let the cat stay but maintain emotional distance.",                         fx:{cat:5,chaos:2},                        catPetted:false, selfish:false },
      { text:"Draft an official lease agreement. The cat is a tenant now.",              fx:{cat:22,chaos:11,celebrity:5}, routes:['cat'], catPetted:true, ach:'too_many_cats', selfish:false },
    ]
  },
  {
    id:11, day:12,
    text:"A man in a very sharp suit offers you an investment opportunity he describes only as 'extremely legal and definitely a volcano.'",
    choices:[
      { text:"Decline. Volcanoes are not a sound investment.",                            fx:{intelligence:8,reputation:5},           selfish:false },
      { text:"Ask for a brochure and consider your options.",                             fx:{villain:9,chaos:6,wealth:5}, routes:['villain'], selfish:false },
      { text:"Buy the volcano immediately. You have been waiting for this moment.",       fx:{villain:22,chaos:18,wealth:-22}, routes:['villain'], ach:'suspiciously_power', selfish:false },
    ]
  },
  {
    id:12, day:13,
    text:"A production company wants to make a documentary about your life. The working title is 'The Mochi Situation.' The raccoons have already signed their releases.",
    choices:[
      { text:"Decline. Privacy matters.",                                                 fx:{intelligence:5,reputation:8},           selfish:false },
      { text:"Agree. This was always going to happen eventually.",                        fx:{celebrity:18,chaos:10,reputation:5}, routes:['celebrity'], selfish:false },
      { text:"Counter-pitch a reality show where you become increasingly powerful. Weekly.", fx:{celebrity:16,villain:10,chaos:14}, routes:['celebrity'], ach:'accid_famous', selfish:true },
    ]
  },
  {
    id:13, day:14,
    text:"You receive an official-looking letter. The letterhead features a raccoon wearing a judge's wig. The seal appears disturbingly legitimate.",
    choices:[
      { text:"Read carefully and respond responsibly.",                                   fx:{intelligence:6,reputation:6},           selfish:false },
      { text:"Ignore it. Whatever it is will resolve itself somehow.",                   fx:{chaos:12,raccoonness:5}, routes:['raccoon'], selfish:false },
      { text:"Write back claiming you are also a raccoon and therefore immune to jurisdiction.", fx:{raccoonness:20,chaos:18,celebrity:5}, routes:['raccoon'], ach:'wanted_12', selfish:false },
    ]
  },
  {
    id:14, day:15, parkSetup:true,
    text:"It is evening. The city is doing its thing. You could do almost anything right now.",
    choices:[
      { text:"Go for a walk. End up at the park.",                                        fx:{reputation:5,sleep:3}, goesToPark:true, selfish:false },
      { text:"Order food, accept the couch, sleep before midnight.",                      fx:{food:9,sleep:12}, routes:['food','sleep'], selfish:false },
      { text:"Contact the raccoons. Find out what they are planning. Get extremely involved.", fx:{raccoonness:14,chaos:12}, routes:['raccoon'], selfish:false },
    ]
  },
  {
    id:15, day:16,
    text:"Something is happening. You can feel it. The cat knows. DinoBoy sent a cryptic text. The raccoons have gone suspiciously quiet.",
    choices:[
      { text:"Prepare carefully. Be ready for whatever comes.",                           fx:{intelligence:8,reputation:6},           selfish:false },
      { text:"Lean into whatever this is becoming.",                                      fx:{chaos:18},                              selfish:false },
      { text:"Take a nap. Whatever happens will happen without your input.",              fx:{sleep:16,chaos:6}, routes:['sleep'], ach:'legendary_hiber', selfish:false },
    ]
  },
  {
    id:16, day:17,
    text:"An unexpected sum of money appears in your account. The transaction description reads: 'raccoon business.' You have no further context.",
    choices:[
      { text:"Report it to your bank. This is suspicious.",                               fx:{reputation:8,intelligence:6},           selfish:false },
      { text:"Spend all of it on something magnificent and impractical.",                 fx:{chaos:16,wealth:10,celebrity:5},        selfish:false },
      { text:"Invest it back into the raccoon economy. You are in this now.",             fx:{raccoonness:12,wealth:8,chaos:8}, routes:['raccoon'], ach:'tax_evasion', selfish:false },
    ]
  },
];

// ── Stat descriptions ────────────────────────────────────────────
function describeStat(key, val) {
  const T = {
    chaos:       [[0,'Suspiciously Normal'],[14,'Slightly Off'],[28,'Concerning'],[48,'Chaotic Neutral'],[68,'Alarming'],[88,'Pure Entropy']],
    sleep:       [[0,'Critically Awake'],[13,'Running On Vibes'],[28,'Functioning (Barely)'],[48,'Adequately Rested'],[68,'Professionally Horizontal'],[88,'Legally A Mattress']],
    raccoonness: [[0,'Fully Human'],[9,'Raccoon Adjacent'],[24,'Raccoon Curious'],[44,'Raccoon Sympathizer'],[64,'Raccoon In A Trench Coat'],[84,'Supreme Raccoon']],
  };
  const table = T[key]; if (!table) return '';
  let d = table[0][1];
  for (const [thr, label] of table) { if (val >= thr) d = label; }
  return d;
}

// ── Game state ───────────────────────────────────────────────────
let G = {};

function resetState() {
  G = {
    day: 1,
    sIdx: 0,
    stats: { chaos:0, intelligence:10, wealth:20, reputation:10, sleep:30,
             raccoonness:0, food:0, cat:0, villain:0, celebrity:0, dinoboy:0 },
    routes: { sleep:0, raccoon:0, food:0, villain:0, cat:0, celebrity:0, dinoboy:0 },
    egg: { raccoonRefused:false, catsEncountered:0, catsPetted:0,
           neverSelfish:true, visitedPark:false, waited30s:false,
           clickedMoon:false, clickedStar:false },
    earnedAchs: new Set(),
    choicesMade: 0,
    parkTimerActive: false,
    parkTimerVal: 0,
    parkTimerID: null,
  };
}

// ── Screen management ────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}

// ── Stars background ────────────────────────────────────────────
function initStars() {
  const cvs = document.getElementById('stars-canvas');
  if (!cvs) return;
  const ctx = cvs.getContext('2d');
  let stars = [];
  const resize = () => {
    cvs.width = innerWidth; cvs.height = innerHeight;
    stars = Array.from({length:130}, () => ({
      x: Math.random()*cvs.width, y: Math.random()*cvs.height,
      r: Math.random()*1.4+0.4,
      a: Math.random()*0.55+0.08,
      spd: Math.random()*0.25+0.08,
      ph: Math.random()*Math.PI*2,
    }));
  };
  const draw = t => {
    ctx.clearRect(0,0,cvs.width,cvs.height);
    stars.forEach(s => {
      const a = s.a*(0.55+0.45*Math.sin(t*s.spd+s.ph));
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(200,190,255,${a})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  resize(); addEventListener('resize', resize);
  requestAnimationFrame(draw);
}

// ── Typewriter ───────────────────────────────────────────────────
function typewrite(el, text, speed, cb) {
  el.textContent = '';
  const cursor = Object.assign(document.createElement('span'), {className:'cursor'});
  el.appendChild(cursor);
  let i = 0;
  const iv = setInterval(() => {
    if (i < text.length) { el.insertBefore(document.createTextNode(text[i++]), cursor); }
    else { clearInterval(iv); cursor.remove(); cb && cb(); }
  }, speed || 28);
  return iv;
}

// ── Narrator ─────────────────────────────────────────────────────
let _nTyper = null;
function setNarrator(text, speed) {
  const el = document.getElementById('narrator-line'); if (!el) return;
  if (_nTyper) clearInterval(_nTyper);
  _nTyper = typewrite(el, text, speed || 24);
}
function pickNarrator() {
  const n = G.choicesMade;
  let s = 0;
  if (n >= 3)  s = 1;
  if (n >= 7)  s = 2;
  if (n >= 11) s = 3;
  if (n >= 15) s = 4;
  if (n >= 17) s = 5;
  const pool = NARRATOR[s];
  return pool[Math.floor(Math.random()*pool.length)];
}

// ── Achievement queue ────────────────────────────────────────────
let _achQueue = [], _achBusy = false;
function unlockAch(id) {
  if (!ACHIEVEMENTS[id] || G.earnedAchs.has(id)) return;
  G.earnedAchs.add(id);
  _achQueue.push(id);
  if (!_achBusy) _nextAch();
}
function _nextAch() {
  if (!_achQueue.length) { _achBusy = false; return; }
  _achBusy = true;
  const id = _achQueue.shift();
  const a  = ACHIEVEMENTS[id]; if (!a) { _nextAch(); return; }
  const toast = document.getElementById('ach-toast');
  document.getElementById('ach-name-text').textContent = a.name;
  toast.classList.remove('hidden');
  requestAnimationFrame(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => { toast.classList.add('hidden'); setTimeout(_nextAch, 200); }, 420);
    }, 2800);
  });
}

// ── Stat pills ───────────────────────────────────────────────────
function updatePills() {
  const pc = document.getElementById('pill-chaos');
  const ps = document.getElementById('pill-sleep');
  const pr = document.getElementById('pill-raccoon');
  if (pc) pc.textContent = `Chaos: ${describeStat('chaos',       G.stats.chaos)}`;
  if (ps) ps.textContent = `Sleep: ${describeStat('sleep',       G.stats.sleep)}`;
  if (pr) pr.textContent = `🦝 ${describeStat('raccoonness', G.stats.raccoonness)}`;
}

// ── Apply stat fx ────────────────────────────────────────────────
function applyFx(fx) {
  Object.entries(fx).forEach(([k,v]) => {
    if (k in G.stats) G.stats[k] = Math.max(0, Math.min(100, G.stats[k]+v));
  });
}

// ── Render scenario ──────────────────────────────────────────────
function renderScenario(idx) {
  const sc = SCENARIOS[idx];
  if (!sc) { triggerEnding(); return; }

  document.getElementById('day-num').textContent = sc.day || G.day;
  setNarrator(pickNarrator());

  const stEl = document.getElementById('scenario-text');
  stEl.style.opacity = '0'; stEl.style.transform = 'translateY(8px)';
  setTimeout(() => {
    stEl.textContent = sc.text;
    stEl.style.transition = 'all .4s ease';
    stEl.style.opacity = '1'; stEl.style.transform = 'translateY(0)';
  }, 420);

  const wrap = document.getElementById('choices-wrap');
  wrap.innerHTML = '';
  wrap.style.opacity = '0';

  setTimeout(() => {
    sc.choices.forEach((ch, i) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.style.animationDelay = `${i*0.1}s`;
      btn.textContent = ch.text;
      btn.addEventListener('click', () => {
        wrap.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
        handleChoice(idx, i);
      });
      wrap.appendChild(btn);
    });
    wrap.style.transition = 'opacity .3s';
    wrap.style.opacity = '1';
  }, 720);
}

// ── Handle choice ────────────────────────────────────────────────
function handleChoice(scIdx, chIdx) {
  const sc = SCENARIOS[scIdx];
  const ch = sc.choices[chIdx];

  applyFx(ch.fx || {});
  if (ch.routes) ch.routes.forEach(r => { if (r in G.routes) G.routes[r]++; });
  if (ch.selfish) G.egg.neverSelfish = false;
  if (sc.raccoonRecruitment) G.egg.raccoonRefused = !!ch.raccoonRefused;
  if (sc.catEncounter) {
    G.egg.catsEncountered++;
    if (ch.catPetted) G.egg.catsPetted++;
  }
  if (ch.goesToPark) G.egg.visitedPark = true;
  if (ch.ach) unlockAch(ch.ach);

  G.choicesMade++;
  G.sIdx++;
  G.day++;
  updatePills();

  if (ch.goesToPark) {
    unlockAch('touch_grass');
    setTimeout(() => showParkScene(), 350);
    return;
  }
  if (G.sIdx >= SCENARIOS.length) {
    setTimeout(() => triggerEnding(), 500);
    return;
  }
  setTimeout(() => renderScenario(G.sIdx), 350);
}

// ── Ending determination ─────────────────────────────────────────
function triggerEnding() {
  // Find dominant route
  let best = 'none', bestVal = 0;
  Object.entries(G.routes).forEach(([r,v]) => { if (v > bestVal) { bestVal = v; best = r; } });
  // Map route names to ending route keys
  const routeKey = { sleep:'sleep', raccoon:'raccoon', food:'food', villain:'villain',
                     cat:'cat', celebrity:'celebrity', dinoboy:'dinoboy' };
  let rk = routeKey[best];
  // Fallback to balanced if no dominant route
  if (!rk || bestVal < 2) {
    const e = ALL_ENDINGS.find(e => e.route === 'balanced') || ALL_ENDINGS[0];
    showEnding(e); return;
  }
  // Pick ending level by route score
  const level = bestVal <= 2 ? 1 : bestVal <= 4 ? 2 : bestVal <= 6 ? 3 : 4;
  const pool = ALL_ENDINGS.filter(e => e.route === rk);
  const ending = pool.find(e => e.level === level) || pool[pool.length-1] || ALL_ENDINGS[0];
  showEnding(ending);
}

function showEnding(e) {
  saveEnding(e.id);
  updateTitleCount();

  document.getElementById('end-trophy').textContent = e.emoji || '🏆';
  document.getElementById('end-title').textContent  = e.title;
  document.getElementById('end-desc').textContent   = e.desc;

  // Stat badges
  const row = document.getElementById('end-stat-row');
  row.innerHTML = '';
  const notable = [
    ['Chaos', G.stats.chaos], ['Intelligence', G.stats.intelligence],
    ['Raccoonness', G.stats.raccoonness], ['Sleep', G.stats.sleep],
  ].filter(([,v]) => v > 10);
  notable.forEach(([k,v]) => {
    const b = document.createElement('span');
    b.className = 'end-badge';
    b.textContent = `${k}: ${describeStat(k.toLowerCase(), v) || v}`;
    row.appendChild(b);
  });

  showScreen('screen-ending');
}

// ── Park scene ───────────────────────────────────────────────────
function eggConditionsMet() {
  return G.egg.raccoonRefused
      && (G.egg.catsEncountered === 0 || G.egg.catsPetted === G.egg.catsEncountered)
      && G.egg.neverSelfish
      && G.egg.visitedPark;
}

let _parkEgg = false;
let _moonClicked = false;
let _starClicked = false;

function showParkScene() {
  _parkEgg      = eggConditionsMet();
  _moonClicked  = false;
  _starClicked  = false;

  // Reset elements
  const sky      = document.getElementById('night-sky');
  const moonEl   = document.getElementById('moon-el');
  const nLine    = document.getElementById('park-narrator-line');
  const dLine    = document.getElementById('park-desc-line');
  const tLine    = document.getElementById('park-timer-line');
  const leaveBtn = document.getElementById('park-leave-btn');

  sky.querySelectorAll('.park-star').forEach(s => s.remove());
  moonEl.textContent = '🌙';
  moonEl.classList.remove('clickable');
  moonEl.onclick = null;
  nLine.textContent = '';
  dLine.textContent = '';
  tLine.textContent = '';
  leaveBtn.style.display = 'none';

  showScreen('screen-park');

  setTimeout(() => {
    typewrite(nLine, "You sit on the bench.", 40, () => {
      setTimeout(() => {
        typewrite(dLine, "The night is quiet. The city feels far away.", 35, () => {
          // 30-second timer
          G.parkTimerVal = 0;
          G.parkTimerID  = setInterval(() => {
            G.parkTimerVal++;
            if      (G.parkTimerVal <  10) tLine.textContent = "...";
            else if (G.parkTimerVal <  20) tLine.textContent = "You stay a little longer.";
            else if (G.parkTimerVal <  30) tLine.textContent = "Something feels different tonight.";
            else {
              clearInterval(G.parkTimerID);
              G.egg.waited30s = true;
              tLine.textContent = "";
              if (_parkEgg) {
                // Make moon clickable, then spawn star
                moonEl.classList.add('clickable');
                moonEl.onclick = onMoonClick;
                typewrite(dLine, "The moon looks different tonight. Strange.", 35);
              } else {
                leaveBtn.style.display = '';
                typewrite(dLine, "It is a nice evening. Eventually you decide to head home.", 35);
              }
            }
          }, 1000);
        });
      }, 600);
    });
  }, 500);
}

function onMoonClick() {
  if (_moonClicked) return;
  _moonClicked = true;
  G.egg.clickedMoon = true;
  const moonEl = document.getElementById('moon-el');
  moonEl.classList.remove('clickable');
  moonEl.onclick = null;
  moonEl.textContent = '🌕';

  typewrite(document.getElementById('park-desc-line'),
    "The sky shudders. A streak of light catches the corner of your eye.", 35, spawnShootingStar);
}

function spawnShootingStar() {
  const sky = document.getElementById('night-sky');
  const star = document.createElement('span');
  star.className = 'park-star';
  star.textContent = '⭐';
  star.style.top  = `${20 + Math.random()*60}px`;
  star.style.right = `${20 + Math.random()*100}px`;
  sky.appendChild(star);
  requestAnimationFrame(() => {
    star.classList.add('visible');
    star.onclick = onStarClick;
  });
}

function onStarClick() {
  if (_starClicked) return;
  _starClicked = true;
  G.egg.clickedStar = true;
  // Trigger easter egg
  setTimeout(() => triggerEasterEgg(), 400);
}

function leavePark() {
  if (G.parkTimerID) clearInterval(G.parkTimerID);
  showScreen('screen-game');
  if (G.sIdx >= SCENARIOS.length) { triggerEnding(); return; }
  renderScenario(G.sIdx);
}

// ── Easter egg / secret route ────────────────────────────────────
function triggerEasterEgg() {
  // Glitch effect on the whole page briefly
  document.body.classList.add('glitch');
  setTimeout(() => document.body.classList.remove('glitch'), 800);

  showScreen('screen-secret');
  const body = document.getElementById('terminal-body');
  body.innerHTML = '';

  const lines = [
    { text:"[ SYSTEM GLITCH DETECTED ]",          delay:200,  cls:'t-gold' },
    { text:"Rerouting...",                          delay:900,  cls:'' },
    { text:"",                                      delay:1400, cls:'' },
    { text:"narrator@mochi-sim:~$ ls -la private/", delay:1700, cls:'t-prompt' },
    { text:"",                                      delay:2100, cls:'' },
    { text:"notes_01.txt",                          delay:2300, cls:'t-file', fileId:'notes_01' },
    { text:"notes_02.txt",                          delay:2500, cls:'t-file', fileId:'notes_02' },
    { text:"classified.txt",                        delay:2800, cls:'t-file', fileId:'classified' },
    { text:"final_note.txt",                        delay:3100, cls:'t-file t-gold', fileId:'final' },
    { text:"",                                      delay:3400, cls:'' },
    { text:"narrator@mochi-sim:~$ _",               delay:3600, cls:'t-prompt' },
  ];

  const fileContents = {
    notes_01: [
      "OBSERVATION LOG — Day 1",
      "Subject has thrown alarm clock out window.",
      "This was day one.",
      "Adjusting expectations accordingly.",
    ],
    notes_02: [
      "OBSERVATION LOG — Day 7",
      "Subject was invited to join raccoon collective.",
      "Subject declined.",
      "This was... unexpected.",
      "Note to self: recalibrate probability models.",
    ],
    classified: [
      "CLASSIFIED // NARRATOR EYES ONLY",
      "",
      "Out of 10,000 simulated runs,",
      "this is the only playthrough where the subject",
      "was kind to every cat they encountered.",
      "",
      "And refused the raccoons.",
      "",
      "And never once chose the selfish option.",
      "",
      "The system flagged it as an anomaly.",
      "I flagged it as something else entirely.",
    ],
    final: null, // handled specially
  };

  // Render lines
  lines.forEach(({ text, delay, cls, fileId }) => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.className = 't-line ' + (cls || '');
      p.textContent = text;
      if (fileId) {
        p.style.cursor = 'pointer';
        p.addEventListener('click', () => {
          if (fileId === 'final') showFinalNote(body);
          else showFileContent(body, fileId, fileContents[fileId]);
        });
      }
      body.appendChild(p);
      requestAnimationFrame(() => p.classList.add('v'));
      body.scrollTop = body.scrollHeight;
    }, delay);
  });
}

function showFileContent(body, id, lines) {
  // Remove old preview
  body.querySelector('.t-file-preview')?.remove();
  const wrap = document.createElement('div');
  wrap.className = 't-line t-content t-file-preview v';
  lines.forEach(line => {
    const p = document.createElement('p');
    p.textContent = line || '';
    wrap.appendChild(p);
  });
  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;
}

function showFinalNote(body) {
  body.querySelector('.t-file-preview')?.remove();
  body.querySelector('.t-final-note')?.remove();

  const finalLines = [
    { text:"final_note.txt", cls:'t-file t-gold' },
    { text:"─────────────────────────────────────────", cls:'' },
    { text:"", cls:'' },
    { text:"This simulator was supposed to generate thousands of lives.", cls:'t-sweet' },
    { text:"", cls:'' },
    { text:"But there was only one person I wanted to watch play it.", cls:'t-sweet' },
    { text:"", cls:'' },
    { text:"Thanks for making all the ridiculous choices.", cls:'t-sweet' },
    { text:"Even the raccoon ones.", cls:'t-sweet' },
    { text:"", cls:'' },
    { text:"Especially the raccoon ones.", cls:'t-sweet' },
    { text:"", cls:'' },
    { text:"─────────────────────────────────────────", cls:'' },
  ];

  const wrap = document.createElement('div');
  wrap.className = 't-file-preview t-final-note';
  finalLines.forEach(({ text, cls }) => {
    const p = document.createElement('p');
    p.className = 't-line v ' + cls;
    p.textContent = text;
    wrap.appendChild(p);
  });

  // Bonus content block
  const bonus = document.createElement('div');
  bonus.className = 't-line v t-unlocked';
  bonus.innerHTML = `
    <p class="t-gold" style="font-weight:700;margin-bottom:8px">★ BONUS CONTENT UNLOCKED ★</p>
    <p>You found the ending that wasn't supposed to exist.</p>
    <p style="margin-top:6px;color:var(--muted);font-size:12px">One in ten thousand. Not bad for someone who naps this much.</p>
  `;
  wrap.appendChild(bonus);

  const btnsRow = document.createElement('div');
  btnsRow.className = 't-line v t-end-btns';
  btnsRow.innerHTML = `
    <button class="btn-primary" onclick="startGame()">Play Again</button>
    <button class="btn-ghost"   onclick="openCollection()">View Collection</button>
  `;
  wrap.appendChild(btnsRow);

  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;

  // Save special ending
  saveEnding('secret_route');
  updateTitleCount();
}

// ── Collection screen ────────────────────────────────────────────
function openCollection() {
  const found = getSaved();
  document.getElementById('found-count').textContent = found.size;

  const grid = document.getElementById('endings-grid');
  grid.innerHTML = '';

  ALL_ENDINGS.forEach(e => {
    const card = document.createElement('div');
    const unlocked = found.has(e.id);
    card.className = 'end-card' + (unlocked ? ' unlocked' : '');
    if (unlocked) {
      card.innerHTML = `<div class="end-card-icon">${e.emoji}</div>
                        <div class="end-card-name">${e.title}</div>`;
    } else {
      card.innerHTML = `<div class="end-card-lock">???</div>`;
    }
    grid.appendChild(card);
  });

  showScreen('screen-collection');
}

function updateTitleCount() {
  const n = getSaved().size;
  const el = document.getElementById('title-end-count');
  if (el) el.textContent = n;
  const fc = document.getElementById('found-count');
  if (fc) fc.textContent = n;
}

// ── Start game ───────────────────────────────────────────────────
function startGame() {
  resetState();
  updatePills();
  showScreen('screen-game');
  renderScenario(0);
}

// ── Init ─────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initStars();
  updateTitleCount();
});
