const storeKey='kashly_final_data';
const state=JSON.parse(localStorage.getItem(storeKey)||'{"transactions":[],"budgets":[],"goals":[],"subscriptions":[]}');
let dashboardPie, statsPie, barChart;
const fmt=v=>Number(v||0).toLocaleString('pl-PL',{minimumFractionDigits:2,maximumFractionDigits:2})+' zł';
const save=()=>localStorage.setItem(storeKey,JSON.stringify(state));
const today=()=>new Date().toISOString().slice(0,10);
['tDate','sDate'].forEach(id=>setTimeout(()=>{const el=document.getElementById(id); if(el) el.value=today()},0));
document.getElementById('currentMonth').textContent=new Date().toLocaleDateString('pl-PL',{month:'long',year:'numeric'});
document.getElementById('loginForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('loginScreen').classList.add('hidden');document.getElementById('app').classList.remove('hidden');render();});
document.getElementById('logoutBtn').onclick=()=>{document.getElementById('app').classList.add('hidden');document.getElementById('loginScreen').classList.remove('hidden')};
document.querySelectorAll('.nav-btn').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.page').forEach(p=>p.classList.remove('active-page'));document.getElementById(btn.dataset.section).classList.add('active-page');document.getElementById('sectionTitle').textContent=btn.textContent;renderCharts();});
function addItem(formId,cb){document.getElementById(formId).addEventListener('submit',e=>{e.preventDefault();cb();e.target.reset();['tDate','sDate'].forEach(id=>{const el=document.getElementById(id); if(el) el.value=today()});save();render();});}
addItem('transactionForm',()=>state.transactions.unshift({id:Date.now(),name:tName.value,type:tType.value,category:tCategory.value,amount:+tAmount.value,date:tDate.value}));
addItem('budgetForm',()=>state.budgets.unshift({id:Date.now(),category:bCategory.value,limit:+bLimit.value}));
addItem('goalForm',()=>state.goals.unshift({id:Date.now(),name:gName.value,target:+gTarget.value,saved:+gSaved.value}));
addItem('subscriptionForm',()=>state.subscriptions.unshift({id:Date.now(),name:sName.value,amount:+sAmount.value,date:sDate.value}));
document.getElementById('clearData').onclick=()=>{if(confirm('Wyczyścić wszystkie dane?')){state.transactions=[];state.budgets=[];state.goals=[];state.subscriptions=[];save();render();}};
function remove(type,id){state[type]=state[type].filter(x=>x.id!==id);save();render();}
window.remove=remove;
function totals(){const inc=state.transactions.filter(t=>t.type==='income').reduce((a,b)=>a+b.amount,0);const exp=state.transactions.filter(t=>t.type==='expense').reduce((a,b)=>a+b.amount,0);return{inc,exp,bal:inc-exp,sav:state.goals.reduce((a,b)=>a+b.saved,0)}}
function byCategory(){const data={};state.transactions.filter(t=>t.type==='expense').forEach(t=>data[t.category]=(data[t.category]||0)+t.amount);return data;}
function render(){const t=totals();balanceValue.textContent=fmt(t.bal);incomeValue.textContent=fmt(t.inc);expenseValue.textContent=fmt(t.exp);savingValue.textContent=fmt(t.sav);
renderTransactions();renderBudgets();renderGoals();renderSubs();renderInsights();renderCharts();}
function renderTransactions(){const html=state.transactions.map(x=>`<div class="item"><div><strong>${x.name}</strong><small>${x.category} • ${x.type==='income'?'Przychód':'Wydatek'} • ${x.date}</small></div><div><span class="amount">${fmt(x.amount)}</span> <button class="delete" onclick="remove('transactions',${x.id})">Usuń</button></div></div>`).join('');transactionsList.innerHTML=html||'Brak danych';recentList.innerHTML=state.transactions.slice(0,5).map(x=>`<div class="item"><div><strong>${x.name}</strong><small>${x.category}</small></div><span class="amount">${fmt(x.amount)}</span></div>`).join('')||'Brak danych';}
function renderBudgets(){const cats=byCategory();budgetList.innerHTML=state.budgets.map(x=>{const used=cats[x.category]||0;const pct=x.limit?Math.min(100,used/x.limit*100):0;return`<div class="item"><div><strong>${x.category}</strong><small>Wykorzystano ${fmt(used)} z ${fmt(x.limit)}</small><div class="progress"><span style="width:${pct}%"></span></div></div><button class="delete" onclick="remove('budgets',${x.id})">Usuń</button></div>`}).join('')||'Brak danych';}
function renderGoals(){goalList.innerHTML=state.goals.map(x=>{const pct=x.target?Math.min(100,x.saved/x.target*100):0;return`<div class="item"><div><strong>${x.name}</strong><small>${fmt(x.saved)} / ${fmt(x.target)}</small><div class="progress"><span style="width:${pct}%"></span></div></div><button class="delete" onclick="remove('goals',${x.id})">Usuń</button></div>`}).join('')||'Brak danych';}
function renderSubs(){subscriptionList.innerHTML=state.subscriptions.map(x=>`<div class="item"><div><strong>${x.name}</strong><small>Następna płatność: ${x.date}</small></div><div><span class="amount">${fmt(x.amount)}</span> <button class="delete" onclick="remove('subscriptions',${x.id})">Usuń</button></div></div>`).join('')||'Brak danych';}
function renderInsights(){const t=totals();const subs=state.subscriptions.reduce((a,b)=>a+b.amount,0);let arr=[];if(t.exp>t.inc&&t.inc>0)arr.push('Wydatki przekraczają przychody. Warto ograniczyć największą kategorię kosztów.');if(subs>0)arr.push(`Stałe subskrypcje kosztują miesięcznie ${fmt(subs)}.`);const cats=byCategory();const top=Object.entries(cats).sort((a,b)=>b[1]-a[1])[0];if(top)arr.push(`Największa kategoria wydatków to ${top[0]}: ${fmt(top[1])}.`);if(!arr.length)arr.push('Dodaj dane finansowe, aby otrzymać analizę.');aiInsights.innerHTML=arr.map(x=>`<div class="insight">${x}</div>`).join('');}
function renderCharts(){const cats=byCategory();const labels=Object.keys(cats);const values=Object.values(cats);const pieData=labels.length?{labels,datasets:[{data:values,borderWidth:2}]}:{labels:['Brak danych'],datasets:[{data:[1],borderWidth:2}]};
if(dashboardPie)dashboardPie.destroy();if(statsPie)statsPie.destroy();if(barChart)barChart.destroy();
const opts={plugins:{legend:{labels:{color:'#f5f7f8'}}}};
if(document.getElementById('dashboardPie'))dashboardPie=new Chart(document.getElementById('dashboardPie'),{type:'doughnut',data:pieData,options:opts});
if(document.getElementById('statsPie'))statsPie=new Chart(document.getElementById('statsPie'),{type:'pie',data:pieData,options:opts});
const t=totals();if(document.getElementById('barChart'))barChart=new Chart(document.getElementById('barChart'),{type:'bar',data:{labels:['Przychody','Wydatki'],datasets:[{data:[t.inc,t.exp],borderWidth:1}]},options:{plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#f5f7f8'}},y:{ticks:{color:'#f5f7f8'}}}}});}
render();
