<script>
    import TaskForm from './TaskForm.svelte';
    import {tasksStore} from '../stores';

    import {onMount} from 'svelte'

    import { crossfade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { flip } from 'svelte/animate';

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

	const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

    const fetchAllTasksForUser = () => {
        fetch('http://localhost:4200/api/v1/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.getItem('authToken')}`
            }
        })
        .then(res => res.json())
        .then(res => {
            $tasksStore = res.ok;
        })
    }

    onMount(() => {
        fetchAllTasksForUser();
    });

    const deleteAPI = (task) => {
        fetch(`http://localhost:4200/api/v1/tasks/${task._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.getItem('authToken')}`
            }
        })
        remove(task);
        dispatch('task-deleted');
    }

    const updateAPI = (task) => {
        fetch(`http://localhost:4200/api/v1/tasks/${task._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                done: task.done
            })
        })
    }

    const addTask = () => {
        fetchAllTasksForUser();
        dispatch('task-added');
    }

    const remove = (task) => {
        $tasksStore = $tasksStore.filter(t => t._id !== task._id);
    }

    const mark = (task, done) => {
        task.done = done;
        remove(task);
        $tasksStore = $tasksStore.concat(task);
        updateAPI(task);
    }
</script>

<h1>What needs to be done?</h1>
<TaskForm on:task-added={addTask}/>
<h2>Your Tasks</h2>
<div>
    <ul>
        <li>
            <h3>Todo</h3>
        </li>
        {#each $tasksStore.filter(t => !t.done) as task (task._id)}
        <li
            in:receive="{{key: task._id}}"
            out:send="{{key: task._id}}"
            animate:flip="{{duration: 200}}"
            class="task">
            <input type="checkbox" on:change={() => {mark(task, true)}}>
            <div class="task-data">
                <p class="task-title">{task.title}</p>
                <p class="task-description">{task.description}</p>
            </div>
            <button on:click={() => {deleteAPI(task)}}>Delete</button>
        </li>
    {/each}
    </ul>
    <ul>
        <li>
            <h3>Done</h3>
        </li>
        {#each $tasksStore.filter(t => t.done) as task (task._id)}
            <li 
                in:receive="{{key: task._id}}"
                out:send="{{key: task._id}}"
                animate:flip="{{duration: 200}}"
                class="task task-done">
                <input type="checkbox" checked on:change={() => {mark(task, false)}}>
                <div class="task-data">
                    <p class="task-title">{task.title}</p>
                    <p class="task-description">{task.description}</p>
                </div>
                <button on:click={() => {deleteAPI(task)}}>Delete</button>
            </li>
        {/each}
    </ul>
</div>

<style>
    div{
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 1rem;
    }
    ul{
        display: flex;
        flex-direction: column;
        list-style: none;
        gap: 0.5rem;
        width: 50%;
        padding-left: 0;
    }
    li.task{
        display: flex;
        align-items: center;
        background-color: #f5f5f5;
        border-radius: 5px;
    }

    input[type="checkbox"]{
        width: 3rem;
    }

    .task-data{
        display: flex;
        flex-direction: column;
        margin: 0.5rem 0;
    }

    .task-done{
        background-color: #e5e5e5;
        color: #989898;
    }
    
    .task-title{
        font-weight: bold;
        margin: 0;
    }


    .task-description{
        font-size: 0.8rem;
        background-color: #fff;
        border-radius: 5px;
        margin: 0 1rem;
        padding: 0 0.5rem;
        text-align: left;
    }
</style>