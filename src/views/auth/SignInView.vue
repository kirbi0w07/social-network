<template lang="">
  <form class='flex flex-col gap-3'>
    <h2 class='text-center font-bold text-xl text-slate-900'>Sign In</h2>
    <label for="email" class='px-2 text-sm font-bold w-fit'>Email</label>
    <input type='email' label='Email' name='email' id='email' class='rounded-md bg-slate-100 p-2 outline-0'>
    <label for="password" class='px-2 text-sm font-bold w-fit'>Password</label>
    <input type='password' label='Password' name='password' id='password' class='rounded-md bg-slate-100 p-2 outline-0'>

    <p class='text-center'>don't have an account? <small class='text-blue-700'><router-link to='/auth/sign-up'>Sign Up</router-link></small></p>
  </form>
</template>
<script setup lang="ts">

</script>
<style lang="">

</style>
