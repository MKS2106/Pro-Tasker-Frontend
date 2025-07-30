function TasksPage({
    title, description, taskDueDate, setTitle, setDescription, setTaskDueDate, onSubmit, isEditing
}){
    return(
        <form className="flex flex-col space-y-4 mt-3" onSubmit={onSubmit}>
        <div>
          <label htmlFor="title" />
          <input
            className="border rounded px-3 py-2 w-full"
            type="text"
            name="title"
            value={title}
            placeholder="Task Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description" />
          <input
            className="border rounded px-3 py-2 w-full"
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="taskDueDate">Due date</label>
          <input
            className="border rounded px-3 py-2 w-full"
            type="date"
            name="taskDueDate"
            // placeholder="DueDate"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
            // required
          />
        </div>

        <input
          className="border bg-sky-100 font-bold rounded p-1 text-blue-800"
          type="submit"
          value= {isEditing ? "Update Task" : "AddTask"}
        />
      </form>
    )

}
export default TasksPage