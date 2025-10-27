/**
 * Portfolio data type definitions
 * Provides strict type safety for portfolio content structure
 */

export interface PersonalInfo {
	name: string;
	title: string;
	tagline: string;
	email: string;
	website: string;
	location: {
		city: string;
		state: string;
		country: string;
	};
	birthday: string; // ISO date format: YYYY-MM-DD
	profileImage: string;
	degree: string;
	freelanceStatus: 'Available' | 'Not Available' | 'Busy';
}

export interface Skill {
	name: string;
	level: number; // 0-100
}

export interface Project {
	title: string;
	description: string;
	link: string;
	icon: 'Bot' | 'Web' | 'WrenchIcon' | 'Code' | 'Globe'; // Lucide icon names
}

export interface Fact {
	label: string;
	value: string;
	icon: string; // emoji
}

export interface ExperienceItem {
	title: string;
	period: string;
	company: string;
	location: string;
	description: string[];
}

export interface EducationItem {
	degree: string;
	startDate: string; // ISO date format
	endDate: string; // ISO date format
	institution: string;
	location: string;
	description: string;
}

export interface SocialLink {
	platform: 'GitHub' | 'Twitter' | 'Instagram' | 'LinkedIn' | 'Telegram';
	url: string;
	icon: 'siGithub' | 'siX' | 'siInstagram' | 'Linkedin' | 'siTelegram'; // simple-icons names or lucide
	ariaLabel: string;
	isPrimary?: boolean; // For hero section primary button
}

export interface AboutSection {
	heading: string;
	paragraphs: string[];
	developerCard: {
		title: string;
		description: string;
	};
	professionalCard: {
		title: string;
	};
}

export interface FactsSection {
	heading: string;
	description: string;
}

export interface SkillsSection {
	heading: string;
	description: string;
}

export interface ExperienceSection {
	heading: string;
	summary: {
		name: string;
		description: string;
	};
	educationTitle: string;
	professionalTitle: string;
}

export interface ProjectsSection {
	heading: string;
}

export interface FooterSection {
	name: string;
	tagline: string;
	copyright: string;
	builtWith: string;
}

export interface MetaTags {
	title: string;
	description: string;
	keywords: string[];
}

export interface DynamicRoles {
	roles: string[];
	prefix: string; // e.g., "I'm"
	typeSpeed: number;
	deleteSpeed: number;
	pauseTime: number;
}

/**
 * Complete portfolio data structure
 */
export interface PortfolioData {
	personalInfo: PersonalInfo;
	metaTags: MetaTags;
	dynamicRoles: DynamicRoles;
	socialLinks: SocialLink[];
	about: AboutSection;
	facts: FactsSection;
	factsData: Fact[];
	skills: SkillsSection;
	skillsData: Skill[];
	experience: ExperienceSection;
	experienceData: ExperienceItem[];
	educationData: EducationItem[];
	projects: ProjectsSection;
	projectsData: Project[];
	footer: FooterSection;
}
