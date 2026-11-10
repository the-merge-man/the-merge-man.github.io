/* Any linked PDF that isn't uploaded yet is shown as "Coming soon"
   instead of a broken link. Links are left alone if the check can't run. */
(function(){
  var links=[].slice.call(document.querySelectorAll('a[href$=".pdf"]'));
  links.forEach(function(a){
    fetch(a.getAttribute('href'),{method:'HEAD',cache:'no-store'})
      .then(function(r){ if(!r.ok) markMissing(a); })
      .catch(function(){ /* offline or file:// preview: keep the link */ });
  });
  function markMissing(a){
    if(a.classList.contains('open')){
      var s=document.createElement('span');
      s.className='open soon'; s.textContent='Coming soon';
      a.replaceWith(s);
    }else{
      var t=document.createElement('span');
      t.textContent=a.textContent+' (coming soon)';
      a.replaceWith(t);
    }
  }
})();
