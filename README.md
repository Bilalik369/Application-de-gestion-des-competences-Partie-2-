# 📚 Application de Gestion des Compétences - Microservices MERN

## 🧩 Description du projet

Cette application pédagogique est développée selon une architecture **microservices** afin de gérer :

- Les **briefs pédagogiques** et leur association aux **compétences** via le **Brief-Service**
- Les **apprenants** et le suivi de leurs **rendus** à travers le **Apprenant-Service**

L’objectif est de permettre à une plateforme d’apprentissage de suivre la **progression des compétences acquises** par les apprenants à travers leurs travaux pratiques (briefs).

---

## ⚙️ Technologies utilisées

- Backend : Node.js, Express.js
- Base de données : MongoDB + Mongoose
- Conteneurisation : Docker, Docker Compose
- Tests : Jest
- Communication inter-services : REST API
- Modélisation : UML (Cas d’utilisation, Classes, Séquence)
- Outils : Git, Postman

---

## 🧱 Architecture Microservices

### 1. 🎯 Brief-Service

Gère les **briefs pédagogiques** et leur association aux **compétences**.

#### Fonctionnalités :
- CRUD des briefs (`titre`, `description`)
- Lier plusieurs compétences à un brief
- Consulter les compétences d’un brief
- Modifier / Supprimer un brief

---

### 2. 🧑‍🎓 Apprenant-Service

Gère les **apprenants** et le suivi de leurs **rendus** de briefs.

#### Fonctionnalités :
- CRUD des apprenants
- Affecter un brief à un ou plusieurs apprenants
- Soumettre un rendu
- Consulter l’historique des rendus par apprenant
- Voir les compétences attendues pour chaque rendu

---

## 🔗 Communication interservices

- **REST API** entre Brief-Service et Apprenant-Service
- Exemple : le Apprenant-Service appelle le Brief-Service pour récupérer les compétences d’un brief soumis

---

## 🐳 Conteneurisation

- Fichiers fournis :
  - `Dockerfile` pour chaque microservice
  - `docker-compose.yml` pour exécuter les deux services + MongoDB
- Variables d’environnement stockées dans `.env`

---

## 🧪 Tests

- Tests unitaires des routes et de la logique métier via **Jest**
- Utilisation de **Postman** pour tester manuellement les endpoints

---




