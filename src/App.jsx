import { useState } from 'react';
import './App.css'; // Reusing our Lab 1 CSS!

function App() {
  // 1. React State: Replacing our manual DOM tables
  const [projects, setProjects] = useState([
    { id: 1, name: 'Example Seed Project', tech: 'Vanilla JS', status: 'Active' }
  ]);

  // 2. React State: Form Inputs (Controlled Components)
  const [projectName, setProjectName] = useState('');
  const [projectTech, setProjectTech] = useState('');
  
  // 3. React State: Error Handling
  const [errors, setErrors] = useState({ name: '', tech: '' });

  // Event: Handling Form Submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Stop page refresh

    let isValid = true;
    let newErrors = { name: '', tech: '' };

    // Form Validation Logic
    if (projectName.trim() === '') {
      newErrors.name = 'Project Title is required.';
      isValid = false;
    }
    if (projectTech === '') {
      newErrors.tech = 'Please select a core technology platform.';
      isValid = false;
    }

    setErrors(newErrors);

    // If valid, add to our state array
    if (isValid) {
      const newProject = {
        id: Date.now(), // Generate a unique ID
        name: projectName,
        tech: projectTech,
        status: 'Active'
      };

      // Create a new array with all existing projects PLUS the new one
      setProjects([...projects, newProject]);

      // Clear the form inputs
      setProjectName('');
      setProjectTech('');
    }
  };

  // Event: Handling Deletion
  const handleDelete = (idToRemove) => {
    // Keep all projects EXCEPT the one with the matching ID
    setProjects(projects.filter(project => project.id !== idToRemove));
  };

    return (
    <>
      <header>
        <h1>Project Prototype Hub (React Edition)</h1>
        <p>Track and manage your web application ideas</p>
      </header>

      <main className="container">
        {/* Form Section */}
        <section className="form-section">
          <h2>Add New Project</h2>
          <form id="projectForm" onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label htmlFor="projectName">Project Title:</label>
              <input 
                type="text" 
                id="projectName" 
                placeholder="e.g., E-Commerce Platform"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <small className="error-msg">{errors.name}</small>
            </div>

            <div className="form-group">
              <label htmlFor="projectTech">Core Technology:</label>
              <select 
                id="projectTech"
                value={projectTech}
                onChange={(e) => setProjectTech(e.target.value)}
              >
                <option value="">-- Select Technology --</option>
                <option value="React">React Node Ecosystem</option>
                <option value="Vanilla JS">Vanilla JavaScript</option>
                <option value="NextJS">Next.js Framework</option>
              </select>
              <small className="error-msg">{errors.tech}</small>
            </div>

            <button type="submit">Register Project</button>
          </form>
        </section>

        {/* Table Section (List Rendering) */}
        <section className="table-section">
          <h2>Submitted Prototypes</h2>
          <div className="table-responsive">
            <table id="projectTable">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Technology</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* React List Rendering Magic! */}
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{project.tech}</td>
                    <td><span className="status-badge">{project.status}</span></td>
                    <td>
                      <button 
                        className="action-btn"
                        onClick={() => handleDelete(project.id)}
                      >
                        Dismiss
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;