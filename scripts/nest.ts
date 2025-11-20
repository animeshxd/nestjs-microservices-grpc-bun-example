/* eslint-disable @typescript-eslint/no-unsafe-return */

import { readFile } from 'node:fs/promises';

interface NestProject {
  sourceRoot: string;
  entryFile: string;
  type: 'library' | 'application';
}

export type NestConfig = {
  projects: Record<string, NestProject>;
} & NestProject;

export async function load(): Promise<NestConfig> {
  return JSON.parse(await readFile('nest-cli.json', 'utf-8'));
}

export async function loadProject(
  name: string | undefined = undefined,
): Promise<NestProject> {
  const nest = await load();
  if (!name) {
    return nest;
  } else {
    const project = nest?.projects?.[name];
    if (!project) {
      console.log('No project found for name', name);
      throw new Error(`No project found for name ${name}`);
    }
    return project;
  }
}
