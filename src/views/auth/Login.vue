<template>
    <div class="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h1 class="text-indigo-700 text-4xl text-center">Vultron</h1>
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
                            for="email"
                            class="sr-only"
                        >Email</label>
                        <input
                            v-model="form.email"
                            id="email"
                            name="email"
                            autocomplete="email"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
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
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                    <VuelidateMessage v-model="v$.form.password" />

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
                        <a
                            href="#"
                            class="font-medium text-indigo-700"
                        >
                            Register
                        </a>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-800 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2"
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
                    email: null,
                    password: null,
                },
                errorMsg: false,
            }
        },
        validations() {
            return {
                form: {
                    email: { required },
                    password: { required },
                }
            }
        },
        methods: {
            async submit() {
                const isFormCorrect = await this.v$.$validate()
                if (isFormCorrect) {
                    let creds = { ...this.$data.form }
                    this.login(creds)
                }
            },
            async login(creds) {
                this.$electron.invoke('auth.login', creds).then((user) => {
                    if (!user) {
                        this.$data.errorMsg = 'Unknown login error'
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
