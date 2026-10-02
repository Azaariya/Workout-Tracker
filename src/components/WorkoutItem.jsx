function WorkoutItem({
  workout,
  deleteWorkout,
  editWorkout
}) {
  return (
    <div className="workout-item">

      <h3>{workout.exercise}</h3>

      <p>Muscle: {workout.muscleGroup}</p>
      <p>Sets: {workout.sets}</p>
      <p>Reps: {workout.reps}</p>
      <p>Weight: {workout.weight} kg</p>
      <p>Date: {workout.date}</p>

      <div className="workout-actions">

        <button
          className="edit-button"
          onClick={() => editWorkout(workout)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => deleteWorkout(workout.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default WorkoutItem;