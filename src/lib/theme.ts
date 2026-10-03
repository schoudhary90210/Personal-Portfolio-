export const THEME_STORAGE_KEY = 'theme';

// Runs in <head> before first paint: apply the stored theme (dark unless the
// visitor chose light) and flag that JS is running so scroll reveals may hide
// content until it is shown.
export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add('js');try{d.dataset.theme=localStorage.getItem('${THEME_STORAGE_KEY}')==='light'?'light':'dark';}catch(e){d.dataset.theme='dark';}})();`;
