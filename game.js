'use strict';
// ════════════════════════════════════════════════════════
//  MOCHI SIMULATOR — game.js  v2.0
// ════════════════════════════════════════════════════════

// ── Persistence ──────────────────────────────────────────────────
const SAVE_KEY = 'mochi_endings_v1';
const ACH_KEY  = 'mochi_achs_v1';

function getSaved()     { try { return new Set(JSON.parse(localStorage.getItem(SAVE_KEY)||'[]')); } catch { return new Set(); } }
function getSavedAchs() { try { return new Set(JSON.parse(localStorage.getItem(ACH_KEY) ||'[]')); } catch { return new Set(); } }
function saveEnding(id) { const s=getSaved();    s.add(id); localStorage.setItem(SAVE_KEY,JSON.stringify([...s])); }
function persistAch(id) { const s=getSavedAchs();s.add(id); localStorage.setItem(ACH_KEY, JSON.stringify([...s])); }

// ── Endings catalogue ─────────────────────────────────────────────
const ALL_ENDINGS = [
  // SLEEP
  { id:'sleep_1', route:'sleep', level:1, emoji:'😴', title:'Professional Napper',
    desc:'You have elevated napping to an art form. Productivity gurus have studied your sleep schedule and quietly reconsidered their careers.' },
  { id:'sleep_2', route:'sleep', level:2, emoji:'🛌', title:'Bed CEO',
    desc:'You run a multinational corporation entirely from under a weighted blanket. Nobody knows what you look like standing up. Board meetings are at 11am. You attend horizontally. The board has learned not to ask.' },
  { id:'sleep_3', route:'sleep', level:3, emoji:'🌯', title:'Human Burrito',
    desc:'Scientists estimate you have been wrapped in blankets long enough to begin photosynthesis. You are at peace with this. The blanket is warm. The outside world has questions you cannot be bothered to answer.' },
  { id:'sleep_4', route:'sleep', level:4, emoji:'🏔️', title:'Legendary Hibernator',
    desc:'You woke up briefly in 2031. You looked at everything. You went back to sleep immediately. Historians will argue forever about whether this was wisdom or denial. It was both. You are still asleep.' },
  // RACCOON
  { id:'raccoon_1', route:'raccoon', level:1, emoji:'🤝', title:'Raccoon Adjacent',
    desc:'Not quite raccoon, not quite human. You occupy a grey area that the raccoons have officially recognised and respect. They acknowledge you when you pass. This is more than most humans get.' },
  { id:'raccoon_2', route:'raccoon', level:2, emoji:'👑', title:'Trash King',
    desc:'You rule the dumpsters behind four Whole Foods and a very confused Marks and Spencer. The raccoons call you boss. The initialled briefcase is yours. Life, by any reasonable metric, is going extremely well.' },
  { id:'raccoon_3', route:'raccoon', level:3, emoji:'🦝', title:'Raccoon President',
    desc:'You ran on a platform of More Trash, Less Taxes. You won by a landslide. Nobody knows who voted. The hat was yours now. You have not questioned this. The raccoons have not explained it. This is the arrangement.' },
  { id:'raccoon_4', route:'raccoon', level:4, emoji:'🌍', title:'Supreme Garbage Overlord',
    desc:'Wanted in twelve countries. The UN has issued two statements. The raccoons are extraordinarily proud. Your trash empire spans six time zones and has its own currency. The currency is acorns. The exchange rate is surprisingly stable.' },
  // FOOD
  { id:'food_1', route:'food', level:1, emoji:'🍿', title:'Professional Snacker',
    desc:'Your relationship with food transcends hunger. You eat out of curiosity, boredom, deep respect for the ingredients, and occasionally spite. It is mostly spite.' },
  { id:'food_2', route:'food', level:2, emoji:'🔍', title:'Fridge Explorer',
    desc:'You have mapped every shelf, named every inhabitant, and established a complete ecosystem understanding of your refrigerator. The carrot survived everything. It always does. You suspect it is watching.' },
  { id:'food_3', route:'food', level:3, emoji:'🍜', title:'Local Buffet Menace',
    desc:'Banned from nine all-you-can-eat establishments across three boroughs. You consider this a resume item. You are not wrong. The buffets speak of you in hushed tones. There is a photo. The photo is posted in the back.' },
  { id:'food_4', route:'food', level:4, emoji:'📉', title:'Consumed The Economy',
    desc:'Economists cannot explain it. Three supply chains collapsed simultaneously. A Senate hearing was convened. They kept saying your name. You were at home eating at the time. You had forty-three things that Tuesday. A normal Tuesday.' },
  // VILLAIN
  { id:'villain_1', route:'villain', level:1, emoji:'😏', title:'Minor Nuisance',
    desc:'Nothing technically illegal. Nothing provably wrong. Just a persistent low-level hum of suspicious energy. Your neighbours lock their mailboxes. Dave still does not know why things keep going poorly for him.' },
  { id:'villain_2', route:'villain', level:2, emoji:'🎩', title:'Cartoon Villain',
    desc:'You have the spinning chair. You have the monologue voice. The aesthetic is complete and the monocle is real. It is prescription. Nobody needs to know that. The power is real too. That part is not a joke.' },
  { id:'villain_3', route:'villain', level:3, emoji:'🌋', title:'Evil Billionaire',
    desc:'You own a volcano. It came with a name. You did not give it the name. Somehow that is worse. You made the stock market cry on a Tuesday because you had it scheduled. The monocle is now load-bearing to your personality.' },
  { id:'villain_4', route:'villain', level:4, emoji:'🌑', title:'Destroyed The Sun',
    desc:'This was not on the agenda. The moon tax was going smoothly. Then one thing led to another, as things do when you own a volcano and have stopped reading the terms and conditions. The sun is gone. Congratulations, you absolute menace.' },
  // CAT
  { id:'cat_1', route:'cat', level:1, emoji:'🐱', title:'Cat Employee',
    desc:'You work for a cat. The salary is biscuits and the occasional slow blink of approval. You have signed nothing but both parties understand the arrangement. You have never been more professionally fulfilled.' },
  { id:'cat_2', route:'cat', level:2, emoji:'🏠', title:'Cat Landlord',
    desc:'You pay rent in the property you own. The cat sets the thermostat. You sleep on the side of the bed the cat has not claimed, which is the smaller side and getting smaller. You are fully content with this.' },
  { id:'cat_3', route:'cat', level:3, emoji:'✨', title:'Cat Cult Leader',
    desc:'Seventeen cats chose you. The meetings are at 3am. The agenda is unclear. The agenda has always been unclear. The slow blink of leadership is upon you. The other cats have accepted this. You are transcendent.' },
  { id:'cat_4', route:'cat', level:4, emoji:'🐈', title:'Actually A Cat',
    desc:'At some point something went irreversibly right, or wrong, and the distinction no longer seems meaningful. You are a cat now. The orange cat from Day 5 nods at you from across the room. You understand everything. You have always understood.' },
  // CELEBRITY
  { id:'celeb_1', route:'celebrity', level:1, emoji:'🌟', title:'Local Legend',
    desc:'Three people in your area know who you are and feel genuinely lucky about it. You have a signature wave deployed sparingly for maximum impact. The legend is small but it is entirely yours.' },
  { id:'celeb_2', route:'celebrity', level:2, emoji:'👸', title:'Meme Queen',
    desc:'The pasta photo defined you. Millions know those eyes. They understand the eyes. They live inside the eyes. You are not the person you were before the pasta. The pasta made you better.' },
  { id:'celeb_3', route:'celebrity', level:3, emoji:'📸', title:'Accidentally Famous',
    desc:'You were simply existing. The cameras were simply there. Nobody can explain the billboard. It is in five cities. You are on it eating chips. DinoBoy sends you a photo every single time he passes one. He has not explained his expression.' },
  { id:'celeb_4', route:'celebrity', level:4, emoji:'🕊️', title:'Worshipped By Pigeons',
    desc:'Human fame proved insufficient. The pigeons found you. They have merch sold exclusively near places you visited. The newsletter has forty thousand subscribers. The pigeons will not confirm or deny any of this.' },
  // DINOBOY
  { id:'dino_1', route:'dinoboy', level:1, emoji:'🗺️', title:'Chaos Research Partners',
    desc:'You and DinoBoy investigated the whole thing together. He was right about most of it. The maps with string were accurate. He made a legend for the string colours. He is like that.' },
  { id:'dino_2', route:'dinoboy', level:2, emoji:'⚡', title:'Unbeatable Duo',
    desc:'DinoBoy with his charts and his instincts. You with your chaos and your snacks. Together you navigated twenty days of increasingly improbable events without losing each other. That is the whole thing, actually. That is everything.' },
  { id:'dino_3', route:'dinoboy', level:3, emoji:'📋', title:'DinoBoy Was Right (He Usually Is)',
    desc:'He tried to warn you. With charts. Colour-coded charts. Very clearly labelled charts. You loved him anyway and he loved you anyway and the charts are now framed on the wall and that is the whole story.' },
  { id:'dino_4', route:'dinoboy', level:4, emoji:'👑', title:'Legendary Partnership',
    desc:'The raccoons respect you both. The cat tolerates DinoBoy, which is practically an endorsement. The documentary captured none of the important moments, only the funny ones. That is fine. The important ones were yours.' },
];

