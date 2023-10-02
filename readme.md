[![Node.js CI](https://github.com/lasity34/settings-bill-expressjs/actions/workflows/node.js.yml/badge.svg)](https://github.com/lasity34/settings-bill-expressjs/actions/workflows/node.js.yml)

# Settings Bill ExpressJS Project 🧾🛠️

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Routes](#routes)
4. [Technologies Used](#technologies-used)
5. [Challenges and Learnings](#challenges-and-learnings)

---

## Overview 📝

This project aims to create a simple ExpressJS server with various routes for handling settings and bills. It allows users to select the type of action (call or SMS), update totals, configure costs, and set warning and critical levels.

---

## Features 🌟

- **Radio Selection**: Users can choose either 'call' or 'sms' via radio buttons.
- **Total Update**: Clicking the 'ADD' button updates the appropriate and global totals.
- **Cost Configuration**: Users can configure the costs for SMS and calls.
- **Warning and Critical Levels**: Users can set warning and critical levels for the total cost.

---

## Routes 🛣️

- `/`: GET route that displays the home screen, current prices, and a form to enter actions.
- `/settings`: POST route to set SMS and call prices, warning and critical levels.
- `/action`: POST route to record an action (call or SMS) and update the total based on the settings.
- `/actions`: GET route to display all actions, their timestamps, and total cost.
- `/actions/:type`: GET route to display all actions of a specific type (SMS or call), their timestamps, and total cost.

---

## Technologies Used 💻

- ExpressJS for server setup.
- HTML for the frontend.
- Factory Functions for business logic.

---

## Challenges and Learnings 🤔

### Challenges:

- Implementing the business logic in a way that seamlessly integrates with the frontend.
  
### Learnings:

- Gained practical experience in setting up an ExpressJS server.
- Learned how to handle different types of routes and HTTP methods.
- Got hands-on experience in integrating frontend and backend.

