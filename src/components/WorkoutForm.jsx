import { useEffect, useState } from "react";

function WorkoutForm({
  addWorkout,
  editingWorkout,
  updateWorkout,
  cancelEdit
}) {
  const [exercise, setExercise] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingWorkout) {
      setExercise(editingWorkout.exercise);
      setMuscleGroup(editingWorkout.muscleGroup);
      setSets(editingWorkout.sets);
      setReps(editingWorkout.reps);
      setWeight(editingWorkout.weight);
      setDate(editingWorkout.date);
    }
  }, [editingWorkout]);

  function handleSubmit(event) {
    event.preventDefault();

    const workoutData = {
      exercise,
      muscleGroup,
      sets,
      reps,
      weight,
      date
    };

    if (editingWorkout) {
      updateWorkout({
        id: editingWorkout.id,
        ...workoutData
      });
    } else {
      addWorkout({
        id: Date.now(),
        ...workoutData
      });
    }

    clearForm();
  }

  function clearForm() {
    setExercise("");
    setMuscleGroup("");
    setSets("");
    setReps("");
    setWeight("");
    setDate("");
  }

  function handleCancel() {
    clearForm();
    cancelEdit();
  }

  return (
    <form className="workout-form" onSubmit={handleSubmit}>

      <h2>
        {editingWorkout ? "Edit Workout" : "Add Workout"}
      </h2>

      <div className="form-group">
        <label>Exercise</label>

        <input
          type="text"
          value={exercise}
          onChange={(event) => setExercise(event.target.value)}
          placeholder="e.g. Bench Press"
          required
        />
      </div>
      <div className="form-group">
        <label>Muscle Group</label>

        <select
          value={muscleGroup}
          onChange={(event) => setMuscleGroup(event.target.value)}
          required
        >
          <option value="">Select muscle group</option>
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Biceps">Biceps</option>
          <option value="Triceps">Triceps</option>
          <option value="Legs">Legs</option>
          <option value="Glutes">Glutes</option>
          <option value="Abs">Abs</option>
          <option value="Calves">Calves</option>
          <option value="Full Body">Full Body</option>
        </select>
      </div>

      <div className="form-group">
        <label>Sets</label>

        <input
          type="number"
          value={sets}
          onChange={(event) => setSets(event.target.value)}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label>Reps</label>

        <input
          type="number"
          value={reps}
          onChange={(event) => setReps(event.target.value)}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label>Weight (kg)</label>

        <input
          type="number"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          min="0"
          step="0.5"
          required
        />
      </div>

      <div className="form-group">
        <label>Date</label>

        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </div>

      <button type="submit">
        {editingWorkout ? "Update Workout" : "Add Workout"}
      </button>

      {editingWorkout && (
        <button
          type="button"
          className="cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}

    </form>
  );
}

export default WorkoutForm;