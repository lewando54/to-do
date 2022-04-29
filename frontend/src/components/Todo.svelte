<script>
    import TaskForm from './TaskForm.svelte';
</script>
<h1>What needs to be done?</h1>
<div>
    <TaskForm />
</div>

<style>
    div{
        width: 100%;
    }

    @media screen and (min-width: 768px) {
        div{
            width: 40%;
        }
    }
</style>