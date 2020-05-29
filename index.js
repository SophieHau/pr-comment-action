const core = require('@actions/core');
const github = require('@actions/github');


async function run() {
    try {
      const inputs = {
        token: core.getInput("token"),
      };
      const repository = process.env.GITHUB_REPOSITORY;
      const ref = process.env.GITHUB_REF;
      const pr_ref = ref.split("/")
      console.log(pr_ref)
    
      const repo = repository.split("/");
      core.debug(`repository: ${repository}`);
  
      console.log(repo)
      const octokit = new github.GitHub(inputs.token);
      console.log(octokit.pulls)
  
      // Create a comment
      const { data: comment } = await octokit.pulls.createComment({
        owner: repo[0],
        repo: repo[1],
        pull_number: pr_ref[-1],
        body: "this is the message"
      });
      core.info(
        `Created comment id '${comment.id}'.`
      );
      core.setOutput("comment-id", comment.id);
      console.log(comment.id)

    } catch (error) {
      core.setFailed(error.message);
    }
  }
  
  run();
