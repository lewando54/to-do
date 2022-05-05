<script>
    import TaskForm from './TaskForm.svelte';
    import {tasksStore} from '../stores';

    import {onMount} from 'svelte'

    import { crossfade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { flip } from 'svelte/animate';

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
            console.log("fetchAllTasksForUser: ", $tasksStore);
        })
    }

    onMount(() => {
        fetchAllTasksForUser();
    });

    const remove = (task) => {
        $tasksStore = $tasksStore.filter(t => t._id !== task._id);
    }

    const mark = (task, done) => {
        task.done = done;
        remove(task);
        $tasksStore = $tasksStore.concat(task);
    }
</script>

<h1>What needs to be done?</h1>
<TaskForm />
<h2>Tasks</h2>
<div>
    <ul>
        {#each $tasksStore.filter(t => !t.done) as task (task._id)}
        <li
            in:receive="{{key: task._id}}"
            out:send="{{key: task._id}}"
            animate:flip="{{duration: 200}}">
            <input type="checkbox" on:change={() => {mark(task, true)}}>
            <div class="task-data">
                <p class="task-title">{task.title}</p>
                <p class="task-description">{task.description}</p>
            </div>
        </li>
    {/each}
    </ul>
    <ul>
        {#each $tasksStore.filter(t => t.done) as task (task._id)}
            <li 
                in:receive="{{key: task._id}}"
                out:send="{{key: task._id}}"
                animate:flip="{{duration: 200}}"
                class="task-done">
                <input type="checkbox" checked on:change={() => {mark(task, false)}}>
                <div class="task-data">
                    <p class="task-title">{task.title}</p>
                    <p class="task-description">{task.description}</p>
                </div>
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
        gap: 0.5rem;
        width: 50%;
        padding-left: 0;
    }
    li{
        list-style: none;
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