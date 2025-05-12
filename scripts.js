/**
 * Sound Design Portfolio - Navigazione e Gestione Pagine
 * 
 * Questo script gestisce:
 * 1. Cambio pagina quando si clicca su una voce di menu
 * 2. Aggiornamento dello stato active/underline nel menu
 * 3. Sincronizzazione con hash URL per navigazione diretta
 */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // RIFERIMENTI ELEMENTI DOM
    // ============================================
    const navLinks = document.querySelectorAll('.nav-menu a');
    const pages = document.querySelectorAll('.page');
    
    // ============================================
    // FUNZIONE CAMBIO PAGINA
    // Attiva la pagina corrispondente e aggiorna il menu
    // ============================================
    function changePage(pageId) {
        // 1. Nascondi tutte le pagine
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // 2. Rimuovi classe active da tutti i link
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // 3. Mostra la pagina selezionata
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // 4. Attiva il link corrispondente
        const targetLink = document.querySelector(`.nav-menu a[data-page="${pageId}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }
    
    // ============================================
    // GESTIONE CLICK SU LINK MENU
    // ============================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Ottieni l'ID della pagina dal data-attribute
            const pageId = this.getAttribute('data-page');
            
            // Cambia l'URL senza ricaricare la pagina
            const href = this.getAttribute('href');
            history.pushState(null, null, href);
            
            // Attiva la pagina corrispondente
            changePage(pageId);
        });
    });
    
    // ============================================
    // GESTIONE NAVIGAZIONE CON BACK/FORWARD
    // Risponde ai pulsanti del browser
    // ============================================
    window.addEventListener('popstate', function() {
        handleHashChange();
    });
    
    // ============================================
    // FUNZIONE CONTROLLO HASH URL
    // Sincronizza la UI con l'URL corrente
    // ============================================
    function handleHashChange() {
        const hash = window.location.hash || '#film'; // Default a film se non c'è hash
        const cleanHash = hash.replace('#', '');
        
        // Trova l'ID della pagina corrispondente al hash nell'URL
        const pageId = document.querySelector(`.nav-menu a[href="#${cleanHash}"]`)?.getAttribute('data-page') || 'film-page';
        
        // Cambia pagina
        changePage(pageId);
    }
    
    // ============================================
    // CONTROLLO INIZIALE
    // Verifica URL all'avvio e mostra la pagina corretta
    // ============================================
    handleHashChange();
});
