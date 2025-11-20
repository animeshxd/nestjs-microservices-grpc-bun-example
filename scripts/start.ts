import path from 'node:path';
import { parseArgs } from 'node:util';
import { loadProject } from './nest';

async function start() {
  try {
    const { values, positionals } = parseArgs({
      options: {
        watch: {
          type: 'boolean',
          short: 'w',
          default: false,
        },
        debug: {
          type: 'boolean',
          short: 'd',
          default: false,
        },
      },
      allowPositionals: true,
    });
    const nest = await loadProject(positionals[0]);

    const sourceRoot = nest.sourceRoot ?? '';
    const entryFIle = `${nest.entryFile}.ts`;
    const args: string[] = [];
    if (values.watch) {
      args.push('--watch');
    }
    if (values.debug) {
      args.push('--inspect-brk');
    }
    args.push(`./${path.join(sourceRoot, entryFIle)}`);
    console.log(`bun run ${args.join(' ')}`);

    Bun.spawn({ cmd: ['bun', 'run', ...args], stdout: 'inherit' });
  } catch (e) {
    void e;
    console.log('Usage: start.ts <name> [--watch -w] [--debug -d] ');
    console.log('\t--watch -w : Watch files for changes');
    console.log('\t--debug -d : Wait for debugger to attach');
  }
}

start().catch(console.error);
