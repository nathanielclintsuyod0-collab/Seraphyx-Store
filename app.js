/* ===== EDIT ME: placeholders ===== */
const CONFIG={
 serverIP:"seraphyx.atbp.fun",serverPort:"20021",version:"1.21.x",
 discord:"https://discord.gg/vHGj4E9KDZ",support:"neowawww@gmail.com",
 gcash:{accountName:"ME****E S.",number:"09500571215",qrImage:"qr-code.png",instructions:"Open GCash, choose Send Money, and send the exact amount shown. Include your order number in the message if possible."},
 ADMIN_USERNAME:"KnownAsNeo",
 ADMIN_EMAIL:"knownasneo@atbp.fun",
 SUPABASE_URL:"https://axgjlpmunsvwlonbbqdz.supabase.co",
 SUPABASE_ANON_KEY:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4Z2pscG11bnN2d2xvbmJicWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMjA4NDMsImV4cCI6MjEwNjY5Njg0M30.2cEvr2WxOh439FDbB6Yn3bKznAj3MyJohyQ0DR_LGlQ",
 API_BASE:null
};
const REFUND={title:"Seraphyx SMP Store Refund Policy",effective:"October 4, 2026",
 intro:["This policy covers digital purchases from the Seraphyx SMP Store, including coins, monthly ranks, crate keys, and the Battlepass. Store credits have no cash value and cannot be exchanged for cash except where a refund is approved or required by applicable law. Nothing in this policy limits your rights under Philippine consumer protection laws."],
 sections:[
 {h:"When you can request a refund",p:["Contact Seraphyx support if:"],ul:["You were charged more than once or for the wrong amount.","Your GCash payment was confirmed, but your purchase was not credited.","A purchase was not delivered, is defective, or differs significantly from its store description.","A rank or other time-limited purchase becomes unavailable because Seraphyx permanently closes before its advertised access period ends."],after:["We will investigate and, where possible, correct the issue or deliver the missing purchase. If we cannot reasonably resolve it, we will offer an appropriate refund or replacement."]},
 {h:"Purchases that were delivered",p:["A change of mind does not normally qualify for a refund after a correctly described purchase has been delivered. If you entered the wrong Minecraft username, contact us as soon as possible. We will try to help if the purchase has not yet been claimed or used.","Purchases affected by account restrictions or rule violations will be reviewed individually. This does not limit any rights you may have under applicable law."]},
 {h:"How to request a refund",p:["Contact {contact} and include:"],ul:["Your order number","Your Minecraft username","The purchase date and amount","Your GCash payment reference, if applicable","A short description of the issue"],warn:"Never send your GCash MPIN, password, or one-time passcode.",after:["We aim to review requests within 5 business days. Approved refunds will normally be sent in Philippine pesos to the original payment method within 10 business days, though GCash or another payment provider may take additional time. If the original method cannot receive the refund, we will contact you to agree on another suitable method.","Please contact us promptly when something goes wrong so we can locate the order and help."]}
 ]};
function refund(){const sup=/@/.test(CONFIG.support)?`<a href="mailto:${esc(CONFIG.support)}">${esc(CONFIG.support)}</a>`:esc(CONFIG.support);
 const contact=`${sup} or our <a href="${esc(CONFIG.discord)}" target="_blank" rel="noopener">Discord</a>`;
 const P=a=>(a||[]).map(t=>`<p>${esc(t).replace('{contact}',contact)}</p>`).join('');
 return `<div class="eyebrow">Policy</div><h1>Refund policy</h1><div class="card"><div class="in"><h2 style="margin-top:0">${esc(REFUND.title)}</h2><p class="mu">Effective date: ${esc(REFUND.effective)}</p>${P(REFUND.intro)}
 ${REFUND.sections.map(x=>`<h3 class="rule sec">${esc(x.h)}</h3>${P(x.p)}${x.ul?`<ul>${x.ul.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`:''}${x.warn?`<div class="note bad"><b>${esc(x.warn)}</b></div>`:''}${P(x.after)}`).join('')}</div></div>`}