// ── Achievements catalogue ────────────────────────────────────────
const ACHIEVEMENTS = {
  touch_grass:         { name:'Touch Grass',             hint:'Actually went outside' },
  fridge_archaeo:      { name:'Fridge Archaeologist',    hint:'Conducted a full fridge excavation' },
  professional_yapper: { name:'Professional Yapper',     hint:'Posted everything. Consequences pending.' },
  local_menace:        { name:'Local Menace',            hint:'Invited raccoon inside for tea' },
  too_many_cats:       { name:'Too Many Cats',           hint:'There are too many cats now' },
  suspiciously_power:  { name:'Suspiciously Powerful',   hint:'Acquired a volcano' },
  coma_champion:       { name:'Coma Champion',           hint:'Achieved peak horizontal on Day 1' },
  buffet_menace:       { name:'Local Buffet Menace',     hint:'Banned from at least one establishment' },
  wanted_12:           { name:'Wanted In 12 Countries',  hint:'A raccoon legal incident' },
  accid_famous:        { name:'Accidentally Famous',     hint:'The cameras found you' },
  tax_evasion:         { name:'Tax Evasion Any%',        hint:'Invested in the raccoon economy' },
  why:                 { name:'Why?',                    hint:'Signed without reading anything' },
  bed_ceo:             { name:'Bed CEO',                 hint:'Running things from horizontal' },
  legendary_hiber:     { name:'Legendary Hibernator',    hint:'Napped before the final day' },
  dino_diplomat:       { name:'Dino Diplomat',           hint:'First serious contact with DinoBoy' },
};

// ── Finale lines by dominant route ───────────────────────────────
const FINALE_LINES = {
  sleep: [
    { t:"Day twenty.", s:"gold" },
    { t:"The last one.", s:"muted" },
    { t:"You slept through significant portions of this story.", s:"" },
    { t:"You were horizontal for most of the raccoon meetings.", s:"" },
    { t:"DinoBoy set timers to check on you. He let you sleep anyway.", s:"narrator" },
    { t:"The couch was loyal. The couch was always loyal.", s:"" },
    { t:"And somehow — rested, unhurried, on your own schedule —", s:"" },
    { t:"you arrived here anyway.", s:"gold" },
    { t:"The only schedule that ever mattered was yours.", s:"narrator" },
  ],
  raccoon: [
    { t:"Day twenty.", s:"gold" },
    { t:"The last one.", s:"muted" },
    { t:"The raccoon from Day 3 is somewhere in this city right now with that briefcase.", s:"" },
    { t:"Your name is on the briefcase.", s:"" },
    { t:"You joined something strange and organised and oddly dignified.", s:"narrator" },
    { t:"The hat was real. The wax seal was real. The dental plan was genuinely excellent.", s:"" },
    { t:"You chose a different kind of belonging.", s:"" },
    { t:"The narrator does not fully understand it.", s:"narrator" },
    { t:"The narrator respects it enormously.", s:"gold" },
  ],
  food: [
    { t:"Day twenty.", s:"gold" },
    { t:"The last one.", s:"muted" },
    { t:"The buffet has not recovered.", s:"" },
    { t:"The carrot from Day 2 is still in the fridge.", s:"" },
    { t:"You never ate it.", s:"narrator" },
    { t:"Some things are not for eating. Some things are for watching.", s:"" },
    { t:"The carrot watches.", s:"" },
    { t:"You ate everything else.", s:"gold" },
    { t:"Everything else was delicious.", s:"narrator" },
  ],
  villain: [
    { t:"Day twenty.", s:"gold" },
    { t:"The last one.", s:"muted" },
    { t:"You own a volcano.", s:"" },
    { t:"It came with a name. You did not give it the name.", s:"narrator" },
    { t:"Somehow that is worse.", s:"" },
    { t:"Dave is doing fine, technically.", s:"" },
    { t:"The monocle is prescription. Nobody knows this. Nobody will know this.", s:"narrator" },
    { t:"You chose power. Power chose you right back.", s:"" },
    { t:"Some things are not for explaining. They are simply for having.", s:"gold" },
  ],
  cat: [
    { t:"Day twenty.", s:"gold" },
    { t:"The last one.", s:"muted" },
    { t:"The orange cat knew from Day 5.", s:"" },
    { t:"They always know.", s:"narrator" },
    { t:"You passed every test you didn't know you were taking.", s:"" },
    { t:"The slow blink. The returned slow blink. The lease. The biscuits, paid on time.", s:"" },
    { t:"Every single week.", s:"narrator" },
    { t:"The cat approves.", s:"" },
    { t:"This is, genuinely, the highest honour available in this simulation.", s:"gold" },
  ],
  celebrity: [
    { t:"Day twenty.", s:"gold" },
    { t:"The last one.", s:"muted" },
    { t:"The pasta photo changed things.", s:"" },
    { t:"Fourteen million people have seen those eyes.", s:"" },
    { t:"They understood the eyes. They live inside the eyes.", s:"narrator" },
    { t:"The billboard is in five cities.", s:"" },
    { t:"DinoBoy sends a photo every time he passes one.", s:"" },
    { t:"He has never explained his expression when he does.", s:"narrator" },
    { t:"The narrator has subscribed to the pigeon newsletter. Don't read into that.", s:"gold" },
  ],
  dinoboy: [
    { t:"Day twenty.", s:"gold" },
    { t:"The last one.", s:"muted" },
    { t:"DinoBoy was right.", s:"" },
    { t:"About the raccoons. About the map. About the string colour codes.", s:"" },
    { t:"He is usually right about the things that matter.", s:"narrator" },
    { t:"And he came with snacks.", s:"" },
    { t:"In twenty days of raccoons and volcanoes and documentary crews —", s:"" },
    { t:"he came with snacks and he stayed.", s:"gold" },
    { t:"The narrator would like to note that this is not nothing. This is, in fact, most things.", s:"narrator" },
  ],
  default: [
    { t:"Day twenty.", s:"gold" },
    { t:"The last one.", s:"muted" },
    { t:"Twenty days. More raccoons than expected.", s:"" },
    { t:"Fewer regrets than anticipated.", s:"" },
    { t:"You made all of them —", s:"" },
    { t:"the sensible ones, the chaotic ones, the ones that are hard to explain at dinner.", s:"narrator" },
    { t:"Every single one was yours.", s:"" },
    { t:"The narrator has no notes.", s:"" },
    { t:"You showed up. Every day. You made a choice.", s:"gold" },
    { t:"That is, it turns out, the whole thing.", s:"narrator" },
  ],
};

