/**
 * Sound Design Portfolio - Navigazione e Gestione Pagine
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleziona tutti i link del menu e le pagine
    const navLinks = document.querySelectorAll('.nav-menu a');
    const pages = document.querySelectorAll('.page');
    
    // Aggiungi event listener a ciascun link del menu
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Rimuovi classe active da tutti i link e tutte le pagine
            navLinks.forEach(function(el) {
                el.classList.remove('active');
            });
            
            pages.forEach(function(page) {
                page.classList.remove('active');
            });
            
            // Aggiungi classe active al link cliccato
            this.classList.add('active');
            
            // Trova l'ID della pagina da visualizzare
            const pageId = this.getAttribute('data-page');
            
            // Attiva la pagina corrispondente
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            // Aggiorna l'URL con l'hash, ma non fa scorrere la pagina
            history.pushState(null, null, this.getAttribute('href'));
        });
    });
    
    // Controlla se c'è un hash nell'URL all'avvio
    function checkInitialHash() {
        const hash = window.location.hash;
        if (hash) {
            // Trova il link corrispondente all'hash e simulane il click
            const targetLink = document.querySelector(`.nav-menu a[href="${hash}"]`);
            if (targetLink) {
                targetLink.click();
            }
        }
    }
    
    // Controlla hash iniziale
    checkInitialHash();
});