const COIN_RATE=2,MIN_COIN_PHP=50;
const P=(id,cat,name,desc,php,extra={})=>({id,cat,name,desc,php,coins:php*COIN_RATE,days:0,tier:0,perks:[],details:"",...extra});
const DEFAULTS=[
 P("coin","Coinshop","Coins","Buy in-game coins. ₱1.00 = 2 coins. Minimum purchase ₱50.00.",50,{coinshop:true,icon:"coin"}),
 P("guardian","Monthly Ranks","Guardian","The first step of your Seraphyx ascension.",250,{days:30,tier:1,icon:"rank"}),
 P("champion","Monthly Ranks","Champion","The second step of your Seraphyx ascension.",500,{days:30,tier:2,icon:"rank"}),
 P("warlord","Monthly Ranks","Warlord","The third step of your Seraphyx ascension.",750,{days:30,tier:3,icon:"rank"}),
 P("titan","Monthly Ranks","Titan","The fourth step of your Seraphyx ascension.",1000,{days:30,tier:4,icon:"rank"}),
 P("king","Monthly Ranks","King","Best Rank — the final crown of Seraphyx.",1500,{days:30,tier:5,icon:"rank"}),
 P("sunshine","Crate Keys","Sunshine Key","Unlocks the Sunshine Crate.",20,{icon:"key"}),
 P("blaze","Crate Keys","Blaze Key","Unlocks the Blaze Crate.",30,{icon:"key"}),
 P("oceanic","Crate Keys","Oceanic Key","Unlocks the Oceanic Crate.",50,{icon:"key"}),
 P("amethyst","Crate Keys","Amethyst Key","Unlocks the Amethyst Crate.",100,{icon:"key"}),
 P("battlepass","Other","Battlepass","Grants Premium rank perks for 14 days.",150,{days:14,icon:"pass"})
];
const ICONS={coin:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/>',rank:'<path d="M4 19l8-5 8 5M4 13l8-5 8 5M4 7l8-5 8 5"/>',key:'<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v4M15 12v3"/>',pass:'<path d="M4 6h16v4a2 2 0 000 4v4H4v-4a2 2 0 000-4z"/><path d="M14 6v12" stroke-dasharray="2 2"/>'};
const ic=n=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]||ICONS.rank}</svg>`;
/* ===== Data layer ===== */
const LS={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const sb=(CONFIG.SUPABASE_URL&&CONFIG.SUPABASE_ANON_KEY&&window.supabase)?window.supabase.createClient(CONFIG.SUPABASE_URL,CONFIG.SUPABASE_ANON_KEY):null;
const demo=!sb,J={'Content-Type':'application/json'};
async function http(p,o={}){const r=await fetch(CONFIG.API_BASE+p,{credentials:'include',...o});if(!r.ok)throw new Error(await r.text()||r.status);return r.json()}
const demoApi={
 products:async()=>demo?LS.get('sx_products',DEFAULTS):http('/products'),
 saveProducts:async p=>demo?LS.set('sx_products',p):http('/admin/products',{method:'PUT',headers:J,body:JSON.stringify(p)}),
 async createOrder(o){if(!demo)return http('/orders',{method:'POST',headers:J,body:JSON.stringify(o)});
  const a=LS.get('sx_orders',[]);const x={...o,number:'SRX-'+Math.random().toString(36).slice(2,8).toUpperCase(),status:'awaiting_payment',created:Date.now(),ref:'',receipt:''};a.push(x);LS.set('sx_orders',a);return x},
 async submitPayment(n,u,ref,file){if(!demo){const f=new FormData();f.append('orderNumber',n);f.append('username',u);f.append('reference',ref);if(file)f.append('receipt',file);return http('/orders/payment',{method:'POST',body:f})}
  const a=LS.get('sx_orders',[]);const o=a.find(x=>x.number===n);o.ref=ref;o.receipt=file?file.name:'';o.status='pending_verification';LS.set('sx_orders',a)},
 async lookup(n,u){if(!demo)return http('/orders/lookup',{method:'POST',headers:J,body:JSON.stringify({orderNumber:n,username:u})});
  return LS.get('sx_orders',[]).find(o=>o.number===n.trim().toUpperCase()&&o.username.toLowerCase()===u.trim().toLowerCase())||null},
 adminOrders:async()=>demo?LS.get('sx_orders',[]).slice().reverse():http('/admin/orders'),
 async setStatus(n,s){if(!demo)return http('/admin/orders/'+encodeURIComponent(n),{method:'PATCH',headers:J,body:JSON.stringify({status:s})});
  const a=LS.get('sx_orders',[]);a.find(o=>o.number===n).status=s;LS.set('sx_orders',a)},
 login:async(u,p)=>demo?true:http('/admin/login',{method:'POST',headers:J,body:JSON.stringify({username:u,password:p})})
};

/* ===== Supabase layer (used automatically when SUPABASE_URL and SUPABASE_ANON_KEY are set) ===== */
const ok=r=>{if(r.error)throw new Error(r.error.message);return r.data};
const fromRow=r=>({id:r.id,cat:r.cat,name:r.name,desc:r.descr,php:Number(r.php),coins:r.coins,days:r.days,tier:r.tier,perks:r.perks||[],details:r.details||'',icon:r.icon,coinshop:r.coinshop});
const toRow=(p,i)=>({id:p.id,cat:p.cat,name:p.name,descr:p.desc,php:p.php,coins:p.coins,days:p.days,tier:p.tier,perks:p.perks,details:p.details,icon:p.icon||'rank',coinshop:!!p.coinshop,sort:i});
const sbApi={
 products:async()=>ok(await sb.from('products').select('*').order('sort')).map(fromRow),
 async saveProducts(ps){ok(await sb.from('products').upsert(ps.map(toRow)));
  const ids=ps.map(p=>'"'+p.id+'"').join(',');ok(await sb.from('products').delete().not('id','in','('+ids+')'))},
 createOrder:async o=>ok(await sb.rpc('create_order',{p_product_id:o.productId,p_username:o.username,p_method:o.method,p_amount:o.total,p_notes:o.notes||''})),
 async submitPayment(n,u,ref,file){let path=null;
  if(file){const ext=(file.name.split('.').pop()||'jpg').toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,5);path=n+'/'+crypto.randomUUID()+'.'+ext;
   ok(await sb.storage.from('receipts').upload(path,file,{contentType:file.type}))}
  return ok(await sb.rpc('submit_payment',{p_number:n,p_username:u,p_reference:ref,p_receipt:path}))},
 lookup:async(n,u)=>ok(await sb.rpc('lookup_order',{p_number:n.trim().toUpperCase(),p_username:u.trim()})),
 adminOrders:async()=>ok(await sb.rpc('admin_list_orders')),
 setStatus:async(n,s)=>ok(await sb.rpc('admin_set_status',{p_number:n,p_status:s})),
 async login(user,pw){if(user.trim().toLowerCase()!==CONFIG.ADMIN_USERNAME.toLowerCase())throw new Error('Wrong username or password');
  ok(await sb.auth.signInWithPassword({email:CONFIG.ADMIN_EMAIL,password:pw}));
  if(ok(await sb.rpc('is_admin'))!==true){await sb.auth.signOut();throw new Error('Not a staff account')}}
};
const api=demo?demoApi:sbApi;
/* ===== Helpers ===== */
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const php=n=>'₱'+Number(n).toLocaleString('en-PH',{minimumFractionDigits:Number(n)%1?2:0,maximumFractionDigits:2});
const num=n=>Number(n).toLocaleString('en-US');
const LABEL={awaiting_payment:'Awaiting payment',pending_verification:'Pending verification',paid:'Payment confirmed',delivered:'Delivered',rejected:'Rejected'};
const st=s=>`<span class="st ${s}">${LABEL[s]||s}</span>`;
const tier=n=>n?`<div class="tier" role="img" aria-label="Tier ${n} of 5">${[1,2,3,4,5].map(i=>`<i class="${i<=n?'f':''}" style="height:${i*4+2}px"></i>`).join('')}</div>`:'';
const CUR=`<div class="note cur" role="note"><b>Currency:</b> ₱1.00 = 2 in-game coins. Coins are bought through the Coinshop (minimum ₱50.00). Store credits have no cash value.</div>`;
const demoBar=()=>demo?`<div class="note bad" role="note"><b>Demo mode.</b> Data stays in this browser only. Nothing is secure, shared with staff, or delivered. Connect a backend (CONFIG.API_BASE) before taking real orders.</div>`:'';
let adminIn=false,tab='orders',cat='All';
function card(p){return `<article class="card"><div class="in"><span class="tag">${ic(p.icon)} ${esc(p.cat)}${p.days?' / '+p.days+' days':''}</span><h3>${esc(p.name)}</h3>${tier(p.tier)}<p class="mu">${esc(p.desc)}</p>
 ${p.coinshop?`<div class="price">₱1.00 = 2 coins</div><div class="coins">Minimum ${php(MIN_COIN_PHP)}</div>`:`<div class="price">${php(p.php)}</div><div class="coins">${num(p.coins)} coins</div>`}
 ${p.perks.length?`<ul class="perks">${p.perks.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:`<div class="pend">Perks: to be added by staff.</div>`}
 ${p.details?`<p class="mu"><b>Details:</b> ${esc(p.details)}</p>`:(p.cat==='Crate Keys'?`<div class="pend">Crate contents and drop rates: to be added by staff.</div>`:'')}
 <div class="push"><a class="btn" href="#/checkout/${esc(p.id)}">${p.coinshop?'Buy coins':'Purchase'}</a></div></div></article>`}
