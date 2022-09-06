<template>
    <div class="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h1 class="text-indigo-700 text-4xl text-center">Vultron</h1>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">
                    Create a New Account
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
                            for="name"
                            class="sr-only"
                        >Name</label>
                        <input
                            v-model="form.name"
                            id="name"
                            name="name"
                            autocomplete="name"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
                            placeholder="Name"
                        />
                    </div>
                    <VuelidateMessage v-model="v$.form.name" />
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
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                            placeholder="Username"
                        />
                    </div>
                    <VuelidateMessage v-model="v$.form.username" />
                    <div>
                        <label
                            for="email"
                            class="sr-only"
                        >Email</label>
                        <input
                            v-model="form.email"
                            id="email"
                            name="email"
                            autocomplete="email"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                            placeholder="Email"
                        />
                    </div>
                    <VuelidateMessage v-model="v$.form.email" />
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
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                    <VuelidateMessage v-model="v$.form.password" />
                    <div>
                        <label
                            for="password_confirmation"
                            class="sr-only"
                        >Password Confirmation</label>
                        <input
                            v-model="form.password_confirmation"
                            id="password"
                            name="password_confirmation"
                            type="password"
                            autocomplete="current-password"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm"
                            placeholder="Password Confirmation"
                        />
                    </div>
                    <VuelidateMessage v-model="v$.form.password_confirmation" />

                </div>

                <div v-if="errorMsg">
                    <p class="text-red-500">{{ errorMsg }}</p>
                </div>

                <div class="flex items-center justify-between">
                    <div class="text-sm">
                        <a
                            href="#"
                            class="font-medium text-indigo-700"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <div class="text-sm">
                        <router-link
                            class="font-medium text-indigo-700"
                            to="login"
                        >Login
                        </router-link>
                    </div>

                </div>

                <div>
                    <button
                        type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-indigo-700 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2"
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
    import { required, sameAs } from '@vuelidate/validators'

    export default {
        components: {
            VuelidateMessage,
            LockClosedIcon,
        },
        setup: () => ({ v$: useVuelidate() }),
        data() {
            return {
                form: {
                    name: null,
                    username: null,
                    email: null,
                    password: null,
                    password_confirmation: null,
                },
                errorMsg: false,
            }
        },
        validations() {
            return {
                form: {
                    name: { required },
                    username: { required },
                    email: { required },
                    password: { required },
                    password_confirmation: {
                        required,
                        sameAsPassword: sameAs(this.form.password)
                    },
                }
            }
        },
        methods: {
            async submit() {
                const isFormCorrect = await this.v$.$validate()
                if (isFormCorrect) {
                    let creds = { ...this.$data.form }
                    this.register(creds)
                }
            },
            async register(creds) {
                this.$electron.invoke('auth.register', creds).then((user) => {
                    if (!user) {
                        this.$data.errorMsg = 'Unknown registration error'
                        return
                    }
                    if (user instanceof Error) {
                        this.$data.errorMsg = user.message
                        return
                    }
                    if (user.id && this.$session.set(user.id)) {
                        this.$router.push('dashboard')
                    }
                })
            }
        },
    }
</script>
