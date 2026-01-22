#FMBLS Bible Learning System (FMBLS)

Live App: https://fmbls.vercel.app

FMBLS is a **gamified Bible learning platform** focused on daily learning, reflection, and group growth through families and leader-led lessons.

## Core Idea

Users learn through lessons, quizzes, and daily verses while earning **XP, badges, and streaks**. Families (groups) compete and grow together using collective progress and challenges.

## Project Structure (Conceptual)

* **Config** – Environment setup and database connections
* **Middleware** – Authentication, authorization, error handling
* **Models** – Users, Lessons, Quizzes, Families, XP, Badges, Verse of the Day
* **Controllers** – Business logic (auth, XP, lessons, families, verses)
* **Routes** – Public and protected API endpoints
* **Utils** – XP calculation, badge rules, helper functions

## Main Data Models

* **User** – Profile, role, XP, streak, badges, family
* **Lesson** – Learning content created by leaders
* **Quiz** – Lesson-based questions and answers
* **Family / Group** – Members, total XP, shared goals
* **Verse of the Day** – Daily verse + user reflections
* **Badge** – Achievement rewards based on milestones

## Key Features

### Authentication

* User registration and login
* Role-based access (user, leader, admin)

### Learning System

* Lessons with text, video, or audio
* Quizzes linked to lessons
* XP awarded on completion

### Families / Groups

* Create or join families
* Track collective XP
* Participate in shared challenges

### Verse of the Day

* Daily verse for all users
* Reflections earn bonus XP
* Encourages daily engagement

### Gamification

* XP progression system
* Daily streak tracking
* Badges for achievements
* User and family leaderboards
* League tiers (Bronze → Platinum)

## Purpose

* Encourage consistent daily learning
* Combine faith, reflection, and community
* Motivate users through gamification
* Scale from individual growth to group progress
