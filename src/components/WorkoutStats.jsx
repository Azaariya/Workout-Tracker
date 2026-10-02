function WorkoutStats({ workouts }) {
  const totalWorkouts = workouts.length;

  const totalSets = workouts.reduce((total, workout) => {
    return total + Number(workout.sets);
  }, 0);

  const totalVolume = workouts.reduce((total, workout) => {
    return total + (
      Number(workout.sets) *
      Number(workout.reps) *
      Number(workout.weight)
    );
  }, 0);

  const muscleCounts = {};

  workouts.forEach((workout) => {
    const muscle = workout.muscleGroup;

    if (muscleCounts[muscle]) {
      muscleCounts[muscle]++;
    } else {
      muscleCounts[muscle] = 1;
    }
  });

  let mostTrainedMuscle = "None";

  for (const muscle in muscleCounts) {
    if (
      mostTrainedMuscle === "None" ||
      muscleCounts[muscle] > muscleCounts[mostTrainedMuscle]
    ) {
      mostTrainedMuscle = muscle;
    }
  }

  return (
    <section className="workout-stats">
      <h2>Workout Stats</h2>

      <div className="stats-container">

        <div className="stat-card">
          <h3>Total Workouts</h3>
          <p>{totalWorkouts}</p>
        </div>

        <div className="stat-card">
          <h3>Total Sets</h3>
          <p>{totalSets}</p>
        </div>

        <div className="stat-card">
          <h3>Total Volume</h3>
          <p>{totalVolume} kg</p>
        </div>

        <div className="stat-card">
          <h3>Most Trained Muscle</h3>
          <p>{mostTrainedMuscle}</p>
        </div>

      </div>
    </section>
  );
}

export default WorkoutStats;