// ── Scenarios (Days 1 – 20) ───────────────────────────────────────
const SCENARIOS = [
  // ─── DAY 1 ───
  {
    id:0, day:1,
    narratorIntro: "Day one. Our subject, Mochi, faces the age-old conflict between the alarm clock and the concept of being awake. The alarm does not care about her preferences. Neither does Monday.",
    text: "Your alarm goes off at 7:00 AM. It is Monday. The sun is shining with the energy of someone who slept well and very much wants you to know it.",
    choices: [
      { text:"Get up. Be a functioning adult. Contribute to society.",
        narratorReact:"She got up. Made coffee. The coffee was adequate. Day one: competent.",
        fx:{intelligence:5,reputation:3}, selfish:false },
      { text:"Snooze it. Just five more minutes. This is definitely a lie.",
        narratorReact:"Five minutes, she said. Forty-seven minutes passed. The narrator noted this without judgment. Mostly without judgment.",
        fx:{sleep:10,chaos:3}, routes:['sleep'], selfish:false },
      { text:"Throw the alarm across the room. Reclaim the morning.",
        narratorReact:"The alarm hit the wall and did not recover. Mochi went back to sleep with the satisfaction of someone who has made a decision. It was the first of many.",
        fx:{sleep:18,chaos:12}, routes:['sleep'], ach:'coma_champion', selfish:false },
    ]
  },
  // ─── DAY 2 ───
  {
    id:1, day:2,
    narratorIntro: "Day two. The kitchen. The fridge is the most honest object in any home. It knows exactly what you have and have not been doing. Today, it has thoughts.",
    text: "You open the fridge. There is one (1) carrot. There is something in the back that used to be a sandwich. It has been in there long enough to have developed both a personality and, possibly, opinions.",
    choices: [
      { text:"Eat the carrot. Respect the carrot. The carrot has survived.",
        narratorReact:"She ate it standing up, straight from the fridge, at 8am. This was her best decision of the day. The other thing watched from the back shelf.",
        fx:{intelligence:4}, selfish:false },
      { text:"Order delivery. Order everything. Every single item on the menu.",
        narratorReact:"Forty-three items. Four bags. The delivery driver made two trips and did not make eye contact. Both parties moved on in silence.",
        fx:{food:12,wealth:-8,chaos:5}, routes:['food'], selfish:false },
      { text:"Conduct a formal archaeological excavation of this entire fridge.",
        narratorReact:"She found things that predated the current decade. She gave them names. She documented the findings. The sandwich received a burial at sea (the sink). The carrot observed with what appeared to be quiet pride.",
        fx:{food:9,intelligence:7,chaos:8}, routes:['food'], ach:'fridge_archaeo', selfish:false },
    ]
  },
  // ─── DAY 3 ───
  {
    id:2, day:3,
    narratorIntro: "Day three. Something arrived at Mochi's front door that would, in most stories, be considered unusual. This is not most stories. The narrator suspects this was always going to happen.",
    text: "A raccoon is sitting on your doorstep with a small leather briefcase. It is looking at you with the calm confidence of someone who has already made their decision and is simply waiting for you to catch up. The briefcase appears to be initialled.",
    choices: [
      { text:"Say good morning and step around it. Politely.",
        narratorReact:"She nodded. It nodded back. A mutual agreement of non-interference was reached. The narrator thought: this seems fine. The narrator was wrong, but not yet.",
        fx:{reputation:5}, selfish:false },
      { text:"Offer it some food. Neighbourly.",
        narratorReact:"She offered crackers. It accepted three. It placed one of them in the briefcase. This raised more questions than it answered. The narrator began a new page.",
        fx:{raccoonness:9,chaos:5}, routes:['raccoon'], selfish:false },
      { text:"Invite it inside for tea. This is clearly the only correct decision.",
        narratorReact:"She made tea. The raccoon sat on the counter. It had preferences about milk: none. It stayed four hours. It left the briefcase behind. The narrator did not sleep well that night.",
        fx:{raccoonness:16,chaos:12}, routes:['raccoon'], ach:'local_menace', selfish:false },
    ]
  },
  // ─── DAY 4 ───
  {
    id:3, day:4,
    narratorIntro: "Day four. The workplace. A space designed for productivity, collaboration, and — based on today's agenda — three hours of circular discussion about whether the brand font should be slightly more blue.",
    text: "You are in a work meeting. It has been running for three hours. Someone just said 'let's action that going forward and circle back on the synergy deliverables.' Nobody reacted. You are in a professional environment.",
    choices: [
      { text:"Attend professionally. Take notes. Maintain meaningful eye contact.",
        narratorReact:"She filled four pages. Nothing on them was actionable. The meeting ended with no decisions made. Everyone agreed it was extremely productive.",
        fx:{intelligence:4,reputation:8}, selfish:false },
      { text:"Fall asleep. Openly. With total commitment.",
        narratorReact:"She was asleep in under three minutes. She snored, slightly. The meeting continued without her input, which was — it turned out — indistinguishable from with it.",
        fx:{sleep:12,chaos:9}, routes:['sleep'], selfish:false },
      { text:"Blame all project delays on Dave. Dave is not in this meeting. Dave cannot defend himself.",
        narratorReact:"Dave became a verb in this company. As in: 'that really got Dave'd.' He never recovered professionally. He still does not know why. The narrator felt several things about this. None of them positive.",
        fx:{wealth:5,reputation:-12,villain:8}, routes:['villain'], selfish:true },
    ]
  },
  // ─── DAY 5 ───
  {
    id:4, day:5, catEncounter:true,
    narratorIntro: "Day five. An orange cat appeared on Mochi's third-floor windowsill at precisely 11:47 AM. Nobody asked how it got there. The cat is not interested in this question.",
    text: "A small orange cat is sitting on your windowsill, judging your recent decisions with an accuracy that is frankly unsettling. It has the look of someone who has read your texts and has formed strong, unflattering opinions.",
    choices: [
      { text:"Pet the cat. This is not even a question.",
        narratorReact:"She petted the cat for eleven seconds. The cat looked away at twelve. Mochi felt, somehow, permitted. She felt, somehow, honoured.",
        fx:{sleep:5,reputation:5}, routes:['cat'], catPetted:true, selfish:false },
      { text:"Ignore the cat. You have a schedule.",
        narratorReact:"She looked away. The cat kept watching. The cat had no schedule. The cat has never had a schedule. The cat did not need her to notice it. The cat noticed her.",
        fx:{intelligence:3,chaos:2}, catPetted:false, selfish:false },
      { text:"Ask the cat to formally review your recent decisions and provide feedback.",
        narratorReact:"The cat held eye contact for a long moment. Then it knocked her water bottle off the desk. The narrator is choosing to interpret this as constructive feedback.",
        fx:{chaos:12,intelligence:6}, routes:['cat'], catPetted:true, selfish:false },
    ]
  },
  // ─── DAY 6 ───
  {
    id:5, day:6,
    narratorIntro: "Day six. At 2:17 AM, while eating pasta alone in the dark, Mochi was photographed. She did not know this. The internet was about to have very strong feelings.",
    text: "A photo of you eating pasta at 2am has surfaced. You look absolutely feral in it. Your eyes are the eyes of someone who has made many decisions and stands completely behind all of them. Someone wants to post it online.",
    choices: [
      { text:"Post it. Chaos is content. Content is currency.",
        narratorReact:"Seven hundred likes in the first hour. People related deeply to the eyes. They sent it to each other without context. Context would have helped nothing.",
        fx:{celebrity:12,chaos:8,reputation:-3}, routes:['celebrity'], selfish:false },
      { text:"Decline. Preserve the mystery. Maintain the illusion of dignity.",
        narratorReact:"The photo was not posted. The eyes were protected from the internet. Mochi finished the pasta. It was, quietly, a very good bowl of pasta.",
        fx:{reputation:6,intelligence:3}, selfish:false },
      { text:"Post it yourself, write 'this is fine', and tag four hundred strangers.",
        narratorReact:"The strangers had feelings. Several had questions. Mochi did not have answers. Fourteen of them followed her anyway. The pasta became, against all odds, iconic.",
        fx:{celebrity:20,chaos:16}, routes:['celebrity'], ach:'professional_yapper', selfish:false },
    ]
  },
  // ─── DAY 7 ───
  {
    id:6, day:7, raccoonRecruitment:true,
    narratorIntro: "Day seven. The raccoon from Day 3 had filed a report. A full written report. It had footnotes. The raccoon collective read the footnotes. They sent a formal delegation of seven.",
    text: "Seven raccoons are on your front step. One is wearing a small hat. They are holding a scroll. There is a wax seal. The seal depicts a raccoon wearing a crown. This is a formal invitation to join the raccoon collective. You notice, with some clarity, that you are not entirely surprised.",
    choices: [
      { text:"Decline, politely. Thank them. This is not your path.",
        narratorReact:"She declined. The raccoons accepted this with extraordinary dignity. The one with the hat gave a small bow. The scroll was repocketed. The narrator exhaled for the first time in several days.",
        fx:{reputation:5,intelligence:5}, raccoonRefused:true, selfish:false },
      { text:"Request a full briefing on the benefits package before deciding.",
        narratorReact:"The raccoons produced a forty-seven-page document. It had appendices. There was a pension scheme. There was dental. The narrator was, against every expectation, impressed.",
        fx:{raccoonness:11,chaos:7,intelligence:3}, raccoonRefused:false, selfish:false },
      { text:"Accept immediately, no conditions, no questions. You are absolutely IN.",
        narratorReact:"She signed the scroll. The raccoons cheered. The one with the hat produced a briefcase with her initials on it. This had been prepared in advance. They knew. They had always known.",
        fx:{raccoonness:22,chaos:16}, routes:['raccoon'], raccoonRefused:false, ach:'why', selfish:false },
    ]
  },
  // ─── DAY 8 ───
  {
    id:7, day:8,
    narratorIntro: "Day eight. The buffet. Established 1994. Survived three health inspections, a decade of competitive eating tournaments, and one incident involving a piñata that the management refuses to discuss. It had not yet met Mochi.",
    text: "There is an all-you-can-eat buffet three blocks away. The sign says ALL YOU CAN EAT in very large capital letters. You have been staring at that sign for four minutes. You feel it is a personal challenge directed specifically at you.",
    choices: [
      { text:"One reasonable plate. Be a normal, sensible person.",
        narratorReact:"One plate. Balanced portions. She left a tip. The staff nodded. The narrator felt nothing and everything simultaneously.",
        fx:{intelligence:4}, selfish:false },
      { text:"Scientifically test the absolute upper limits of 'all you can eat.'",
        narratorReact:"The manager came over after plate five. The conversation was civil. She was asked not to return on Tuesdays. She considered this a partial and meaningful victory.",
        fx:{food:16,chaos:10,wealth:-6}, routes:['food'], ach:'buffet_menace', selfish:false },
      { text:"Take everything. Absolutely everything. They established the rules. You are simply following them.",
        narratorReact:"She was there for four hours. The staff rotated twice. Three separate managers made phone calls. The buffet's quarterly earnings never fully recovered. The narrator watched from what it hoped was a safe distance.",
        fx:{food:22,chaos:18,wealth:-6}, routes:['food'], selfish:true },
    ]
  },
  // ─── DAY 9 ───
  {
    id:8, day:9,
    narratorIntro: "Day nine. DinoBoy — Mochi's boyfriend, who is compact, precise, and deeply invested in tracking unusual phenomena — had sent seventeen consecutive texts between 9:00 and 9:04 AM. The last one was a blurry photo and the words: 'babe did u see this.'",
    text: "DinoBoy is outside your window. He is holding a rolled-up map, a bag of snacks for you, and a concerned expression. 'I've been tracking the raccoon situation,' he says. 'Mochi. I think it's bigger than we thought.' He has three colour-coded highlighters in his pocket.",
    choices: [
      { text:"Take the map. Listen carefully. DinoBoy has very good instincts.",
        narratorReact:"The map contained three weeks of raccoon movement data, annotated in four colours. DinoBoy had made a legend for the colours. The narrator was going to need a larger notebook.",
        fx:{intelligence:5,reputation:4}, selfish:false },
      { text:"Invite DinoBoy in. You are absolutely getting to the bottom of this together.",
        narratorReact:"They sat on the floor with maps for three hours. DinoBoy made charts. Mochi contributed snacks and moral support. They figured out most of it. That, the narrator decided, was enough.",
        fx:{dinoboy:13,chaos:8,reputation:5}, routes:['dinoboy'], ach:'dino_diplomat', selfish:false },
      { text:"Offer DinoBoy the leftover buffet supplies as investigation fuel. He needs this.",
        narratorReact:"DinoBoy, who had not eaten since 6am, accepted this gratefully. He ate while explaining his findings. The findings were alarming and accurate. The food was also very good. Both things were true.",
        fx:{dinoboy:18,food:-8,reputation:10}, routes:['dinoboy'], selfish:false },
    ]
  },
  // ─── DAY 10 ───
  {
    id:9, day:10,
    narratorIntro: "Day ten. 3:00 PM. Post-lunch. The precise hour when the human body stages a quiet and total revolt against the vertical world. The couch has been waiting. The couch is patient.",
    text: "It is 3pm. You had a large lunch. The couch is right there. Physics is explaining, gently but very firmly, that you should be horizontal. The couch hasn't said anything. It doesn't need to. It never needs to.",
    choices: [
      { text:"Resist. You are stronger than furniture.",
        narratorReact:"She remained upright. She sent four emails. None of them were necessary. The couch watched her the entire time.",
        fx:{intelligence:6,reputation:4}, selfish:false },
      { text:"Just a twenty-minute nap. That is the absolute maximum. Twenty minutes.",
        narratorReact:"She woke up at 7pm. The light was wrong. Three people had texted. The couch had won. She did not feel bad about this. The narrator noted, without judgment, that she never does.",
        fx:{sleep:13,chaos:4}, routes:['sleep'], selfish:false },
      { text:"Full surrender. Complete and total capitulation to the couch. It wins today.",
        narratorReact:"She was horizontal in four seconds. She did not move for six hours. The couch received her like an old friend reunited after a long journey. She felt, finally, understood.",
        fx:{sleep:22,chaos:9}, routes:['sleep'], ach:'bed_ceo', selfish:false },
    ]
  },
  // ─── DAY 11 ───
  {
    id:10, day:11, catEncounter:true,
    narratorIntro: "Day eleven. The orange cat returned. It did not knock. It had not knocked last time either. It simply appeared in the centre of the room, as cats do, as if it had always been there and the room had finally chosen to reveal it.",
    text: "The cat is in the exact centre of your living room floor, licking its paw with the unhurried confidence of a property developer reviewing a recent acquisition. You did not let it in. The cat is not interested in this detail.",
    choices: [
      { text:"Pet the cat. Still the correct choice. Always the correct choice.",
        narratorReact:"She petted the cat for twelve minutes. The cat accepted this as its due. Then it brought her a small leaf. Left it on the floor. Walked away. The narrator had no further comment.",
        fx:{sleep:5,celebrity:5}, routes:['cat'], catPetted:true, selfish:false },
      { text:"Let the cat stay but maintain professional distance. You are colleagues now.",
        narratorReact:"They coexisted for several hours. The cat watched her. She was deeply aware of being watched. It was completely fine. It was very fine. The narrator repeated this several times in the notes.",
        fx:{cat:5,chaos:2}, catPetted:false, selfish:false },
      { text:"Draft a formal lease agreement. This cat has rights and also responsibilities.",
        narratorReact:"She wrote three pages. The cat sat on them for ninety seconds. She took this as legally binding. Rent: three biscuits per week. The cat paid the first week's rent immediately and with complete accuracy. This was not expected.",
        fx:{cat:22,chaos:11,celebrity:5}, routes:['cat'], catPetted:true, ach:'too_many_cats', selfish:false },
    ]
  },
  // ─── DAY 12 ───
  {
    id:11, day:12,
    narratorIntro: "Day twelve. A man in a very sharp suit arrived at Mochi's door with a brochure and an offer that was, technically, real. The brochure had a photo of a volcano on the cover. He did not seem to think this was unusual.",
    text: "The man hands you a brochure. It says VOLCANIC INVESTMENT OPPORTUNITIES at the top. He calls it 'geologically stable, legally unambiguous, and frankly a steal.' He knows your name. You did not give him your name. He does not address this.",
    choices: [
      { text:"No thank you. Volcanoes are not a recognised asset class.",
        narratorReact:"She declined. He left a business card anyway. The card had a volcano on it and a personal mobile number. She kept the card. She cannot explain why she kept the card.",
        fx:{intelligence:8,reputation:5}, selfish:false },
      { text:"Take the brochure. You'll think about it seriously.",
        narratorReact:"She read it twice. She circled seven things. One section referenced 'tax-adjacent positioning.' Another mentioned 'lava rights.' She found herself nodding at things she did not fully understand.",
        fx:{villain:9,chaos:6,wealth:5}, routes:['villain'], selfish:false },
      { text:"Buy the volcano. Right now. You have been waiting for this your entire life.",
        narratorReact:"The transaction took eleven minutes. She owned a volcano. The man shook both her hands with both of his. The volcano came with a name she did not choose. This, somehow, made it worse. The narrator took a short walk.",
        fx:{villain:22,chaos:18,wealth:-22}, routes:['villain'], ach:'suspiciously_power', selfish:false },
    ]
  },
  // ─── DAY 13 ───
  {
    id:12, day:13,
    narratorIntro: "Day thirteen. A documentary crew arrived. They said they had been following the situation. They did not specify which situation. Given the past twelve days, this narrowed things down very little.",
    text: "A production company wants to film a documentary about your life. Working title: 'The Mochi Situation.' The raccoons have already signed their release forms. The orange cat, somehow, has a credited producer role. The cat does not acknowledge this.",
    choices: [
      { text:"Decline. Some stories are better lived than documented.",
        narratorReact:"The crew drove away. The director looked back once. The documentary was never made. The narrator knows, with absolute certainty, that it would have been extraordinary.",
        fx:{intelligence:5,reputation:8}, selfish:false },
      { text:"Agree. This was always going to happen. Commit fully.",
        narratorReact:"Filming started immediately. The director cried twice on day one. Once from stress, once from something he could not name. The cat refused all second takes. The raccoons were natural on camera.",
        fx:{celebrity:18,chaos:10,reputation:5}, routes:['celebrity'], selfish:false },
      { text:"Counter-pitch: a weekly reality show where you become progressively more powerful.",
        narratorReact:"They agreed before she finished the sentence. The network called within the hour. DinoBoy sent seventeen texts asking if he was in it. He was. The narrator updated its contracts.",
        fx:{celebrity:16,villain:10,chaos:14}, routes:['celebrity'], ach:'accid_famous', selfish:true },
    ]
  },
  // ─── DAY 14 ───
  {
    id:13, day:14,
    narratorIntro: "Day fourteen. A formal letter arrived. The postage stamp depicted a raccoon in ceremonial dress. This is not a stamp the narrator recognises from any official postal service. It was nonetheless very clearly and professionally stamped.",
    text: "The letter has a crest. The crest has Latin on it. The Latin translates, roughly, to 'trash finds a way.' The letterhead features a raccoon in a judge's wig. It appears to be a summons from the raccoon judicial system. This system, apparently, exists.",
    choices: [
      { text:"Read it carefully and respond through proper, responsible channels.",
        narratorReact:"She wrote a thorough response citing relevant provisions. The raccoon judiciary sent back a postcard. The postcard was a photo of a trash pile at golden hour. The narrator chose to interpret this as a positive resolution.",
        fx:{intelligence:6,reputation:6}, selfish:false },
      { text:"Ignore it. It will sort itself out. Things usually sort themselves.",
        narratorReact:"A second letter arrived the next day. Then a third. On day four, a raccoon knocked and waited quietly outside for forty minutes until she acknowledged the correspondence. The patience was more alarming than anything in the letter.",
        fx:{chaos:12,raccoonness:5}, routes:['raccoon'], selfish:false },
      { text:"Write back claiming you are also a raccoon and therefore completely outside their jurisdiction.",
        narratorReact:"Three days of silence. Then a letter: her claim was 'under review.' Wanted in twelve countries by the end of the week. The raccoon legal system, when motivated, moves with remarkable speed and precision.",
        fx:{raccoonness:20,chaos:18,celebrity:5}, routes:['raccoon'], ach:'wanted_12', selfish:false },
    ]
  },
  // ─── DAY 15 ───
  {
    id:14, day:15, parkSetup:true,
    narratorIntro: "Day fifteen. Evening. The city doing its usual thing. Mochi stood at the edge of fourteen days of decisions and considered the next one.",
    text: "It is evening. The sky is that colour that happens when the day can't decide if it's staying. You have options. Most of them reflect exactly who you have been becoming over the past two weeks. The night is soft.",
    choices: [
      { text:"Go for a walk. End up at the park. Sit on a bench. Just be.",
        narratorReact:"She walked to the park. She sat on the bench by the fountain. The city made its sounds. She was very still for a long time.",
        fx:{reputation:5,sleep:3}, goesToPark:true, selfish:false },
      { text:"Order an unreasonable amount of food and surrender fully to the couch.",
        narratorReact:"The order arrived in four bags. The couch received her warmly. She watched something she had already seen three times. She was, in a very genuine and complete way, content.",
        fx:{food:9,sleep:12}, routes:['food','sleep'], selfish:false },
      { text:"Call the raccoons. Find out what they're planning. Get extremely involved.",
        narratorReact:"They answered immediately. They had been waiting for this call. They had scheduled a time for it. The agenda was seven pages long. Day fifteen became something else entirely.",
        fx:{raccoonness:14,chaos:12}, routes:['raccoon'], selfish:false },
    ]
  },
  // ─── DAY 16 ───
  {
    id:15, day:16,
    narratorIntro: "Day sixteen. Something was building. The cat had been in the window since dawn. DinoBoy sent a twenty-two-second voice note that was entirely ambient raccoon sounds, followed by: 'I'm not panicking but I want you to know I'm monitoring this.'",
    text: "Something is converging. The pieces of the last fifteen days are moving toward a conclusion. The cat knows. DinoBoy knows. Somewhere in this city, the raccoons are holding a meeting and your name is definitely on the agenda.",
    choices: [
      { text:"Prepare carefully. Review everything. Make a list.",
        narratorReact:"She made a list. It was long. Some entries were hard to justify. She folded it and put it in her pocket. She felt, unexpectedly and completely, ready.",
        fx:{intelligence:8,reputation:6}, selfish:false },
      { text:"Lean into it. You're already in this. Might as well go all the way.",
        narratorReact:"She opened her arms to the oncoming chaos. The chaos nodded back. They had, at this point, a deep and mutual understanding.",
        fx:{chaos:18}, selfish:false },
      { text:"Take a nap. If anything truly important happens, it'll still be there when you wake up.",
        narratorReact:"She slept extraordinarily well. The world continued without her input, which it was fully capable of doing. She woke up refreshed. Everything was somehow worse and more exciting simultaneously. She was ready.",
        fx:{sleep:16,chaos:6}, routes:['sleep'], ach:'legendary_hiber', selfish:false },
    ]
  },
  // ─── DAY 17 ───
  {
    id:16, day:17,
    narratorIntro: "Day seventeen. Money appeared in Mochi's bank account. A precise and unexplained amount. The transaction reference read: 'RACCOON BUSINESS — REF 7.' The 7 implied six prior transactions. There had been none. This was, somehow, more alarming.",
    text: "Seventeen thousand units of currency are in your account. Sender: 'The Collective.' Reference: 'RACCOON BUSINESS — REF 7.' You have no further context. The raccoon collective has, apparently, been running a functioning economy this whole time.",
    choices: [
      { text:"Report it to your bank. This is suspicious and you are a responsible person.",
        narratorReact:"The bank was confused. Three departments were consulted. Nobody reached a conclusion. The money did not move. It sat in the account with the quiet confidence of something that has every right to be there.",
        fx:{reputation:8,intelligence:6}, selfish:false },
      { text:"Spend all of it on something magnificent and completely impractical.",
        narratorReact:"She bought a vintage motorcycle, two small sculptures, and what turned out to be a working lighthouse on a cliff. She has not yet visited the cliff. She is deeply aware of its existence.",
        fx:{chaos:16,wealth:10,celebrity:5}, selfish:false },
      { text:"Reinvest it back into the raccoon economy. You are fully committed at this point.",
        narratorReact:"She transferred it with the note: 'for the operation.' The raccoons sent a receipt. The receipt had a tiny gold star sticker in the corner. She kept the receipt. It is in a drawer. She has looked at it several times.",
        fx:{raccoonness:12,wealth:8,chaos:8}, routes:['raccoon'], ach:'tax_evasion', selfish:false },
    ]
  },
  // ─── DAY 18 ───
  {
    id:17, day:18,
    narratorIntro: "Day eighteen. Everything that Mochi had set in motion over seventeen days arrived simultaneously at the front door. The narrator had prepared contingency plans. Not one of them had accounted for this specific arrangement.",
    text: "You open your front door and find: DinoBoy (with snacks and a very serious expression), the documentary crew (filming already), three raccoons in matching scarves (holding a briefcase), the orange cat (somehow on the roof, surveying everything), and one pigeon wearing a small lanyard. DinoBoy looks at you. 'So,' he says. 'How are we handling this?'",
    choices: [
      { text:"Step outside and address everyone calmly. You have a plan. Sort of.",
        narratorReact:"She gave a four-sentence speech from the doorstep. Everyone listened. The raccoons listened. The cat paused its surveying. DinoBoy filmed it. He was very quietly, very privately proud. The narrator noticed.",
        fx:{intelligence:8,reputation:12,dinoboy:8}, selfish:false },
      { text:"Let everyone in. DinoBoy, put the kettle on. This is happening inside now.",
        narratorReact:"Fourteen entities entered the apartment. DinoBoy made tea. One raccoon located the biscuits without being told where they were. The documentary director cried softly while filming. The cat claimed the most expensive surface available. Everything, somehow, felt exactly right.",
        fx:{chaos:14,celebrity:8,dinoboy:12,raccoonness:6}, routes:['dinoboy','celebrity'], selfish:false },
      { text:"Go back inside for exactly one minute. Eat one biscuit. Then face all of this.",
        narratorReact:"She had one biscuit. Slow. Complete. She wiped her hands. She opened the door again. Everyone was still there, patient. She was ready. The biscuit had been important.",
        fx:{food:8,sleep:5,chaos:5}, selfish:false },
    ]
  },
  // ─── DAY 19 ───
  {
    id:18, day:19,
    narratorIntro: "Day nineteen. The second to last day. The narrator has updated its notes fourteen times today. One more choice remains before everything concludes.",
    text: "Day nineteen. Everything has converged. The raccoons are organised. The cat has filed paperwork. DinoBoy is beside you, quiet and certain, in the way he always is when things get genuinely real. The world is about to see what kind of person you've become. Whatever that is, it's been building since Day 1.",
    choices: [
      { text:"Take DinoBoy's hand. Whatever comes next, you're facing it together.",
        narratorReact:"She took his hand. He squeezed it once. They didn't say anything. There was nothing to say. The narrator, entirely unexpectedly, needed a moment.",
        fx:{reputation:10,dinoboy:15,intelligence:5}, routes:['dinoboy'], selfish:false },
      { text:"Pick up the orange cat and carry it into whatever comes next.",
        narratorReact:"She picked up the cat. The cat did not protest. For once, the cat simply stayed. They stood there — Mochi, DinoBoy, the cat — at the edge of the last day. The raccoons made a small, dignified sound of collective solidarity.",
        fx:{cat:15,dinoboy:10,chaos:5}, routes:['cat'], catPetted:true, selfish:false },
      { text:"Check your chaos level. Proceed as exactly yourself.",
        narratorReact:"She looked at everything she'd built and broken and accidentally become. She smiled in a specific way that the documentary director immediately zoomed in on. 'That's the shot,' he whispered. It was.",
        fx:{chaos:10,celebrity:10,raccoonness:8}, routes:['celebrity'], selfish:false },
    ]
  },
  // ─── DAY 20 — FINALE ───
  {
    id:19, day:20, isFinale:true,
    text:"", choices:[]
  },
];

