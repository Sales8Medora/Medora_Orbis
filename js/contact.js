var T = {
  EN:{navStay:'Stay',navActive:'Active Vacation',navContact:'Contact',bookNow:'Book Now'},
  HR:{navStay:'Smještaj',navActive:'Aktivan odmor',navContact:'Kontakt',bookNow:'Rezerviraj'},
  DE:{navStay:'Unterkunft',navActive:'Aktiver Urlaub',navContact:'Kontakt',bookNow:'Jetzt buchen'},
  HU:{navStay:'Szállás',navActive:'Aktív nyaralás',navContact:'Kapcsolat',bookNow:'Foglalás'},
  RO:{navStay:'Cazare',navActive:'Vacanță activă',navContact:'Contact',bookNow:'Rezervați'},
  UA:{navStay:'Проживання',navActive:'Активний відпочинок',navContact:'Контакт',bookNow:'Забронювати'},
  PL:{navStay:'Pobyt',navActive:'Aktywne wakacje',navContact:'Kontakt',bookNow:'Zarezerwuj'},
  CS:{navStay:'Pobyt',navActive:'Aktivní dovolená',navContact:'Kontakt',bookNow:'Rezervovat'},
  SK:{navStay:'Pobyt',navActive:'Aktívna dovolenka',navContact:'Kontakt',bookNow:'Rezervovať'}
};

function setURL(code) {
  try {
    if (history.replaceState && window.location.href.indexOf('about:') === -1) {
      var p = new URLSearchParams(window.location.search);
      p.set('lang', code);
      history.replaceState(null, '', window.location.pathname + '?' + p.toString());
    }
  } catch(e) {}
}

function rewriteLinks(code) {
  document.querySelectorAll('a[href]').forEach(function(a) {
    var href = a.getAttribute('href');
    if (!href) return;
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href === '#') return;
    if (href.indexOf('.html') === -1) return;
    try {
      var url = new URL(href, window.location.href);
      url.searchParams.set('lang', code);
      a.setAttribute('href', url.pathname + '?' + url.searchParams.toString() + (url.hash || ''));
    } catch(e) {}
  });
}

function applyLang(code) {
  var t = T[code]; if (!t) return;
  document.getElementById('langCode').textContent = code;
  document.querySelectorAll('.lang-opt').forEach(function(b){ b.classList.toggle('active', b.textContent === code); });
  var el;
  el = document.getElementById('nav-stay');    if (el) el.textContent = t.navStay;
  el = document.getElementById('nav-active');  if (el) el.textContent = t.navActive;
  el = document.getElementById('nav-contact'); if (el) el.textContent = t.navContact;
  el = document.getElementById('el-bookNav');  if (el) el.textContent = t.bookNow;
  localStorage.setItem('lang', code);
  setURL(code);
  rewriteLinks(code);
}

var langMenu = document.getElementById('langMenu');
['EN','HR','DE','HU','RO','UA','PL','CS','SK'].forEach(function(code) {
  var btn = document.createElement('button');
  btn.className = 'lang-opt' + (code === 'EN' ? ' active' : '');
  btn.textContent = code;
  btn.addEventListener('click', function() {
    document.getElementById('langDrop').classList.remove('open');
    applyLang(code);
  });
  langMenu.appendChild(btn);
});
document.getElementById('langBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  document.getElementById('langDrop').classList.toggle('open');
});
document.addEventListener('click', function() {
  document.getElementById('langDrop').classList.remove('open');
});

(function() {
  var params = new URLSearchParams(window.location.search);
  var urlLang = (params.get('lang') || '').toUpperCase();
  var savedLang = (localStorage.getItem('lang') || '').toUpperCase();
  var active = T[urlLang] ? urlLang : T[savedLang] ? savedLang : null;
  if (active) applyLang(active);
})();

(function() {
  var today=new Date().toISOString().split('T')[0];
  var url='https://medorahotels.book-official-website.com/book.php?company_id=623423995f029d48852be848b22db50d&hotel=e6b7c5e7e229baf42e41f230777ea92d&nights=4&lang=en&unit_select=1&adults=2'+'&date='+today;
  document.getElementById('el-bookNav').href = url;
  document.getElementById('el-bookStrip').href = url;
})();

document.getElementById('fabBtn').addEventListener('click',function(e){
  e.stopPropagation();
  document.getElementById('fabWrap').classList.toggle('open');
});
document.addEventListener('click',function(){
  document.getElementById('fabWrap').classList.remove('open');
});
