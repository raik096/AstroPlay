# Report Proof of Concepts (PoC): [CMS headless]

**Data:** 23 Aprile 2026 
**Autore:** Andres Lazzari

## Obiettivo del PoC
Analisi e comparazione delle tecnologie Jamstack, con un focus specifico su **Astro** (Frontend) e **Payload** (Headless CMS).

## Breve introduzione al contesto CMS
Nello sviluppo web si possono adottare diversi paradigmi che modificano l'esperienza lato client e lato server in termini di: velocità, priorità di rendering, costo computazionale (distribuito tra server e client) e scalabilità.

Attualmente, l'utilizzo di CMS monolitici risulta una pratica affidabile e esauriente, sufficiente ma spesso non necessaria alla risoluzione di task computazionalmente leggeri. è puntuale il concetto in informatica secondo cui *il miglior strumento non è quello più potente, ma quello più adatto al contesto*. 

La tematica inoltre del *vendor lock-in*, della rigidità architetturale spostano per certe specifiche, l'ago della bilancia in favore di un approccio meno monolitico, più modulabile e quindi più facilmente aggiornabile. 

### Il paradigma Headless vs Tradizionale
Dove nel CMS tradizionale si legano insieme in un unico framework **Database**, **Logica di Business** e **Interfaccia Grafica**, nel CMS headless si isola e si rende indipendente il backend dal frontend, forzando la loro comunicazione a chiamate API. 

Ciò implica la rottura della loro dipendenza, rendendo possibile scegliere il framework, aggiornare una delle due parti senza dover toccare l'altra. Può quindi risultare una gestione più "centralizzata" servendo app di frontend compatibili con le sole chiamate API, aumentando di conseguenza la sicurezza.

> **Nota a margine:** Di contro, questo approccio comporta una gestione iniziale meno amichevole, mancando delle funzionalità "pronte all'uso" dei CMS tradizionali (come template e costruttori preimpostati).

