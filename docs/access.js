'use strict';
(()=>{
  const key='locacao-demo-users-v1', sessionKey='locacao-demo-session-v1';
  const modules={dashboard:'Painel',company:'Minha Empresa',clients:'Clientes',suppliers:'Cadastro Fornecedores',equipment:'Equipamentos',cash:'Caixa',receivables:'Contas a Receber',payables:'Contas a Pagar',users:'Usuários'};
  const master={id:'master',name:'Master',username:'master',role:'master',salt:'tltoxhUSvd4NwdEOm6rwfA==',hash:'LQIUHmMwgM1kqr5mBDzlTahycf6HhQZODQwCbb47z0k=',permissions:{}};
  let users;
  try{users=JSON.parse(localStorage.getItem(key));if(!Array.isArray(users))throw Error();}catch{users=[];}
  if(!users.some(user=>user.id==='master'))users.unshift(master);
  localStorage.setItem(key,JSON.stringify(users));
  let current=users.find(user=>user.id===sessionStorage.getItem(sessionKey))||null;
  const enc=new TextEncoder();
  const bytes=base64=>Uint8Array.from(atob(base64),char=>char.charCodeAt(0));
  const base64=data=>btoa(String.fromCharCode(...new Uint8Array(data)));
  async function hash(password,salt){const material=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveBits']);return base64(await crypto.subtle.deriveBits({name:'PBKDF2',salt:bytes(salt),iterations:150000,hash:'SHA-256'},material,256));}
  const save=()=>localStorage.setItem(key,JSON.stringify(users));
  const level=module=>current?.role==='master'?'full':current?.permissions?.[module]||'none';
  const can=(module,needed='read')=>!!current&&(level(module)==='full'||needed==='read'&&level(module)==='read');
  const denied=()=>({ok:false,error:'Você não tem permissão para esta operação.'});
  const writeModule={saveCompany:'company',saveClient:'clients',deleteClient:'clients',saveSupplier:'suppliers',deleteSupplier:'suppliers',saveEquipment:'equipment',deleteEquipment:'equipment',createRental:'dashboard',updateRental:'dashboard',returnRental:'dashboard',generateCollection:'receivables',updateReceivable:'receivables',receivePayment:'receivables',savePayable:'payables',payPayable:'payables',deletePayable:'payables',generateContract:'dashboard'};
  const readModule={printReport:null,contractContext:'dashboard'};
  for(const [name,method] of Object.entries(window.rental))window.rental[name]=async payload=>{
    if(!current)return denied();
    if(name==='backup'&&current.role!=='master')return denied();
    if(writeModule[name]&&!can(writeModule[name],'full'))return denied();
    if(name in readModule&&readModule[name]&&!can(readModule[name]))return denied();
    return method(payload);
  };
  const overlay=document.createElement('div');overlay.id='login-overlay';overlay.innerHTML='<form id="login-form" class="login-card"><h1>Entrar no sistema</h1><p>Informe seu usuário e senha para continuar.</p><label>Usuário<input id="login-username" autocomplete="username" required></label><label>Senha<input id="login-password" type="password" autocomplete="current-password" required></label><div id="login-error" role="alert" hidden></div><button class="primary" type="submit">Entrar</button></form>';
  document.body.append(overlay);
  const showLogin=()=>{overlay.hidden=!!current;document.body.classList.toggle('auth-locked',!current);if(!current)overlay.querySelector('#login-username').focus();};
  showLogin();
  overlay.querySelector('form').addEventListener('submit',async event=>{
    event.preventDefault();const username=overlay.querySelector('#login-username').value.trim().toLowerCase(),password=overlay.querySelector('#login-password').value;
    const user=users.find(item=>item.username.toLowerCase()===username),error=overlay.querySelector('#login-error');
    if(!user||await hash(password,user.salt)!==user.hash){error.textContent='Usuário ou senha inválidos.';error.hidden=false;return;}
    current=user;sessionStorage.setItem(sessionKey,user.id);overlay.querySelector('#login-password').value='';error.hidden=true;showLogin();window.dispatchEvent(new Event('access-changed'));
  });
  async function saveUser(input){
    if(!can('users','full'))throw Error('Acesso negado.');
    const id=input.id||crypto.randomUUID(),name=String(input.name||'').trim(),username=String(input.username||'').trim().toLowerCase(),password=String(input.password||'');
    if(!name||!username||!/^[a-z0-9._-]{3,40}$/.test(username))throw Error('Informe nome e usuário com 3 a 40 caracteres (letras, números, ponto, hífen ou sublinhado).');
    if(users.some(user=>user.id!==id&&user.username.toLowerCase()===username))throw Error('Este usuário já existe.');
    const old=users.find(user=>user.id===id);if(old?.role==='master')throw Error('O usuário master não pode ser alterado.');
    if(!old&&!password||password&&password.length<8)throw Error('A senha deve ter ao menos 8 caracteres.');
    const salt=password?base64(crypto.getRandomValues(new Uint8Array(16))):old.salt;
    const record={id,name,username,role:'user',salt,hash:password?await hash(password,salt):old.hash,permissions:Object.fromEntries(Object.keys(modules).map(module=>[module,['read','full'].includes(input.permissions?.[module])?input.permissions[module]:'none']))};
    if(old)users[users.indexOf(old)]=record;else users.push(record);save();return record;
  }
  function deleteUser(id){if(!can('users','full'))throw Error('Acesso negado.');if(id==='master'||id===current.id)throw Error('Este usuário não pode ser excluído.');users=users.filter(user=>user.id!==id);save();}
  function signOut(){current=null;sessionStorage.removeItem(sessionKey);showLogin();window.dispatchEvent(new Event('access-changed'));}
  window.access={modules,can,level,current:()=>current,users:()=>users.filter(user=>user.id!=='master'||current?.id==='master').map(({salt,hash,...user})=>({...user})),saveUser,deleteUser,signOut};
})();
