const storeKey='kashlyDemoDataV2';
let data=JSON.parse(localStorage.getItem(storeKey))||{transactions:[],budgets:[],subscriptions:[],goals:[],user:null};
const save=()=>localStorage.setItem(storeKey,JSON.stringify(data));
const money=n=>(Number(n)||0).toLocaleString('pl-PL',{minimumFractionDigits:2,maximumFractionDigits:2})+' zł';
const qs=id=>document.getElementById(id);

qs('loginForm').addEventListener('submit',e=>{e.preventDefault();data.user=qs('loginEmail').value;save();showApp();});
qs('logoutBtn').onclick=()=>{qs('appScreen').classList.add('hidden');qs('loginScreen').classList.remove('hidden')};
function showApp(){qs('loginScreen').classList.add('hidden');qs('appScreen').classList.remove('hidden');qs('userLabel').textContent='Zalogowano: '+(data.user||'demo');render();}
if(data.user) showApp();

document.querySelectorAll('.nav-btn').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.section').forEach(s=>s.classList.remove('active-section'));qs(btn.dataset.section).classList.add('active-section');qs('pageTitle').textContent=btn.textContent;render();});

qs('transactionForm').addEventListener('submit',e=>{e.preventDefault();data.transactions.push({id:Date.now(),name:qs('transactionName').value,amount:+qs('transactionAmount').value,type:qs('transactionType').value,category:qs('transactionCategory').value});e.target.reset();save();render();});
qs('budgetForm').addEventListener('submit',e=>{e.preventDefault();data.budgets.push({id:Date.now(),name:qs('budgetName').value,limit:+qs('budgetLimit').value});e.target.reset();save();render();});
qs('subscriptionForm').addEventListener('submit',e=>{e.preventDefault();data.subscriptions.push({id:Date.now(),name:qs('subscriptionName').value,amount:+qs('subscriptionAmount').value,date:qs('subscriptionDate').value});e.target.reset();save();render();});
qs('goalForm').addEventListener('submit',e=>{e.preventDefault();data.goals.push({id:Date.now(),name:qs('goalName').value,target:+qs('goalTarget').value,saved:+qs('goalSaved').value});e.target.reset();save();render();});
qs('clearData').onclick=()=>{if(confirm('Wyczyścić wszystkie dane?')){data={transactions:[],budgets:[],subscriptions:[],goals:[],user:data.user};save();render();}};
qs('generateAi').onclick=()=>{const inc=sum(data.transactions.filter(t=>t.type==='income'),'amount');const exp=sum(data.transactions.filter(t=>t.type==='expense'),'amount');const subs=sum(data.subscriptions,'amount');let msg='Dodaj więcej danych, aby otrzymać analizę.';if(inc||exp||subs){msg=`Analiza AI: Twój bilans wynosi ${money(inc-exp)}. Wydatki to ${money(exp)}, a subskrypcje kosztują miesięcznie ${money(subs)}. ${exp>inc?'Wydajesz więcej niż zarabiasz — warto ograniczyć koszty.':'Twoje finanse wyglądają stabilnie — możesz zwiększyć oszczędności.'}`;}qs('aiResult').textContent=msg;qs('aiResult').className='';};
function sum(arr,key){return arr.reduce((a,b)=>a+(Number(b[key])||0),0)}
function removeItem(type,id){data[type]=data[type].filter(x=>x.id!==id);save();render();}
window.removeItem=removeItem;
function list(type,el,mapper){const box=qs(el);if(!data[type].length){box.className='empty';box.textContent='Brak danych.';return}box.className='';box.innerHTML=data[type].map(x=>`<div class="item"><div>${mapper(x)}</div><button onclick="removeItem('${type}',${x.id})">Usuń</button></div>`).join('');}
function render(){const inc=sum(data.transactions.filter(t=>t.type==='income'),'amount');const exp=sum(data.transactions.filter(t=>t.type==='expense'),'amount');const saved=sum(data.goals,'saved');const subs=sum(data.subscriptions,'amount');qs('incomeTotal').textContent=money(inc);qs('expenseTotal').textContent=money(exp);qs('savingsTotal').textContent=money(saved);qs('balanceValue').textContent=money(inc-exp);list('transactions','transactionList',x=>`<strong>${x.name}</strong><br><span class="pill">${x.type==='income'?'Przychód':'Wydatek'}</span> ${x.category} — ${money(x.amount)}`);list('transactions','recentTransactions',x=>`<strong>${x.name}</strong> — ${money(x.amount)}`);list('budgets','budgetList',x=>`<strong>${x.name}</strong><br>Limit: ${money(x.limit)}`);list('subscriptions','subscriptionList',x=>`<strong>${x.name}</strong><br>${money(x.amount)} / miesiąc, płatność: ${x.date}`);list('goals','goalList',x=>{const p=x.target?Math.min(100,Math.round(x.saved/x.target*100)):0;return `<strong>${x.name}</strong><br>${money(x.saved)} z ${money(x.target)} (${p}%)`;});const max=Math.max(inc,exp,subs,1);qs('incomeBar').style.width=(inc/max*100)+'%';qs('expenseBar').style.width=(exp/max*100)+'%';qs('subsBar').style.width=(subs/max*100)+'%';}
