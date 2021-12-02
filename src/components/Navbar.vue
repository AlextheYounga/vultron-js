<template>
    <div>
        <Disclosure
            as="nav"
            class="bg-dark-mode-light"
        >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <h1 class="text-indigo-200">Vultron</h1>
                        </div>
                        <div class="block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <template
                                    v-for="(item, i) in navigation"
                                    :key="'nav_item'+item.key"
                                >
                                    <router-link
                                        :class="[(i === 0) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']"
                                        :to="item.link"
                                    >{{ item.title }}
                                    </router-link>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <button class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span class="sr-only">View notifications</span>
                                <BellIcon
                                    class="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>

                            <!-- Profile dropdown -->
                            <Menu
                                as="div"
                                class="ml-3 relative"
                            >
                                <div>
                                    <MenuButton class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span class="sr-only">Open user menu</span>
                                        <Avatar name="Alex Younger" />
                                    </MenuButton>
                                </div>
                                <transition
                                    enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95"
                                >
                                    <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem
                                            v-for="item in profile"
                                            :key="item"
                                            v-slot="{ active }"
                                        >
                                        <a
                                            href="#"
                                            :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                                        >{{ item }}</a>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </Disclosure>
        <Upload />
    </div>
    <router-view />

</template>

<script>
    import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { BellIcon } from '@heroicons/vue/outline'
    import Avatar from './Avatar.vue'

    const navigation = [
        { title: 'Test Link', key: 'link', link: '#' },
    ]
    const profile = ['Your Profile', 'Settings', 'Sign out']

    export default {
        components: {
            Avatar,
            Disclosure,
            Menu,
            MenuButton,
            MenuItem,
            MenuItems,
            BellIcon,
        },
        data() {
            return {
                uploadOpened: false,
                navigation,
                profile
            }
        },
    }
</script>