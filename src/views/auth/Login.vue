<template>
    <div class="min-h-screen bg-dark-mode-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h1 class="text-gold text-4xl">Vultron JS</h1>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">
                    Sign in to your account
                </h2>
            </div>
            <form
                class="mt-8 space-y-6"
                @submit.prevent="submit()"
                method="POST"
            >
                <input
                    type="hidden"
                    name="remember"
                    value="true"
                />
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label
                            for="username"
                            class="sr-only"
                        >Username</label>
                        <input
                            v-model="form.username"
                            id="username"
                            name="username"
                            autocomplete="username"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 focus:z-10 sm:text-sm"
                            placeholder="Username"
                        />
                    </div>
                    <VuelidateMessage v-model="v$.form.username" />
                    <div>
                        <label
                            for="password"
                            class="sr-only"
                        >Password</label>
                        <input
                            v-model="form.password"
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                    <VuelidateMessage v-model="v$.form.password" />

                </div>

                <div v-if="notFound">
                    <p class="text-red-500">{{ notFound }}</p>
                </div>

                <div class="flex items-center justify-between">
                    <div class="text-sm">
                        <a
                            href="#"
                            class="font-medium text-gold hover:text-yellow-300"
                        >
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-gold hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
                    >
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LockClosedIcon
                                class="h-5 w-5 text-gray-800"
                                aria-hidden="true"
                            />
                        </span>
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { LockClosedIcon } from '@heroicons/vue/solid'
    import useVuelidate from '@vuelidate/core'
    import VuelidateMessage from '@/components/errors/VuelidateMessage.vue'
    import { required } from '@vuelidate/validators'

    export default {
        components: {
            VuelidateMessage,
            LockClosedIcon,
        },
        setup: () => ({ v$: useVuelidate() }),
        data() {
            return {
                form: {
                    username: null,
                    password: null,
                },
                notFound: false,
            }
        },
        validations() {
            return {
                form: {
                    username: { required },
                    password: { required },
                }
            }
        },
        methods: {
            async submit() {
                const isFormCorrect = await this.v$.$validate()
                if (isFormCorrect) {
                    /*
                    * Electron ipcMain example 
                    */
                    this.$api.on('login', (event, arg) => { //function that fires when a response is received from 'login' event
                        let user = arg
                        if (!user) return
                        if (user instanceof Error) { // Error handling
                            this.$data.notFound = user.message
                            return
                        }
                        if (user.id) {
                            this.$router.push('dashboard') // Go to dashboard
                        }
                    })
                    this.$api.send('login', {  // fire login call to ipcMain
                        username: this.$data.form.username,
                        password: this.$data.form.password
                    })
                }
            }
        }
    }
</script>
