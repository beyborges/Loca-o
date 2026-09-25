'use strict';
(()=>{
  const params=new URLSearchParams(location.search);
  const key=params.get('key');
  const titleNode=document.getElementById('toolbar-title');
  const content=document.getElementById('print-document-content');
  const printButton=document.getElementById('print-document');
  printButton.addEventListener('click',()=>window.print());
  try{
    if(!key)throw new Error('Documento não informado.');
    const raw=localStorage.getItem(key);
    localStorage.removeItem(key);
    if(!raw)throw new Error('O documento expirou. Gere-o novamente no sistema.');
    const payload=JSON.parse(raw);
    document.title=payload.title||'Documento para impressão';
    titleNode.textContent=payload.title||'Documento';
    content.innerHTML=payload.body||'<p>Nenhum conteúdo disponível.</p>';
  }catch(error){
    titleNode.textContent='Não foi possível abrir o documento';
    content.innerHTML='';
    const message=document.createElement('p');
    message.className='document-error';
    message.textContent=error.message||'Não foi possível carregar o documento.';
    content.appendChild(message);
    printButton.disabled=true;
  }
})();
