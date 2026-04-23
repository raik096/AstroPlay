# Report Proof of Concepts (PoC): [CMS headless]

**Data:** 23 Aprile 2026 
**Autore:** Andres Lazzari

## Obiettivo del PoC
Analisi e comparazione di tecnologia Jamstack focalizzandosi su Astro e Payload

## Breve introduzione al contesto CMS
Nello sviluppo web si possono adottare diversi paradigmi che modificano l'esperienza lato client e lato server in termini di velocità, priorità di rendering, costo computazionale spostato se sul server o sul browser dell'user, scalabilità etc. 

Attualmente l'utilizzo di CMS monolitici risulta una pratica affidabile e esauriente, sufficiente ma spesso non necessaria alla risoluzione di task computazionalmente leggeri, e di veloce progettazione. Il concetto in informatica che il miglior strumento non è quello più capace ma quello più adatto è molto ricorrente. La tematica inoltre del vendor-lock in, dell'inflessibilità spostano in certi casi d'uso e per certe specifiche, l'ago della bilancia in favore di un approccio meno monolitico, più modulabile e quindi aggiornabile. 

Dove nel CMS tradizionale si legano insieme in un unico framework DATABASE - LOGICA BUSINESS - INTERFACCIA GRAFICA legando backend e frontend, nel CMS headless si isola e si indipendentizza il backend dal frontend, forzando il loro interfacciamento a chiamate API. Ciò implica la rottura della loro dipendenza, rendendo possibile scegliere il framework, aggiornare una delle due parti senza dover toccare l'altra. Può quindi risultare una gestione più "centralizzata" servendo app di frontend compatibili con le sole chiamate API, aumentando di conseguenza la sicurezza.

Di contro da via ad una gestione meno amichevole, non avendo le funzionalità e gli short-cut proposti dai CMS tradizionali come layout pronti all'uso e costruttori preimpostati.

## Tecnologie frontend Jamstack
Le CMS headless possono essere abbinate ad un paradigma Jamstack, questa tecnica prevede un approccio più "friendly" verso i browser, risparmiandoli dal dover computare il codice Javascript trasmesso insieme all'HTML e CSS. L'idea è quella di spostare il momento in cui viene costruita la pagina, passando dal server (o dal browser dell'utente in tempo reale) al momento della build (compilazione).

I cardini del Jamstack sono:
* **Pre-rendering (Markup):** L'interfaccia utente (HTML/CSS) viene generata e compilata in anticipo durante la fase di build, anzichè essere costruita dal server ogni volta che un utente visita la pagina, migliorando i tempi di caricamento. 
* **Disaccoppiamento tramite API::** Le logiche vengono delegate alle API.
* **Dinamicità intelligente (JavaScript):** JavaScript viene utilizzato per "risvegliare" (hydrate) solo le parti della pagina che necessitano di vera interattività lato client.
