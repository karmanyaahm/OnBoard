async function run({github, context}) {
              github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '👋 Thanks for reporting!'
            })

            console.log(
 await github.rest.issues.listComments({
   issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
})
            )
            return "cool"
}

module.exports = run