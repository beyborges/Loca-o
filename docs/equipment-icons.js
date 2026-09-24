'use strict';
const equipmentIcons = {
  tool:{label:'Ferramenta / Outros',paths:'<path d="m14 6 4 4 4-4a7 7 0 0 1-9 9l-6 6a3 3 0 0 1-4-4l6-6a7 7 0 0 1 9-9z"/>'},
  mixer:{label:'Betoneira',paths:'<path d="m7 4 9 1 4 7-4 5-10-3-3-7zM8 15l-3 6m10-4 4 4M2 21h20M18 7l3-2m-2-2 4 4"/><circle cx="7" cy="21" r="2"/>'},
  drill:{label:'Furadeira',paths:'<path d="M3 5h12v8H3zM15 7h3v4h-3m3-2h5M6 13l-1 8h7l-1-8M3 8H1"/>'},
  rotary_hammer:{label:'Martelete',paths:'<path d="M3 5h13v6H3zM16 7h5v2h-5M6 11l-1 10h7l-1-10M2 5V3h8M4 15h9"/>'},
  sander:{label:'Lixadeira',paths:'<path d="M5 7h11l3 6v4H4v-5zM7 17v3m9-3v3M2 20h18M9 7V4h5l2 3"/><circle cx="8" cy="12" r="2"/>'},
  generator:{label:'Gerador',paths:'<rect x="2" y="6" width="20" height="15" rx="2"/><path d="M7 6V3h10v3M14 9l-5 5h6l-5 5M5 9v7m14-7v7"/>'},
  washer:{label:'Lavadora de alta pressão',paths:'<rect x="4" y="7" width="10" height="12" rx="2"/><path d="M7 7V3h5v4M14 11h3l2-8h3M8 11h2m-2 3h2"/><circle cx="6" cy="21" r="1"/><circle cx="12" cy="21" r="1"/>'},
  vacuum:{label:'Aspirador / Extratora',paths:'<path d="M7 4h8v12H7zM9 1h4v3M15 8h3c3 0 4 2 4 5v7h-4M5 20h12"/><circle cx="9" cy="19" r="2"/><circle cx="15" cy="19" r="2"/>'},
  compressor:{label:'Compressor',paths:'<rect x="3" y="7" width="16" height="10" rx="5"/><circle cx="7" cy="20" r="2"/><circle cx="17" cy="20" r="2"/><path d="M7 7V4h7v3m5 4h3m-2-3v6M8 10h6"/>'},
  paint_sprayer:{label:'Spray / Pistola de pintura',paths:'<path d="M3 7h10v6H8l-2 8H3l2-8H3zM13 9h4l2 2m-1-5h3m-2-3 2-1m-2 7 3 1"/>'},
  saw:{label:'Serra circular',paths:'<path d="M4 6h11l4 6v4H8l-4-5zM8 16a5 5 0 0 0 10 0M2 19h20"/><circle cx="13" cy="16" r="3"/>'},
  cutter:{label:'Cortadora / Serra mármore',paths:'<path d="M3 6h12v7H3zM15 8h4l2 3M6 13l-2 8m6-8 2 8"/><circle cx="17" cy="17" r="4"/>'},
  polisher:{label:'Politriz',paths:'<path d="M5 5h11l3 6-3 5H6l-3-5zM9 5V2h5v3M5 19h14M8 16v3m6-3v3"/>'},
  ladder:{label:'Escada',paths:'<path d="M7 2 3 22M17 2l4 20M6 6h12M5 11h14M4 16h16M3 21h18"/>'},
  scaffold:{label:'Andaime',paths:'<path d="M4 2v20M20 2v20M2 5h20M2 17h20M4 5l16 12M20 5 4 17M2 22h4m12 0h4"/>'},
  pump:{label:'Bomba d’água',paths:'<circle cx="10" cy="12" r="6"/><path d="M10 8v8m-4-4h8M16 10h5v8h-4M4 16v4h12"/>'},
  compactor:{label:'Compactador de solo',paths:'<path d="M8 3h7v9H8zM11 12v5M5 17h12l3 4H2zM15 5h4l2 4"/>'},
  welder:{label:'Máquina de solda',paths:'<rect x="3" y="5" width="14" height="14" rx="2"/><path d="M7 9h6M7 13h2m8-3 4-3m-2 6 3 1m-5 2 3 3"/><circle cx="7" cy="19" r="2"/><circle cx="14" cy="19" r="2"/>'}
};
function equipmentIcon(key){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${(equipmentIcons[key]||equipmentIcons.tool).paths}</svg>`;}
