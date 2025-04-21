<script>
    import { enhance } from "$app/forms";
	import Warning1 from "$lib/components/Warning1.svelte";
        export let form;
    </script>
    
    <div>
    
    
        <form action="?/login" method="POST" use:enhance>
    
            <label for="email">E-Mail</label>
            <input type="text" name="email" id="email" required>
    
            <label for="password">Password</label>
            <input type="password" name="password" id="password" required>
    
            <button type="submit">Login</button>
    
            {#if form}
    
            <Warning1 message={form.message} />
    
            {/if}
    
    
        </form>
    
    
    
    
    </div>