/* ===== Views ===== */
async function home(){const ps=await api.products(),ranks=ps.filter(p=>p.cat==='Monthly Ranks').sort((a,b)=>a.tier-b.tier);
 return `${demoBar()}<section class="hero"><div class="eyebrow">The ascension begins</div><h1>Seraphyx SMP</h1><p class="mu" style="max-width:520px;margin:auto">Rise through five ranks, from Guardian to King. Support the server and claim your place in the climb.</p>
 <p><span class="ip">IP: ${esc(CONFIG.serverIP)}</span><span class="ip">Port: ${esc(CONFIG.serverPort)}</span><span class="ip">Version: ${esc(CONFIG.version)}</span></p>
 <div class="row" style="justify-content:center"><button class="btn ghost" id="cp">Copy IP and port</button><a class="btn" href="#/store">Enter the store</a><a class="btn ghost" href="${esc(CONFIG.discord)}" target="_blank" rel="noopener">Discord</a></div>
 <div class="ladder" aria-label="Rank ascension">${ranks.map((r,i)=>`<a href="#/checkout/${esc(r.id)}" style="height:${40+i*20}%">${esc(r.name)}</a>`).join('')}</div></section>${CUR}
 <div class="grid sec"><div class="card"><div class="in"><h3>1. Choose</h3><p class="mu">Pick coins, a rank, a key or the Battlepass.</p></div></div><div class="card"><div class="in"><h3>2. Pay</h3><p class="mu">Pay with GCash or existing in-game coins. Submit your details for review.</p></div></div><div class="card"><div class="in"><h3>3. Verified, then delivered</h3><p class="mu">Staff verify each payment manually, then deliver your purchase in game.</p></div></div></div>`}
