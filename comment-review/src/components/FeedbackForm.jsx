import React, { useState, useRef } from "react";
import DynamicList from "./DynamicList";

const FeedbackForm = ({ onFeedbackSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    priority: "",
    description: "",
  });

  const [steps, setSteps] = useState([""]);
  const [suggestions, setSuggestions] = useState([""]);

  const [errors, setErrors] = useState({});

  const screenshotRef = useRef();
  const notesRef = useRef();

  const validateField = (field, value) => {
    let fieldError = "";

    switch (field) {
      case "name":
        if (!value.trim()) fieldError = "Full Name is required";
        break;
      case "email":
        if (!value.match(/^\S+@\S+\.\S+$/))
          fieldError = "Valid email is required";
        break;
      case "category":
        if (!value) fieldError = "Please select a category";
        break;
      case "priority":
        if (!value) fieldError = "Priority level is required";
        break;
      case "description":
        if (!value || value.trim().length < 10)
          fieldError = "Description must be at least 10 characters";
        break;
      default:
        break;
    }

    setErrors((prev) => {
      const { [field]: _, ...rest } = prev;
      return fieldError ? { ...rest, [field]: fieldError } : rest;
    });

    return !fieldError;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Valid email is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.priority) newErrors.priority = "Priority level is required";
    if (!formData.description || formData.description.trim().length < 10)
      newErrors.description = "Description must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const submissionData = {
        ...formData,
        steps: steps.filter((s) => s.trim() !== ""),
        suggestions: suggestions.filter((s) => s.trim() !== ""),

        screenshot: screenshotRef.current.value,
        notes: notesRef.current.value,
        timestamp: new Date().toLocaleString(),
      };

      onFeedbackSubmit(submissionData);

      setFormData({
        name: "",
        email: "",
        category: "",
        priority: "",
        description: "",
      });
      setSteps([""]);
      setSuggestions([""]);
      screenshotRef.current.value = "";
      notesRef.current.value = "";
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: "20px" }}>Submit Feedback & Issues</h2>

      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          className={errors.name ? "error-border" : ""}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onBlur={(e) => validateField("name", e.target.value)}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          className={errors.email ? "error-border" : ""}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category *</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            <option value="Bug">Bug</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Complaint">Complaint</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Priority *</label>
          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Detailed Description</label>
        <textarea
          rows="4"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Describe the issue or feedback here..."
        ></textarea>
      </div>

      <DynamicList
        label="Describe Your Problem's So We Can Better Understand the Issue"
        items={steps}
        onChange={(idx, val) => {
          const newSteps = [...steps];
          newSteps[idx] = val;
          setSteps(newSteps);
        }}
        onAdd={() => setSteps([...steps, ""])}
        onRemove={(idx) => setSteps(steps.filter((_, i) => i !== idx))}
      />

      <div className="form-group">
        <label>Screenshot URL (Optional)</label>
        <input
          type="text"
          ref={screenshotRef}
          placeholder="https://example.com/image.png"
        />
      </div>

      <div className="form-group">
        <label>Additional Notes (Optional)</label>
        <textarea ref={notesRef} placeholder="Any extra details..."></textarea>
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={Object.keys(errors).length > 0}
      >
        Submit Report
      </button>
    </form>
  );
};

export default FeedbackForm;
