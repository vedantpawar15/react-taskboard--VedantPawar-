# React Task Board

A modern, responsive, and feature-rich task management application built with **React 19** and **Vite 8**, inspired by the clean layout density, warm color palette, and visual language of **Google Keep**.

- **Live Demo**: [https://react-taskboard-vedant-pawar.vercel.app/](https://react-taskboard-vedant-pawar.vercel.app/)
- **GitHub Repository**: [https://github.com/vedantpawar15/react-taskboard--VedantPawar-.git](https://github.com/vedantpawar15/react-taskboard--VedantPawar-.git)

---

## Features

### Core Features (Assignment Requirements)
- **Full Task CRUD**:
  - **Create**: Add new tasks via a compact composer with client-side validation.
  - **Read**: View tasks in a responsive grid/list layout or detailed single-task inspection view.
  - **Update**: Edit task titles inline on the main board or on the task details page.
  - **Delete**: Remove tasks from state and `localStorage` with auto-redirect on details view.
  - **Toggle Completion**: Switch task status between Pending and Completed.
- **Task Statistics Summary**: Real-time counter badges for Total, Pending, and Completed tasks displayed in the header and sidebar.
- **Task Details Inspection View (`/tasks/:id`)**: Expanded inspection page featuring a contextual tag, large task title, status badge, metadata grid (`Task ID`, `Storage: Local Storage`, `Original Source: JSONPlaceholder API`), and interactive status toggle, edit, and delete action buttons.
- **Dynamic Multi-Page Routing**: Navigation handled by `react-router-dom` v7 with 404 fallback routing (`*`).
- **API Integration & Initial Seed**: Fetches initial seed tasks from JSONPlaceholder API (`/todos?_limit=10`).
- **Loading & Error Handling**: Animated loading spinner during initial load and interactive retry error state upon network failure.
- **`localStorage` Persistence**: Local storage layer for all user CRUD changes and theme preferences.
- **Form Input Validation**: Immediate validation feedback preventing empty submissions or titles shorter than 3 characters.
- **Keyword Search**: Case-insensitive partial title matching with whitespace trimming.
- **Status Filtering**: Filter tasks by `All`, `Pending`, or `Completed`.
- **Combined Search & Filtering**: Perform keyword searches within specific filter subsets.
- **Empty States**: Contextual empty states for zero tasks and empty search/filter queries with clear controls.
- **Responsive Layout**: Mobile-first design system optimized across Desktop, Laptop, Tablet, and Mobile viewports without horizontal scrolling.

### Bonus Features
- **HTML5 Drag-and-Drop Reordering** ✅: Reorder task items visually in the default All view; automatically disabled when filtering/searching to preserve order integrity.
- **Dark / Light Theme Toggle** ✅: Dark mode default (Google Keep amber aesthetic) with instant light mode toggle and `localStorage` preference persistence.
- **Combined Search & Filter** ✅: Filter by status while simultaneously applying real-time keyword search.
- **Vercel Deployment** ✅: Live deployment hosted on Vercel connected to the GitHub `main` branch.

---

## Tech Stack

- **Frontend Framework**: React 19 (`react` & `react-dom` v19.2.8)
- **Build Tool**: Vite 8 (`vite` v8.2.2)
- **Routing**: React Router 7 (`react-router-dom` v7.18.2)
- **Styling**: Modern Vanilla CSS with CSS Custom Properties & CSS Grid/Flexbox
- **Icons**: Custom Vector SVG Components
- **Data Persistence**: Browser `localStorage` API
- **Data Fetching**: Native Web Fetch API
- **Mock Backend API**: JSONPlaceholder REST API
- **Drag & Drop**: Native HTML5 Drag and Drop API
- **Deployment**: Vercel

---

## Application Architecture

```text
react-taskboard-VedantPawar/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Icons.jsx             # SVG vector icon library
│   │   ├── Navbar.jsx            # Top navigation header bar with search & theme toggles
│   │   ├── Sidebar.jsx           # Collapsible left navigation with filter counts
│   │   ├── TaskBoardHeader.jsx   # Workspace heading and statistics counter chips
│   │   ├── TaskCard.jsx          # Strict 3-column CSS Grid task item component
│   │   ├── TaskForm.jsx          # Google Keep-inspired task composer with validation
│   │   └── TaskList.jsx          # Task grid/list view, drag-and-drop, and empty states
│   ├── pages/
│   │   ├── TaskBoardPage.jsx     # Main workspace route (/)
│   │   ├── TaskDetailPage.jsx    # Expanded task inspection view (/tasks/:id)
│   │   └── NotFoundPage.jsx      # 404 fallback page (*)
│   ├── services/
│   │   └── taskStorage.js        # LocalStorage load/save helper utilities
│   ├── App.css                   # Component layout styles, grid system & media queries
│   ├── App.jsx                   # Main application shell, state hub, and router
│   ├── index.css                 # Master spacing tokens, color palette & reset
│   └── main.jsx                  # Application entry point
├── dist/                         # Vite production build output
├── package.json
└── vite.config.js
```

---

## Data Flow

```text
                  ┌──────────────────────────────┐
                  │    Initial App Mount         │
                  └──────────────┬───────────────┘
                                 │
                 Is localStorage data present?
                                / \
                              YES  NO
                              /     \
    ┌──────────────────────────┐   ┌──────────────────────────┐
    │ Load saved tasks from    │   │ Fetch 10 seed tasks from │
    │ localStorage             │   │ JSONPlaceholder API      │
    └────────────┬─────────────┘   └────────────┬─────────────┘
                 │                              │
                 └──────────────┬───────────────┘
                                │
                    ┌───────────▼───────────┐
                    │ Populate React State  │
                    └───────────┬───────────┘
                                │
                 User performs CRUD Operation
                 (Add, Edit, Delete, Toggle, Reorder)
                                │
                    ┌───────────▼───────────┐
                    │ Update React State    │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │ Sync to localStorage  │
                    └───────────────────────┘
```

---

## API Integration

- **Endpoint**: `https://jsonplaceholder.typicode.com/todos?_limit=10`
- **Purpose**: Provides initial seed data when the application is launched for the first time without pre-existing `localStorage` data.
- **Data Mapping**: Normalizes API items into application task schema `{ id, title, completed }`.
- **Loading & Error Handling**:
  - Displays an animated CSS spinner container while fetching initial data.
  - Catches network or HTTP errors into state and renders an interactive **"Retry Fetching Tasks"** error state button.
- *Note*: JSONPlaceholder is a read-only mock API; all subsequent CRUD changes are persisted client-side via `localStorage`.

---

## Search & Filtering

- **Filters**: `All`, `Pending`, `Completed` (accessible via sidebar or status pills).
- **Keyword Search**: Case-insensitive partial title matching with automatic whitespace trimming.
- **Combined Search & Filter**: Filtering and search work simultaneously (e.g., search "Dev" within "Pending" tasks).
- **Empty States**: If a search query or filter yields zero tasks, a contextual empty state renders with a **"Clear Filters"** action button to reset the view.

---

## Drag & Drop Reordering

- **Implementation**: Native HTML5 Drag and Drop API (`onDragStart`, `onDragOver`, `onDrop`, `onDragEnd`).
- **Behavior**: Reordering is active when viewing **All** tasks with no search query applied. Drag handles (`⋮⋮`) are visually hidden when search or filter is active to protect array index stability.
- **Persistence**: Reordered task lists automatically update React state and sync to `localStorage`.

---

## Theme & Responsive Design

- **Themes**: Supports **Dark Mode** (default Google Keep dark yellow theme `#fbbc04`) and **Light Mode**.
- **Persistence**: Active theme is stored in `localStorage` under `'react_taskboard_theme'` and synced to the `data-theme` attribute on `document.documentElement`.
- **Responsive Layout**: Fluid CSS Grid layout with responsive breakpoints (`1440px`, `1024px`, `768px`, `375px`, `320px`). The sidebar collapses to icon-only mode on tablet/mobile, and task cards adjust to a single-column layout without horizontal scrollbars.

---

## Form Validation

Task title input is validated client-side in `TaskForm.jsx`:

- **Required Field**: Submitting an empty or whitespace-only input triggers the error message `"Task title is required."`.
- **Minimum Length**: Submitting a title shorter than 3 characters triggers the error message `"Task title must be at least 3 characters."`.
- **Auto-Trimming**: Input strings are automatically trimmed of leading and trailing spaces before processing.

---

## Routes

| Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `TaskBoardPage` | Primary workspace displaying task summary, composer, filters, and card grid. |
| `/tasks/:id` | `TaskDetailPage` | Expanded inspection page for a single task with status toggle, inline editing, and deletion with auto-redirect. |
| `*` | `NotFoundPage` | 404 fallback page for invalid or non-existent URLs. |

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/vedantpawar15/react-taskboard--VedantPawar-.git

# 2. Navigate to project directory
cd react-taskboard--VedantPawar-

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## Build

To create an optimized production build:

```bash
npm run build
```

Build output is generated in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## Deployment

The application is deployed on **Vercel** connected directly to the GitHub repository's `main` branch.

- **Live URL**: [https://react-taskboard-vedant-pawar.vercel.app/](https://react-taskboard-vedant-pawar.vercel.app/)

---

## Future Improvements

- Add automated unit and integration test coverage using Vitest and React Testing Library.
- Implement a backend REST or GraphQL service (Node.js / Express + PostgreSQL) for cloud database persistence.
- Add user authentication (JWT / Auth0).
- Support task due dates, priority levels, and category labels.

---

## Assignment / Bonus Checklist

### Core Assignment Requirements
- [x] **Task Creation, Editing, Deletion & Completion Toggle**
- [x] **Task Statistics & Real-Time Counters**
- [x] **Task Details Inspection Page & Multi-Page Routing**
- [x] **JSONPlaceholder API Integration & Error Retry**
- [x] **Loading States & Contextual Empty States**
- [x] **`localStorage` Persistence**
- [x] **Form Input Validation & Error Feedback**
- [x] **Keyword Search & Status Filtering**
- [x] **Responsive Mobile-First Design**

### Bonus Features
- [x] **Drag-and-Drop Task Reordering** ✅
- [x] **Dark / Light Theme Toggle & Persistence** ✅
- [x] **Combined Search & Status Filtering** ✅
- [ ] **Unit Tests** ❌ *(Not implemented)*
- [x] **Vercel Live Production Deployment** ✅

---

## Author

- **Vedant Pawar**
- **GitHub**: [vedantpawar15](https://github.com/vedantpawar15)