async function store(){const ps=await api.products(),cats=['All',...new Set(ps.map(p=>p.cat))],l=ps.filter(p=>cat==='All'||p.cat===cat);
 return `<div class="eyebrow">Seraphyx</div><h1>Store</h1>${CUR}<div class="chips" role="group" aria-label="Categories">${cats.map(c=>`<button class="chip ${c===cat?'on':''}" aria-pressed="${c===cat}" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}</div>
 ${[...new Set(l.map(p=>p.cat))].map(c=>`<h2 class="rule sec">${esc(c)}</h2>${c==='Monthly Ranks'?'<p class="mu">Each rank lasts 30 days.</p>':''}<div class="grid">${l.filter(p=>p.cat===c).map(card).join('')}</div>`).join('')}`}
async function checkout(id){const p=(await api.products()).find(x=>x.id===id);if(!p)return '<p>Product not found. <a href="#/store">Back to store</a></p>';
 return `<h1>Checkout</h1>${CUR}<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))"><div>${card({...p,id:'#'}).replace(/<div class="push">.*?<\/div>/s,'')}</div>
 <form class="card" id="f" novalidate><div class="in"><label for="u">Minecraft username</label><input id="u" required autocomplete="off" aria-describedby="uh"><small class="mu" id="uh">3 to 16 letters, numbers or underscores. Delivery goes to this exact name.</small>
 ${p.coinshop?`<label for="amt">Amount in pesos (minimum ₱50.00)</label><input id="amt" type="number" min="50" step="1" value="50" required><p class="mu" id="cc">You will receive 100 coins.</p>`:''}
 <fieldset style="border:0;padding:0;margin:0"><legend class="disp" style="margin-top:14px">Payment method</legend>
 <label class="opt"><input type="radio" name="m" value="gcash" checked><span><b>GCash</b><br><small class="mu">Send money, then submit your reference number. Staff verify manually.</small></span></label>
 ${p.coinshop?'':`<label class="opt"><input type="radio" name="m" value="coins"><span><b>In-game coins</b> (${num(p.coins)} coins)<br><small class="mu">Staff confirm your balance and deduct coins in game. Requires enough coins.</small></span></label>`}</fieldset>
 <label for="n">Notes for staff (optional)</label><textarea id="n" rows="2" maxlength="200"></textarea>
 <p class="mu"><small>Please read the <a href="#/refund">refund policy</a> before ordering.</small></p><div class="row"><button class="btn" type="submit">Place order</button></div><p id="e" role="alert" style="color:var(--bad)"></p></div></form></div>`}
function bindCheckout(p){const a=$('#amt');if(a)a.oninput=()=>$('#cc').textContent='You will receive '+num((+a.value||0)*COIN_RATE)+' coins.';
 $('#f').onsubmit=async e=>{e.preventDefault();const u=$('#u').value.trim(),m=document.querySelector('input[name=m]:checked').value,E=$('#e');
  if(!/^[A-Za-z0-9_]{3,16}$/.test(u))return E.textContent='Enter a valid Minecraft username.';
  let php_=p.php,coins=p.coins;if(p.coinshop){php_=Math.round(+a.value*100)/100;if(!(php_>=MIN_COIN_PHP))return E.textContent='Minimum coin purchase is ₱50.00.';coins=php_*COIN_RATE}
  try{const o=await api.createOrder({productId:p.id,productName:p.name,total:php_,coins,method:m,username:u,notes:$('#n').value});location.hash='#/pay/'+o.number+'/'+encodeURIComponent(u)}catch(x){E.textContent='Could not create order: '+x.message}}}
async function pay(n,u){const o=await api.lookup(n,u);if(!o)return '<p>Order not found.</p>';const g=CONFIG.gcash,gc=o.method==='gcash';
 const head=`<h1>Payment</h1><div class="card"><div class="in"><p>Order <b>${esc(o.number)}</b> for ${esc(o.username)} ${st(o.status)}</p><p>${esc(o.productName)}${o.productId==='coin'?' ('+num(o.coins)+' coins)':''}</p>`;
 const body=gc?`<div class="price">Send ${php(o.total)}</div><div class="qr">${g.qrImage?`<img src="${esc(g.qrImage)}" alt="GCash QR code" style="max-width:100%;max-height:100%">`:'GCash QR placeholder (set CONFIG.gcash.qrImage)'}</div><p>Account name: <b>${esc(g.accountName)}</b><br>Number: <b>${esc(g.number)}</b></p><p class="mu">${esc(g.instructions)}</p>
 <div class="note bad"><b>Never share your GCash PIN, password or one-time passcode</b> with anyone, including staff. We only need the reference number.</div>`:
 `<div class="price">${num(o.coins)} coins</div><p class="mu">Staff will check your in-game balance and deduct the coins. Make sure you have enough coins on the server.</p>`;
 const form=o.status==='awaiting_payment'?`<form id="pf"><h2>${gc?'Payment confirmation':'Submit for verification'}</h2>${gc?`<label for="r">GCash reference number</label><input id="r" required minlength="6" maxlength="30" autocomplete="off"><label for="rc">Receipt image (optional, max 5 MB)</label><input id="rc" type="file" accept="image/jpeg,image/png,image/webp">`:''}<div class="row"><button class="btn" type="submit">${gc?'I have paid, submit':'Submit order'}</button></div><p id="e" role="alert" style="color:var(--bad)"></p></form>`:
 `<div class="note"><b>${LABEL[o.status]}.</b> ${o.status==='pending_verification'?'Staff will verify this manually. Nothing is automatic.':''} Track it on the <a href="#/lookup">orders page</a>.</div>`;
 return head+body+form+'</div></div>'}
function bindPay(n,u){const f=$('#pf');if(!f)return;f.onsubmit=async e=>{e.preventDefault();const r=$('#r'),file=$('#rc')?.files[0],E=$('#e');
 if(r&&r.value.trim().length<6)return E.textContent='Enter the reference number from your GCash receipt.';
 if(file&&(!file.type.startsWith('image/')||file.size>5242880))return E.textContent='Receipt must be an image under 5 MB.';
 try{await api.submitPayment(n,u,r?r.value.trim():'(coins)',file);render()}catch(x){E.textContent='Failed: '+x.message}}}
async function lookup(){return `<h1>Order status</h1><form class="card" id="lf"><div class="in"><label for="ln">Order number</label><input id="ln" placeholder="SRX-ABC123" required><label for="lu">Minecraft username</label><input id="lu" required autocomplete="off"><div class="row"><button class="btn" type="submit">Check status</button></div></div></form><div id="lr" aria-live="polite"></div>`}
function bindLookup(){$('#lf').onsubmit=async e=>{e.preventDefault();let o=null;try{o=await api.lookup($('#ln').value.trim().toUpperCase(),$('#lu').value.trim())}catch(x){}
 const M={awaiting_payment:'No payment details submitted yet.',pending_verification:'Pending verification by staff.',paid:'Payment confirmed. Awaiting delivery.',delivered:'Delivered in game.',rejected:'Could not be verified. Contact support with your order number.'};
 $('#lr').innerHTML=o?`<div class="card" style="margin-top:14px"><div class="in"><h3>${esc(o.number)} ${st(o.status)}</h3><p>${esc(o.productName)} / ${o.method==='coins'?num(o.coins)+' coins':php(o.total)} / ${o.method==='coins'?'in-game coins':'GCash'}<br>Player: ${esc(o.username)}</p><p class="mu">${M[o.status]}</p>${o.status==='awaiting_payment'?`<a class="btn" href="#/pay/${esc(o.number)}/${encodeURIComponent(o.username)}">Continue to payment</a>`:''}</div></div>`:`<div class="note bad" style="margin-top:14px">No order matches that number and username.</div>`}}
async function admin(){
 if(!adminIn)return `<h1>Staff access</h1>${demoBar()}<form class="card" id="af"><div class="in"><label for="au">Username</label><input id="au" required autocomplete="username" autocapitalize="off"><label for="ap">Password</label><input id="ap" type="password" required autocomplete="current-password"><p class="mu"><small>With a backend, login, sessions and roles are enforced on the server. This form alone protects nothing.</small></p><div class="row"><button class="btn" type="submit">Sign in</button></div><p id="e" role="alert" style="color:var(--bad)"></p></div></form>`;
 const tabs=`<div class="chips">${['orders','products'].map(t=>`<button class="chip ${tab===t?'on':''}" data-tab="${t}">${t}</button>`).join('')}<button class="chip" data-tab="out">Sign out</button></div>`;
 if(tab==='products'){const ps=await api.products();return `<h1>Products</h1>${tabs}${ps.map(p=>`<div class="card" style="margin-bottom:10px"><div class="in"><b>${esc(p.name)}</b> <span class="mu">${esc(p.cat)} / ${php(p.php)} / ${num(p.coins)} coins</span><div class="row"><button class="btn ghost" data-edit="${esc(p.id)}">Edit</button><button class="btn bad" data-del="${esc(p.id)}">Delete</button></div></div></div>`).join('')}<button class="btn" data-edit="new">Add product</button><div id="pe"></div>`}
 const os=await api.adminOrders();
 return `<h1>Orders</h1>${tabs}<div class="note">Check each GCash payment in your transaction history (amount, reference, time) before confirming. For coin orders, confirm the balance and deduct in game. Deliver through your server integration or delivery queue, then mark delivered.</div>
 <div class="scr"><table><thead><tr><th>Order</th><th>Player / item</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead><tbody>${os.map(o=>`<tr><td>${esc(o.number)}<br><small>${new Date(o.created).toLocaleString()}</small></td><td>${esc(o.username)}<br>${esc(o.productName)}${o.notes?'<br><small>'+esc(o.notes)+'</small>':''}</td><td>${o.method==='coins'?num(o.coins)+' coins':php(o.total)+' GCash<br>Ref: '+esc(o.ref||'none')+'<br><small>Receipt: '+esc(o.receipt||'none')+'</small>'}</td><td>${st(o.status)}</td><td><div class="row" style="margin:0">${o.status==='pending_verification'?`<button class="btn ok" data-s="paid" data-o="${esc(o.number)}">Confirm</button><button class="btn bad" data-s="rejected" data-o="${esc(o.number)}">Reject</button>`:''}${o.status==='paid'?`<button class="btn" data-s="delivered" data-o="${esc(o.number)}">Mark delivered</button>`:''}</div></td></tr>`).join('')||'<tr><td colspan="5">No orders yet.</td></tr>'}</tbody></table></div>`}
function bindAdmin(){const af=$('#af');if(af)af.onsubmit=async e=>{e.preventDefault();try{await api.login($('#au').value,$('#ap').value);adminIn=true;render()}catch(x){$('#e').textContent='Sign-in failed: '+(x.message||x)}};
 $$('[data-tab]').forEach(b=>b.onclick=()=>{b.dataset.tab==='out'?adminIn=false:tab=b.dataset.tab;render()});
 $$('[data-s]').forEach(b=>b.onclick=async()=>{await api.setStatus(b.dataset.o,b.dataset.s);render()});
 $$('[data-del]').forEach(b=>b.onclick=async()=>{if(confirm('Delete this product?')){await api.saveProducts((await api.products()).filter(p=>p.id!==b.dataset.del));render()}});
 $$('[data-edit]').forEach(b=>b.onclick=async()=>{const ps=await api.products(),p=ps.find(x=>x.id===b.dataset.edit)||P('p'+Date.now(),'Other','','',0,{icon:'rank'});
  $('#pe').innerHTML=`<form class="card" id="pf2" style="margin-top:14px"><div class="in"><h3>${p.name?'Edit':'New'} product</h3>
  <label for="a1">Name</label><input id="a1" required value="${esc(p.name)}"><label for="a2">Category</label><input id="a2" required list="cl" value="${esc(p.cat)}"><datalist id="cl">${[...new Set(ps.map(x=>x.cat))].map(c=>`<option value="${esc(c)}">`).join('')}</datalist>
  <label for="a3">Description</label><textarea id="a3" rows="2">${esc(p.desc)}</textarea><label for="a4">Price (PHP)</label><input id="a4" type="number" min="0" step="0.01" required value="${p.php}"><label for="a5">Coin price</label><input id="a5" type="number" min="0" required value="${p.coins}">
  <label for="a7">Duration (days, 0 = none)</label><input id="a7" type="number" min="0" value="${p.days}"><label for="a8">Tier (0 to 5)</label><input id="a8" type="number" min="0" max="5" value="${p.tier}">
  <label for="a6">Perks (one per line)</label><textarea id="a6" rows="4">${esc(p.perks.join('\n'))}</textarea><label for="a9">Crate contents / drop rates / other details</label><textarea id="a9" rows="3">${esc(p.details)}</textarea><div class="row"><button class="btn" type="submit">Save</button></div></div></form>`;
  $('#pf2').onsubmit=async e=>{e.preventDefault();const n={...p,name:$('#a1').value.trim(),cat:$('#a2').value.trim(),desc:$('#a3').value,php:+$('#a4').value,coins:+$('#a5').value,days:+$('#a7').value,tier:+$('#a8').value,perks:$('#a6').value.split('\n').map(s=>s.trim()).filter(Boolean),details:$('#a9').value.trim()};
   const i=ps.findIndex(x=>x.id===p.id);i<0?ps.push(n):ps[i]=n;await api.saveProducts(ps);render()}})}
/* ===== Router ===== */
async function render(){const [r,a,b]=(location.hash.slice(2)||'').split('/');let h='';
 try{h=r==='store'?await store():r==='checkout'?await checkout(a):r==='pay'?await pay(a,decodeURIComponent(b||'')):r==='lookup'?await lookup():r==='refund'?refund():r==='admin'?await admin():await home()}catch(e){h=`<div class="note bad">Something went wrong: ${esc(e.message)}</div>`}
 $('#app').innerHTML=h;scrollTo(0,0);
 $$('nav a.l').forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#/'+({checkout:'store',pay:'lookup'}[r]||r||'')));
 $$('[data-cat]').forEach(x=>x.onclick=()=>{cat=x.dataset.cat;render()});
 const cp=$('#cp');if(cp)cp.onclick=()=>navigator.clipboard&&navigator.clipboard.writeText(CONFIG.serverIP+":"+CONFIG.serverPort).then(()=>cp.textContent='Copied');
 if(r==='checkout'&&$('#f'))bindCheckout((await api.products()).find(x=>x.id===a));
 if(r==='pay')bindPay(a,decodeURIComponent(b||''));if(r==='lookup')bindLookup();if(r==='admin')bindAdmin()}
$('#foot').innerHTML=`<p>Support: ${esc(CONFIG.support)} / <a href="${esc(CONFIG.discord)}" target="_blank" rel="noopener">Discord</a></p><p>₱1.00 = 2 coins. Minimum coin purchase ₱50.00. Store credits have no cash value.</p><p><a href="#/refund">Refund policy</a></p><p>Payments are verified manually by staff. Not affiliated with Mojang or Microsoft.</p>`;
addEventListener('hashchange',render);render();
/* BACKEND CONTRACT (API_BASE): GET /products; POST /orders; POST /orders/payment (multipart); POST /orders/lookup;
 admin (server-side session, CSRF, roles): POST /admin/login; GET /admin/orders; PATCH /admin/orders/:n; PUT /admin/products.
 Server must validate input, rate-limit, store receipts privately, reject duplicate references, keep secrets in env vars,
 verify coin balances server-side, and deliver via RCON/plugin or a staff queue only after status = paid. */
