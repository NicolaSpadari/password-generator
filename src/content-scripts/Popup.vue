<template>
	<transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
		<div ref="target" class="popup" v-show="visible">
			<div class="mb-2 text-xl text-gray-50 sm:text-2xl dark:text-white">Password generator</div>

			<div class="p-6">
				<div class="mt-1 relative rounded-md shadow-sm">
					<input type="text" v-model="password" class="bg-dark-900 border-l border-b border-t py-2 px-4 border-gray-200 block w-full sm:text-sm rounded-md" placeholder="Choose at least one setting" readonly />
					<div class="bg-dark-900 absolute inset-y-0 right-0 flex items-center border-t border-r border-b border-gray-200 rounded-r-md">
						<button type="button" @click="generatePassword()" class="h-full bg-transparent text-gray-50 sm:text-sm px-2">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
							</svg>
						</button>
					</div>
				</div>

				<template v-if="passwordStrength == 4">
					<div class="grid w-full h-1 grid-cols-12 gap-4 mt-3">
						<div class="h-full col-span-3 bg-rainbow rounded"></div>
						<div class="h-full col-span-3 bg-rainbow rounded"></div>
						<div class="h-full col-span-3 bg-rainbow rounded"></div>
						<div class="h-full col-span-3 bg-rainbow rounded"></div>
					</div>

					<div class="mt-2 italic text-rainbow">Super strong password</div>
				</template>
				<template v-if="passwordStrength == 3">
					<div class="grid w-full h-1 grid-cols-12 gap-4 mt-3">
						<div class="h-full col-span-3 bg-green-500 rounded"></div>
						<div class="h-full col-span-3 bg-green-500 rounded"></div>
						<div class="h-full col-span-3 bg-green-500 rounded"></div>
						<div class="h-full col-span-3 bg-gray-200 rounded dark:bg-dark-1"></div>
					</div>

					<div class="mt-2 text-green-500">Strong password</div>
				</template>
				<template v-if="passwordStrength == 2">
					<div class="grid w-full h-1 grid-cols-12 gap-4 mt-3">
						<div class="h-full col-span-3 bg-blue-500 rounded"></div>
						<div class="h-full col-span-3 bg-blue-500 rounded"></div>
						<div class="h-full col-span-3 bg-gray-200 rounded dark:bg-dark-1"></div>
						<div class="h-full col-span-3 bg-gray-200 rounded dark:bg-dark-1"></div>
					</div>

					<div class="mt-2 text-blue-500">Medium password</div>
				</template>
				<template v-if="passwordStrength == 1">
					<div class="grid w-full h-1 grid-cols-12 gap-4 mt-3">
						<div class="h-full col-span-3 bg-red-500 rounded"></div>
						<div class="h-full col-span-3 bg-gray-200 rounded dark:bg-dark-1"></div>
						<div class="h-full col-span-3 bg-gray-200 rounded dark:bg-dark-1"></div>
						<div class="h-full col-span-3 bg-gray-200 rounded dark:bg-dark-1"></div>
					</div>

					<div class="mt-2 text-red-500">Weak password</div>
				</template>
				<template v-if="passwordStrength == 0">
					<div class="grid w-full h-1 grid-cols-12 gap-4 mt-3">
						<div class="h-full col-span-3 bg-gray-200 rounded dark:bg-dark-1"></div>
						<div class="h-full col-span-3 bg-gray-200 rounded dark:bg-dark-1"></div>
						<div class="h-full col-span-3 bg-gray-200 rounded dark:bg-dark-1"></div>
						<div class="h-full col-span-3 bg-gray-200 rounded dark:bg-dark-1"></div>
					</div>

					<div class="mt-2 italic text-gray-300">Calculating password strength...</div>
				</template>

				<slider @slide="updatePasswordLength" />

				<div class="flex flex-col space-y-4 mt-6">
					<checkbox @check="setUppercase">Use uppercase letters</checkbox>
					<checkbox @check="setLowercase">Use lowercase letters</checkbox>
					<checkbox @check="setNumbers">Use numbers</checkbox>
					<checkbox @check="setSymbols">Use symbols</checkbox>
				</div>

				<div class="mt-6">
					<button type="button" @click="copyPassword()" class="w-full px-4 py-2 font-medium tracking-wide text-gray-200 capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-80">
						{{ btnText }}
					</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import { onClickOutside } from "@vueuse/core";

	const password = ref("");
	const passwordLength = ref(16);
	const useUppercase = ref(true);
	const useLowercase = ref(true);
	const useNumbers = ref(true);
	const useSymbols = ref(true);
	const passwordStrength = ref(0);
	const visible = ref(false);
	const btnText = ref("Copy password");
	const target = ref(null);
	const clickedEl = ref(null);

	const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	const symbols = "!@#$%^&*()_+=";

	const strongPassword = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
	const mediumPassword = new RegExp("((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))");

	document.addEventListener("contextmenu", (e) => {
		clickedEl.value = e.target;
		console.log("clicked ", e.target);
	});

	const setUppercase = (data) => {
		useUppercase.value = data;
		generatePassword();
	};
	const setLowercase = (data) => {
		useLowercase.value = data;
		generatePassword();
	};
	const setNumbers = (data) => {
		useNumbers.value = data;
		generatePassword();
	};
	const setSymbols = (data) => {
		useSymbols.value = data;
		generatePassword();
	};

	const getUppercaseLetter = () => {
		return upperLetters[Math.floor(Math.random() * upperLetters.length)];
	};
	const getLowercaseLetter = () => {
		return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
	};
	const getNumber = () => {
		return numbers[Math.floor(Math.random() * numbers.length)];
	};
	const getSymbol = () => {
		return symbols[Math.floor(Math.random() * symbols.length)];
	};

	const checkPasswordStrength = () => {
		if (strongPassword.test(password.value) && password.value.length > 25) {
			passwordStrength.value = 4;
		} else if (strongPassword.test(password.value) && password.value.length > 15) {
			passwordStrength.value = 3;
		} else if (mediumPassword.test(password.value) && password.value.length > 7) {
			passwordStrength.value = 2;
		} else {
			passwordStrength.value = 1;
		}
	};

	const updatePasswordLength = (pwLength) => {
		passwordLength.value = pwLength;
		generatePassword();
	};

	const generateX = () => {
		let xs = [];

		if (useUppercase.value) {
			xs.push(getUppercaseLetter());
		}
		if (useLowercase.value) {
			xs.push(getLowercaseLetter());
		}
		if (useNumbers.value) {
			xs.push(getNumber());
		}
		if (useSymbols.value) {
			xs.push(getSymbol());
		}

		return xs[Math.floor(Math.random() * xs.length)] || "";
	};

	const generatePassword = () => {
		let pw = "",
			types = 0;

		if (useUppercase.value) {
			pw += getUppercaseLetter();
			types++;
		}

		if (useLowercase.value) {
			pw += getLowercaseLetter();
			types++;
		}

		if (useNumbers.value) {
			pw += getNumber();
			types++;
		}

		if (useSymbols.value) {
			pw += getSymbol();
			types++;
		}

		for (let i = 0; i < passwordLength.value; i++) {
			let x = generateX();
			pw += x;
		}

		password.value = pw.substring(0, pw.length - types);

		checkPasswordStrength();
	};

	const copyPassword = () => {
		try {
			let clip = document.createElement("input");

			document.body.appendChild(clip);
			clip.value = password.value;
			clip.select();
			document.execCommand("copy");
			document.body.removeChild(clip);
			btnText.value = "Password copied!";
		} catch (err) {
			btnText.value = "Try copying manually";
		}

		setTimeout(() => {
			btnText.value = "Copy password";
		}, 1500);
	};

	onClickOutside(target, () => {
		visible.value = false;
	});

	onMounted(async () => {
		chrome.runtime.sendMessage({ type: "POPUP_INIT" }, () => {
			generatePassword();
		});
	});

	chrome.runtime.onMessage.addListener((message) => {
		if (message.toggleVisible) {
			visible.value = !visible.value;
		}
		if (message.data && clickedEl.value != null) {
			console.log("data arrived: ", message.data);
			console.log("I'll compile " + clickedEl.value);

			generatePassword();
			clickedEl.value.value = password.value;
		}
	});
