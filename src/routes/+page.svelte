<script lang="ts">
	import {
		Button,
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		DynamicRoles,
		ModeToggle,
		SimpleIcon,
		ExpandableSection
	} from '$lib/components/ui';
	import { siGithub, siX, siInstagram, siTelegram } from 'simple-icons';
	import {
		Linkedin,
		Mail,
		ExternalLink,
		MapPin,
		Calendar,
		GraduationCap,
		Briefcase,
		Bot,
		Globe as Web,
		WrenchIcon
	} from 'lucide-svelte';
	import { onMount, onDestroy } from 'svelte';
	import {
		initGSAP,
		cleanupScrollTrigger,
		fadeIn,
		fadeInLeft,
		scaleUp,
		animateSkillBars,
		staggerCards
	} from '$lib/utils/animations';
	import {
		portfolioData,
		calculateAge,
		openExternalLink,
		getPrimarySocialLink,
		getSecondarySocialLinks
	} from '$lib/utils/portfolio-data';
	import type { Project } from '$lib/types/portfolio';
	import type { ComponentType } from 'svelte';

	// Icon mapping for projects
	const iconMap: Record<string, ComponentType> = {
		Bot,
		Web,
		WrenchIcon
	};

	// Simple-icons mapping for social links
	const simpleIconMap = {
		siGithub,
		siX,
		siInstagram,
		siTelegram
	};

	// Calculate age from birth date
	const age = calculateAge(portfolioData.personalInfo.birthday);

	// Get social links
	const primarySocialLink = getPrimarySocialLink();
	const secondarySocialLinks = getSecondarySocialLinks();

	// Helper function to get icon component for projects
	function getProjectIcon(project: Project): ComponentType {
		return iconMap[project.icon];
	}

	// Helper function to get simple-icon component
	function getSimpleIcon(iconName: string) {
		return simpleIconMap[iconName as keyof typeof simpleIconMap];
	}

	// Initialize animations on mount
	onMount(() => {
		initGSAP();

		// Hero section animations
		fadeIn('.hero-content', {});
		scaleUp('.hero-image', {});

		// About section animations
		fadeIn('.about-heading', {});
		fadeIn('.about-text', {});
		staggerCards('.about-card', {});

		// Facts section animations
		fadeIn('.facts-heading', {});
		staggerCards('.fact-card', {});

		// Skills section animations
		fadeIn('.skills-heading', {});
		animateSkillBars('.skill-bar');

		// Experience section animations
		fadeIn('.experience-heading', {});
		fadeInLeft('.experience-summary', {});
		staggerCards('.experience-card', {});

		// Projects section animations
		fadeIn('.projects-heading', {});
		staggerCards('.project-card', {});

		// Footer animations
		fadeIn('.footer-content', {});
	});

	// Cleanup on destroy
	onDestroy(() => {
		cleanupScrollTrigger();
	});
</script>

