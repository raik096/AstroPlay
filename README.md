# Report Proof of Concepts (PoC): [CMS headless]

**Data:** 23 Aprile 2026 
**Autore:** Andres Lazzari

## Obiettivo del PoC
Analisi e comparazione di tecnologia Jamstack focalizzandosi su Astro e Payload

## Breve introduzione al contesto CMS
Nello sviluppo web si possono adottare diversi paradigmi che modificano l'esperienza lato client e lato server in termini di velocità, priorità di rendering, costo computazionale spostato se sul server o sul browser dell'user, scalabilità etc. 

Attualmente l'utilizzo di CMS monolitici risulta una pratica affidabile e esauriente, sufficiente ma spesso non necessaria alla risoluzione di task computazionalmente leggeri, e di veloce progettazione. Il concetto in informatica che il miglior strumento non è quello più capace ma quello più adatto è molto ricorrente. La tematica inoltre del vendor-lock in, dell'inflessibilità spostano in certi casi d'uso e per certe specifiche, l'ago della bilancia in favore di un approccio meno monolitico, più modulabile e quindi aggiornabile. 

Dove nel CMS tradizionale si legano insieme in un unico framework DATABASE - LOGICA BUSINESS - INTERFACCIA GRAFICA legando backend e frontend, nel CMS headless si isola e si indipendentizza il backend dal frontend, forzando il loro interfacciamento a chiamate API. Ciò implica la rottura della loro dipendenza, rendendo possibile cambiare framework, aggiornare una delle due parti senza dover toccare l'altra. Può quindi risultare una gestione più "centralizzata" servendo app di frontend compatibili con le sole chiamate API, aumentando di conseguenza la sicurezza. 

Di contro da via ad una gestione meno amichevole, non avendo le funzionalità e gli short-cut proposti dai CMS tradizionali come layout pronti all'uso e costruttori preimpostati