</script>

<style lang="scss">
	#ns-password-generator {
		.popup {
			@apply transform min-w-md fixed top-5 right-5 rounded-lg shadow-lg bg-dark-800 py-8 px-10 z-99999;
		}

		.text-rainbow {
			-webkit-animation: colorchange 7s infinite alternate;
			@apply font-semibold;
		}

		.bg-rainbow {
			-webkit-animation: bgcolorchange 7s infinite alternate;
		}

		@-webkit-keyframes colorchange {
			0% {
				@apply text-amber-400;
			}
			10% {
				@apply text-violet-500;
			}
			20% {
				@apply text-teal-500;
			}
			30% {
				@apply text-orange-400;
			}
			40% {
				@apply text-red-500;
			}
			50% {
				@apply text-blue-400;
			}
			60% {
				@apply text-green-500;
			}
			70% {
				@apply text-amber-500;
			}
			80% {
				@apply text-pink-400;
			}
			90% {
				@apply text-cyan-500;
			}
			100% {
				@apply text-green-600;
			}
		}

		@-webkit-keyframes bgcolorchange {
			0% {
				@apply bg-amber-400;
			}
			10% {
				@apply bg-violet-500;
			}
			20% {
				@apply bg-teal-500;
			}
			30% {
				@apply bg-orange-400;
			}
			40% {
				@apply bg-red-500;
			}
			50% {
				@apply bg-blue-400;
			}
			60% {
				@apply bg-green-500;
			}
			70% {
				@apply bg-amber-500;
			}
			80% {
				@apply bg-pink-400;
			}
			90% {
				@apply bg-cyan-500;
			}
			100% {
				@apply bg-green-600;
			}
		}
	}
</style>