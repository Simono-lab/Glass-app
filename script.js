const cover = document.getElementById('cover');
const phone = document.getElementById('phone');
const screen = document.getElementById('screen');
const drawer = document.getElementById('drawer');
const toast = document.getElementById('toast');
const modalProfile = document.getElementById('modalProfile');
const modalAction = document.getElementById('modalAction');

function showToast(msg){
  toast.textContent = msg;
  gsap.fromTo(toast,{opacity:0,y:14,scale:.98},{opacity:1,y:0,scale:1,duration:.16,ease:'power2.out'});
  clearTimeout(showToast.t);
  showToast.t = setTimeout(()=>gsap.to(toast,{opacity:0,y:14,duration:.22,ease:'power2.in'}),1100);
}

function setActive(route){
  document.querySelectorAll('[data-route]').forEach(btn => btn.classList.toggle('active', btn.dataset.route === route));
  drawer.querySelectorAll('.drawer-item').forEach(btn => btn.classList.toggle('active', btn.dataset.route === route));
}

function openDrawer(open=true){
  drawer.classList.toggle('open', open);
  gsap.to(drawer,{x:open?0:-260,opacity:open?1:0,duration:.18,ease:'power2.out'});
}

function enterApp(){
  cover.classList.add('hidden');
  phone.classList.remove('hidden');
  history.pushState({route:'home'}, '', '#home');
  renderHome();
  gsap.fromTo(phone,{opacity:0,y:30,scale:.98},{opacity:1,y:0,scale:1,duration:.22,ease:'power2.out'});
}

function pushRoute(route){
  history.pushState({route}, '', `#${route}`);
  renderRoute(route);
}

function renderRoute(route){
  setActive(route);
  if(route === 'home') renderHome();
  if(route === 'media') renderMedia();
  if(route === 'settings') renderSettings();
  if(route === 'search') renderSearch();
}

function attachScreenEvents(){
  document.querySelectorAll('[data-route]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      openDrawer(false);
      if(btn.dataset.route === 'home') enterApp();
      else pushRoute(btn.dataset.route);
    });
  });
  document.querySelectorAll('[data-open]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const what = btn.dataset.open;
      if(what === 'profile') modalProfile.showModal();
      if(what === 'action') modalAction.showModal();
      if(what === 'notifications') showToast('No notifications');
    });
  });
}

function renderHome(){
  screen.innerHTML = `
    <div class="panel active">
      <div class="row">
        <div class="glass card">
          <div class="big">$13.50</div>
          <div class="small green">▲ Points</div>
          <div class="spacer"></div>
          <div class="big small-big">$0.00</div>
          <div class="small">● Total cap tasks</div>
        </div>
        <div class="glass card media">
          <div class="title"><span>Media</span><span>•••</span></div>
          <div class="time">2:32</div>
          <div class="progress"></div>
          <div class="controls"><span>◄</span><span class="play">▶</span><span>►</span></div>
        </div>
      </div>
      <div class="glass chips">
        <div class="header"><span>Playguiders</span><span>›</span></div>
        <div class="tabs">
          <button class="tab active">Today</button><button class="tab">5D</button><button class="tab">1M</button><button class="tab">3M</button><button class="tab">Apr</button>
        </div>
      </div>
      <div class="glass menu">
        <button class="menu-item active" data-route="home">⌂ Home</button>
        <button class="menu-item" data-route="media">◔ Media</button>
        <button class="menu-item" data-route="search">⌕ Search</button>
        <button class="menu-item" data-open="profile">◌ Profile</button>
        <button class="menu-item" data-route="settings">⚙ Settings</button>
        <button class="menu-item" data-open="action">＋ Quick Action</button>
        <div class="menu-footer" data-open="action">⌄</div>
      </div>
      <div class="glass mini">
        <div class="mini-head"><div class="play-circle"><span class="jewel jewel-xs"></span></div><div><div style="font-size:12px;font-weight:600;">Media Player</div><div class="small">Audio/video</div></div><div style="margin-left:auto;color:rgba(255,255,255,.68)">•••</div></div>
        <div class="slider"></div>
      </div>
      <div class="glass video"><div class="play-circle small"><span class="jewel jewel-xs"></span></div><div><div style="font-size:12px;font-weight:600;">Video</div><div class="small">19.2M stars</div></div></div>
    </div>`;
  attachScreenEvents();
}

