import { useState, useEffect } from "react";

function EventForm({ onAddEvent, editingEvent = null }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const [formError, setFormError] = useState("");

  useEffect(function () {
    // If there is no event being edited, keep the form empty
    if (!editingEvent) {
      setFormData({
        title: "",
        category: "",
        date: "",
        time: "",
        location: "",
        description: "",
      });
      return;
    }

    // Fill the form with the event being edited
    setFormData({
      title: editingEvent.title || "",
      category: editingEvent.category || "",
      date: editingEvent.date
        ? new Date(editingEvent.date).toISOString().split("T")[0]
        : "",
      time: editingEvent.time || "",
      location: editingEvent.location || "",
      description: editingEvent.description || "",
    });

    setFormError("");
  }, [editingEvent]);

  function handleChange(event) {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormData(function (previousData) {
      return {
        ...previousData,
        [inputName]: inputValue,
      };
    });

    setFormError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      formData.title.trim() === "" ||
      formData.category === "" ||
      formData.date === "" ||
      formData.time === "" ||
      formData.location.trim() === "" ||
      formData.description.trim() === ""
    ) {
      setFormError("Please fill in every field.");
      return;
    }

    const newEvent = {
      id:
        editingEvent && editingEvent.id
          ? editingEvent.id
          : Date.now(),
      title: formData.title,
      category: formData.category,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      description: formData.description,
    };

    onAddEvent(newEvent);

    setFormData({
      title: "",
      category: "",
      date: "",
      time: "",
      location: "",
      description: "",
    });

    setFormError("");
  }

  const isEditing = editingEvent !== null && editingEvent !== undefined;

  return (
    <section className="event-form-section">
      <p className="section-label">
        {isEditing ? "Update Activity" : "Create Activity"}
      </p>

      <h2>
        {isEditing
          ? "Edit Campus Event"
          : "Add New Campus Event"}
      </h2>

      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title</label>

          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Club">Club</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>

          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>

          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>

          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter event location"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter event description"
            rows="4"
          ></textarea>
        </div>

        {formError && (
          <p className="form-error">
            {formError}
          </p>
        )}

        <button
          className="submit-button"
          type="submit"
        >
          {isEditing ? "Update Event" : "Add Event"}
        </button>
      </form>
    </section>
  );
}

export default EventForm;