var github = undefined
var context = undefined
async function run({ gh, ctx }) {
  github = gh
  context = ctx

  comment(`HIIIIIIIIIIIIII ${new Date()}`);

  return "cool"
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
  cmts.data.forEach((i) => {
    console.log(i.body)
    if (i.body.includes('MY-ONBOARD-BOT')) {
      return i.id;
    }
  })
  return -1;
}

module.exports = run