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