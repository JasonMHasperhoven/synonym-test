# Notes

- SSR pagination is handled by the routes (/page/1 /page/2 etc)
- Fetching is done using React server components
- Flow of data is: API -> IndexedDB -> Zustand -> UI
- Data persists even when offline
- Error handling is done with toast messages
- UI has a placeholder loading state
- App uses client-side navigations (avoiding page reloads)
- Has dark support
- Is responsive (not much but demonstrable)
- Has a scrappy search (though didnt test it properly!)
- Would've added test coverage given more time (and sorting/ordering)


# Next.js 16 Starter


Welcome to the **Next.js 16 Starter** repository! This starter template is built with Next.js 16, React 19, TypeScript 5, Tailwind CSS 4 and comes packed with several powerful tools and configurations to accelerate your project setup and streamline development workflows using VS Code.


## 🚀 What's Included

- **Next.js 16**
- **React 19**
- **TypeScript 5**
- **ESLint 9**
- **Tailwind CSS 4**
- **App Directory**
- **Next.js Bundle Analyzer**
- **Dexie.js**
- **Zustand**


## 🏁 Getting Started

### Prerequisites

- **Node.js**: Version 20.18.0 or higher

### Installation

1. **Install Dependencies**:
    ```bash
    npm install
    ```

2. **Run Development Server**:
    ```bash
    npm run dev
    ```
