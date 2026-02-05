
## 1️⃣ TP — API REST (polling)

### Contexte

Un serveur REST génère régulièrement des nombres aléatoires et les expose via l’endpoint `/values`.
Un client interroge périodiquement cette API pour récupérer les données et les traiter.

### Énoncé

> 1. Lancez le serveur et le client REST fournis.
> 2. Observez la fréquence de génération des nombres côté serveur.
> 3. Observez la fréquence à laquelle le client récupère les données.
> 4. Modifiez l’intervalle d’interrogation du client.
> 5. Relancez et comparez les résultats.

### Travail attendu

* Identifier **qui initie la communication**
* Déterminer **si le serveur envoie des données sans demande**
* Expliquer ce qu’il se passe si le client s’arrête

### Objectif 

Découvrir une **API REST avec polling**.