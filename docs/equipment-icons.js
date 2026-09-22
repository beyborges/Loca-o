'use strict';
const equipmentIcons = {
  tool: {label:'Ferramenta', paths:'<path d="m14 6 4 4 4-4a7 7 0 0 1-9 9l-6 6a3 3 0 0 1-4-4l6-6a7 7 0 0 1 9-9z"/>'},
  mixer: {label:'Betoneira', paths:'<path d="m7 4 9 1 4 7-4 5-10-3-3-7zM8 15l-3 6m10-4 4 4M2 21h20M18 7l3-2m-2-2 4 4"/><circle cx="7" cy="21" r="2"/>'},
  drill: {label:'Furadeira', paths:'<path d="M3 5h12v8H3zM15 7h3v4h-3m3-2h5M6 13l-1 8h7l-1-8M3 8H1"/>'},
  ladder: {label:'Escada', paths:'<path d="M7 2 3 22M17 2l4 20M6 6h12M5 11h14M4 16h16M3 21h18"/>'},
  scaffold: {label:'Andaime', paths:'<path d="M4 2v20M20 2v20M2 5h20M2 17h20M4 5l16 12M20 5 4 17M2 22h4m12 0h4"/>'},
  washer: {label:'Lavadora', paths:'<rect x="4" y="7" width="10" height="12" rx="2"/><path d="M7 7V3h5v4M14 11h3l2-8h3M8 11h2m-2 3h2"/><circle cx="6" cy="21" r="1"/><circle cx="12" cy="21" r="1"/>'},
  generator: {label:'Gerador', paths:'<rect x="2" y="6" width="20" height="15" rx="2"/><path d="M7 6V3h10v3M14 9l-5 5h6l-5 5M5 9v7m14-7v7"/>'},
};
function equipmentIcon(key){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${(equipmentIcons[key]||equipmentIcons.tool).paths}</svg>`;}
