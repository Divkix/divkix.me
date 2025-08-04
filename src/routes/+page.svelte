<script lang="ts">
	import {
		Button,
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		DynamicRoles,
		ModeToggle,
		SimpleIcon
	} from '$lib/components/ui/index.js';
	import { siGithub, siX, siInstagram, siTelegram } from 'simple-icons';
	import {
		Linkedin,
		Mail,
		ExternalLink,
		MapPin,
		Calendar,
		GraduationCap,
		Briefcase,
		Code,
		Globe as Web
	} from 'lucide-svelte';

	const skills = [
		{ name: 'Python', level: 100 },
		{ name: 'HTML', level: 100 },
		{ name: 'Go', level: 95 },
		{ name: 'Java', level: 75 },
		{ name: 'Rust', level: 65 },
		{ name: 'C/C++', level: 55 },
		{ name: 'JavaScript/TypeScript', level: 90 },
		{ name: 'Party', level: 100 }
	];

	const projects = [
		{
			title: 'Divide Projects',
			description:
				'An Non-Profit Organization in Telegram for making Automation Bots and other Open-Source Projects.',
			link: 'https://divideprojects.t.me',
			icon: Code
		},
		{
			title: 'ASU Capstone',
			description: 'A web platform for managing and showcasing capstone projects at ASU.',
			link: 'https://betasubmission.asucapstone.com/about',
			icon: Web
		}
	];

	const facts = [
		{ label: 'Happy Users', value: '100K+', icon: '😊' },
		{ label: 'Projects', value: '12', icon: '📁' },
		{ label: 'Hours Of Support', value: '56', icon: '🎧' }
	];

	const experience = [
		{
			title: 'Team Leader - Internship with IBM and UC Berkeley',
			period: '2021',
			company: 'UC Berkeley, Berkeley, California',
			description: [
				'Lead in the design, development, and implementation of the graphic, layout, and production communication materials',
				'Delegate tasks to the 2 members of the team and provide counsel on all aspects of the project',
				'Supervise the assessment of all materials in order to ensure quality and accuracy of the final product',
				'Oversee the efficient use of production project budgets ranging from $2,000 - $25,000'
			]
		},
		{
			title: 'Team Leader - GPCSSI 2021',
			period: '2021',
			company: 'Gurgaon Police, Gurgaon, Haryana, India',
			description: [
				'Developed an AI based system to detect certain kind of weapons',
				'Managed up to 3 projects or tasks at a given time while under pressure',
				'Recommended and consulted with clients on the most appropriate approach to utilise the AI model and use most out of it'
			]
		}
	];
</script>

