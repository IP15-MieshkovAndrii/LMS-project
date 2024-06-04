import React from 'react';
import './About.scss';

const About = () => {
  return (
    <div className="about">
      <section className="section tech-stack">
        <h2>Tech Stack</h2>
        <p><strong>Frontend:</strong> This project uses React for building the user interface, Redux for state management, and sessionStorage and cookies for storing session data. The following libraries are also utilized:</p>
        <ul>
          <li>@mui for UI components</li>
          <li>axios for making HTTP requests</li>
          <li>sass for styling</li>
        </ul>
        <p><strong>Backend:</strong> The backend is built using Fastify for the web framework, bcrypt for password hashing, Mongoose for MongoDB object modeling, and jsonwebtoken for handling JWTs (JSON Web Tokens).</p>
      </section>
      <section className="section functional">
        <h2>Functional</h2>
        <p>This is a Learning Management System (LMS) project. Logged-in users can enroll in courses. During signup, users can choose either a teacher or a student role. Teachers have the ability to create and update courses.</p>
      </section>
      <section className="section future-functions">
        <h2>Future Functions</h2>
        <p>We have several exciting features planned for future implementation:</p>
        <ul>
          <li>Adding a questioning and answering feature for lessons, allowing students to ask questions and get answers from teachers or peers.</li>
          <li>Integrating tests and quizzes within courses to assess student understanding and provide immediate feedback.</li>
          <li>Implementing user progress tracking, enabling users to see their progress through courses and receive completion certificates.</li>
          <li>Enhancing the course creation process with more multimedia support, including video lectures and interactive content.</li>
          <li>Developing a notification system to alert users about important updates, deadlines, and new content.</li>
          <li>Introducing a forum for students and teachers to discuss topics related to their courses and share resources.</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
