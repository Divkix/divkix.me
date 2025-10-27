// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	// View Transitions API type declarations
	interface Document {
		startViewTransition(callback: () => void | Promise<void>): ViewTransition;
	}

	interface ViewTransition {
		readonly updateCallbackDone: Promise<void>;
		readonly ready: Promise<void>;
		readonly finished: Promise<void>;
		skipTransition(): void;
	}

	interface CSSStyleDeclaration {
		viewTransitionName: string;
	}
}

export {};
