import { load } from './nest';

async function build() {
  const projects = await load();
  for (const project in projects.projects) {
    const app = projects.projects[project];
    if (app.type !== 'application') {
      continue;
    }
    void Bun.build({
      entrypoints: [`${app.sourceRoot}/${app.entryFile}.ts`],
      compile: {
        outfile: `./dist/${app.sourceRoot}/${app.entryFile}`,
      },
      target: 'node',
    });
  }
}

build().catch(console.error);
