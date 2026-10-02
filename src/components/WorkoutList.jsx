import WorkoutItem from "./WorkoutItem";

function WorkoutList({
  workouts,
  deleteWorkout,
  editWorkout
}) {
  if (workouts.length === 0) {
    return (
      <section className="workout-list">
        <h2>Workout History</h2>

        <div className="empty-state">
          <p>No workouts added yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="workout-list">
      <h2>Workout History</h2>

      {workouts.map((workout) => (
        <WorkoutItem
          key={workout.id}
          workout={workout}
          deleteWorkout={deleteWorkout}
          editWorkout={editWorkout}
        />
      ))}
    </section>
  );
}

export default WorkoutList;