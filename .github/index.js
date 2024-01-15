async function run({ github, context }) {

  comment(`HIIIIIIIIIIIIII ${new Date()}`);

  return "cool"
}

// make or update comment with `body` markdown
async function comment({body}) {
 let id = await already();
  if (already() === -1) {
    github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: '<!-- MY-ONBOARD-BOT -->' + body,
    })
  } else {
     github.rest.issues.updateComment({
      comment_id: id,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: '<!-- MY-ONBOARD-BOT -->' + body,
    })
  }
}

async function already() {
  const cmts = await github.rest.issues.listComments({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
  });
  cmts.data.forEach((i) => {
    if (i.body.includes('MY-ONBOARD-BOT')) {
      return i.id;
    }
  })
  return -1;
}

module.exports = run