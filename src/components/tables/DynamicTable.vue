<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    v-for="field in tableStruct"
                                    :key="'table_header_' + field.name"
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {{ field.header }}
                                </th>

                                <th
                                    scope="col"
                                    class="relative px-6 py-3"
                                >
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr
                                v-for="item in items"
                                :key="'item_' + item.id"
                            >
                                <td
                                    v-for="field in tableStruct"
                                    :key="'table_field' + field.name"
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    <span v-if="field.name == 'status'">
                                        <status-bubble :status="customer.status" />
                                    </span>
                                    <span v-else>{{ item[field.name] }}</span>

                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a
                                        href="#"
                                        class="text-indigo-600 hover:text-indigo-900"
                                    >Edit</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import StatusBubble from '../fields/StatusBubble.vue'

    export default {
        components: {
            StatusBubble
        },
        props: {
			model: String,
            items: Object,
            paginate: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            let fields = this.$schema[this.$props.model]
            let tableStruct = this.buildTableStruct(fields)

            return {
                fields,
                tableStruct,
            }
        },
        methods: {
            buildTableStruct(fields) {
                let structure = []

                for (let field of fields) {
                    if (['id', 'created_at', 'updated_at'].includes(field) == false) {
                        structure.push({
                            ...field,
                            header: this.$helpers.formatFieldName(field.name)
                        })
                    }
                }
                return structure
            },
        }

    }
</script>