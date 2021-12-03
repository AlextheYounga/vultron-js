<template>
    <div>
        <label
            :for="id"
            class="block text-sm font-medium text-gray-900"
        >
            {{label}}
        </label>
        <div class="mt-1">
            <input
                autocomplete="off"
                class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                :type="type"
                :value="displayValue"
                :placeholder="placeholder || displayValue"
                :name="id"
                :id="id"
                :inputmode="inputmode"
                :pattern="pattern"
                :list="list"
                :required="required"
                :readonly="readonly"
                :minlength="minlength"
                :maxlength="maxlength"
                @input="$emit('update:modelValue', $event.target.value)"
            />
            <!-- <span> {{ errorMessage}} </span> -->
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            modelValue: String,
            label: String,
            placeholder: String,
            type: {
                type: String,
                default: "text"
            },
            required: {
                type: Boolean,
                default: false,
            },
            readonly: {
                type: Boolean,
                default: false,
            },
            pattern: {
                type: String,
                default: '.*'
            },
            inputmode: {
                type: String,
                default: 'text'
            },
            list: {
                type: String,
                default: ''
            },
            maxlength: {
                type: String,
                default: '',
            },
            minlength: {
                type: String,
                default: ''
            }
        },
        setup(props) {
            return props
        },
        data() {
            return { id: "" }
        },
        emits: ['update:modelValue'],
        computed: {
            displayValue: function () {
                let modelVal = this.$props.modelValue
                let type = this.$props.type
                if (modelVal) {
                    if (type == 'date') {
                        return (this.$helpers.formattedDate(modelVal))
                    }
                    return modelVal
                }
                return ''
            }
        },

        mounted() {
            this.$data.id = "FormInput-" + Math.random().toString(16).substring(2)
        }
    }
</script>
