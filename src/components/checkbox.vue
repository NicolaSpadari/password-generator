<template>
	<label class="flex items-center space-x-3 mr-auto">
		<input type="checkbox" @change="changeHandler()" :checked="checked" class="cursor-pointer form-tick appearance-none bg-gray-200 bg-check h-6 w-6 border border-gray-200 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none" />
		<span class="cursor-pointer text-gray-50 font-normal">
			<slot></slot>
		</span>
	</label>
</template>

<script setup>
	import { ref } from "vue";

	const emit = defineEmits(["check"]);
	const checked = ref(true);

	const changeHandler = () => {
		checked.value = !checked.value;
		emit("check", checked.value);
	};
</script>