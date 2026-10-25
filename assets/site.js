
const menuBtn=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');
if(menuBtn&&nav){menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.textContent=open?'×':'☰';});}
const STORAGE_KEY='playhub-saved-games';
function getSaved(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')}catch(e){return []}}
function setSaved(items){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(items))}catch(e){}}
function updateSavedUI(){const saved=getSaved();const count=document.querySelector('#saved-count');if(count)count.textContent=saved.length;document.querySelectorAll('[data-save]').forEach(btn=>{const on=saved.includes(btn.dataset.save);btn.setAttribute('aria-pressed',String(on));btn.textContent=on?'♥ Saved':'♡ Save';});}
document.querySelectorAll('[data-save]').forEach(btn=>btn.addEventListener('click',()=>{let saved=getSaved();if(saved.includes(btn.dataset.save))saved=saved.filter(x=>x!==btn.dataset.save);else saved.push(btn.dataset.save);setSaved(saved);updateSavedUI();}));
updateSavedUI();
const search=document.querySelector('#game-search'),genre=document.querySelector('#genre-filter'),platform=document.querySelector('#platform-filter'),clear=document.querySelector('#clear-filters');
function filterGames(){const q=(search?.value||'').toLowerCase().trim(),g=genre?.value||'all',p=platform?.value||'all';let n=0;document.querySelectorAll('#content-grid .content-card').forEach(card=>{const matchQ=card.dataset.title.includes(q)||card.textContent.toLowerCase().includes(q);const matchG=g==='all'||card.dataset.genre===g;const matchP=p==='all'||card.dataset.platform===p;const show=matchQ&&matchG&&matchP;card.hidden=!show;if(show)n++;});const count=document.querySelector('#result-count');if(count)count.textContent=`${n} ${n===1?'game':'games'}`;const empty=document.querySelector('#empty-state');if(empty)empty.hidden=n>0;}
[search,genre,platform].forEach(el=>el&&el.addEventListener(el===search?'input':'change',filterGames));
if(clear)clear.addEventListener('click',()=>{search.value='';genre.value='all';platform.value='all';filterGames();});
const newsletter=document.querySelector('#newsletter-form');if(newsletter)newsletter.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#newsletter-note').textContent='Thanks! This demo sign-up is not connected to a mailing service.';newsletter.reset();});
