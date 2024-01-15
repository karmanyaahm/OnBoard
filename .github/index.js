async function run({github, context}) {
              github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '👋 Thanks for reporting!'
            })

            const cmts =  await github.rest.issues.listComments({
   issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
});
            console.log(cmts           );
            cmts.data.forEach((i) => {
if (i.author_association == 'NONE') {
  console.log(i.user[0]);
  console.log(i.performed_via_github_app[0]);
  console.log(i.id);
}
            })
            return "cool"
}

module.exports = run