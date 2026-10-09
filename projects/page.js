(function(){
  var btn=document.getElementById('theme'),mq=window.matchMedia('(prefers-color-scheme: dark)');
  function isDark(){var a=document.documentElement.getAttribute('data-theme');return a?a==='dark':mq.matches}
  function label(){btn.textContent=isDark()?'Light mode':'Dark mode';btn.setAttribute('aria-label',isDark()?'Switch to light mode':'Switch to dark mode')}
  btn.addEventListener('click',function(){
    var next=isDark()?'light':'dark';
    document.documentElement.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next)}catch(e){}
    label()});
  mq.addEventListener('change',label);
  label();
  // Hide gallery/video sections when no file has been uploaded yet
  window.addEventListener('load',function(){
    document.querySelectorAll('[data-optional]').forEach(function(sec){
      if(!sec.querySelector('img,video'))sec.hidden=true;
    });
    if(location.protocol.indexOf('http')===0){
      document.querySelectorAll('a[data-check]').forEach(function(a){
        function hide(){a.closest('section').hidden=true}
        fetch(a.href,{method:'HEAD'}).then(function(r){if(!r.ok)hide()}).catch(hide);
      });
    }
  });
})();
