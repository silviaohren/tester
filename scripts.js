/**
 * Sound Design Portfolio - Sistema di navigazione
 * Versione semplice e diretta 
 */
document.addEventListener('DOMContentLoaded', function() {
    // Debug: verifica che lo script sia caricato
    console.log('Script di navigazione caricato');
    
    // Collegamenti menu e pagine
    const navLinks = document.querySelectorAll('.nav-menu a');
    const pages = document.querySelectorAll('.page');
    
    // Debug: verifica che gli elementi siano trovati
    console.log('Link menu trovati:', navLinks.length);
    console.log('Pagine trovate:', pages.length);
    
    // Funzione per cambiare pagina
    function switchPage(pageId) {
        console.log('Cambio alla pagina:', pageId);
        
        // Rimuovi classe active da tutti i link e pagine
        navLinks.forEach(link => link.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        // Attiva il link selezionato
        const activeLink = document.querySelector(`.nav-menu a[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            console.log('Link attivato:', activeLink.textContent);
        } else {
            console.error('Link non trovato per la pagina:', pageId);
        }
        
        // Attiva la pagina selezionata
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add('active');
            console.log('Pagina attivata:', pageId);
        } else {
            console.error('Pagina non trovata:', pageId);
        }
    }
    
    // Gestione click sui link del menu
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            // Aggiorna l'URL
            const href = this.getAttribute('href');
            history.pushState(null, null, href);
            
            // Cambia pagina
            switchPage(targetPage);
        });
    });
    
    // Controlla se c'è un hash nell'URL all'avvio
    function checkHash() {
        const hash = window.location.hash || '#film'; // Default: film
        const pageId = document.querySelector(`.nav-menu a[href="${hash}"]`)?.getAttribute('data-page') || 'film-page';
        switchPage(pageId);
    }
    
    // Esegui controllo hash iniziale
    checkHash();
    
    // Gestisci navigazione con pulsanti browser
    window.addEventListener('popstate', checkHash);
});
