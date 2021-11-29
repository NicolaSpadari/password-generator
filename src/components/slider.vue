<template>
	<div class="form-group">
		<div class="clay-range">
			<div class="clay-range-title">
				<span class="clay-range-value">{{ value }}</span>
			</div>
			<div class="clay-range-input" :data-label-min="min" :data-label-max="max">
				<input type="range" class="form-control-range" :min="min" :max="max" v-model="value" @change="updateValue()" />
				<div class="clay-range-track"></div>
				<div class="clay-range-progress" :style="'width:' + visualValue + '%'">
					<div class="clay-range-thumb"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed } from "vue";

	const emit = defineEmits(["slide"]);

	const min = 4;
	const max = 40;
	const value = ref(16);

	const visualValue = computed(() => {
		return (100 * value.value) / 40 - 4;
	});

	const updateValue = () => {
		emit("slide", value.value);
	};
</script>

<style scoped lang="scss">
	#ns-password-generator {
		.form-group {
			@apply relative mb-6;
		}

		.clay-range {
			@apply pb-[0.1px];

			&-title {
				@apply block font-semibold leading-[1] mb-2 text-center;
			}

			&-value {
				@apply text-gray-400;
			}

			&-input {
				@apply text-gray-400 block pb-[0.1px] relative align-middle w-full;

				&:before,
				&:after {
					@apply text-sm leading-[1] font-semibold mt-10 absolute text-center top-0 w-6;
				}

				&:before {
					content: attr(data-label-min);
					@apply left-0;
				}
				&:after {
					content: attr(data-label-max);
					@apply right-0;
				}

				.form-control-range {
					content: "1.5rem";
					@apply bg-transparent appearance-none cursor-pointer h-10 m-0 p-0 relative z-1 block w-full;
				}

				.clay-range-track,
				.clay-range-progress {
					@apply rounded-[100px] h-1 -mt-0.5 absolute top-2/4 w-full;
				}
				.clay-range-track {
					@apply bg-dark-600;
				}
				.clay-range-progress {
					@apply bg-blue-600;

					.clay-range-thumb {
						@apply bg-dark-900 shadow-sm rounded-[100px] border-0 h-6 -mt-3 absolute top-2/4 w-6 invisible;
					}
				}
			}
		}
	}
</style>