<svelte:head>
	<title>{portfolioData.metaTags.title}</title>
	<meta name="description" content={portfolioData.metaTags.description} />
	<meta name="keywords" content={portfolioData.metaTags.keywords.join(', ')} />
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header
		class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
	>
		<div class="container mx-auto flex items-center justify-between px-4 py-4">
			<a href="/" class="text-2xl font-bold transition-colors hover:text-primary">
				{portfolioData.personalInfo.title}
			</a>
			<nav class="hidden items-center gap-6 md:flex">
				<a href="/blog" class="text-sm font-medium transition-colors hover:text-primary"> Blog </a>
			</nav>
			<div class="flex items-center gap-4">
				<a href="/blog" class="text-sm font-medium transition-colors hover:text-primary md:hidden">
					Blog
				</a>
				<ModeToggle />
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="relative overflow-hidden py-20 text-center">
		<div class="relative z-10 container mx-auto px-4">
			<div class="hero-image mb-8">
				<img
					src={portfolioData.personalInfo.profileImage}
					alt={portfolioData.personalInfo.name}
					class="mx-auto mb-6 h-32 w-32 rounded-full border-4 border-primary/20"
				/>
			</div>
			<div class="hero-content">
				<h2 class="mb-6 text-4xl font-bold md:text-6xl">{portfolioData.personalInfo.name}</h2>
				<p class="mb-8 text-xl text-muted-foreground md:text-2xl">
					<DynamicRoles
						roles={portfolioData.dynamicRoles.roles}
						prefix={portfolioData.dynamicRoles.prefix}
						typeSpeed={portfolioData.dynamicRoles.typeSpeed}
						deleteSpeed={portfolioData.dynamicRoles.deleteSpeed}
						pauseTime={portfolioData.dynamicRoles.pauseTime}
					/>
				</p>
				{#if primarySocialLink}
					<div class="mb-8 flex flex-wrap justify-center gap-4">
						<a
							href={primarySocialLink.url}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-input bg-background px-8 text-sm font-medium whitespace-nowrap ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
						>
							<SimpleIcon icon={getSimpleIcon(primarySocialLink.icon)} class="h-4 w-4" />
							{primarySocialLink.platform}
						</a>
					</div>
				{/if}
				<div class="flex justify-center gap-6">
					{#each secondarySocialLinks as social (social.platform)}
						<Button
							variant="ghost"
							size="icon"
							onclick={() => openExternalLink(social.url)}
							aria-label={social.ariaLabel}
						>
							{#if social.icon === 'Linkedin'}
								<Linkedin class="h-5 w-5" />
							{:else}
								<SimpleIcon icon={getSimpleIcon(social.icon)} />
							{/if}
						</Button>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section class="bg-muted/50 py-20">
		<div class="container mx-auto px-4">
			<h3 class="about-heading mb-12 text-center text-3xl font-bold">
				{portfolioData.about.heading}
			</h3>
			<div class="mx-auto max-w-4xl">
				<p class="about-text mb-8 text-center text-lg text-muted-foreground">
					{portfolioData.about.paragraphs[0]}
				</p>

				<div class="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
					<Card class="about-card">
						<CardHeader>
							<CardTitle class="flex items-center gap-2">
								<GraduationCap class="h-5 w-5" />
								{portfolioData.about.developerCard.title}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p class="mb-4 text-muted-foreground">
								{portfolioData.about.developerCard.description}
							</p>
							<div class="space-y-2 text-sm">
								<div class="flex items-center gap-2">
									<Calendar class="h-4 w-4 text-primary" />
									<strong>Birthday:</strong>
									<time datetime={portfolioData.personalInfo.birthday}>
										{new Date(portfolioData.personalInfo.birthday).toLocaleDateString('en-US', {
											month: 'long',
											day: 'numeric',
											year: 'numeric'
										})}
									</time>
								</div>
								<div class="flex items-center gap-2">
									<ExternalLink class="h-4 w-4 text-primary" />
									<strong>Website:</strong>
									<a href={portfolioData.personalInfo.website} class="text-primary hover:underline">
										{portfolioData.personalInfo.website}
									</a>
								</div>
								<div class="flex items-center gap-2">
									<MapPin class="h-4 w-4 text-primary" />
									<strong>City:</strong>
									{portfolioData.personalInfo.location.city},
									{portfolioData.personalInfo.location.state},
									{portfolioData.personalInfo.location.country}
								</div>
							</div>
						</CardContent>
					</Card>

					<Card class="about-card">
						<CardHeader>
							<CardTitle class="flex items-center gap-2">
								<Briefcase class="h-5 w-5" />
								{portfolioData.about.professionalCard.title}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="space-y-2 text-sm">
								<div class="flex items-center gap-2">
									<strong>Age:</strong>
									{age}
								</div>
								<div class="flex items-center gap-2">
									<strong>Degree:</strong>
									{portfolioData.personalInfo.degree}
								</div>
								<div class="flex items-center gap-2">
									<Mail class="h-4 w-4 text-primary" />
									<strong>Email:</strong>
									<a
										href="mailto:{portfolioData.personalInfo.email}"
										class="text-primary hover:underline"
									>
										{portfolioData.personalInfo.email}
									</a>
								</div>
								<div class="flex items-center gap-2">
									<strong>Freelance:</strong>
									{portfolioData.personalInfo.freelanceStatus}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<p class="about-text text-center text-muted-foreground">
					{portfolioData.about.paragraphs[1]}
				</p>
			</div>
		</div>
	</section>

	<!-- Facts Section -->
	<section class="py-20">
		<div class="container mx-auto px-4">
			<h3 class="facts-heading mb-6 text-center text-3xl font-bold">
				{portfolioData.facts.heading}
			</h3>
			<p class="mx-auto mb-12 max-w-3xl text-center text-muted-foreground">
				{portfolioData.facts.description}
			</p>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				{#each portfolioData.factsData as fact (fact.label)}
					<Card class="fact-card text-center">
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
			<h3 class="skills-heading mb-6 text-center text-3xl font-bold">
				{portfolioData.skills.heading}
			</h3>
			<p class="mb-12 text-center text-muted-foreground">
				{portfolioData.skills.description}
			</p>
			<div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
				{#each portfolioData.skillsData as skill (skill.name)}
					<div class="space-y-2">
						<div class="flex items-center justify-between">
							<span class="font-medium">{skill.name}</span>
							<span class="text-sm text-muted-foreground">{skill.level}%</span>
						</div>
						<div class="h-2 w-full rounded-full bg-secondary">
							<div
								class="skill-bar h-2 rounded-full bg-primary transition-all duration-1000 ease-out"
								data-width="{skill.level}%"
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
			<h3 class="experience-heading mb-12 text-center text-3xl font-bold">
				{portfolioData.experience.heading}
			</h3>
			<div class="mx-auto max-w-4xl">
				<Card class="experience-summary mb-8">
					<CardHeader>
						<CardTitle>Summary</CardTitle>
					</CardHeader>
					<CardContent>
						<h4 class="mb-2 text-lg font-semibold">{portfolioData.experience.summary.name}</h4>
						<p class="text-muted-foreground italic">
							{portfolioData.experience.summary.description}
						</p>
					</CardContent>
				</Card>

				<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
					<Card class="experience-card">
						<CardHeader>
							<CardTitle>{portfolioData.experience.educationTitle}</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="space-y-6">
								{#each portfolioData.educationData as edu (edu.degree)}
									<div>
										<h4 class="font-semibold text-primary">{edu.degree}</h4>
										<p class="text-sm text-muted-foreground">
											<time datetime={edu.startDate}>
												{new Date(edu.startDate).toLocaleDateString('en-US', {
													month: 'long',
													year: 'numeric'
												})}
											</time>
											-
											<time datetime={edu.endDate}>
												{new Date(edu.endDate).toLocaleDateString('en-US', {
													month: 'long',
													year: 'numeric'
												})}
											</time>
										</p>
										<p class="text-sm font-medium">{edu.institution}, {edu.location}</p>
										<p class="text-sm text-muted-foreground">
											{edu.description}
										</p>
									</div>
								{/each}
							</div>
						</CardContent>
					</Card>

					<Card class="experience-card">
						<CardHeader>
							<CardTitle>{portfolioData.experience.professionalTitle}</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="space-y-6">
								{#each portfolioData.experienceData as exp (exp.title)}
									<div>
										<h4 class="font-semibold text-primary">{exp.title}</h4>
										<p class="text-sm text-muted-foreground">
											<time datetime={exp.period}>{exp.period}</time>
										</p>
										<p class="mb-2 text-sm font-medium">{exp.company}, {exp.location}</p>
										<ExpandableSection
											items={exp.description}
											previewCount={2}
											expandText="Show more"
											collapseText="Show less"
											duration={300}
										/>
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
			<h3 class="projects-heading mb-12 text-center text-3xl font-bold">
				{portfolioData.projects.heading}
			</h3>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				{#each portfolioData.projectsData as project (project.title)}
					<Card class="project-card group transition-all duration-300 hover:shadow-lg">
						<CardHeader>
							<div
								class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20"
							>
								<svelte:component this={getProjectIcon(project)} class="h-6 w-6 text-primary" />
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
								onclick={() => openExternalLink(project.link)}
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
		<div class="footer-content container mx-auto px-4 text-center">
			<h3 class="mb-2 text-2xl font-bold">{portfolioData.footer.name}</h3>
			<p class="mb-6 text-muted-foreground">{portfolioData.footer.tagline}</p>
			<div class="mb-6 flex justify-center gap-4">
				{#each portfolioData.socialLinks as social (social.platform)}
					<Button
						variant="ghost"
						size="icon"
						onclick={() => openExternalLink(social.url)}
						aria-label={social.ariaLabel}
					>
						{#if social.icon === 'Linkedin'}
							<Linkedin class="h-5 w-5" />
						{:else}
							<SimpleIcon icon={getSimpleIcon(social.icon)} />
						{/if}
					</Button>
				{/each}
			</div>
			<div class="text-sm text-muted-foreground">
				<p class="mb-2">&copy; {portfolioData.footer.copyright}</p>
				<p>{portfolioData.footer.builtWith}</p>
			</div>
		</div>
	</footer>
</div>
