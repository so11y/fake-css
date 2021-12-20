import children from 'child_process';
import path from 'path';
import util from 'util';
const spawn = util.promisify(children.spawn);
const ContentCwd = process.cwd();
const FakeCssCwd = path.join(ContentCwd, '/packages/fake-css');
const PlaygroundCwd = path.join(ContentCwd, '/packages/playground');

function runnerInstall(cwd) {
    return spawn('pnpm ', ['install'], {
        stdio: 'inherit',
        cwd: cwd,
        shell: true
    });
}

function run() {
    Promise.all([
        runnerInstall(FakeCssCwd),
        runnerInstall(PlaygroundCwd)
    ])
}
run();
