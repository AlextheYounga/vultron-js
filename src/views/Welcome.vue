
<template>
    <div class="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div class="py-16">
                <div class="text-center">
                    <h1 class="mt-2 text-4xl font-extrabold text-indigo-700 tracking-tight sm:text-5xl">Vultron JS</h1>
                    <p class="mt-2 text-base text-gray-600">Electron | Vue | Knex & Bookshelf | SQL | Tailwind | MVC</p>
                    <div class="flex justify-center mt-6 w-1/3 mx-auto">
                        <button
                            @click="pingApi()"
                            class="bg-indigo-600 flex font-medium hover:text-indigo-500 items-center justify-evenly mx-auto p-2 rounded text-base text-white w-24"
                        >Ping API
                        </button>
                        <button
                            @click="pingDB()"
                            class="bg-indigo-600 flex font-medium hover:text-indigo-500 items-center justify-evenly mx-auto p-2 rounded text-base text-white w-24"
                        >Ping DB
                        </button>
                        <router-link
                            class="bg-indigo-600 flex font-medium hover:text-indigo-500 items-center justify-evenly mx-auto p-2 rounded text-base text-white w-24"
                            to="/login"
                        >Login
                            <span>
                                <LoginIcon
                                    class="h-5 w-5 text-white mx-1"
                                    aria-hidden="true"
                                />
                            </span>
                        </router-link>

                    </div>
                    <p
                        v-if="apiValue"
                        class="py-3"
                    > {{ apiValue }} </p>
                    <div
                        v-if="dbValue"
                        class="py-3 w-1/4 mx-auto"
                    >
                        <p
                            v-for="key of Object.keys(dbValue)"
                            :key="key"
                            class="text-center"
                        >{{ key }}: {{ dbValue[key] }} </p>
                    </div>
                </div>
            </div>
        </main>
        <footer class="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <nav class="flex justify-center space-x-4">
                <a
                    href="https://www.alextheyounger.me/"
                    class="text-sm font-medium text-gray-500 hover:text-gray-600"
                >by Alex Younger</a>
            </nav>
        </footer>
    </div>
</template>
<script>
    import { LoginIcon } from '@heroicons/vue/solid'

    export default {
        components: {
            LoginIcon,
        },
        data() {
            return {
                // The value should be instantiated here. If you work with Vue you should be used to doing that already.
                apiValue: null,
                dbValue: null,
            }
        },
        methods: {
            pingApi() {
                this.$api.send('api.ping')

                this.$api.on('api.ping', (event, arg) => {
                    console.log(arg)
                    this.$data.apiValue = arg // This will change the value of apiValue as soon as it returns.
                })
            },
            pingDB() {
				this.$api.send('db.ping')
				
                this.$api.on('db.ping', (event, arg) => {
                    console.log(arg)
                    this.$data.dbValue = arg[0] // This will change the value of apiValue as soon as it returns.
                })
                
            }
        }

    }
</script>
