import { CareerCard } from "@/components/blocks/career-card";
import { Container } from "@/components/blocks/container";
import FramerLogo from "@/components/blocks/framer-logo";
import GiderimLogo from "@/components/blocks/giderim-logo";
import { OpenSourceCard } from "@/components/blocks/opensource-card";
import { ProjectCard } from "@/components/blocks/project-card";
import { GitHubIcon, XIcon } from "@/components/blocks/social-icons";
import { SocialLink } from "@/components/blocks/social-link";
import { careerItems } from "@/lib/utils";
import { getGithubInfo, getXInfo } from "@/server/thirdparty";
import type { Metadata } from "next";
import Link from "next/link";

const currentYear = new Date().getFullYear();
const lastPosition = currentYear - careerItems[careerItems.length - 1].from;

export const metadata: Metadata = {
  title: "Readme",
};

export default async function Readme() {
  const githubResponse = await getGithubInfo();
  const xResponse = await getXInfo();

  const last3weeks =
    githubResponse.data.viewer.contributionsCollection.contributionCalendar.weeks.slice(
      -3
    );
  const last14days = last3weeks
    .flatMap((week) => week.contributionDays)
    .slice(-14);

  const githubFollowers = githubResponse.data.viewer.followers.totalCount;
  const githubStars = githubResponse.data.viewer.repositories.nodes.reduce(
    (acc, repo) => acc + repo.stargazerCount,
    0
  );

  return (
    <>
      <Container className="mt-9">
        <h1 className="tracking-tight text-4xl sm:text-5xl">
          I'm Mahmut
          <span className="text-muted-foreground font-title font-extralight text-3xl sm:text-4xl block text-balance">
            Developer & Toolsmith
          </span>
        </h1>
        <div className="pro text-muted-foreground text-balance">
          <p className="mt-6">
            Hi <span className="text-xl">👋🏻</span>, I&apos;m currently working
            at{" "}
            <Link
              href="https://hipporello.com"
              target="_blank"
              rel="nofollow noreferrer"
            >
              @Hipporello
            </Link>
            , a company that builds business management tools for trello and notion.
          </p>
          <p>
            At Hipporello, I craft and refine front-end solutions, ensuring their effectiveness while constantly exploring ways to enhance and elevate the experience.
          </p>
        </div>
        <div className="mt-6 flex gap-6">
          <SocialLink
            href="https://x.com/needim"
            aria-label="Follow on X"
            count={xResponse.data?.public_metrics?.followers_count}
            label="followers"
            icon={XIcon}
          />
          <SocialLink
            href="https://github.com/needim"
            aria-label="Follow on GitHub"
            icon={GitHubIcon}
            count={githubFollowers}
            label="followers"
          />
        </div>
      </Container>
      <Container className="mt-24 md:mt-20">
        <h2 className="text-3xl">Spotlight</h2>
        <p className="text-muted-foreground mb-8 mt-3">
          Most recent projects and contributions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ProjectCard
            title="Type Foundry"
            icon={<FramerLogo className="size-10" />}
            description="Framer template for type designers"
            link="https://typefoundry.framer.website"
          />
        </div>
      </Container>
      <Container className="mt-24 md:mt-20">
        <div className="mx-auto max-w-2xl gap-y-20">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl sm:text-4xl mb-1">Career</h2>
            <div className="flex flex-col gap-8">
              <p className="text-muted-foreground">
                Overall I have{" "}
                <span className="font-semibold">
                  {lastPosition}+ years of experience
                </span>{" "}
                in software development.
              </p>
              {careerItems.map((item, index) => (
                <CareerCard key={`career-${index}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
