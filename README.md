# Premium AI & Web Developer Portfolio

A high-performance, aesthetically pleasing portfolio website built with **Next.js 15**, **Redux Toolkit**, and **Framer Motion**. This project features a full-featured admin dashboard for dynamic content management, premium "butter" smooth animations, and a glassmorphic design system.

## 🚀 Experience the "Butter"
This portfolio isn't just a static page—it's an interactive experience.
- **Micro-animations**: Smooth transitions and hover effects using Framer Motion.
- **Dynamic Content**: Fully managed via an integrated Admin Panel.
- **Glassmorphism**: A modern, sleek UI with translucent layers and vibrant gradients.
- **Real-time Updates**: Redux-powered state management ensuring a seamless user journey.

## 🛠 Tech Stack

### Core
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

### UI & Styling
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: [Radix UI](https://www.radix-ui.com/), [Ant Design](https://ant.design/)
- **Images**: [ImageKit.io](https://imagekit.io/) integration

## ✨ Features

- **Hero Section**: Auto-rotating subtitles with "butter" smooth transitions and anti-clipping marquee.
- **About Section**: Professional bio with dynamic statistics and premium image effects.
- **Projects Showcase**: Interactive project cards with technology chips and "featured" highlighting.
- **Technologies & Skills**: Categorized technical expertise with visual progress and interactive tooltips.
- **Certifications**: Professional achievement timeline with credential verification links.
- **Admin Dashboard**: A secure, comprehensive panel to manage:
  - Profile & Social links
  - Project portfolio
  - Skills and categories
  - Resume & Certifications
- **Contact System**: Dynamic contact form with real-time feedback.

## 🏁 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB instance (Atlas or local)
- ImageKit account (for image uploads)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd my_backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   IMAGEKIT_PUBLIC_KEY=your_public_key
   IMAGEKIT_PRIVATE_KEY=your_private_key
   IMAGEKIT_URL_ENDPOINT=your_url_endpoint
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📂 Project Structure

- `/app`: Next.js App Router (Pages, API routes, Admin)
- `/app/_components`: Reusable UI sections and components
- `/lib`: Database schemas, Redux slices, and service layers
- `/public`: Static assets
- `/hooks`: Custom React hooks for Redux and UI logic
- `/util`: Helper functions and shared utilities

## 📜 License
This project is private and intended for personal portfolio use.

---
*Built with ❤️ and Antigravity*
