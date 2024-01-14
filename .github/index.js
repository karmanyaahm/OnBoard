async function run({github, context}) {
  console.log(process.env)
  console.log(context)
  console.log(github)

              github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '👋 Thanks for reporting!'
            })
}

module.exports = run