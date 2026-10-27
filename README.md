# Anomaly Glance — Medical Image Anomaly Detection (web interface)

Web front end of a **team project with MedTech-Innovation**: a clinician signs in, uploads a medical image and gets back a *Normal / Anomaly* verdict with a confidence score, a heatmap of the suspicious region and the model's reconstructed image.

The detection model and API live in the team repository [MedTech-Innovation/Automated_Anomaly_Detection_System](https://github.com/MedTech-Innovation/Automated_Anomaly_Detection_System). This repo is the user interface.

## Features

- **Authentication** — sign-in / sign-up pages and protected routes (only logged-in users reach the analysis page)
- **Image upload** — drag-and-drop area
- **Results panel** — verdict (*Normal* / *Anomaly*) with confidence
- **Visualisation panel** — anomaly heatmap and reconstructed image side by side
- **Stats panel** and **doctor profile**

## My focus

Besides the interface, I looked at it from a security angle, since it handles medical data:

- access to the analysis page restricted to authenticated users
- points to harden before any real use: server-side session validation, file-type and size checks on upload, HTTPS only, no patient identifiers in images (GDPR / health data)

## Run locally

```sh
git clone https://github.com/hassanekara/anomaly-glance.git
cd anomaly-glance
npm install
npm run dev
```

## Stack

React · TypeScript · Vite · Tailwind CSS · shadcn/ui · Recharts

---
Author: **Nouradine Hassane Kara** — cybersecurity student (ESAIP)
