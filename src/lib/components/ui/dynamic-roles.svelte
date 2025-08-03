<script lang="ts">
	import { onMount } from 'svelte';

	const roles = ['Entrepreneur', 'Designer', 'Developer', 'Gamer', 'Trader', 'Photographer'];

	let currentRoleIndex = 0;
	let displayText = '';
	let isTyping = true;
	let charIndex = 0;

	const typeSpeed = 100;
	const deleteSpeed = 50;
	const pauseTime = 2000;

	function typeWriter() {
		const currentRole = roles[currentRoleIndex];

		if (isTyping) {
			if (charIndex < currentRole.length) {
				displayText = currentRole.substring(0, charIndex + 1);
				charIndex++;
				setTimeout(typeWriter, typeSpeed);
			} else {
				setTimeout(() => {
					isTyping = false;
					typeWriter();
				}, pauseTime);
			}
		} else {
			if (charIndex > 0) {
				displayText = currentRole.substring(0, charIndex - 1);
				charIndex--;
				setTimeout(typeWriter, deleteSpeed);
			} else {
				isTyping = true;
				currentRoleIndex = (currentRoleIndex + 1) % roles.length;
				setTimeout(typeWriter, typeSpeed);
			}
		}
	}

	onMount(() => {
		typeWriter();
	});
</script>

<span class="inline-block">
	I'm <span class="typewriter-text font-semibold text-primary"
		>{displayText}<span class="cursor">|</span></span
	>
</span>

<style>
	.typewriter-text {
		min-width: 140px;
		display: inline-block;
		text-align: left;
	}

	.cursor {
		animation: blink 1s infinite;
		color: hsl(var(--primary));
	}

	@keyframes blink {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0;
		}
	}
</style>
