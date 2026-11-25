const V='life-audit-50582c64e0';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k.startsWith('life-audit-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html',{ignoreSearch:true})));return}
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res})));return}
 if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
  e.respondWith(caches.open('life-audit-fonts').then(c=>c.match(r).then(m=>{const net=fetch(r).then(res=>{c.put(r,res.clone());return res}).catch(()=>m);return m||net})))}
});