function renderMedia(){
  screen.innerHTML = `
    <div class="panel active">
      <div class="glass card" style="min-height:74px"><div class="title"><span>← Back</span><span>Media</span></div><div class="small">Swipe-like floating screen</div></div>
      <div class="glass card media" style="min-height:220px">
        <div class="title"><span>Now Playing</span><span>•••</span></div>
        <div style="font-size:34px;font-weight:800;">2:32</div>
        <div class="progress"></div>
        <div class="controls" style="font-size:18px"><span>◄◄</span><span class="play" style="font-size:20px;width:56px;height:56px;border-radius:20px;display:grid;place-items:center;"><span class="jewel jewel-xs"></span></span><span>►►</span></div>
      </div>
      <div class="glass menu">
        <button class="menu-item" data-route="home">⌂ Home</button>
        <button class="menu-item active" data-route="media">◔ Media</button>
        <button class="menu-item" data-route="settings">⚙ Settings</button>
        <button class="menu-item" data-open="profile">◌ Profile</button>
        <button class="menu-item" data-open="action">＋ Quick Action</button>
        <div class="menu-footer" data-route="home">↩ Return Home</div>
      </div>
    </div>`;
  attachScreenEvents();
}

function renderSettings(){
  screen.innerHTML = `
    <div class="panel active">
      <div class="glass card" style="min-height:74px"><div class="title"><span>← Back</span><span>Settings</span></div><div class="small">iOS-style controls</div></div>
      <div class="glass card" style="min-height:156px"><div class="title"><span>Glass strength</span><span>42</span></div><input type="range" min="10" max="60" value="42" style="width:100%"><div style="height:12px"></div><div class="title"><span>Pink glow</span><span>78%</span></div><input type="range" min="0" max="100" value="78" style="width:100%"></div>
      <div class="glass menu">
        <button class="menu-item" data-route="home">⌂ Home</button>
        <button class="menu-item" data-route="media">◔ Media</button>
        <button class="menu-item active" data-route="settings">⚙ Settings</button>
        <button class="menu-item" data-open="notifications">◌ Notifications</button>
        <button class="menu-item" data-open="profile">↩ About</button>
        <div class="menu-footer" data-open="action">⌄</div>
      </div>
    </div>`;
  attachScreenEvents();
}

function renderSearch(){
  screen.innerHTML = `
    <div class="panel active">
      <div class="glass card" style="min-height:74px"><div class="title"><span>← Back</span><span>Search</span></div><div class="small">Interactive lookup panel</div></div>
      <div class="glass card" style="min-height:110px"><div class="title"><span>Search bar</span><span>⌕</span></div><div class="glass" style="min-height:46px;padding:12px;margin-top:12px;display:flex;align-items:center;color:rgba(255,255,255,.6)">Type to search...</div></div>
      <div class="glass mini"><div class="mini-head"><div class="play-circle"><span class="jewel jewel-xs"></span></div><div><div style="font-size:12px;font-weight:600;">Trending</div><div class="small">Neon glass UI</div></div></div></div>
      <div class="glass menu">
        <button class="menu-item" data-route="home">⌂ Home</button>
        <button class="menu-item active" data-route="search">⌕ Search</button>
        <button class="menu-item" data-route="settings">⚙ Settings</button>
        <button class="menu-item" data-open="profile">◌ Profile</button>
        <div class="menu-footer" data-route="home">↩ Return Home</div>
      </div>
    </div>`;
  attachScreenEvents();
}

document.addEventListener('click', (e)=>{
  if(e.target.matches('.start-btn')) enterApp();
  if(e.target.matches('[data-close-drawer]')) openDrawer(false);
  if(e.target.matches('.drawer-footer')) enterApp();
  if(e.target.matches('[data-close-modal="modalProfile"]')) modalProfile.close();
  if(e.target.matches('[data-close-modal="modalAction"]')) modalAction.close();
  if(e.target.matches('.fab')) modalAction.showModal();
});

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    if(modalAction.open) modalAction.close();
    else if(modalProfile.open) modalProfile.close();
    else if(drawer.classList.contains('open')) openDrawer(false);
  }
});

window.addEventListener('popstate', (e)=>{
  const route = e.state?.route || 'home';
  cover.classList.add('hidden');
  phone.classList.remove('hidden');
  renderRoute(route);
});

window.addEventListener('load', ()=>{
  const initial = location.hash.replace('#','') || 'home';
  gsap.from('.cover-logo',{opacity:0,scale:.7,duration:.5,ease:'power3.out'});
  gsap.from('.cover',{opacity:0,y:30,duration:.5,ease:'power2.out'});
  gsap.from('.bg-orb',{opacity:0,scale:.85,stagger:.08,duration:.5,ease:'power2.out'});
  window.addEventListener('mousemove',(e)=>{
    const x=(e.clientX/window.innerWidth-.5)*10;
    const y=(e.clientY/window.innerHeight-.5)*8;
    if(!phone.classList.contains('hidden')) gsap.to(phone,{rotationY:x,rotationX:-y,duration:.35,ease:'power2.out'});
  });
  history.replaceState({route:initial}, '', `#${initial}`);
  if(initial !== 'home'){
    cover.classList.add('hidden');
    phone.classList.remove('hidden');
    renderRoute(initial);
  }
});