<svelte:head>
	<title>Divanshu Chauhan - Divkix</title>
	<meta
		name="description"
		content="Divanshu Chauhan Official Website - Entrepreneur, Designer, Developer, Trader"
	/>
	<meta
		name="keywords"
		content="divkix, divanshu chauhan, divanshu divkix, divanshu div, chauhan, divanshu"
	/>
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header
		class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
	>
		<div class="container mx-auto flex items-center justify-between px-4 py-4">
			<h1 class="text-2xl font-bold">Divkix</h1>
			<ModeToggle />
		</div>
	</header>

	<!-- Hero Section -->
	<section class="relative overflow-hidden py-20 text-center">
		<div class="relative z-10 container mx-auto px-4">
			<div class="mb-8">
				<img
					src="/assets/img/profile-img.webp"
					alt="Divanshu Chauhan"
					class="mx-auto mb-6 h-32 w-32 rounded-full border-4 border-primary/20"
				/>
			</div>
			<h2 class="mb-6 text-4xl font-bold md:text-6xl">Divanshu Chauhan</h2>
			<p class="mb-8 text-xl text-muted-foreground md:text-2xl">
				<DynamicRoles />
			</p>
			<div class="mb-8 flex flex-wrap justify-center gap-4">
				<a
					href="https://github.com/divkix"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-input bg-background px-8 text-sm font-medium whitespace-nowrap ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
				>
					<SimpleIcon icon={siGithub} class="h-4 w-4" />
					GitHub
				</a>
			</div>
			<div class="flex justify-center gap-6">
				<Button
					variant="ghost"
					size="icon"
					onclick={() => window.open('https://twitter.com/divkix', '_blank')}
				>
					<SimpleIcon icon={siX} />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onclick={() => window.open('https://instagram.com/_divkix', '_blank')}
				>
					<SimpleIcon icon={siInstagram} />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onclick={() => window.open('https://www.linkedin.com/in/divkix', '_blank')}
				>
					<Linkedin class="h-5 w-5" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onclick={() => window.open('https://t.me/divkix', '_blank')}
				>
					<SimpleIcon icon={siTelegram} />
				</Button>
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section class="bg-muted/50 py-20">
		<div class="container mx-auto px-4">
			<h3 class="mb-12 text-center text-3xl font-bold">About</h3>
			<div class="mx-auto max-w-4xl">
				<p class="mb-8 text-center text-lg text-muted-foreground">
					As a Grad student studying at ASU Tempe, I am an individual with a passion for business
					and coding. In addition to my academic pursuits, I enjoy working on side projects,
					trekking, playing soccer, and socializing with people. My diverse interests reflect my
					outgoing personality and my desire to experience all that life has to offer. I am always
					seeking out new challenges and opportunities to expand my skillset and knowledge.
				</p>

				<div class="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle class="flex items-center gap-2">
								<GraduationCap class="h-5 w-5" />
								Developer
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p class="mb-4 text-muted-foreground">
								A proficient programmer with a passion for coding and a love for business.
							</p>
							<div class="space-y-2 text-sm">
								<div class="flex items-center gap-2">
									<Calendar class="h-4 w-4 text-primary" />
									<strong>Birthday:</strong> January 9, 2003
								</div>
								<div class="flex items-center gap-2">
									<ExternalLink class="h-4 w-4 text-primary" />
									<strong>Website:</strong>
									<a href="https://divkix.me" class="text-primary hover:underline"
										>https://divkix.me</a
									>
								</div>
								<div class="flex items-center gap-2">
									<MapPin class="h-4 w-4 text-primary" />
									<strong>City:</strong> Tempe, Arizona, USA
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle class="flex items-center gap-2">
								<Briefcase class="h-5 w-5" />
								Professional Info
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="space-y-2 text-sm">
								<div class="flex items-center gap-2">
									<strong>Age:</strong> 22
								</div>
								<div class="flex items-center gap-2">
									<strong>Degree:</strong> MS Computer Science
								</div>
								<div class="flex items-center gap-2">
									<Mail class="h-4 w-4 text-primary" />
									<strong>Email:</strong>
									<a href="mailto:divkix@divkix.me" class="text-primary hover:underline"
										>divkix@divkix.me</a
									>
								</div>
								<div class="flex items-center gap-2">
									<strong>Freelance:</strong> Available
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<p class="text-center text-muted-foreground">
					As someone who started coding in high school, I have since devoted myself to continually
					learning new technologies. I am highly motivated to improve my skills and knowledge, and
					am always on the lookout for opportunities to collaborate with others and contribute to
					exciting projects. With my enthusiasm and my dedication to personal growth, I am confident
					that I can make valuable contributions to any team or project.
				</p>
			</div>
		</div>
	</section>

	<!-- Facts Section -->
	<section class="py-20">
		<div class="container mx-auto px-4">
			<h3 class="mb-6 text-center text-3xl font-bold">Facts</h3>
			<p class="mx-auto mb-12 max-w-3xl text-center text-muted-foreground">
				The products I have developed have been used by over 1 million users, demonstrating my
				ability to create impactful solutions that meet the needs of a large and diverse audience.
			</p>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				{#each facts as fact (fact.label)}
					<Card class="text-center">
						<CardContent class="pt-6">
							<div class="mb-4 text-4xl">{fact.icon}</div>
							<div class="mb-2 text-3xl font-bold text-primary">{fact.value}</div>
							<p class="text-muted-foreground">{fact.label}</p>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Skills Section -->
	<section class="bg-muted/50 py-20">
		<div class="container mx-auto px-4">
			<h3 class="mb-6 text-center text-3xl font-bold">Skills</h3>
			<p class="mb-12 text-center text-muted-foreground">
				I've have some skills, here is how much I can do.
			</p>
			<div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
				{#each skills as skill (skill.name)}
					<div class="space-y-2">
						<div class="flex items-center justify-between">
							<span class="font-medium">{skill.name}</span>
							<span class="text-sm text-muted-foreground">{skill.level}%</span>
						</div>
						<div class="h-2 w-full rounded-full bg-secondary">
							<div
								class="h-2 rounded-full bg-primary transition-all duration-1000 ease-out"
								style="width: {skill.level}%"
							></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Experience Section -->
	<section class="py-20">
		<div class="container mx-auto px-4">
			<h3 class="mb-12 text-center text-3xl font-bold">Experience</h3>
			<div class="mx-auto max-w-4xl">
				<Card class="mb-8">
					<CardHeader>
						<CardTitle>Summary</CardTitle>
					</CardHeader>
					<CardContent>
						<h4 class="mb-2 text-lg font-semibold">Divanshu Chauhan</h4>
						<p class="text-muted-foreground italic">
							Innovative student with a passion for coding and business, currently pursuing a
							Master's degree in Computer Science at ASU Tempe. Experienced in leading teams and
							developing AI-based solutions. Eager to contribute to impactful projects and
							collaborate with like-minded individuals.
						</p>
					</CardContent>
				</Card>

				<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Education</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<div>
									<h4 class="font-semibold text-primary">Masters of Science in Computer Science</h4>
									<p class="text-sm text-muted-foreground">2025 - 2026</p>
									<p class="text-sm font-medium">Arizona State University, Tempe, AZ</p>
									<p class="text-sm text-muted-foreground">
										In process of completing a Master's degree in Computer Science with a focus on
										Artificial Intelligence, Machine Learning and Data Science.
									</p>
								</div>
							</div>
						</CardContent>
						<CardContent>
							<div class="space-y-4">
								<div>
									<h4 class="font-semibold text-primary">
										Bachelor of Science in Computer Science
									</h4>
									<p class="text-sm text-muted-foreground">Jan 2022 - May 2025</p>
									<p class="text-sm font-medium">Arizona State University, Tempe, AZ</p>
									<p class="text-sm text-muted-foreground">
										Completed coursework in data structures, algorithms, and software engineering
										with Magna Cum Laude honors.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Professional Experience</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="space-y-6">
								{#each experience as exp (exp.title)}
									<div>
										<h4 class="font-semibold text-primary">{exp.title}</h4>
										<p class="text-sm text-muted-foreground">{exp.period}</p>
										<p class="mb-2 text-sm font-medium">{exp.company}</p>
										<ul class="space-y-1 text-sm text-muted-foreground">
											{#each exp.description as item (item)}
												<li class="flex items-start gap-2">
													<span class="mt-1 text-primary">•</span>
													{item}
												</li>
											{/each}
										</ul>
									</div>
								{/each}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	</section>

	<!-- Projects Section -->
	<section class="bg-muted/50 py-20">
		<div class="container mx-auto px-4">
			<h3 class="mb-12 text-center text-3xl font-bold">Contributions and Projects</h3>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				{#each projects as project (project.title)}
					<Card class="group transition-all duration-300 hover:shadow-lg">
						<CardHeader>
							<div
								class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20"
							>
								<svelte:component this={project.icon} class="h-6 w-6 text-primary" />
							</div>
							<CardTitle>
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									class="transition-colors hover:text-primary"
								>
									{project.title}
								</a>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p class="mb-4 text-muted-foreground">{project.description}</p>
							<Button
								variant="outline"
								size="sm"
								class="gap-2"
								onclick={() => window.open(project.link, '_blank')}
							>
								<ExternalLink class="h-4 w-4" />
								View Project
							</Button>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t bg-background py-12">
		<div class="container mx-auto px-4 text-center">
			<h3 class="mb-2 text-2xl font-bold">Divanshu Chauhan</h3>
			<p class="mb-6 text-muted-foreground">Keen Entrepreneur and Developer!</p>
			<div class="mb-6 flex justify-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					onclick={() => window.open('https://twitter.com/divkix', '_blank')}
				>
					<SimpleIcon icon={siX} />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onclick={() => window.open('https://instagram.com/_divkix', '_blank')}
				>
					<SimpleIcon icon={siInstagram} />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onclick={() => window.open('https://github.com/divkix', '_blank')}
				>
					<SimpleIcon icon={siGithub} />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onclick={() => window.open('https://www.linkedin.com/in/divkix', '_blank')}
				>
					<Linkedin class="h-5 w-5" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onclick={() => window.open('https://t.me/divkix', '_blank')}
				>
					<SimpleIcon icon={siTelegram} />
				</Button>
			</div>
			<div class="text-sm text-muted-foreground">
				<p class="mb-2">&copy; Copyright <strong>Divkix</strong>. All Rights Reserved</p>
				<p>Built with ❤️ using Svelte 5 and shadcn-svelte</p>
			</div>
		</div>
	</footer>
</div>
