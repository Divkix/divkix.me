<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		roles: string[];
		prefix?: string;
		typeSpeed?: number;
		deleteSpeed?: number;
		pauseTime?: number;
	}

	const {
		roles,
		prefix = "I'm",
		typeSpeed = 100,
		deleteSpeed = 50,
		pauseTime = 2000
	}: Props = $props();

	let currentRoleIndex = $state(0);
	let displayText = $state('');
	let isTyping = $state(true);
	let charIndex = $state(0);

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
	{prefix}
	<span class="typewriter-text font-semibold text-primary"
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
