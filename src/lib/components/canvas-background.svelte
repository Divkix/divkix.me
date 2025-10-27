<script lang="ts">
	import { onMount } from 'svelte';
	import { mode } from 'mode-watcher';

	interface Props {
		speed?: number;
		density?: number;
		maxBranches?: number;
		branchProbability?: number;
		lineWidth?: number;
		maxDepth?: number;
		minLength?: number;
		maxLength?: number;
		angleVariation?: number;
		opacity?: number;
		lightColor?: string;
		darkColor?: string;
	}

	let {
		speed = 1,
		density = 0.3,
		maxBranches = 50,
		branchProbability = 0.015,
		lineWidth = 1,
		maxDepth = 8,
		minLength = 10,
		maxLength = 40,
		angleVariation = Math.PI / 3,
		opacity = 0.15,
		lightColor = 'rgba(0, 0, 0, {opacity})',
		darkColor = 'rgba(255, 255, 255, {opacity})'
	}: Props = $props();

	interface Point {
		x: number;
		y: number;
	}

	interface Branch {
		start: Point;
		end: Point;
		angle: number;
		depth: number;
		progress: number;
		speed: number;
		hasSpawned: boolean;
		opacity: number;
	}

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let branches: Branch[] = [];
	let animationId: number;
	let lastSpawnTime = 0;

	const currentColor = $derived(mode.current === 'dark' ? darkColor : lightColor);

	function resizeCanvas() {
		if (!canvas) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	function getSpawnPoint(): Point {
		const side = Math.floor(Math.random() * 4);
		const width = window.innerWidth;
		const height = window.innerHeight;

		switch (side) {
			case 0: // Top
				return { x: Math.random() * width, y: 0 };
			case 1: // Right
				return { x: width, y: Math.random() * height };
			case 2: // Bottom
				return { x: Math.random() * width, y: height };
			case 3: // Left
				return { x: 0, y: Math.random() * height };
			default:
				return { x: width / 2, y: height / 2 };
		}
	}

	function getInitialAngle(point: Point): number {
		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;
		const baseAngle = Math.atan2(centerY - point.y, centerX - point.x);
		const variation = (Math.random() - 0.5) * (Math.PI / 2);
		return baseAngle + variation;
	}

	function createBranch(
		start: Point,
		angle: number,
		depth: number,
		parentOpacity?: number
	): Branch {
		const length = minLength + Math.random() * (maxLength - minLength);
		const end: Point = {
			x: start.x + Math.cos(angle) * length,
			y: start.y + Math.sin(angle) * length
		};

		const branchOpacity = parentOpacity
			? parentOpacity * (0.7 + Math.random() * 0.3)
			: 0.8 + Math.random() * 0.2;

		return {
			start,
			end,
			angle,
			depth,
			progress: 0,
			speed: (0.5 + Math.random() * 1) * speed,
			hasSpawned: false,
			opacity: branchOpacity
		};
	}

	function spawnNewBranch() {
		if (branches.length >= maxBranches) return;

		const start = getSpawnPoint();
		const angle = getInitialAngle(start);
		branches.push(createBranch(start, angle, 0));
	}

	function spawnChildBranches(parent: Branch) {
		if (parent.depth >= maxDepth) return;
		if (branches.length >= maxBranches) return;

		const numBranches = Math.random() < 0.5 ? 2 : 1;

		for (let i = 0; i < numBranches; i++) {
			const angleOffset =
				(Math.random() - 0.5) * angleVariation +
				(i === 0 ? -0.3 : 0.3) * (numBranches === 2 ? 1 : 0);
			const newAngle = parent.angle + angleOffset;

			const currentPoint: Point = {
				x: parent.start.x + (parent.end.x - parent.start.x) * parent.progress,
				y: parent.start.y + (parent.end.y - parent.start.y) * parent.progress
			};

			branches.push(createBranch(currentPoint, newAngle, parent.depth + 1, parent.opacity));
		}
	}

	function isPointInBounds(point: Point): boolean {
		const margin = 100;
		return (
			point.x >= -margin &&
			point.x <= window.innerWidth + margin &&
			point.y >= -margin &&
			point.y <= window.innerHeight + margin
		);
	}

	function drawBranch(branch: Branch) {
		if (!ctx) return;

		const currentX = branch.start.x + (branch.end.x - branch.start.x) * branch.progress;
		const currentY = branch.start.y + (branch.end.y - branch.start.y) * branch.progress;

		ctx.beginPath();
		ctx.moveTo(branch.start.x, branch.start.y);
		ctx.lineTo(currentX, currentY);
		ctx.strokeStyle = currentColor.replace('{opacity}', String(opacity * branch.opacity));
		ctx.lineWidth = lineWidth * (1 - (branch.depth / maxDepth) * 0.5);
		ctx.lineCap = 'round';
		ctx.stroke();
	}

	function animate() {
		if (!ctx || !canvas) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const now = Date.now();
		if (now - lastSpawnTime > 1000 / density && branches.length < maxBranches) {
			spawnNewBranch();
			lastSpawnTime = now;
		}

		for (let i = branches.length - 1; i >= 0; i--) {
			const branch = branches[i];

			branch.progress += 0.02 * branch.speed;

			if (branch.progress >= 1) {
				branches.splice(i, 1);
				continue;
			}

			if (
				branch.progress > 0.3 &&
				!branch.hasSpawned &&
				Math.random() < branchProbability * (maxDepth - branch.depth)
			) {
				branch.hasSpawned = true;
				spawnChildBranches(branch);
			}

			const currentPoint: Point = {
				x: branch.start.x + (branch.end.x - branch.start.x) * branch.progress,
				y: branch.start.y + (branch.end.y - branch.start.y) * branch.progress
			};

			if (!isPointInBounds(currentPoint)) {
				branches.splice(i, 1);
				continue;
			}

			drawBranch(branch);
		}

		animationId = requestAnimationFrame(animate);
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		if (!ctx) return;

		resizeCanvas();

		const handleResize = () => {
			resizeCanvas();
			branches = [];
		};

		window.addEventListener('resize', handleResize);

		animate();

		return () => {
			window.removeEventListener('resize', handleResize);
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	});
</script>

<canvas bind:this={canvas} class="pointer-events-none fixed inset-0 z-0" aria-hidden="true"
></canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