## Tecnologia frontend: Jamstack
Le CMS headless possono essere abbinate ad un paradigma **Jamstack**, questa tecnica prevede un approccio più "leggero" per il browser, risparmiandolo dal dover gestire pacchetti di codice JavaScript insieme all'HTML e al CSS. L'idea è quella di spostare il momento in cui viene costruita la pagina, passando dal server (o dal browser dell'utente in tempo reale) al momento della build.

I cardini del Jamstack sono:
* **Pre-rendering (Markup):** L'interfaccia utente (HTML/CSS) viene generata in anticipo durante la fase di build, anzichè essere costruita dal server ogni volta che un utente visita la pagina, migliorando i tempi di caricamento. 
* **Disaccoppiamento tramite API::** Le logiche vengono delegate alle API.
* **Dinamicità intelligente (JavaScript):** JavaScript viene utilizzato per "risvegliare" (hydrate) solo le parti della pagina che necessitano di vera interattività lato client.

### Il problema del Jamstack puro
Il problema nasce dal primo principio, quello del pre-rendering. Infatti la compilazione crea un immagine statica dei dati presenti nel CMS headless, portando al caso limite ad un bottleneck. Se ci immaginiamo un caso di una modifica del prezzo di un prodotto, questo aggiornamento comporta una nuova build del sito che è direttamente proporzionale alla grandezza del sito stesso, rendendo impossibile avere aggiornamenti in tempo reale. Esistono strumenti che cercano di risolvere questo problema mantenendo la velocità del Jamstack.

## Evoluzione ibrida: Islands architecture
Il termine "component island" è stato coniato da Katie Sylor-Miller nel 2019. Questa architettura ibrida prevede la renderizzazione delle pagine HTML nel server, inserendo dei placeholders o slots intorno a regioni altamente dinamiche. Queste regioni hanno un trattamento diverso dal resto della pagina (che rimane statica aggiornata a tempo di build) aggiornandosi run-time. 

L'idea quindi è andare contro ai web frameworks che renderizzano l'intera pagina contingendo questo comportamento a zone controllate. 



------------------------------------------------------------------------------

## Astro
La tecnologia utilizzata per il PoC è Astro in combinazione con Payload CMS. Astro è un web framework che utilizza il principio della Island Architecture , senza obbligare lo sviluppatore a una particolare libreria UI, offrendo quindi la libertà di utilizzare React, Preact, Svelte, Vue, ecc.

### Design Principles
* **`Content-driven`**: Si discosta dai framework web orientati alle web application complesse (come software gestionali o dashboard SaaS), che non rappresentano il punto forte di Astro. Il limite principale riguarda la comunicazione tra le isole: far dialogare componenti interattivi diversi richiede l'uso di librerie esterne per la gestione dello stato, aumentando la complessità. Astro è consigliabile quando i componenti JS (anche se rappresentano il 50/60% della pagina) operano in modo indipendente. Al contrario, è meno adatto in scenari interconnessi: ad esempio un form di ricerca avanzata, in cui filtri, liste di risultati e paginazione devono aggiornarsi costantemente e simultaneamente.

* **`Server-first`**: Astro (e in generale l'approccio Jamstack) mira ad alleggerire il carico computazionale lato client. A differenza di framework spesso usati per creare SPA (Single Page Application) che caricano bundle JavaScript per gestire il routing nel browser, Astro adotta un'architettura MPA (Multi-Page Application). Questo approccio riduce all'osso il rendering client-side, sacrificando la fluidità ininterrotta delle SPA.

* **`Fast by default`**: Grazie ai principi appena descritti, Astro registra benchmark prestazionali nettamente superiori per i siti guidati dai contenuti. L'obiettivo strutturale del framework è garantire che le performance ottimali riscontrate in ambiente di sviluppo si riflettano sul servizio deployato.

* **`Easy to use`**: La sintassi nativa .astro è un superset dell'HTML arricchito con espressioni in stile JSX e CSS con scope locale. Poiché il grosso del lavoro avviene sul server, si elimina la complessità della reattività lato client (come gli hook di React).

* **`Developer-focused`**: Astro punta fortemente sulla Developer Experience (DX). Fornisce una CLI, un'estensione ufficiale per VS Code con supporto TypeScript/Intellisense e una documentazione complessa. Il progetto è supportato da una community attiva.


## Direttive: 
All'interno di un file .astro si possono implementare i meccanismi di rendering inserendo attributi HTML in un elemento o componente. Possono implementare compiler feature o modificare il comportamente delle componenti. Perché sia valida la direttiva deve essere nella forma *X:Y*, alcune posso prendere valori custom <X client:load /> (takes no value) <X class:list={['some-css-class']} /> (takes an array).

### Direttive Common

* **`set:html`**: Permette di iniettare stringhe HTML (potrebbero essere state memorizzate in un database) non processate direttamente in un componente.

* **`server:defer`**: Indica al server di non bloccare il rendering della pagina principale in attesa di quel componente ma di renderizzare un fallback temporaneo.

* **`define:vars`**: Crea un ponte diretto tra client e server. Permette di passare variabili calcolate sul server direttamente all'interno dei tag <script> '<style>' lato client.

* **`class:list`**: Una utility che permette di passare array, oggetti o condizioni per applicare classi CSS senza dover scrivere complesse interpolazioni di stringhe

### Le Direttive Client in Astro (Client Islands)

* **`client:load`**: Carica e idrata il JavaScript del componente immediatamente al caricamento della pagina. È la priorità più alta.

* **`client:idle`**: Carica e idrata il componente solo quando la pagina ha finito il caricamento iniziale e il main thread del browser è libero (in "idle"). Ottimo per componenti interattivi che non sono vitali fin dal primissimo istante.

* **`client:visible`**: Idrata il componente solo quando entra nella porzione di schermo visibile all'utente (usa l'Intersection Observer). Se l'utente non fa mai scroll fino a quel componente, il suo JavaScript non verrà mai scaricato.

* **`client:media={string}`**: Idrata il componente solo se una specifica CSS media query è vera (es. `client:media="(max-width: 768px)"`). Perfetto per componenti interattivi esclusivi per mobile (come un menu hamburger) o desktop.

* **`client:only={framework}`**: Salta completamente il Server-Side Rendering (SSR) per quel componente. Il componente viene renderizzato esclusivamente sul client. Poiché Astro non sa quale framework usare in assenza di SSR, devi specificarlo (es. `client:only="react"` o `client:only="vue"`).

### Le Direttive Server in Astro (Server Islands)

A differenza delle direttive client che gestiscono una moltitudine di casistiche di caricamento, lato server esiste un'unica direttiva principale, accompagnata da uno slot speciale:

* **`server:defer`**: Indica ad Astro di non bloccare il caricamento della pagina principale per aspettare che questo componente sia pronto. La pagina (la "shell") viene inviata all'utente immediatamente (spesso statica e velocissima). Nel frattempo, il server calcola l'HTML del componente isolato e lo inietta nella pagina in un secondo momento, non appena è pronto.
* **`slot="fallback"`**: Non è una direttiva vera e propria, ma è lo strumento integrato per gestire l'attesa di `server:defer`. Permette di mostrare un contenuto temporaneo (come uno spinner di caricamento o uno scheletro UI) finché il server non ha finito di renderizzare il componente reale.


------------------------------------------------------------------------------

## Payload.csm
Paylod è un progetto open source di tipo headless quindi non si occupa di generare le pagine web visibili all'utente finale, ma fornisce i dati tramite API. 

### Concepts

* **`Config-based & Code-first`**: L'intera architettura di Payload è centralizzata in file di configurazione tipizzati (TypeScript/JavaScript). A differenza dei CMS tradizionali, la struttura del database e l'interfaccia di amministrazione si costruiscono scrivendo codice.

* **`API-First`**: Qualsiasi dato inserito viene automaticamente esposto tramite API (REST e GraphQL), rendendo Payload la "Single Source of Truth".

* **`Admin UI Autogenerata`**: Payload genera automaticamente un pannello di amministrazione visivo, fornendo agli editor un'interfaccia per inserire i contenuti.

* **`DB-Agnostic`**: Non è vincolato a una specifica tecnologia di archiviazione. Interagisce con il database tramite dei Database Adapters, un layer intermedio che traduce le strutture dati interne di Payload in quelle native del database scelto. La scelta del database può ricadere sulla dinamicità dei campi e l'interconnessione delle tabelle.

* **`Collection Configs`**: Una collezione è un insieme di records, chiamati documenti, quindi un App in payload è un insieme di documenti, memorizzati nel DB, basati sui campi che sono stati definiti, generando local API necessari alla gestione dei documenti stessi. Queste collection sono quindi dei raggruppamenti di dati ricorrenti, ogni collection ha una tabella nel database e le sue API. 

* **`Globals`**: Nel caso i dati non fossero ricorrenti, Payload mette a disposizione i Globals che gestiscono entità uniche (singletons). Si comportano esattamente come le Collections, utilizzando gli stessi Fields per definire lo schema dei dati, ma corrispondono a un singolo documento persistente all'interno del database. Sono lo strumento principale per strutturare dati che esistono in singola copia a livello applicativo, come ad esempio il menu di navigazione principale (Header e Footer).

* **`Fields`**: In Payload, i "Fields" sono i mattoni fondamentali. Configurare un campo significa istruire contemporaneamente il database su come salvare un dato e il pannello di amministrazione su come disegnarlo (es. casella di testo, calendario, upload di file).

* **`Hooks`**: Strumenti per intercettare specifici eventi nel ciclo di vita dei dati, per eseguire logiche personalizzate. Possono intercettare eventi globali (come gli errori), eventi sulle collection, le global o i field. Questi Hook per design sono esclusivamente calcolati sul server backend, per garantire la massima sicurezza. 

* **`Authentication:`**: L'autenticazione è una funzionalità nativa di Payload che permette di gestire login, registrazione e sessioni utente. Qualsiasi Collection può essere trasformata in un'entità in grado di autenticarsi aggiungendo l'opzione auth: true alla sua configurazione. Quando l'opzione viene abilitata vengono aggiunti nativamente al database i campi email, password.

* **`Access Control:`**: L'accesso è valutato dinamicamente prima dell'esecuzione di una funzione JS/ TS, e questi permessi possono essere a livello di collection, globals o fields. Di default se non è presente un utente autenticato, le chiamate API vengono tutte bloccate (tranne nel caso delle local API quindi dal codice server-side).

* **`Admin Panel:`**: Payload genera automaticamente un Admin Panel, costruita in React che restituisce il live preview, adattandosi ai permessi dell'utente che fa il login.

* **`Data Retrieval:`**: L'interazione con il database di Payload viene data su 3 lvelli di API distinti, local API, rest API, GraphQL API. Dove la prima offre un accesso diretto al database tramite Node.js, bypassando il protocollo HTTP. È scritta nativamente in TypeScript. La rest API è l'approccio HTTP standard. Payload monta automaticamente endpoint RESTful (es. /api/collezione) per ogni Collection creata. Usata per chiamate client-side. La terza viene esposta per applicazioni che necessitano di recuperare strutture complesse con una singola chiamata.

* **`Modularity:`**: 