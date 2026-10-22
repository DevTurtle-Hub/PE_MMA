# PE_MMA - BookShelf Mobile Application

> **MMA301 Practical Exam — Fall 2026**  
> A mobile personal book management app built with **React Native (Expo)**, **TypeScript**, **Firebase Authentication**, and **Cloud Firestore**.

---

## 📱 Features

- **Authentication (Firebase Auth):**
  - Sign in and Sign up with Email and Password.
  - Comprehensive client-side form validation with exact exam error messages.
  - Session persistence and protected navigation without UI flashing.
- **Library Management (Cloud Firestore):**
  - Private collection `books` per user with owner isolation and strict Firestore security rules.
  - Normalized case-insensitive duplicate `title + author` check per user.
  - Real-time synchronization with optimistic updates for instant UI feedback without reloading.
- **Search & Filters:**
  - Case-insensitive search by Title or Author.
  - Filter by Genre (`All`, `Fiction`, `Non-Fiction`, `Academic`, `Other`).
  - Filter by Status (`All`, `To Read`, `Reading`, `Finished`).
  - "Favorites only" toggle.
  - Multi-filter combination (AND logic) with a one-tap `Clear Filters` button.
- **Dynamic Summary:**
  - Real-time total book count (`book-count`) and favorites count (`favorite-count`).
  - Status breakdown ordered by highest count first (tie-breaker: `To Read` -> `Reading` -> `Finished`).
- **Book Details & Editing:**
  - Full view mode displaying title, author, genre badge, status badge, rating, notes, and favorite star.
  - Edit mode with in-place validation matching Add Book rules.
  - Delete book with native confirmation dialog (`Alert.alert`).
- **Empty States:**
  - Dedicated empty state (`books-empty`) displaying `No books found` when list or filter results are empty.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Expo (React Native) with TypeScript (`tsconfig.json`)
- **Navigation:** `@react-navigation/native-stack`
- **Backend / Database:** Firebase v12 (Authentication & Cloud Firestore)
- **Design System:** Custom clean theme with accessible contrast, reusable components, and optimized FlatList rendering.

```
src/
├── components/books/   # BookItem, BookForm, BookFilter, BookSummary, BookEmpty
├── config/             # Firebase configuration initialization
├── constants/          # Colors, Genres, Statuses, Error messages
├── contexts/           # AuthContext, BooksContext
├── hooks/              # useBookFilters
├── screens/            # HomeScreen, LoginScreen, RegisterScreen, ListScreen, DetailScreen
├── services/           # auth.service.ts, books.service.ts
├── types/              # TypeScript interfaces and navigation types
└── utils/              # Pure validators (validators.ts), Sorters (sorters.ts)
```

---

## 🚀 Getting Started

### 1. Clone repository & install dependencies
```bash
git clone https://github.com/DevTurtle-Hub/PE_MMA.git
cd PE_MMA
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your Firebase project credentials:
```bash
cp .env.example .env
```

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Deploy Firestore Security Rules
Publish the rules defined in `firestore.rules` to your Firebase project:
```bash
firebase deploy --only firestore:rules
```

### 4. Run the Application
```bash
npx expo start
```
Press `a` to run on Android emulator or scan the QR code with Expo Go.
