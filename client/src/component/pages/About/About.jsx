import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-wrapper">
      <div className="about-card">
        <h2>About Me</h2>
        <p className="about-description">
          Hello! I'm <strong>Aditya Sonsale</strong>, a Full-Stack Developer with a deep passion for building scalable applications and creating impactful digital experiences. I specialize in the MERN stack (MongoDB, Express.js, React.js, Node.js) and DevOps technologies like Docker, Kubernetes, and AWS. My goal is to design efficient, cloud-based solutions that empower both businesses and individuals to thrive in the digital economy.
        </p>

        <div className="skills-section">
          <h3>Skills & Expertise</h3>
          <ul>
            <li><strong>Web Development:</strong> HTML, CSS, JavaScript, React.js, Node.js, Express.js</li>
            <li><strong>DevOps & Cloud:</strong> Docker, Kubernetes, Jenkins, AWS (EC2)</li>
            <li><strong>Programming:</strong> Java, JavaScript, C, Python</li>
            <li><strong>Databases:</strong> MySQL, MongoDB</li>
            <li><strong>Tools:</strong> Vercel, GitHub, VS Code, Linux</li>
            <li><strong>Achievements:</strong> 390+ days of problem-solving on GeeksforGeeks, 3-star rating, Institute Rank: 8</li>
          </ul>
        </div>

        <div className="projects-section">
          <h3>Key Projects</h3>
          <ul>
            <li><strong>ATM Machine Simulation (Aug 2024):</strong> Built an ATM simulation using Java and Map data structures to manage user accounts and simulate real-world ATM transactions like balance check, withdrawals, and PIN management.</li>
            <li><strong>Your-Notes (Nov 2024):</strong> Developed a real-time note-taking application with JWT-based authentication, email reminders, and automatic note deletion. Deployed using AWS EC2 with Docker and Jenkins for CI/CD.</li>
            <li><strong>Flash-News (Apr 2024):</strong> A React-based news aggregator app fetching real-time news articles from a third-party API, showcasing skills in React, API integration, and UI/UX design.</li>
            <li><strong>DishDynamo (Aug 2023):</strong> Developed the backend for DishDynamo, an online recipe platform, enabling browsing and user authentication with MongoDB, Node.js, and Express.</li>
          </ul>
        </div>

        <div className="contact-section">
          <h3>Contact Information</h3>
          <p>Email: <a href="mailto:sonsaleaditya@gmail.com">sonsaleaditya@gmail.com</a></p>
          <p>Phone: <a href="tel:+919067409034">+91 9067409034</a></p>
          <p>GitHub: <a href="https://github.com/sonsaleaditya" target="_blank" rel="noopener noreferrer">GitHub Portfolio</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/aditya-sonsale/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
        </div>
      </div>
    </div>
  );
}

export default About;