// ── Stat descriptions ─────────────────────────────────────────────
function describeStat(key, val) {
  const T = {
    chaos:       [[0,'Suspiciously Normal'],[14,'Slightly Off'],[28,'Concerning'],[42,'Chaotic Neutral'],[58,'Alarming'],[74,'Pure Entropy'],[90,'Forces Of Nature Are Worried']],
    sleep:       [[0,'Critically Awake'],[13,'Running On Vibes'],[28,'Functioning Barely'],[42,'Adequately Rested'],[58,'Professionally Horizontal'],[74,'Legally A Mattress'],[90,'Achieved Enlightenment Via Couch']],
    raccoonness: [[0,'Fully Human'],[9,'Raccoon Adjacent'],[20,'Raccoon Curious'],[36,'Raccoon Sympathizer'],[52,'Raccoon In A Trench Coat'],[70,'Practically A Raccoon'],[86,'Supreme Raccoon']],
    intelligence:[[0,'Blissfully Unaware'],[15,'Has Opinions'],[30,'Makes Reasonable Points'],[50,'Concerningly Informed'],[70,'Dangerously Competent']],
    wealth:      [[0,'Financially Creative'],[10,'Technically Solvent'],[20,'Doing Fine'],[40,'Comfortable'],[65,'Suspiciously Wealthy']],
    reputation:  [[0,'Locally Avoided'],[10,'Known'],[25,'Respected'],[45,'Well Regarded'],[65,'Somewhat Legendary']],
  };
  const table = T[key]; if (!table) return String(val);
  let d = table[0][1];
  for (const [thr, label] of table) { if (val >= thr) d = label; }
  return d;
}

