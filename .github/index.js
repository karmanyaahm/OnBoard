var github = undefined
var context = undefined
async function run({ gh, ctx }) {
  github = gh
  context = ctx


  let ourGerber = await findGerber();
  if (!ourGerber) {
    comment(`Hi, I'm Orpheus Leap! Here to help you review your PR.

  I can't find a gerber.zip, SMH

  Happy OnBoarding!
  ${new Date()}`);
  }

  let URL = `https://tracespace.io/view/?boardUrl=https://raw.githubusercontent.com/hackclub/OnBoard/` + (await currentCommitHash()) + "/" + ourGerber;
  comment(`Hi, I'm Orpheus Leap! Here to help you review your PR.

  You can view a 3D render of your board here: <${URL}>!
  Happy OnBoarding!
  ${new Date()}`);

  return "cool"
}

async function findGerber() {
  let filesChanged = await gitDiffFiles();

  for (let file of filesChanged) {
    if (file.toLowerCase().includes("gerber") && file.toLowerCase().endsWith('zip')) {
      return file;
    }
  }
  return undefined;
}

// make or update comment with `body` markdown
async function comment(body) {

  body = '<!-- MY-ONBOARD-BOT --> ' + body
  let id = await already();
  if (id === -1) {
    github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: body,
    })
    console.log(`Creating new comment with ${body} on ${context.repo.owner}/${context.repo.repo}#${context.issue.number}`)
  } else {
    github.rest.issues.updateComment({
      comment_id: id,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: body,
    })
    console.log(`Updating ${id} to ${body} on ${context.repo.owner}/${context.repo.repo}#${context.issue.number}`)
  }
}

// find an issue from us
async function already() {
  const cmts = await github.rest.issues.listComments({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
  });
  for (const i of cmts.data)
    if (i.body.includes('MY-ONBOARD-BOT')) {
      return i.id;
    }
  return -1;
}

var execSync = require('child_process').execSync;

async function gitDiffFiles() {

  console.log(context)
  console.log(context)
  console.log(await execSync('git log', { timeout: 3000, encoding: 'utf-8' }));
  console.log(await execSync('git log | head -n 300', { timeout: 3000, encoding: 'utf-8' }));
  const output = await execSync('git diff --name-only origin/' + process.env.GITHUB_BASE_REF, { timeout: 3000, encoding: 'utf-8' });
  return output.split('\n')
}

async function currentCommitHash() {
  return context.payload.after;
}

module.exports = run