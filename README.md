# Portfolio Website

A modern, interactive portfolio website showcasing technical projects and skills with stunning animations, custom cursor effects, and a sleek dark theme.

## 🌟 Overview

This portfolio website is built with Next.js and features advanced Framer Motion animations, creating an engaging and memorable user experience. The design emphasizes a clean, professional aesthetic with a dark theme and purple-blue accent colors.

## ✨ Key Features

- 🎨 **Custom Cursor Effects** - Interactive cursor with smooth tracking and element interactions
- 🎭 **Advanced Animations** - Page transitions and element animations using Framer Motion
- 🌙 **Dark Theme** - Modern dark UI with purple-blue gradient accents
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- ⚡ **Performance Optimized** - Built with Next.js for lightning-fast page loads
- 🎯 **Project Showcase** - Highlight your best work with detailed case studies
- 🔍 **SEO Friendly** - Optimized meta tags and semantic HTML

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework for production
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- CSS Modules / Tailwind CSS - Styling solution

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/RED1EYE/Portfolio.git
```

2. **Navigate to the project directory**
```bash
   cd Portfolio
```

3. **Install dependencies**
```bash
   npm install
   # or
   yarn install
```

4. **Run the development server**
```bash
   npm run dev
   # or
   yarn dev
```

5. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000) to see your portfolio in action.

## 📂 Project Structure
```
Portfolio/
│
├── components/          # Reusable React components
│   ├── Cursor/         # Custom cursor component
│   ├── Layout/         # Layout wrapper components
│   ├── Projects/       # Project showcase components
│   └── ...
│
├── pages/              # Next.js pages and routing
│   ├── _app.js        # Custom App component
│   ├── index.js       # Home page
│   └── ...
│
├── public/             # Static assets (images, icons, etc.)
│   ├── images/
│   └── ...
│
├── styles/             # CSS and styling files
│   ├── globals.css
│   └── ...
│
├── package.json        # Project dependencies
└── next.config.js      # Next.js configuration
```

## 🎨 Customization

### Personalizing Content

1. **Update Personal Information**
   - Edit contact details and bio in the relevant components
   - Replace placeholder images with your own in `/public/images/`

2. **Add Your Projects**
   - Update project data in the projects component/page
   - Include project images, descriptions, and links

3. **Customize Theme Colors**
   - Modify color variables in your CSS/styling files
   - Adjust purple-blue accent colors to match your brand

### Modifying Animations

Framer Motion animations can be customized in individual components. Adjust timing, easing, and animation variants to suit your preferences.

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
# or
yarn build
```

### Start Production Server Locally
```bash
npm start
# or
yarn start
```

### Deploy to Vercel (Recommended)

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RED1EYE/Portfolio)

### Other Deployment Options

- **Netlify**: Connect your GitHub repo and deploy
- **GitHub Pages**: Use `next export` for static site generation
- **AWS Amplify**: Continuous deployment from your Git repository

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory if you need to add environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
# Add other variables as needed
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions or improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**GitHub**: [@RED1EYE](https://github.com/RED1EYE)

**Project Link**: [https://github.com/RED1EYE/Portfolio](https://github.com/RED1EYE/Portfolio)

## 🙏 Acknowledgments

- Inspired by modern portfolio designs
- Built with amazing open-source tools
- Special thanks to the Next.js and Framer Motion communities

---

<div align="center">
  
### ⭐ Star this repository if you find it helpful!

Made with ❤️ by RED1EYE

</div>
