(function(){
var M=window.MAG,$=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var main=$('#main'),IM='assets/images/',RMQ=matchMedia('(prefers-reduced-motion:reduce)'),DE=document.documentElement;
function reduced(){return RMQ.matches||DE.dataset.motion==='off'}
var TEAM=["العنود فيصل السحيمي","سميه مازن خلاف","رزان علي القرني","ساره مسند الحربي","مودة سُليمان","منيه المدني","هيفاء منير السهلي","روان عبدالعزيز الحربي","رفاه محمد","وعد دخيل الله الجهني","جوري عبدالعزيز"];
var ORDER=["self-acceptance","beauty-bill","rimas","ageing","social-pressure"];
var A=ORDER.map(function(id){return M.articles.filter(function(a){return a.id===id})[0]});
var INTRO=[["من نحن","في انعكاس، ننظر إلى الجمال من أكثر من زاوية، ونروي ما وراء الصورة."],["هدفنا","أن نقدّم للقارئ معلومة واضحة وسؤالًا يستحق التفكير قبل أن يقرر ما يخص مظهره."],["رسالتنا","أن نبحث عمّا وراء الصورة والمظهر، ونفتح نقاشًا هادئًا حول القرارات والتجارب التي تستحق أن تُروى."]];
function norm(s){return(s||'').replace(/[\u064B-\u065F\u0670\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/ؤ/g,'و').replace(/ئ/g,'ي').toLowerCase()}
function href(a){return'#/a/'+a.id}
function sec(id){return M.sections.filter(function(s){return s.id===id})[0]}
function excerpt(a){var p=(a.body||[]).filter(function(b){return typeof b==='string'})[0];return p||''}
// nav
var NAVH='<a href="#/">الرئيسية</a>'+M.sections.map(function(s){return'<a href="#/s/'+s.id+'">'+s.t+'</a>'}).join('')+'<a href="#/about">عن انعكاس</a>';
$('#nav').innerHTML=NAVH;
// ticker: يتحرك من اليسار إلى اليمين، والنص العربي يبقى RTL
var one=A.map(function(a){return'<a href="'+href(a)+'"><b>'+a.kind+'</b>'+a.title+'</a>'}).join('<i>|</i>')+'<i>|</i>';
var G=one+one;
$('#ttrack').innerHTML='<div class="tg">'+G+'</div><div class="tg" aria-hidden="true">'+G.replace(/<a /g,'<a tabindex="-1" ')+'</div>';
var tv=$('.tview'),tt;tv.addEventListener('touchstart',function(){clearTimeout(tt);$('#ttrack').classList.add('paused')},{passive:true});tv.addEventListener('touchend',function(){tt=setTimeout(function(){$('#ttrack').classList.remove('paused')},2500)},{passive:true});
// theme + motion
$('#btnTheme').onclick=function(){var t=DE.dataset.theme==='dark'?'light':'dark';DE.dataset.theme=t;try{localStorage.setItem('inikas-theme',t)}catch(e){}};
// drawer
var dr=document.createElement('div');dr.id='drawer';dr.className='drawer';
dr.innerHTML='<div class="dback" data-x></div><aside class="dpanel" role="dialog" aria-modal="true" aria-label="قائمة المجلة"><div class="dh"><img src="'+IM+'logo-inikas.png" alt="انعكاس"><button class="ib" id="dclose" aria-label="إغلاق القائمة">✕</button></div><nav>'+NAVH+'</nav></aside>';
document.body.appendChild(dr);
var bm=$('#btnMenu');
function dopen(o){dr.classList.toggle('open',o);bm.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';if(o)$('#dclose').focus();else bm.focus()}
bm.onclick=function(){dopen(true)};
dr.addEventListener('click',function(e){if(e.target.closest('[data-x]')||e.target.closest('#dclose')||e.target.closest('nav a'))dopen(false)});
// overlay (search)
var ov=$('#overlay'),last;
function openOv(html,focus){last=document.activeElement;ov.innerHTML='<div class="dlg" role="dialog" aria-modal="true">'+html+'</div>';ov.hidden=false;document.body.style.overflow='hidden';var f=$(focus||'button',ov);f&&f.focus()}
function closeOv(){ov.hidden=true;ov.innerHTML='';document.body.style.overflow='';last&&last.focus&&last.focus()}
ov.addEventListener('click',function(e){if(e.target===ov||e.target.closest('[data-close]')||e.target.closest('a'))closeOv()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(!ov.hidden)closeOv();else if(dr.classList.contains('open'))dopen(false)}if(e.key==='/'&&ov.hidden&&!/input|textarea/i.test(e.target.tagName)){e.preventDefault();$('#btnSearch').click()}});
function idxText(a){return norm([a.title,a.kind,sec(a.sec).t,a.id==='rimas'?'ريماس عبدالله':'',(a.body||[]).map(function(b){return typeof b==='string'?b:b.h||b.q||b.a||(b.box?b.box+' '+b.rows.join(' '):'')}).join(' '),(a.note||'')].join(' '))}
$('#btnSearch').onclick=function(){
 openOv('<div class="row"><h2>بحث</h2><button class="ib" data-close aria-label="إغلاق">✕</button></div><input id="q" type="search" placeholder="ابحث في العناوين والمتون والتصنيفات" aria-label="بحث"><div class="res" id="res" aria-live="polite"></div>','#q');
 var q=$('#q'),r=$('#res');q.oninput=function(){var v=norm(q.value.trim());if(!v){r.innerHTML='';return}
  var h=A.filter(function(a){return idxText(a).indexOf(v)>-1});
  r.innerHTML=h.length?h.map(function(a){return'<a href="'+href(a)+'"><small>'+a.kind+'</small><br>'+a.title+'</a>'}).join(''):'<p class="soon">لا توجد نتائج مطابقة.</p>'}};
// footer
$('#foot').innerHTML='<div class="fwrap"><div><strong class="fbrand">انعكاس | ما خلف المرآة</strong><p class="ftag">ليست الصورة كل الحكاية.</p></div><nav class="flinks" aria-label="روابط سريعة">'+NAVH+'</nav></div><div class="fbot"><span class="copyright">جميع الحقوق محفوظة لمجلة انعكاس 2026</span><button id="mot" class="flink" aria-pressed="false"></button></div>';
function motLabel(){var off=DE.dataset.motion==='off';$('#mot').setAttribute('aria-pressed',off);$('#mot').textContent=off?'تشغيل الحركة':'تقليل الحركة'}
$('#mot').onclick=function(){if(DE.dataset.motion==='off'){delete DE.dataset.motion;try{localStorage.removeItem('inikas-motion')}catch(e){}}else{DE.dataset.motion='off';try{localStorage.setItem('inikas-motion','off')}catch(e){}}motLabel()};motLabel();
// cards
var IMG=function(a){return'<img loading="lazy" src="'+IM+a.img+'" alt="'+a.alt+'" style="object-position:'+a.pos+'">'};
function lead(a){return'<a class="c lead" href="'+href(a)+'"><div class="ph">'+IMG(a)+'</div><div class="tx"><span class="kd">'+a.kind+'</span><h3>'+a.title+'</h3><p>'+excerpt(a)+'</p><em>اقرأ المادة ←</em></div></a>'}
function over(a){return'<a class="c over" href="'+href(a)+'">'+IMG(a)+'<div class="tx glass"><span class="kd">'+a.kind+'</span><h3>'+a.title+'</h3><p>'+excerpt(a)+'</p></div></a>'}
function side(a,cl){return'<a class="c '+(cl||'side')+'" href="'+href(a)+'"><div class="tx"><span class="kd">'+a.kind+'</span><h3>'+a.title+'</h3><p>'+excerpt(a)+'</p></div><div class="ph">'+IMG(a)+'</div></a>'}
function card(a){return side(a,'side plain')}
function home(){
 var c=A[0];
 main.innerHTML='<section class="hero"><div class="htx"><img class="logo" src="'+IM+'logo-inikas.png" alt="انعكاس: ما خلف المرآة"><h1>ليست الصورة <span class="grad">كل الحكاية</span></h1><p class="lead">خلف كل ملامح إنسان وتجربة وسياق وسؤال. نقرأ ما لا تُظهره المرآة.</p><a class="btn" href="'+href(c)+'">ابدأ القراءة</a></div><div class="mirror"><img fetchpriority="high" src="'+IM+'cover.jpg" alt="تصميم لامرأة أمام مرآة"></div></section>'
 +'<section class="intro reveal" aria-label="تعريف بالمجلة">'+INTRO.map(function(i){return'<div><h2>'+i[0]+'</h2><p>'+i[1]+'</p></div>'}).join('')+'</section>'
 +'<div class="wrap"><h2 class="sec reveal">مختارات انعكاس</h2><div class="slider reveal" aria-roledescription="معرض" aria-label="مختارات انعكاس"><div class="strack" id="st" tabindex="0">'
 +A.map(function(a,i){return'<article class="slide" aria-label="'+(i+1)+' من '+A.length+'"><img '+(i?'loading="lazy" ':'')+'src="'+IM+a.img+'" alt="'+a.alt+'" style="object-position:'+a.pos+'"><div class="txt"><div class="k glass">'+a.kind+'</div><h3>'+a.title+'</h3><a class="btn" href="'+href(a)+'">اقرأ المادة</a></div></article>'}).join('')
 +'</div><div class="sctl"><button class="ib" id="sn" aria-label="السابق">→</button><div class="dots" id="dots">'+A.map(function(_,i){return'<button aria-label="الشريحة '+(i+1)+'"></button>'}).join('')+'</div><button class="ib" id="sx" aria-label="التالي">←</button></div></div>'
 +'<h2 class="sec reveal">ملفات وقضايا انعكاس</h2><div class="files reveal">'+lead(A[0])+over(A[1])+side(A[2],'side wide')+side(A[3],'side vert')+side(A[4],'side vert')+'</div>'
 +'<h2 class="sec reveal">استكشف المجلة</h2><ol class="explore reveal">'+M.sections.concat([{id:'about',t:'عن انعكاس',d:'من نحن، هدفنا، رسالتنا، وفريق العمل.',about:1}]).map(function(s,i){var n=A.filter(function(a){return a.sec===s.id}).length;return'<li><a href="'+(s.about?'#/about':'#/s/'+s.id)+'"><span class="no">'+String(i+1).padStart(2,'0')+'</span><span class="nm">'+s.t+'</span><span class="ct">'+(s.about?'':(n?n+(n>1?' مواد':' مادة'):'قريبًا'))+'</span><span class="ar">←</span></a></li>'}).join('')+'</ol></div>';
 slider();reveal()}
function reveal(){var els=$$('.reveal');if(reduced()||!window.IntersectionObserver){els.forEach(function(e){e.classList.add('in')});return}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});els.forEach(function(e){io.observe(e)})}
function slider(){
 var st=$('#st'),sl=$$('.slide',st),dots=$$('#dots button'),i=0,t,busy=false;
 function go(n){i=(n+sl.length)%sl.length;var c=st.getBoundingClientRect(),r=sl[i].getBoundingClientRect();st.scrollTo({left:st.scrollLeft+(r.left+r.width/2)-(c.left+c.width/2),behavior:reduced()?'auto':'smooth'});mark()}
 function mark(){dots.forEach(function(d,k){d.setAttribute('aria-current',k===i)})}
 st.addEventListener('scroll',function(){var c=st.getBoundingClientRect(),m=c.left+c.width/2,b=1e9;sl.forEach(function(s,k){var r=s.getBoundingClientRect(),d=Math.abs(r.left+r.width/2-m);if(d<b){b=d;i=k}});mark()},{passive:true});
 dots.forEach(function(d,k){d.onclick=function(){go(k)}});
 $('#sx').onclick=function(){go(i+1)};$('#sn').onclick=function(){go(i-1)};
 var S=$('.slider');['pointerenter','focusin','touchstart'].forEach(function(e){S.addEventListener(e,function(){busy=true},{passive:true})});['pointerleave','focusout','touchend'].forEach(function(e){S.addEventListener(e,function(){busy=false},{passive:true})});
 t=setInterval(function(){if(!document.body.contains(st)){clearInterval(t);return}if(!reduced()&&!busy&&!document.hidden)go(i+1)},6500);mark()}
function section(id){var s=sec(id),L=A.filter(function(a){return a.sec===id});
 main.innerHTML='<div class="wrap page"><h1>'+s.t+'</h1>'+(L.length?'<div class="list">'+L.map(card).join('')+'</div>':'<div class="soon">قريبًا — لم تصل مواد هذا القسم بعد.</div>')+'</div>'}
function about(){
 var ic='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 3c-3 0-5 2.2-5 5 0 2 1 3.5 2 4.5-1.5.8-3.5 2-3.5 5.5h13c0-3.5-2-4.7-3.5-5.5 1-1 2-2.5 2-4.5 0-2.800-2-5-5-5z"/></svg>';
 main.innerHTML='<div class="wrap page"><h1>عن انعكاس</h1><div class="intro" style="border:0">'+INTRO.map(function(i){return'<div><h2>'+i[0]+'</h2><p>'+i[1]+'</p></div>'}).join('')+'</div><h2 class="sec">فريق العمل</h2><ul class="team">'+TEAM.map(function(n){return'<li>'+ic+'<span>'+n+'</span></li>'}).join('')+'</ul></div>'}
function article(id){var a=A.filter(function(x){return x.id===id})[0];if(!a)return home();
 document.title=a.title+' | انعكاس';
 var rel=A.filter(function(x){return x!==a}).slice(0,3);
 function blk(b){if(typeof b==='string')return'<p>'+b+'</p>';if(b.h)return'<h2 class="sub">'+b.h+'</h2>';if(b.q)return'<p class="qq">'+b.q+'</p>';if(b.a)return'<p class="aa">'+b.a+'</p>';if(b.box)return'<aside class="box"><strong>'+b.box+'</strong>'+b.rows.map(function(r){return'<div><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'}).join('')+'</aside>';return''}
 var body='<div class="art-body">'+a.body.map(blk).join('')+(a.note?'<p class="note">'+a.note+'</p>':'')+'</div>'+(a.src?'<div class="srcs"><h2>'+a.srcTitle+'</h2><ol>'+a.src.map(function(s){return'<li>'+s[0]+(s[1]?'<br><a href="'+s[1]+'" target="_blank" rel="noopener">'+s[1]+'</a>':'')+'</li>'}).join('')+'</ol></div>':'');
 main.innerHTML='<article class="art"><nav class="abar" aria-label="أدوات القراءة"><button id="bk">→ رجوع</button><button id="sh">مشاركة</button><button id="cp">نسخ الرابط</button><button id="fp" aria-label="تكبير الخط">أ+</button><button id="fm" aria-label="تصغير الخط">أ−</button><button id="rd" aria-pressed="false">وضع القراءة</button></nav><header class="hdr"><div class="kick">'+a.kind+' · '+sec(a.sec).t+'</div><h1 style="font:700 clamp(1.8rem,5vw,2.8rem)/1.25 var(--hf);margin:.2em 0">'+a.title+'</h1><div class="fig"><img src="'+IM+a.img+'" alt="'+a.alt+'" style="object-position:'+a.pos+'">'+(a.imgNote?'<p class="imgnote">'+a.imgNote+'</p>':'')+'</div></header>'+body+'<div class="related"><h2 class="sec">اقرأ أيضًا</h2><div class="list" style="grid-template-columns:1fr">'+rel.map(card).join('')+'</div></div></article>';
 var fs=parseFloat(getComputedStyle(DE).getPropertyValue('--fs'))||1.08;
 function sf(v){fs=Math.min(1.6,Math.max(.9,v));DE.style.setProperty('--fs',fs+'rem')}
 $('#fp').onclick=function(){sf(fs+.1)};$('#fm').onclick=function(){sf(fs-.1)};
 $('#bk').onclick=function(){history.length>1?history.back():location.hash='#/'};
 $('#cp').onclick=function(){var b=this,u=location.href;(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){b.textContent='تم النسخ ✓'}).catch(function(){prompt('انسخ الرابط:',u)})};
 $('#sh').onclick=function(){if(navigator.share)navigator.share({title:a.title,url:location.href}).catch(function(){});else $('#cp').click()};
 $('#rd').onclick=function(){var on=document.body.classList.toggle('reading');this.setAttribute('aria-pressed',on);this.textContent=on?'العرض العادي':'وضع القراءة'}}
function route(){
 var h=location.hash.replace(/^#\/?/,'').split('/');document.body.classList.remove('reading');document.title='انعكاس | ما خلف المرآة';
 if(h[0]==='a')article(h[1]);else if(h[0]==='s'&&sec(h[1]))section(h[1]);else if(h[0]==='about')about();else home();
 var cur=location.hash.split('/').slice(0,2).join('/');$$('#nav a').forEach(function(a){a.removeAttribute('aria-current');if(a.getAttribute('href')===cur||(cur===''&&a.getAttribute('href')==='#/'))a.setAttribute('aria-current','page')});
 window.scrollTo(0,0)}
addEventListener('hashchange',route);route();
addEventListener('scroll',function(){var e=DE,m=e.scrollHeight-innerHeight;$('#progress').style.transform='scaleX('+(m>0&&/#\/a\//.test(location.hash)?e.scrollTop/m:0)+')'},{passive:true});
})();
