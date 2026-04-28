import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

/**
 * Citation Density Checker
 *
 * Validates that blog posts have sufficient citation density for GEO optimization.
 * Target: 1 citation per 150 words (citation density >= 1.0)
 *
 * Citation patterns detected:
 * - Statistics with % (e.g., "47%", "3.2x")
 * - Numbers with units (e.g., "150 words", "2.14s", "2026")
 * - Citation markers: [1], [2], (Author, 2024), etc.
 * - Research references: "according to", "study found", "research shows"
 * - Comparison metrics: "faster than", "increased by", "decreased by"
 */

interface CitationCheck {
  slug: string;
  title: string;
  wordCount: number;
  citationsFound: number;
  density: number; // citations per 150 words
  target: number;
  status: "PASS" | "FAIL" | "WARNING";
  details: string[];
}

const CONTENT_DIR = join(process.cwd(), "src/content/blog");
const WORDS_PER_CITATION_TARGET = 150;

// Patterns that indicate citations/statistics
const CITATION_PATTERNS = [
  // Percentages and multipliers
  /\d+\.?\d*%/g,
  /\d+\.?\d*x\b/gi,
  // Numbers with units (words, seconds, minutes, hours, days, years)
  /\d+\.?\d*\s+(words?|chars?|seconds?|minutes?|hours?|days?|months?|years?|GB|MB|KB|TB|px|em|rem|vh|vw|ms|fps|ms|APIs?|models?|parameters?|tokens?)/gi,
  // Citation markers
  /\[\d+\]/g,
  /\([^)]*\d{4}[^)]*\)/g, // (Author, 2024) format
  // Research indicators
  /\b(according to|study found|research shows|data shows|report found|survey found|analysis found|benchmarks? show|tests? show|results? show)\b/gi,
  // Comparison metrics
  /\b(faster than|slower than|increased by|decreased by|improved by|reduced by|higher than|lower than|better than|worse than)\b/gi,
  // Dollar amounts and pricing
  /\$\d+\.?\d*/g,
  /\d+\.?\d*\s*(USD|EUR|GBP|\$)/gi,
  // Technical metrics
  /\d+\.?\d*\s*(accuracy|precision|recall|F1|score|rating|rank|position)/gi,
];

function countCitations(content: string): { count: number; matches: string[] } {
  const matches: string[] = [];
  let totalCount = 0;

  // Remove code blocks and inline code to avoid false positives
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, "") // Code blocks
    .replace(/`[^`]*`/g, ""); // Inline code

  for (const pattern of CITATION_PATTERNS) {
    const patternMatches = cleanContent.match(pattern) || [];
    totalCount += patternMatches.length;
    matches.push(...patternMatches.slice(0, 5)); // Keep first 5 for debugging
  }

  return { count: totalCount, matches };
}

function checkCitationDensity(): void {
  console.log("📊 Checking citation density for GEO optimization...\n");

  if (!existsSync(CONTENT_DIR)) {
    console.error(`❌ Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const mdxFiles = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const results: CitationCheck[] = [];

  for (const file of mdxFiles) {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = join(CONTENT_DIR, file);
    const fileContent = readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    // Skip unpublished posts
    if (data.published === false) {
      continue;
    }

    const wordCount = data.wordCount || content.split(/\s+/).length;
    const { count: citationsFound, matches } = countCitations(content);
    const density = citationsFound / (wordCount / WORDS_PER_CITATION_TARGET);

    let status: "PASS" | "FAIL" | "WARNING";
    if (density >= 1.0) {
      status = "PASS";
    } else if (density >= 0.7) {
      status = "WARNING";
    } else {
      status = "FAIL";
    }

    results.push({
      slug,
      title: data.title || slug,
      wordCount,
      citationsFound,
      density: Math.round(density * 100) / 100,
      target: 1.0,
      status,
      details: matches.slice(0, 3),
    });
  }

  // Sort by density (lowest first)
  results.sort((a, b) => a.density - b.density);

  // Print results
  console.log(
    "┌─────────────────────────────────────────────────────────────────────────┐",
  );
  console.log(
    "│ CITATION DENSITY REPORT (Target: 1 citation per 150 words)             │",
  );
  console.log(
    "├─────────────────────────────────────────────────────────────────────────┤",
  );

  let passCount = 0;
  let warningCount = 0;
  let failCount = 0;

  for (const result of results) {
    const statusIcon =
      result.status === "PASS"
        ? "✅"
        : result.status === "WARNING"
          ? "⚠️"
          : "❌";
    const densityStr = result.density.toFixed(2).padStart(5);

    console.log(
      `│ ${statusIcon} ${result.slug.slice(0, 40).padEnd(40)} │ ${densityStr} │ ${result.citationsFound.toString().padStart(3)} cites │ ${result.wordCount.toString().padStart(4)} words │`,
    );

    if (result.status === "PASS") passCount++;
    else if (result.status === "WARNING") warningCount++;
    else failCount++;
  }

  console.log(
    "├─────────────────────────────────────────────────────────────────────────┤",
  );
  console.log(
    `│ Summary: ${passCount} PASS, ${warningCount} WARNING, ${failCount} FAIL (${results.length} posts checked)                    │`,
  );
  console.log(
    "└─────────────────────────────────────────────────────────────────────────┘",
  );

  // Show details for failures and warnings
  const issues = results.filter((r) => r.status !== "PASS");
  if (issues.length > 0) {
    console.log("\n📋 Posts needing citation improvement:\n");

    for (const issue of issues) {
      console.log(`${issue.status === "FAIL" ? "❌" : "⚠️"} ${issue.title}`);
      console.log(`   Density: ${issue.density} (target: ${issue.target})`);
      console.log(
        `   Citations: ${issue.citationsFound} in ${issue.wordCount} words`,
      );
      console.log(
        `   Missing: ~${Math.ceil(issue.wordCount / WORDS_PER_CITATION_TARGET - issue.citationsFound)} more citations needed\n`,
      );
    }
  }

  // Exit with error if any failures
  if (failCount > 0) {
    console.error(
      `\n❌ ${failCount} post(s) below citation density threshold.`,
    );
    console.error(
      "   Add statistics, percentages, benchmarks, or citations to improve.",
    );
    process.exit(1);
  }

  if (warningCount > 0) {
    console.log(
      `\n⚠️ ${warningCount} post(s) approaching threshold. Consider adding more citations.`,
    );
  }

  console.log(
    "\n✅ All posts meet citation density requirements for GEO optimization!",
  );
}

checkCitationDensity();
