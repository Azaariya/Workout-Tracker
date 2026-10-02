import { useEffect, useState } from "react";
import WorkoutList from "./components/WorkoutList";
import WorkoutStats from "./components/WorkoutStats";
import WorkoutForm from "./components/WorkoutForm";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem("workouts");

    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });

  const [editingWorkout, setEditingWorkout] = useState(null);

  const [search, setSearch] = useState("");
  const [muscleFilter, setMuscleFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  function addWorkout(newWorkout) {
    setWorkouts((prevWorkouts) => {
      return [
        ...prevWorkouts,
        newWorkout
      ];
    });
  }

  function deleteWorkout(id) {
    setWorkouts((prevWorkouts) => {
      return prevWorkouts.filter((workout) => workout.id !== id);
    });
  }

  function editWorkout(workout) {
    setEditingWorkout(workout);
  }

  function updateWorkout(updatedWorkout) {
    setWorkouts((prevWorkouts) => {
      return prevWorkouts.map((workout) => {
        if (workout.id === updatedWorkout.id) {
          return updatedWorkout;
        }

        return workout;
      });
    });

    setEditingWorkout(null);
  }

  function cancelEdit() {
    setEditingWorkout(null);
  }

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  let filteredWorkouts = workouts.filter((workout) => {

    const matchesSearch = workout.exercise
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMuscle =
      muscleFilter === "all" ||
      workout.muscleGroup === muscleFilter;

    return matchesSearch && matchesMuscle;
  });

  filteredWorkouts = [...filteredWorkouts].sort((a, b) => {

    if (sort === "newest") {
      return new Date(b.date) - new Date(a.date);
    }

    if (sort === "oldest") {
      return new Date(a.date) - new Date(b.date);
    }

    const volumeA =
      Number(a.sets) *
      Number(a.reps) *
      Number(a.weight);

    const volumeB =
      Number(b.sets) *
      Number(b.reps) *
      Number(b.weight);

    if (sort === "volume-high") {
      return volumeB - volumeA;
    }

    if (sort === "volume-low") {
      return volumeA - volumeB;
    }

    return 0;
  });

  return (
    <div className="app">

      <header className="app-header">
        <h1>Workout Tracker</h1>
        <p>Track your workouts and monitor your progress.</p>
      </header>

      <WorkoutForm
        addWorkout={addWorkout}
        editingWorkout={editingWorkout}
        updateWorkout={updateWorkout}
        cancelEdit={cancelEdit}
      />

      <WorkoutStats
        workouts={workouts}
      />

      <SearchBar
        onSearch={setSearch}
        onMuscleFilter={setMuscleFilter}
        onSort={setSort}
      />

      <WorkoutList
        workouts={filteredWorkouts}
        deleteWorkout={deleteWorkout}
        editWorkout={editWorkout}
      />

    </div>
  );
}

export default App;