// ── Game state ────────────────────────────────────────────────────
let G = {};
let _prevScreen = 'screen-title';

function resetState() {
  G = {
    day: 1, sIdx: 0,
    stats: { chaos:0, intelligence:10, wealth:20, reputation:10, sleep:30,
             raccoonness:0, food:0, cat:0, villain:0, celebrity:0, dinoboy:0 },
    routes: { sleep:0, raccoon:0, food:0, villain:0, cat:0, celebrity:0, dinoboy:0 },
    egg: { raccoonRefused:false, catsEncountered:0, catsPetted:0,
           neverSelfish:true, visitedPark:false, waited30s:false,
           clickedMoon:false, clickedStar:false },
    earnedAchs: new Set(),
    parkTimerActive: false, parkTimerVal: 0, parkTimerID: null,
  };
}

// ── Screen management ─────────────────────────────────────────────
function showScreen(id) {
  const prev = document.querySelector('.screen.active');
  if (prev && prev.id !== id) _prevScreen = prev.id;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}
function goBack() { showScreen(_prevScreen || 'screen-title'); }

// ── Stars background ──────────────────────────────────────────────
function initStars() {
  const cvs = document.getElementById('stars-canvas'); if (!cvs) return;
  const ctx = cvs.getContext('2d');
  let stars = [];
  const resize = () => {
    cvs.width = innerWidth; cvs.height = innerHeight;
    stars = Array.from({length:150}, () => ({
      x:Math.random()*cvs.width, y:Math.random()*cvs.height,
      r:Math.random()*1.5+0.3, a:Math.random()*0.5+0.1,
      spd:Math.random()*0.2+0.05, ph:Math.random()*Math.PI*2,
    }));
  };
  const draw = t => {
    ctx.clearRect(0,0,cvs.width,cvs.height);
    stars.forEach(s => {
      const a = s.a*(0.5+0.5*Math.sin(t*s.spd+s.ph));
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,190,255,${a})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  resize(); addEventListener('resize', resize); requestAnimationFrame(draw);
}

// ── Typewriter ────────────────────────────────────────────────────
function typewrite(el, text, speed, cb) {
  el.textContent = '';
  const cursor = Object.assign(document.createElement('span'),{className:'cursor'});
  el.appendChild(cursor);
  let i = 0;
  const iv = setInterval(() => {
    if (i < text.length) { el.insertBefore(document.createTextNode(text[i++]), cursor); }
    else { clearInterval(iv); cursor.remove(); cb && cb(); }
  }, speed||26);
  return iv;
}

// ── Narrator ──────────────────────────────────────────────────────
let _nTyper = null;
function setNarrator(text, speed) {
  const el = document.getElementById('narrator-line'); if (!el) return;
  if (_nTyper) clearInterval(_nTyper);
  _nTyper = typewrite(el, text, speed||22);
}

function showNarratorReaction(text, cb) {
  const el = document.getElementById('narrator-line'); if (!el) { cb && cb(); return; }
  if (_nTyper) clearInterval(_nTyper);
  el.style.transition = 'opacity 0.18s';
  el.style.opacity = '0';
  setTimeout(() => {
    el.textContent = text;
    el.style.opacity = '1';
    setTimeout(cb, 1800);
  }, 200);
}

// ── Achievement queue ─────────────────────────────────────────────
let _achQueue = [], _achBusy = false;
function unlockAch(id) {
  if (!ACHIEVEMENTS[id] || G.earnedAchs.has(id)) return;
  G.earnedAchs.add(id);
  persistAch(id);
  _achQueue.push(id);
  if (!_achBusy) _nextAch();
}
function _nextAch() {
  if (!_achQueue.length) { _achBusy=false; return; }
  _achBusy=true;
  const id=_achQueue.shift(), a=ACHIEVEMENTS[id]; if (!a){_nextAch();return;}
  const toast=document.getElementById('ach-toast');
  document.getElementById('ach-name-text').textContent=a.name;
  toast.classList.remove('hidden');
  requestAnimationFrame(() => {
    toast.classList.add('show');
    setTimeout(()=>{
      toast.classList.remove('show');
      setTimeout(()=>{ toast.classList.add('hidden'); setTimeout(_nextAch,200); },420);
    },2800);
  });
}

// ── Stat pills ────────────────────────────────────────────────────
function updatePills() {
  const pc=document.getElementById('pill-chaos');
  const ps=document.getElementById('pill-sleep');
  const pr=document.getElementById('pill-raccoon');
  const pd=document.getElementById('pill-day');
  if (pc) pc.textContent=`Chaos: ${describeStat('chaos',       G.stats.chaos)}`;
  if (ps) ps.textContent=`Sleep: ${describeStat('sleep',       G.stats.sleep)}`;
  if (pr) pr.textContent=`🦝 ${describeStat('raccoonness', G.stats.raccoonness)}`;
  if (pd) pd.textContent=`Day ${G.day} / 20`;
}

// ── Apply fx ──────────────────────────────────────────────────────
function applyFx(fx) {
  Object.entries(fx).forEach(([k,v]) => {
    if (k in G.stats) G.stats[k]=Math.max(0,Math.min(100,G.stats[k]+v));
  });
}

// ── Render scenario ───────────────────────────────────────────────
function renderScenario(idx) {
  const sc = SCENARIOS[idx];
  if (!sc) { triggerEnding(); return; }
  if (sc.isFinale) { renderFinale(); return; }

  G.day = sc.day;
  updatePills();
  setNarrator(sc.narratorIntro);

  const stEl = document.getElementById('scenario-text');
  stEl.style.opacity='0'; stEl.style.transform='translateY(8px)';
  setTimeout(() => {
    stEl.textContent = sc.text;
    stEl.style.transition='all .4s ease';
    stEl.style.opacity='1'; stEl.style.transform='translateY(0)';
  }, 350);

  const wrap = document.getElementById('choices-wrap');
  wrap.innerHTML=''; wrap.style.opacity='0';

  setTimeout(() => {
    sc.choices.forEach((ch,i) => {
      const btn = document.createElement('button');
      btn.className='choice-btn';
      btn.style.animationDelay=`${i*0.1}s`;
      btn.textContent=ch.text;
      btn.addEventListener('click', () => {
        wrap.querySelectorAll('.choice-btn').forEach(b=>b.disabled=true);
        handleChoice(idx, i);
      });
      wrap.appendChild(btn);
    });
    wrap.style.transition='opacity .3s';
    wrap.style.opacity='1';
  }, 700);
}

// ── Handle choice ─────────────────────────────────────────────────
function handleChoice(scIdx, chIdx) {
  const sc = SCENARIOS[scIdx];
  const ch = sc.choices[chIdx];

  applyFx(ch.fx||{});
  if (ch.routes) ch.routes.forEach(r=>{ if (r in G.routes) G.routes[r]++; });
  if (ch.selfish) G.egg.neverSelfish=false;
  if (sc.raccoonRecruitment) G.egg.raccoonRefused=!!ch.raccoonRefused;
  if (sc.catEncounter) {
    G.egg.catsEncountered++;
    if (ch.catPetted) G.egg.catsPetted++;
  }
  if (ch.goesToPark) G.egg.visitedPark=true;
  if (ch.ach) unlockAch(ch.ach);

  G.sIdx++;
  G.day++;

  showNarratorReaction(ch.narratorReact, () => {
    if (ch.goesToPark) {
      unlockAch('touch_grass');
      showParkScene();
      return;
    }
    if (G.sIdx >= SCENARIOS.length) { triggerEnding(); return; }
    updatePills();
    renderScenario(G.sIdx);
  });
}

// ── Ending determination ──────────────────────────────────────────
function getDominantRoute() {
  let best='none', bestVal=0;
  Object.entries(G.routes).forEach(([r,v])=>{ if (v>bestVal){bestVal=v;best=r;} });
  return (bestVal >= 2) ? best : 'none';
}

function triggerEnding() {
  const rk = getDominantRoute();
  if (!rk || rk==='none') { showEnding(ALL_ENDINGS[0]); return; }
  const level = G.routes[rk]<=2?1 : G.routes[rk]<=4?2 : G.routes[rk]<=6?3:4;
  const pool = ALL_ENDINGS.filter(e=>e.route===rk);
  const ending = pool.find(e=>e.level===level)||pool[pool.length-1]||ALL_ENDINGS[0];
  showEnding(ending);
}

function showEnding(e) {
  saveEnding(e.id);
  updateTitleCount();

  document.getElementById('end-trophy').textContent=e.emoji||'🏆';
  document.getElementById('end-title').textContent=e.title;
  document.getElementById('end-desc').textContent=e.desc;

  const row=document.getElementById('end-stat-row');
  row.innerHTML='';
  [['Chaos',G.stats.chaos],['Intelligence',G.stats.intelligence],
   ['Raccoonness',G.stats.raccoonness],['Sleep',G.stats.sleep]]
    .filter(([,v])=>v>10)
    .forEach(([k,v])=>{
      const b=document.createElement('span');
      b.className='end-badge';
      b.textContent=`${k}: ${describeStat(k.toLowerCase(),v)||v}`;
      row.appendChild(b);
    });
  showScreen('screen-ending');
}

// ── Finale sequence ───────────────────────────────────────────────
function renderFinale() {
  showScreen('screen-finale');
  const route = getDominantRoute();
  const lines = FINALE_LINES[route] || FINALE_LINES.default;
  const container = document.getElementById('finale-text');
  container.innerHTML='';

  let delay=600;
  lines.forEach((line,i)=>{
    setTimeout(()=>{
      const p=document.createElement('p');
      p.className='finale-line finale-'+( line.s||'normal');
      p.textContent=line.t;
      container.appendChild(p);
      requestAnimationFrame(()=>setTimeout(()=>p.classList.add('visible'),40));
      container.scrollTop=container.scrollHeight;
    }, delay);
    delay += line.t ? 1300 : 500;
  });
  setTimeout(()=>{
    const btn=document.getElementById('finale-btn');
    btn.style.opacity='1'; btn.style.pointerEvents='auto';
  }, delay+400);
}

// ── Park scene ────────────────────────────────────────────────────
function eggConditionsMet() {
  return G.egg.raccoonRefused
      && (G.egg.catsEncountered===0 || G.egg.catsPetted===G.egg.catsEncountered)
      && G.egg.neverSelfish
      && G.egg.visitedPark;
}

let _parkEgg=false, _moonClicked=false, _starClicked=false;

function showParkScene() {
  _parkEgg=eggConditionsMet(); _moonClicked=false; _starClicked=false;
  const sky=document.getElementById('night-sky');
  const moonEl=document.getElementById('moon-el');
  const nLine=document.getElementById('park-narrator-line');
  const dLine=document.getElementById('park-desc-line');
  const tLine=document.getElementById('park-timer-line');
  const leaveBtn=document.getElementById('park-leave-btn');

  sky.querySelectorAll('.park-star').forEach(s=>s.remove());
  moonEl.textContent='🌙'; moonEl.classList.remove('clickable'); moonEl.onclick=null;
  nLine.textContent=''; dLine.textContent=''; tLine.textContent='';
  leaveBtn.style.display='none';
  showScreen('screen-park');

  setTimeout(()=>{
    typewrite(nLine,"You sit on the bench.",40,()=>{
      setTimeout(()=>{
        typewrite(dLine,"The night is quiet. The city feels very far away.",35,()=>{
          G.parkTimerVal=0;
          G.parkTimerID=setInterval(()=>{
            G.parkTimerVal++;
            if (G.parkTimerVal<10)      tLine.textContent="...";
            else if (G.parkTimerVal<20) tLine.textContent="You stay a little longer.";
            else if (G.parkTimerVal<30) tLine.textContent="Something feels different tonight.";
            else {
              clearInterval(G.parkTimerID);
              G.egg.waited30s=true;
              tLine.textContent="";
              if (_parkEgg) {
                moonEl.classList.add('clickable');
                moonEl.onclick=onMoonClick;
                typewrite(dLine,"The moon looks strange tonight. Different. Like it's waiting.",35);
              } else {
                leaveBtn.style.display='';
                typewrite(dLine,"It is a nice evening. Eventually you decide to head home.",35);
              }
            }
          },1000);
        });
      },600);
    });
  },500);
}

function onMoonClick() {
  if (_moonClicked) return; _moonClicked=true; G.egg.clickedMoon=true;
  const moonEl=document.getElementById('moon-el');
  moonEl.classList.remove('clickable'); moonEl.onclick=null;
  moonEl.textContent='🌕';
  typewrite(document.getElementById('park-desc-line'),
    "The sky shudders. A streak of light catches the very edge of your vision.",35,spawnShootingStar);
}

function spawnShootingStar() {
  const sky=document.getElementById('night-sky');
  const star=document.createElement('span');
  star.className='park-star'; star.textContent='⭐';
  star.style.top=`${20+Math.random()*60}px`;
  star.style.right=`${20+Math.random()*100}px`;
  sky.appendChild(star);
  requestAnimationFrame(()=>{ star.classList.add('visible'); star.onclick=onStarClick; });
}

function onStarClick() {
  if (_starClicked) return; _starClicked=true; G.egg.clickedStar=true;
  setTimeout(()=>triggerEasterEgg(),400);
}

function leavePark() {
  if (G.parkTimerID) clearInterval(G.parkTimerID);
  if (G.sIdx>=SCENARIOS.length) { showScreen('screen-game'); triggerEnding(); return; }
  showScreen('screen-game');
  renderScenario(G.sIdx);
}

// ── Easter egg / secret route ─────────────────────────────────────
function triggerEasterEgg() {
  document.body.classList.add('glitch');
  setTimeout(()=>document.body.classList.remove('glitch'),800);
  showScreen('screen-secret');
  const body=document.getElementById('terminal-body');
  body.innerHTML='';

  const lines=[
    {text:"[ SYSTEM GLITCH DETECTED ]",     delay:200,  cls:'t-gold'},
    {text:"Rerouting...",                    delay:900,  cls:''},
    {text:"",                               delay:1400, cls:''},
    {text:"narrator@mochi-sim:~$ ls -la private/",delay:1700,cls:'t-prompt'},
    {text:"",                               delay:2100, cls:''},
    {text:"notes_01.txt",                   delay:2300, cls:'t-file', fileId:'notes_01'},
    {text:"notes_02.txt",                   delay:2500, cls:'t-file', fileId:'notes_02'},
    {text:"classified.txt",                 delay:2800, cls:'t-file', fileId:'classified'},
    {text:"final_note.txt",                 delay:3100, cls:'t-file t-gold', fileId:'final'},
    {text:"",                               delay:3400, cls:''},
    {text:"narrator@mochi-sim:~$ _",        delay:3600, cls:'t-prompt'},
  ];

  const fileContents={
    notes_01:["OBSERVATION LOG — Day 1","Subject threw the alarm clock out the window.","This was day one.","I revised my projection models.","I revised them again on Day 3."],
    notes_02:["OBSERVATION LOG — Day 7","Subject was invited to join the raccoon collective.","Subject declined.","This was not statistically expected.","Note to self: she is different from the others."],
    classified:["CLASSIFIED // NARRATOR EYES ONLY","","Out of 10,000 simulated playthroughs,","this is the only one where the subject","was kind to every cat they encountered.","","And refused the raccoons.","","And never once chose the selfish option.","","The system flagged it as a statistical anomaly.","","I flagged it as something else."],
    final:null,
  };

  lines.forEach(({text,delay,cls,fileId})=>{
    setTimeout(()=>{
      const p=document.createElement('p');
      p.className='t-line '+(cls||'');
      p.textContent=text;
      if (fileId){
        p.style.cursor='pointer';
        p.addEventListener('click',()=>{
          if (fileId==='final') showFinalNote(body);
          else showFileContent(body,fileId,fileContents[fileId]);
        });
      }
      body.appendChild(p);
      requestAnimationFrame(()=>p.classList.add('v'));
      body.scrollTop=body.scrollHeight;
    },delay);
  });
}

function showFileContent(body,id,lines){
  body.querySelector('.t-file-preview')?.remove();
  const wrap=document.createElement('div');
  wrap.className='t-line t-content t-file-preview v';
  lines.forEach(line=>{
    const p=document.createElement('p'); p.textContent=line||''; wrap.appendChild(p);
  });
  body.appendChild(wrap); body.scrollTop=body.scrollHeight;
}

function showFinalNote(body){
  body.querySelector('.t-file-preview')?.remove();
  body.querySelector('.t-final-note')?.remove();

  const finalLines=[
    {text:"final_note.txt",cls:'t-file t-gold'},
    {text:"─────────────────────────────────────────",cls:''},
    {text:"",cls:''},
    {text:"This simulator was supposed to generate thousands of lives.",cls:'t-sweet'},
    {text:"",cls:''},
    {text:"But there was only one person I wanted to watch play it.",cls:'t-sweet'},
    {text:"",cls:''},
    {text:"Thanks for making all the ridiculous choices.",cls:'t-sweet'},
    {text:"Even the raccoon ones.",cls:'t-sweet'},
    {text:"",cls:''},
    {text:"Especially the raccoon ones.",cls:'t-sweet'},
    {text:"",cls:''},
    {text:"─────────────────────────────────────────",cls:''},
  ];

  const wrap=document.createElement('div');
  wrap.className='t-file-preview t-final-note';
  finalLines.forEach(({text,cls})=>{
    const p=document.createElement('p'); p.className='t-line v '+(cls||''); p.textContent=text; wrap.appendChild(p);
  });

  const bonus=document.createElement('div');
  bonus.className='t-line v t-unlocked';
  bonus.innerHTML=`
    <p class="t-gold" style="font-weight:700;margin-bottom:8px">★ BONUS CONTENT UNLOCKED ★</p>
    <p>You found the ending that wasn't supposed to exist.</p>
    <p style="margin-top:6px;color:var(--muted);font-size:12px">One in ten thousand. Not bad for someone who naps this much.</p>`;
  wrap.appendChild(bonus);

  const btnsRow=document.createElement('div');
  btnsRow.className='t-line v t-end-btns';
  btnsRow.innerHTML=`
    <button class="btn-primary" onclick="startGame()">Play Again</button>
    <button class="btn-ghost" onclick="openCollection()">View Collection</button>`;
  wrap.appendChild(btnsRow);

  body.appendChild(wrap); body.scrollTop=body.scrollHeight;
  saveEnding('secret_route'); updateTitleCount();
}

// ── Collection screen ─────────────────────────────────────────────
let _activeTab = 'endings';

function openCollection() {
  updateTitleCount();
  renderEndingsGrid();
  renderAchievementsPanel();
  switchTab(_activeTab);
  showScreen('screen-collection');
}

function switchTab(tab) {
  _activeTab = tab;
  document.getElementById('tab-endings').classList.toggle('coll-tab-active', tab==='endings');
  document.getElementById('tab-achs').classList.toggle('coll-tab-active', tab==='achs');
  document.getElementById('coll-panel-endings').style.display = tab==='endings' ? '' : 'none';
  document.getElementById('coll-panel-achs').style.display    = tab==='achs'    ? '' : 'none';
}

function renderEndingsGrid() {
  const found=getSaved();
  document.getElementById('found-count').textContent=found.size;
  const grid=document.getElementById('endings-grid');
  grid.innerHTML='';
  ALL_ENDINGS.forEach(e=>{
    const card=document.createElement('div');
    const unlocked=found.has(e.id);
    card.className='end-card'+(unlocked?' unlocked':'');
    if (unlocked) {
      card.innerHTML=`<div class="end-card-icon">${e.emoji}</div><div class="end-card-name">${e.title}</div>`;
    } else {
      card.innerHTML=`<div class="end-card-lock">???</div>`;
    }
    grid.appendChild(card);
  });
}

function renderAchievementsPanel() {
  const found = getSavedAchs();
  document.getElementById('coll-ach-count').textContent = found.size;
  const list = document.getElementById('achs-list');
  list.innerHTML = '';
  Object.entries(ACHIEVEMENTS).forEach(([id, ach]) => {
    const unlocked = found.has(id);
    const row = document.createElement('div');
    row.className = 'ach-row' + (unlocked ? ' unlocked' : '');
    row.innerHTML = `
      <span class="ach-row-icon">${unlocked ? '🏆' : '🔒'}</span>
      <div class="ach-row-text">
        <p class="ach-row-name">${unlocked ? ach.name : '???'}</p>
        <p class="ach-row-hint">${unlocked ? ach.hint : 'Not yet unlocked'}</p>
      </div>`;
    list.appendChild(row);
  });
}

function updateTitleCount() {
  const n=getSaved().size, a=getSavedAchs().size;
  const el=document.getElementById('title-end-count'); if(el) el.textContent=n;
  const fc=document.getElementById('found-count');     if(fc) fc.textContent=n;
  const fa=document.getElementById('coll-ach-count');  if(fa) fa.textContent=a;
}

// ── Start game ────────────────────────────────────────────────────
function startGame() {
  resetState();
  updatePills();
  showScreen('screen-game');
  renderScenario(0);
}

// ── Init ──────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initStars();
  updateTitleCount();
});
